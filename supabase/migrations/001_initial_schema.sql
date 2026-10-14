-- Attendly Initial PostgreSQL Migration
-- Enables extensions, creates relational entities, constraints, indexes, and Row Level Security (RLS)

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Institutions
CREATE TABLE IF NOT EXISTS public.institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    identifier TEXT, -- SRN for students, Staff ID for teachers
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_institution_identifier UNIQUE (institution_id, identifier)
);

-- 4. Academic Departments
CREATE TABLE IF NOT EXISTS public.academic_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_department_code UNIQUE (institution_id, code)
);

-- 5. Academic Terms (Semesters / Trimesters)
CREATE TABLE IF NOT EXISTS public.academic_terms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "Fall 2026"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Sections (e.g. 5th Sem CS Section A)
CREATE TABLE IF NOT EXISTS public.sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES public.academic_departments(id) ON DELETE CASCADE,
    term_id UUID NOT NULL REFERENCES public.academic_terms(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "Section A"
    semester INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_section_per_term UNIQUE (department_id, term_id, semester, name)
);

-- 7. Subjects (Courses)
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES public.academic_departments(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    credits INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_subject_code UNIQUE (institution_id, code)
);

-- 8. Teacher Assignments
CREATE TABLE IF NOT EXISTS public.teacher_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_teacher_assignment UNIQUE (teacher_id, section_id, subject_id)
);

-- 9. Student Enrollments
CREATE TABLE IF NOT EXISTS public.student_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    roll_number TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_student_section UNIQUE (student_id, section_id)
);

-- 10. Attendance Sessions
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    period INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL CHECK (status IN ('draft', 'submitted', 'cancelled')) DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_session_slot UNIQUE (section_id, subject_id, session_date, period)
);

-- 11. Attendance Records
CREATE TABLE IF NOT EXISTS public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent')),
    remarks TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_session_student UNIQUE (session_id, student_id)
);

-- 12. Attendance Audit Logs (For authorized corrections)
CREATE TABLE IF NOT EXISTS public.attendance_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.attendance_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    changed_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    old_status TEXT,
    new_status TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON public.profiles(institution_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_sections_term ON public.sections(term_id);
CREATE INDEX IF NOT EXISTS idx_teacher_assignments_teacher ON public.teacher_assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_enrollments_section ON public.student_enrollments(section_id);
CREATE INDEX IF NOT EXISTS idx_student_enrollments_student ON public.student_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_lookup ON public.attendance_sessions(section_id, subject_id, session_date);
CREATE INDEX IF NOT EXISTS idx_attendance_records_student ON public.attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_session ON public.attendance_records(session_id);

-- 14. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_audit_logs ENABLE ROW LEVEL SECURITY;

-- 15. Helper Function to get current user's profile
CREATE OR REPLACE FUNCTION public.current_profile()
RETURNS public.profiles AS $$
  SELECT * FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 16. RLS Policies

-- Profiles Policies
CREATE POLICY "Users can read profiles within own institution"
ON public.profiles FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admins can manage profiles"
ON public.profiles FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

-- Institutions Policies
CREATE POLICY "Users can read own institution"
ON public.institutions FOR SELECT
USING (id = (SELECT institution_id FROM public.current_profile()));

-- Departments, Terms, Sections, Subjects (Readable by institution members, editable by Admin)
CREATE POLICY "Read departments within institution"
ON public.academic_departments FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admin manage departments"
ON public.academic_departments FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

CREATE POLICY "Read terms within institution"
ON public.academic_terms FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admin manage terms"
ON public.academic_terms FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

CREATE POLICY "Read sections within institution"
ON public.sections FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admin manage sections"
ON public.sections FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

CREATE POLICY "Read subjects within institution"
ON public.subjects FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admin manage subjects"
ON public.subjects FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

-- Teacher Assignments Policies
CREATE POLICY "Read teacher assignments in institution"
ON public.teacher_assignments FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admin manage teacher assignments"
ON public.teacher_assignments FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

-- Student Enrollments Policies
CREATE POLICY "Read student enrollments in institution"
ON public.student_enrollments FOR SELECT
USING (institution_id = (SELECT institution_id FROM public.current_profile()));

CREATE POLICY "Admin manage student enrollments"
ON public.student_enrollments FOR ALL
USING ((SELECT role FROM public.current_profile()) = 'admin');

-- Attendance Sessions Policies
CREATE POLICY "Teachers can read their assigned sessions"
ON public.attendance_sessions FOR SELECT
USING (
    institution_id = (SELECT institution_id FROM public.current_profile())
    AND (
        teacher_id = auth.uid()
        OR (SELECT role FROM public.current_profile()) = 'admin'
    )
);

CREATE POLICY "Teachers can insert and update their sessions"
ON public.attendance_sessions FOR ALL
USING (
    teacher_id = auth.uid()
    OR (SELECT role FROM public.current_profile()) = 'admin'
);

-- Attendance Records Policies
CREATE POLICY "Students can view only their own submitted attendance records"
ON public.attendance_records FOR SELECT
USING (
    student_id = auth.uid()
    AND EXISTS (
        SELECT 1 FROM public.attendance_sessions s
        WHERE s.id = attendance_records.session_id
        AND s.status = 'submitted'
    )
);

CREATE POLICY "Teachers can read and manage attendance records for their sessions"
ON public.attendance_records FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.attendance_sessions s
        WHERE s.id = attendance_records.session_id
        AND (s.teacher_id = auth.uid() OR (SELECT role FROM public.current_profile()) = 'admin')
    )
);
