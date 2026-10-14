# Attendly — Product Specification

## 1. Product Summary
**Attendly** is a college attendance management platform built with a mobile-first philosophy to replace manual spreadsheets with an intuitive card-swiping interface for teachers, clear dashboards and projection calculators for students, and centralized roster management for administrators.

## 2. Target Personas & Core Journeys

### College Administrator
- **Setup Institution & Structure:** Define academic departments, terms/semesters, sections, and subjects.
- **Bulk Student Enrollment:** Upload student rosters via CSV/XLSX with column mapping, preview, duplicate detection, and row-level error correction.
- **Teacher Assignment:** Assign instructors to specific subjects and sections.
- **Audit & Analytics:** Monitor institution-wide attendance health, flag at-risk cohorts, and export official reports.

### Teacher
- **Daily Dashboard:** View assigned classes for today, previous sessions, and completion status.
- **Swipe-Based Attendance Session:**
  - Launch a session for an assigned section, subject, and date.
  - Review student cards sequentially (Swipe Right = Present, Swipe Left = Absent).
  - One-click Undo to immediately reverse decisions.
  - Toggle to Quick Roster mode for tabular marking.
  - Pre-submission review screen displaying counts and absentee list.
  - Submit atomically with server confirmation.
- **Attendance Corrections:** Edit submitted records with mandatory reason recording for the audit log.

### Student
- **Personal Attendance Ring:** View overall attendance percentage and breakdown by subject.
- **Zero-State Safeguards:** Understand that classes with zero sessions held indicate "No attendance recorded" rather than false 0%.
- **Target Calculator:** Calculate exactly how many consecutive future classes must be attended to achieve a desired target percentage (e.g., 85%).
- **Personal History & Reports:** Review full date-wise attendance logs and download individual PDF transcripts.

## 3. Strict Business Rules
1. **Unanswered != Absent:** An unmarked card is strictly unrecorded. Submission is blocked until every enrolled student has a definitive status.
2. **Drafts are Non-Authoritative:** Draft sessions do not affect attendance calculations until submitted.
3. **Multi-Tenant Scoping:** All operations are strictly scoped to the user's institution.
4. **Teacher Restrictions:** Teachers cannot see or manipulate attendance for unassigned classes or across departments.
5. **Student Privacy:** Students can query and view only their own records.
