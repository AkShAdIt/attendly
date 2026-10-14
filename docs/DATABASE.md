# Attendly — Database Schema & Data Dictionary

## 1. Relational Entity Diagram

```
institutions
  │
  ├── profiles (roles: admin, teacher, student)
  │     ├── teacher_assignments ─── subjects
  │     └── student_enrollments ─── sections
  │
  ├── academic_departments
  ├── academic_terms
  ├── sections
  ├── subjects
  │
  └── attendance_sessions
        │
        ├── attendance_records
        └── attendance_audit_logs
```

## 2. Table Specifications

### `institutions`
- `id` (uuid, PK, default gen_random_uuid())
- `name` (text, not null)
- `code` (text, unique, not null)
- `created_at` (timestamptz, default now())

### `profiles`
- `id` (uuid, PK, references auth.users.id)
- `institution_id` (uuid, FK references institutions.id)
- `role` (text, check in ('admin', 'teacher', 'student'))
- `full_name` (text, not null)
- `email` (text, not null)
- `identifier` (text, nullable - e.g. SRN / Teacher Employee ID)
- `avatar_url` (text, nullable)
- `created_at` (timestamptz, default now())
- Unique constraint: `(institution_id, identifier)` for students

### `academic_departments`
- `id` (uuid, PK)
- `institution_id` (uuid, FK)
- `name` (text, not null)
- `code` (text, not null)

### `academic_terms`
- `id` (uuid, PK)
- `institution_id` (uuid, FK)
- `name` (text, not null - e.g. "Fall 2026")
- `start_date` (date, not null)
- `end_date` (date, not null)
- `is_current` (boolean, default false)

### `sections`
- `id` (uuid, PK)
- `institution_id` (uuid, FK)
- `department_id` (uuid, FK)
- `term_id` (uuid, FK)
- `name` (text, not null - e.g. "Section A")
- `semester` (integer, not null - e.g. 5)

### `subjects`
- `id` (uuid, PK)
- `institution_id` (uuid, FK)
- `department_id` (uuid, FK)
- `code` (text, not null - e.g. "CS501")
- `name` (text, not null - e.g. "Distributed Systems")

### `teacher_assignments`
- `id` (uuid, PK)
- `teacher_id` (uuid, FK references profiles.id)
- `section_id` (uuid, FK references sections.id)
- `subject_id` (uuid, FK references subjects.id)
- Unique: `(teacher_id, section_id, subject_id)`

### `student_enrollments`
- `id` (uuid, PK)
- `student_id` (uuid, FK references profiles.id)
- `section_id` (uuid, FK references sections.id)
- `roll_number` (text, nullable)
- Unique: `(student_id, section_id)`

### `attendance_sessions`
- `id` (uuid, PK)
- `institution_id` (uuid, FK)
- `section_id` (uuid, FK)
- `subject_id` (uuid, FK)
- `teacher_id` (uuid, FK)
- `session_date` (date, not null)
- `period` (integer, default 1)
- `status` (text, check in ('draft', 'submitted', 'cancelled'), default 'draft')
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())
- Unique constraint: `(section_id, subject_id, session_date, period)`

### `attendance_records`
- `id` (uuid, PK)
- `session_id` (uuid, FK references attendance_sessions.id on delete cascade)
- `student_id` (uuid, FK references profiles.id)
- `status` (text, check in ('present', 'absent'))
- `remarks` (text, nullable)
- `updated_at` (timestamptz, default now())
- Unique constraint: `(session_id, student_id)`

### `attendance_audit_logs`
- `id` (uuid, PK)
- `session_id` (uuid, FK)
- `student_id` (uuid, FK)
- `changed_by` (uuid, FK references profiles.id)
- `old_status` (text)
- `new_status` (text)
- `reason` (text, not null)
- `created_at` (timestamptz, default now())
