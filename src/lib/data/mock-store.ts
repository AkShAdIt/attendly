import {
  Institution,
  Profile,
  AcademicDepartment,
  AcademicTerm,
  Section,
  Subject,
  TeacherAssignment,
  StudentEnrollment,
  AttendanceSession,
  AttendanceRecord,
} from "@/types/database";

export const MOCK_INSTITUTION: Institution = {
  id: "inst-apex-001",
  name: "Apex Institute of Technology",
  code: "AIT-BLR",
  createdAt: "2026-01-01T00:00:00Z",
};

export const MOCK_DEPARTMENT: AcademicDepartment = {
  id: "dept-cse-01",
  institutionId: MOCK_INSTITUTION.id,
  name: "Computer Science & Engineering",
  code: "CSE",
};

export const MOCK_TERM: AcademicTerm = {
  id: "term-fall-26",
  institutionId: MOCK_INSTITUTION.id,
  name: "Fall 2026 Semester",
  startDate: "2026-08-01",
  endDate: "2026-12-15",
  isCurrent: true,
};

export const MOCK_SECTION_A: Section = {
  id: "sec-5a",
  institutionId: MOCK_INSTITUTION.id,
  departmentId: MOCK_DEPARTMENT.id,
  termId: MOCK_TERM.id,
  name: "Section A",
  semester: 5,
};

export const MOCK_SECTION_B: Section = {
  id: "sec-5b",
  institutionId: MOCK_INSTITUTION.id,
  departmentId: MOCK_DEPARTMENT.id,
  termId: MOCK_TERM.id,
  name: "Section B",
  semester: 5,
};

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "sub-cs501",
    institutionId: MOCK_INSTITUTION.id,
    departmentId: MOCK_DEPARTMENT.id,
    code: "CS501",
    name: "Distributed Systems",
    credits: 4,
  },
  {
    id: "sub-cs502",
    institutionId: MOCK_INSTITUTION.id,
    departmentId: MOCK_DEPARTMENT.id,
    code: "CS502",
    name: "Computer Networks",
    credits: 4,
  },
  {
    id: "sub-cs503",
    institutionId: MOCK_INSTITUTION.id,
    departmentId: MOCK_DEPARTMENT.id,
    code: "CS503",
    name: "Cloud Computing",
    credits: 3,
  },
  {
    id: "sub-cs504",
    institutionId: MOCK_INSTITUTION.id,
    departmentId: MOCK_DEPARTMENT.id,
    code: "CS504",
    name: "Machine Learning Foundations",
    credits: 4,
  },
];

export const MOCK_ADMIN_USER: Profile = {
  id: "user-admin-01",
  institutionId: MOCK_INSTITUTION.id,
  role: "admin",
  fullName: "Dr. K. S. Murthy",
  email: "admin@college.edu",
  identifier: "ADM-001",
  createdAt: "2026-01-01T00:00:00Z",
};

export const MOCK_TEACHER_USER: Profile = {
  id: "user-teacher-01",
  institutionId: MOCK_INSTITUTION.id,
  role: "teacher",
  fullName: "Prof. Ramesh Sharma",
  email: "prof.sharma@college.edu",
  identifier: "TCH-CSE-01",
  createdAt: "2026-01-01T00:00:00Z",
};

export const MOCK_TEACHER_2: Profile = {
  id: "user-teacher-02",
  institutionId: MOCK_INSTITUTION.id,
  role: "teacher",
  fullName: "Prof. Meera Nair",
  email: "prof.nair@college.edu",
  identifier: "TCH-CSE-02",
  createdAt: "2026-01-01T00:00:00Z",
};

export const MOCK_TEACHER_ASSIGNMENTS: TeacherAssignment[] = [
  {
    id: "asgn-01",
    institutionId: MOCK_INSTITUTION.id,
    teacherId: MOCK_TEACHER_USER.id,
    sectionId: MOCK_SECTION_A.id,
    subjectId: MOCK_SUBJECTS[0].id,
    subjectCode: MOCK_SUBJECTS[0].code,
    subjectName: MOCK_SUBJECTS[0].name,
    sectionName: MOCK_SECTION_A.name,
    departmentName: MOCK_DEPARTMENT.name,
    semester: 5,
  },
  {
    id: "asgn-02",
    institutionId: MOCK_INSTITUTION.id,
    teacherId: MOCK_TEACHER_USER.id,
    sectionId: MOCK_SECTION_A.id,
    subjectId: MOCK_SUBJECTS[1].id,
    subjectCode: MOCK_SUBJECTS[1].code,
    subjectName: MOCK_SUBJECTS[1].name,
    sectionName: MOCK_SECTION_A.name,
    departmentName: MOCK_DEPARTMENT.name,
    semester: 5,
  },
  {
    id: "asgn-03",
    institutionId: MOCK_INSTITUTION.id,
    teacherId: MOCK_TEACHER_2.id,
    sectionId: MOCK_SECTION_A.id,
    subjectId: MOCK_SUBJECTS[2].id,
    subjectCode: MOCK_SUBJECTS[2].code,
    subjectName: MOCK_SUBJECTS[2].name,
    sectionName: MOCK_SECTION_A.name,
    departmentName: MOCK_DEPARTMENT.name,
    semester: 5,
  },
];

// 25 Enrolled Students in Section A
export const MOCK_STUDENTS: Array<{
  profile: Profile;
  enrollment: StudentEnrollment;
}> = [
  { name: "Aarav Sharma", srn: "ENG22CS001", roll: "01" },
  { name: "Aditi Rao", srn: "ENG22CS002", roll: "02" },
  { name: "Aryan Verma", srn: "ENG22CS003", roll: "03" },
  { name: "Diya Patel", srn: "ENG22CS004", roll: "04" },
  { name: "Eshaan Gupta", srn: "ENG22CS005", roll: "05" },
  { name: "Ishaan Reddy", srn: "ENG22CS006", roll: "06" },
  { name: "Kavya Menon", srn: "ENG22CS007", roll: "07" },
  { name: "Manish Kulkarni", srn: "ENG22CS008", roll: "08" },
  { name: "Neha Joshi", srn: "ENG22CS009", roll: "09" },
  { name: "Pranav Pillai", srn: "ENG22CS010", roll: "10" },
  { name: "Pooja Hegde", srn: "ENG22CS011", roll: "11" },
  { name: "Rahul Deshmukh", srn: "ENG22CS012", roll: "12" },
  { name: "Rhea Sen", srn: "ENG22CS013", roll: "13" },
  { name: "Rohan Iyer", srn: "ENG22CS014", roll: "14" },
  { name: "Saanvi Bhatt", srn: "ENG22CS015", roll: "15" },
  { name: "Siddharth Nair", srn: "ENG22CS016", roll: "16" },
  { name: "Simran Kaur", srn: "ENG22CS017", roll: "17" },
  { name: "Tanvi Agarwal", srn: "ENG22CS018", roll: "18" },
  { name: "Utkarsh Dubey", srn: "ENG22CS019", roll: "19" },
  { name: "Varun Shetty", srn: "ENG22CS020", roll: "20" },
].map((s, idx) => {
  const userId = `user-std-${s.srn.toLowerCase()}`;
  const profile: Profile = {
    id: userId,
    institutionId: MOCK_INSTITUTION.id,
    role: "student",
    fullName: s.name,
    email: `${s.name.toLowerCase().replace(/\s+/g, ".")}@college.edu`,
    identifier: s.srn,
    createdAt: "2026-01-01T00:00:00Z",
  };
  const enrollment: StudentEnrollment = {
    id: `enr-${idx + 1}`,
    institutionId: MOCK_INSTITUTION.id,
    studentId: userId,
    sectionId: MOCK_SECTION_A.id,
    rollNumber: s.roll,
    studentName: s.name,
    identifier: s.srn,
    email: profile.email,
  };
  return { profile, enrollment };
});

export const MOCK_STUDENT_USER: Profile = MOCK_STUDENTS[0].profile; // Aarav Sharma (ENG22CS001)

// Historical attendance sessions for CS501
export const MOCK_SESSIONS: AttendanceSession[] = [
  {
    id: "sess-01",
    institutionId: MOCK_INSTITUTION.id,
    sectionId: MOCK_SECTION_A.id,
    subjectId: MOCK_SUBJECTS[0].id,
    teacherId: MOCK_TEACHER_USER.id,
    sessionDate: "2026-10-10",
    period: 1,
    status: "submitted",
    createdAt: "2026-10-10T09:00:00Z",
    updatedAt: "2026-10-10T09:02:00Z",
    subjectName: "Distributed Systems",
    subjectCode: "CS501",
    sectionName: "Section A",
    totalPresent: 18,
    totalAbsent: 2,
    totalStudents: 20,
  },
  {
    id: "sess-02",
    institutionId: MOCK_INSTITUTION.id,
    sectionId: MOCK_SECTION_A.id,
    subjectId: MOCK_SUBJECTS[0].id,
    teacherId: MOCK_TEACHER_USER.id,
    sessionDate: "2026-10-11",
    period: 2,
    status: "submitted",
    createdAt: "2026-10-11T10:00:00Z",
    updatedAt: "2026-10-11T10:02:30Z",
    subjectName: "Distributed Systems",
    subjectCode: "CS501",
    sectionName: "Section A",
    totalPresent: 19,
    totalAbsent: 1,
    totalStudents: 20,
  },
  {
    id: "sess-03",
    institutionId: MOCK_INSTITUTION.id,
    sectionId: MOCK_SECTION_A.id,
    subjectId: MOCK_SUBJECTS[0].id,
    teacherId: MOCK_TEACHER_USER.id,
    sessionDate: "2026-10-12",
    period: 1,
    status: "submitted",
    createdAt: "2026-10-12T09:00:00Z",
    updatedAt: "2026-10-12T09:01:45Z",
    subjectName: "Distributed Systems",
    subjectCode: "CS501",
    sectionName: "Section A",
    totalPresent: 17,
    totalAbsent: 3,
    totalStudents: 20,
  },
];
