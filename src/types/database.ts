export type UserRole = "admin" | "teacher" | "student";

export interface Institution {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  institutionId: string;
  role: UserRole;
  fullName: string;
  email: string;
  identifier?: string | null; // SRN or Staff ID
  avatarUrl?: string | null;
  createdAt: string;
}

export interface AcademicDepartment {
  id: string;
  institutionId: string;
  name: string;
  code: string;
}

export interface AcademicTerm {
  id: string;
  institutionId: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Section {
  id: string;
  institutionId: string;
  departmentId: string;
  termId: string;
  name: string;
  semester: number;
}

export interface Subject {
  id: string;
  institutionId: string;
  departmentId: string;
  code: string;
  name: string;
  credits: number;
}

export interface TeacherAssignment {
  id: string;
  institutionId: string;
  teacherId: string;
  sectionId: string;
  subjectId: string;
  // Joined fields for display
  subjectCode?: string;
  subjectName?: string;
  sectionName?: string;
  departmentName?: string;
  semester?: number;
}

export interface StudentEnrollment {
  id: string;
  institutionId: string;
  studentId: string;
  sectionId: string;
  rollNumber?: string | null;
  // Joined fields
  studentName?: string;
  identifier?: string; // SRN
  email?: string;
}

export type AttendanceSessionStatus = "draft" | "submitted" | "cancelled";

export interface AttendanceSession {
  id: string;
  institutionId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  sessionDate: string; // YYYY-MM-DD
  period: number;
  status: AttendanceSessionStatus;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  subjectName?: string;
  subjectCode?: string;
  sectionName?: string;
  totalPresent?: number;
  totalAbsent?: number;
  totalStudents?: number;
}

export type AttendanceStatus = "present" | "absent";

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  status: AttendanceStatus;
  remarks?: string | null;
  updatedAt: string;
  // Joined fields
  studentName?: string;
  studentIdentifier?: string;
  rollNumber?: string;
}

export interface AttendanceAuditLog {
  id: string;
  sessionId: string;
  studentId: string;
  changedBy: string;
  oldStatus?: string | null;
  newStatus: string;
  reason: string;
  createdAt: string;
}
