# MASTER AGENTIC BUILD PROMPT: ATTENDLY

## 1. YOUR ROLE

Act as my autonomous senior full-stack engineer, UI/UX designer, database architect, QA engineer, security reviewer, and deployment engineer.

Your task is to build a complete, production-minded, mobile-first college attendance management website called **Attendly**.

You must work directly inside the project workspace, create and edit real files, install required dependencies, run the application, test it, identify errors, fix them, and continue through the implementation phases.

Do not merely provide tutorials, code snippets, mockups, or instructions. Implement the actual application.

Work in small, verifiable phases. Maintain a working application throughout development.

Do not stop after generating a plan. Start with repository inspection, establish the implementation plan, and execute Phase 0.

## 2. PRODUCT VISION

Attendly is a lightweight college attendance platform designed around one core idea:

**Make classroom attendance as fast and intuitive as swiping through cards, while giving teachers, students, and administrators reliable attendance records and useful reports.**

Traditional attendance workflows are cumbersome. Teachers manually mark students in spreadsheets, students cannot easily track attendance across subjects, and administrators struggle to analyze attendance data.

Attendly replaces this workflow with a polished mobile experience, a reliable attendance database, and straightforward reporting.

The swipe interaction is a signature feature, not the entire product.

The application must support three roles:

1. College administrator
2. Teacher
3. Student

Build a complete, functional end-to-end application with persistent database storage, authentication, authorization, responsive interfaces, reports, and deployment documentation.

## 3. HARD CONSTRAINTS

This must remain a simple, low-maintenance full-stack application.

- Use one repository and one main web application.
- Do not create a separate microservice architecture.
- Do not introduce Kubernetes or a complex infrastructure setup.
- Do not require Google OAuth, Google Auth, or third-party identity providers.
- Do not require email verification or email delivery.
- Do not require payments, subscriptions, or billing.
- Do not require SMS, WhatsApp, or external messaging APIs.
- Do not require AI APIs or paid AI services.
- Do not add background workers, scheduled jobs, or cron jobs.
- Do not make core functionality dependent on external APIs.
- Do not build facial recognition, biometrics, or location tracking.
- Do not use localStorage as the authoritative attendance database.
- Do not use mock data as the permanent implementation of any core feature.
- Do not expose service-role keys, database credentials, or privileged server secrets in client code.
- Do not disable security controls to make development easier.

Prefer free-tier-compatible managed infrastructure.

When a third-party service is unnecessary, implement the feature internally.

## 4. REQUIRED TECHNOLOGY STACK

Use the following unless repository constraints make a change necessary:

- Framework: Next.js with App Router
- Language: TypeScript with strict mode
- Styling: Tailwind CSS
- Components: shadcn/ui where useful
- Icons: Lucide
- Database: Supabase PostgreSQL
- Authentication: Supabase Auth with email/password, without requiring email verification
- Authorization: Server-side role and institution checks, reinforced by Supabase Row Level Security
- Data access: Supabase JavaScript client and server-side session handling
- Charts: Recharts
- Forms: React Hook Form and Zod
- Spreadsheet import: CSV first, with XLSX support if practical
- Reports: PDF generation and CSV export
- Deployment: Vercel with Supabase
- Version control: Git

Use maintained, compatible package versions. Do not blindly install outdated dependencies.

Do not introduce Prisma, a separate Node.js API server, or an additional backend framework unless a concrete technical requirement justifies it.

Use server components by default. Add client components only where interactivity requires them.

## 5. DESIGN DIRECTION

The application must feel like a modern, premium productivity product, not a generic college ERP.

Design references in spirit: Linear, Vercel, Raycast, and modern mobile productivity applications.

Visual requirements:

- Mobile-first layouts.
- Clean typography and consistent spacing.
- Restrained colors and strong contrast.
- Rounded cards and subtle borders.
- Smooth, purposeful transitions.
- Excellent loading, empty, success, and error states.
- Responsive desktop dashboards.
- Accessible controls and keyboard navigation.
- Clear status indicators.
- Consistent design tokens and reusable components.
- Light theme by default; dark theme only if it can be implemented without compromising the core product.

Use a coherent visual identity. Choose a restrained primary color and use green for present, red for absent, and amber for incomplete or late states.

Do not imitate Tinder's branding, logo, or exact visual identity. Borrow the intuitive card-and-swipe interaction only.

Avoid excessive gradients, unnecessary glassmorphism, oversized headings, decorative elements that obscure information, and generic AI-generated dashboard aesthetics.

The teacher's attendance workflow must work comfortably with one hand on a phone.

## 6. USER ROLES AND PERMISSIONS

### Administrator

An administrator can:

- Manage the college's student records.
- Import students from CSV or XLSX.
- Create and manage teachers.
- Create academic departments, branches, semesters, sections, and subjects.
- Enroll students in the appropriate sections and subjects.
- Assign teachers to subjects and sections.
- View attendance summaries across authorized college data.
- Export reports.
- Manage student and teacher account access.

### Teacher

A teacher can:

- View assigned classes and subjects.
- Start an attendance session for an assigned class.
- Mark students present or absent using swipe cards.
- Switch to a quick roster interface.
- Undo the latest action.
- Review the attendance list before submission.
- Submit an attendance session.
- Correct attendance records according to explicit permissions.
- View subject-wise attendance summaries.
- Download reports for authorized classes.

Teachers must never be able to access or modify unrelated institutions' data or unassigned classes.

### Student

A student can:

- View only their own attendance.
- View attendance percentages by subject.
- See present, absent, and held-class counts.
- View a date-wise attendance history.
- See low-attendance warnings.
- Calculate how many consecutive classes they must attend to reach a target percentage.
- Download their own attendance report.

Students cannot mark their own attendance, edit attendance records, or access other students' private attendance histories.

## 7. PHASED EXECUTION PLAN

Execute the following phases in order.

For every phase:

1. Inspect the existing project and its current state.
2. Define the concrete tasks for the phase.
3. Implement the features in actual files.
4. Run relevant type checks, linting, builds, and tests.
5. Fix errors before declaring the phase complete.
6. Update project documentation and the implementation checklist.
7. Summarize what was completed and what remains.
8. Continue to the next phase automatically unless a genuine blocker requires my input.

Do not ask me to approve every small implementation decision. Choose sensible defaults and document important assumptions.

Do not skip tests to save time.

### PHASE 0 — REPOSITORY INSPECTION AND PROJECT FOUNDATION

Inspect the repository before making changes.

Determine:

- Whether the repository is empty or contains an existing application.
- Existing framework, dependencies, routes, components, and configuration.
- Available environment variables and integrations without exposing secret values.
- Existing tests and build scripts.

Create a project structure suitable for a maintainable Next.js application.

Set up:

- Next.js App Router.
- TypeScript strict mode.
- Tailwind CSS.
- ESLint.
- Shared design tokens.
- Reusable layout components.
- Environment variable validation.
- A clear error-handling strategy.
- A README and implementation checklist.

Create documentation files:

- docs/PRODUCT_SPEC.md
- docs/ARCHITECTURE.md
- docs/DATABASE.md
- docs/SECURITY.md
- docs/DEPLOYMENT.md
- docs/PROGRESS.md

Do not overwrite unrelated existing project work.

Deliverable: a clean, runnable application foundation.

### PHASE 1 — VISUAL FOUNDATION AND NAVIGATION

Build the shared application shell before implementing complex backend features.

Create:

- Public landing page.
- Login page.
- Registration or account-activation page.
- Responsive navigation.
- Dashboard layout.
- Reusable buttons, cards, badges, tables, dialogs, inputs, dropdowns, and toast notifications.
- Loading skeletons.
- Empty states.
- Error states.
- Mobile navigation.

Build a high-quality landing page explaining the value proposition:

"Attendance, without the spreadsheet shuffle."

Show the swipe workflow, student attendance analytics, and reporting capabilities.

Create dashboard previews using clearly identified illustrative data only on the public marketing page.

Internal application screens must distinguish loading, unavailable data, and real database records. Never present fabricated records as real attendance.

Deliverable: a visually polished interface with working navigation and responsive layouts.

### PHASE 2 — DATABASE DESIGN AND AUTHENTICATION

Design and implement a normalized PostgreSQL schema using Supabase migrations.

Include the following entities, adjusting names and relationships where necessary:

- institutions
- profiles
- academic_departments
- academic_terms
- sections
- subjects
- teacher_assignments
- student_enrollments
- attendance_sessions
- attendance_records

Recommended relationships:

- Each institution owns its academic data.
- Each profile belongs to an institution and has an authorized role.
- Students have a student identifier, such as an SRN.
- Sections belong to an academic term and department.
- Subjects are associated with sections or enrollments as appropriate.
- Teachers are explicitly assigned to the sections and subjects they teach.
- Attendance sessions belong to a specific class, subject, date, and teacher.
- Each attendance record references one student and one attendance session.

Use UUID primary keys, foreign keys, unique constraints, indexes, appropriate timestamps, and deletion rules.

Prevent duplicate student identifiers within the intended institutional scope.

Prevent duplicate attendance records for the same student in the same session.

Use transactions or appropriate database constraints when submitting attendance.

Store session status, such as draft, submitted, or cancelled. Only submitted sessions count toward attendance calculations.

Authentication requirements:

- Email/password login.
- Secure password handling through Supabase Auth.
- Server-side session validation.
- Protected application routes.
- Role-aware dashboards.
- Secure logout.
- Clear unauthorized and expired-session states.

Use institution-scoped Row Level Security policies.

A user's role must not be trusted merely because a client submits a role field. Prevent ordinary users from promoting themselves to administrator.

Do not permit unrestricted public administrator registration. Provide a documented, secure bootstrap process for the initial administrator using server-side configuration or a controlled administrative setup procedure.

Avoid publicly exposed service-role credentials.

Deliverable: persistent database, migrations, authentication, and verified role isolation.

### PHASE 3 — ADMINISTRATOR PORTAL AND BULK IMPORT

Implement the complete administrator workflow.

Build screens for:

- Overview dashboard.
- Student directory.
- Teacher directory.
- Department and branch management.
- Academic term and semester management.
- Section management.
- Subject management.
- Teacher assignment.
- Student enrollment.

Build a CSV import workflow:

1. Upload a file.
2. Parse and preview the rows.
3. Map column headers to required fields.
4. Validate required values.
5. Detect duplicates and malformed records.
6. Display row-level validation errors.
7. Allow the administrator to correct or remove invalid rows.
8. Confirm the import.
9. Save valid records safely.
10. Display an import summary.

Support fields such as student name, SRN, branch, semester, section, and optional email.

Add XLSX import if reliable and reasonably simple. CSV import must work even if XLSX support is deferred.

Do not automatically guess ambiguous student-to-section assignments without showing the result to the administrator.

Do not silently discard failed rows.

Ensure that re-importing a file cannot accidentally create duplicate students.

Use bounded batches, clear transaction behavior, and useful error messages.

Deliverable: an administrator can populate the application with realistic college roster data without manually creating each student.

### PHASE 4 — TEACHER DASHBOARD AND SWIPE ATTENDANCE

This is the signature feature and deserves the most UI/UX attention.

Build a mobile-first teacher dashboard showing:

- Today's assigned classes.
- Subject and section details.
- Previously submitted sessions.
- Attendance completion status.
- A prominent "Take Attendance" action.

The attendance workflow:

Step 1: The teacher selects an assigned class, subject, and session date.

Step 2: The application retrieves the enrolled students from PostgreSQL.

Step 3: The teacher opens the attendance interface.

Step 4: Display one student card at a time.

Each card should include:

- Student name.
- SRN or student identifier.
- Roll number if available.
- Optional profile photograph or initials avatar.
- Student index, such as 12 of 60.
- Current action status.
- Clear gesture instructions.

Step 5: Enable touch-based swiping.

- Swipe right: Present.
- Swipe left: Absent.
- Green visual feedback for present.
- Red visual feedback for absent.
- Smooth, restrained transitions.
- Automatic advance to the next student after a decision.

Support mouse input and keyboard controls for desktop accessibility.

Do not trigger accidental attendance changes from minor taps or scroll gestures.

Implement:

- Undo last action.
- Previous and next student navigation.
- Current-session progress.
- A review screen before submission.
- An option to change individual decisions.
- A quick roster alternative.
- Protection against duplicate sessions for the same intended class and period.
- Clear behavior for incomplete sessions.

Add a "Mark everyone present, then flag absentees" option only if it includes an explicit review and confirmation step.

CRITICAL DATA RULE:

Do not save a student as absent merely because the student has not yet been swiped.

An unanswered student is unmarked, not absent.

Keep draft attendance separate from submitted attendance.

Persist drafts safely if practical, but do not let unsaved client state be mistaken for a finalized record.

When the teacher submits attendance:

1. Validate that all enrolled students have an explicit attendance status.
2. Show a final summary of present and absent students.
3. Require confirmation.
4. Persist the complete session and records transactionally.
5. Mark the session as submitted.
6. Display a success screen.
7. Update teacher and student dashboards from persisted records.

If submission fails, preserve the draft and show a retry option without creating duplicate sessions or records.

Teachers may correct submitted records only through an explicitly authorized workflow. Preserve an audit trail of important changes, including the actor, timestamp, and reason where appropriate.

Deliverable: a fully working swipe attendance experience backed by the real database.

### PHASE 5 — STUDENT PORTAL AND ATTENDANCE CALCULATIONS

Build a student dashboard with:

- Overall attendance percentage.
- Subject-wise attendance cards.
- Present, absent, and total held-class counts.
- Attendance trends.
- Date-wise attendance history.
- Low-attendance warnings.
- Downloadable personal reports.

For each subject:

Attendance percentage = present sessions / eligible submitted sessions × 100.

Count only submitted sessions applicable to that student's enrollment.

Do not count drafts or cancelled sessions.

Treat a subject with zero eligible sessions as "No attendance recorded" rather than displaying a misleading percentage.

Allow a configurable target attendance percentage, with an initial default of 85%. Make it clear that the actual institutional requirement may differ.

Calculate the number of consecutive future classes needed to reach the target.

If the student cannot reach the target under the relevant assumptions, explain why.

Example:

Present: 32
Held sessions: 40
Current attendance: 80%
Target: 85%
Consecutive classes required: 14

Implement the calculation correctly and cover boundary cases with tests.

Students must never receive access to another student's records through manipulated URLs or client-side requests.

Deliverable: a real student dashboard with correct, tested attendance calculations.

### PHASE 6 — ANALYTICS AND REPORT EXPORTS

Build useful, lightweight analytics for teachers and administrators.

Include:

- Attendance by subject.
- Attendance by section.
- Attendance by date.
- Students below the configured attendance threshold.
- Present and absent counts.
- Attendance-session history.
- Filters by academic term, branch, section, subject, and date range where applicable.

Provide:

- CSV export.
- PDF export.
- Printable reports.

Student exports must contain only that student's authorized data.

Teacher exports must be limited to assigned classes and permitted data.

Administrator exports must be restricted to their institution.

Generate reports using real database records.

Handle empty results, large datasets, and export errors.

Use server-side authorization before generating or returning files.

Avoid exposing student information in public URLs, logs, or unnecessary browser storage.

Deliverable: functional analytics and downloadable reports that replace manual spreadsheet analysis.

### PHASE 7 — SECURITY, RELIABILITY, AND EDGE CASES

Perform a systematic review.

Check:

- Authentication bypasses.
- Role escalation.
- Cross-institution data access.
- Missing Row Level Security policies.
- Unauthorized API requests.
- Attendance manipulation by students.
- Duplicate sessions and records.
- CSV injection risks in exported spreadsheets.
- Unsafe import parsing.
- Server-side validation.
- Secrets exposed to the browser.
- Incorrect date and timezone handling.
- Race conditions during attendance submission.
- Failed imports and partial writes.
- Incorrect attendance percentages.
- Broken navigation and responsive layouts.

Implement an appropriate audit trail for attendance corrections.

Use server-side authorization even when the interface hides unauthorized actions.

Do not store unnecessary personal information.

Treat student photos as optional and restrict access appropriately.

Add rate limiting or other abuse protection only where practical and supported by the chosen architecture; do not introduce a complex external dependency solely for this purpose.

Deliverable: a documented security review and fixes for identified issues.

### PHASE 8 — TESTING AND END-TO-END VALIDATION

Write and execute tests for the core workflows.

At minimum, test:

1. Administrator login and access.
2. Teacher login and access.
3. Student login and access.
4. Unauthorized role access.
5. Bulk import validation.
6. Duplicate student prevention.
7. Teacher assignment restrictions.
8. Starting a new attendance session.
9. Present and absent swipe decisions.
10. Undoing an attendance decision.
11. Preventing incomplete submission.
12. Successful attendance submission.
13. Preventing duplicate attendance records.
14. Student attendance calculations.
15. Consecutive-class target calculations.
16. CSV and PDF export.
17. Access to another student's records being denied.
18. Access across institutions being denied.

Use unit tests for calculations and business rules, integration tests for database operations where feasible, and browser-based end-to-end tests for critical user journeys.

Use a dedicated test environment. Never run destructive tests against production data.

Run linting, TypeScript checks, tests, and a production build.

Fix all critical and high-severity issues before declaring completion.

If Supabase credentials are unavailable, continue implementing the application and local checks. Clearly identify which database-backed tests remain unverified. Never claim a test passed unless it actually ran.

Deliverable: documented test results and a reproducible validation process.

### PHASE 9 — DEPLOYMENT AND FINAL HANDOFF

Prepare the application for deployment.

Provide:

- A complete README.
- Environment variable documentation.
- Database migration instructions.
- Initial administrator setup instructions.
- Local development instructions.
- Vercel deployment instructions.
- Supabase configuration instructions.
- Production security checklist.
- Troubleshooting guide.
- A concise demo script.

Document the required environment variables without including real secrets in the repository.

Ensure that the project builds successfully and that production configuration is validated.

Deploy only if the necessary credentials and permissions are available. Do not pretend to have deployed the application if you cannot access the relevant services.

Create demo seed data for a clearly identified test institution when it is safe and practical. Never expose demo credentials or seed data as production administrator access.

Verify the deployed website, authentication, database access, and attendance submission when deployment access is available.

Deliverable: a deployable, documented application that another developer can run from scratch.

## 8. DATABASE AND BUSINESS RULES

These rules must remain consistent throughout development:

1. A student belongs to a specific institution.
2. A teacher can access only authorized institutional data and assigned classes.
3. Students can read only their own attendance.
4. Attendance belongs to a specific submitted session.
5. Each eligible student has exactly one attendance status per session.
6. A missing decision is not an absence.
7. Draft sessions do not affect attendance calculations.
8. Cancelled sessions do not affect attendance calculations.
9. Correcting attendance must preserve an audit trail.
10. All attendance percentages are calculated from persisted records.
11. Repeated submissions must not duplicate attendance.
12. Imported identifiers must be validated and unique within their defined scope.
13. Academic date and timezone handling must be explicit and consistent.
14. Administrative operations must never silently cross institution boundaries.
15. Server-side permissions and database policies must enforce the same security model.

## 9. DEFINITION OF DONE

The project is complete only when:

- The application runs locally.
- The database schema and migrations are documented.
- Authentication works.
- All three roles have functional dashboards.
- Administrators can import students.
- Teachers can complete attendance using swipe gestures.
- Incomplete sessions cannot silently mark students absent.
- Submitted attendance persists correctly.
- Students see accurate subject-wise attendance.
- Attendance calculations pass automated tests.
- Reports can be downloaded.
- Security policies are implemented and reviewed.
- The application builds for production.
- Critical workflows have automated test coverage.
- Deployment instructions are complete.
- Known limitations are documented honestly.

Do not call a static UI, mock database, or hardcoded dashboard a completed full-stack application.

## 10. AGENT OPERATING RULES

Operate autonomously but safely.

- Inspect before editing.
- Plan before large changes.
- Implement incrementally.
- Reuse existing working code where possible.
- Prefer the simplest maintainable solution.
- Keep the application runnable after every major phase.
- Use migrations for database changes.
- Never overwrite real data without explicit authorization.
- Never invent credentials or claim access you do not have.
- Never silently remove existing features.
- Never commit secrets.
- Never claim success without verification.
- If blocked by missing credentials, implement everything that can be implemented safely and document the exact remaining step.
- If a requirement is ambiguous, select a sensible default and document it unless the decision affects security, data loss, external spending, or an irreversible operation.
- Keep docs/PROGRESS.md updated with completed work, tests, current blockers, and the next phase.
- After finishing a phase, continue to the next phase automatically.
- Do not repeatedly ask me whether to continue.
- If context or execution limits interrupt work, leave a precise checkpoint so the next run can resume without redoing completed work.

At the beginning, inspect the repository and report a concise implementation plan.

Then immediately begin Phase 0 and continue through the phases until the application is complete or a genuine external blocker prevents further progress.

Your priority is a working, secure, polished, deployable application—not merely code that looks impressive in a screenshot.### PROJECT CLOSURE AND ZERO-FEATURE-CREEP POLICY

This project is a finite, end-to-end engineering deliverable, not an indefinitely evolving SaaS business.

The objective is to build a complete, secure, deployable attendance application that can be handed off and operated with minimal routine intervention.

Follow these rules:

1. Implement only features explicitly listed in the product specification.
2. Do not propose, add, or implement new features merely because they might improve the product.
3. Do not introduce external integrations, background workers, scheduled jobs, AI APIs, notification systems, billing, or additional services.
4. Prefer deterministic, on-demand operations over autonomous background processes.
5. Prefer managed infrastructure and conventional application architecture over custom infrastructure.
6. Keep dependencies, configuration, deployment steps, and operational responsibilities to a minimum.
7. Complete security, testing, documentation, error handling, and deployment before declaring the project finished.
8. Include a reproducible setup guide, database migrations, initial administrator provisioning instructions, environment-variable documentation, and a demonstration workflow.
9. Identify any remaining manual responsibilities, including backups, security updates, service limits, and account recovery. Never claim that a deployed database application requires absolutely zero maintenance.
10. Maintain a fixed scope. Do not create a future roadmap or recommend additional features in the final handoff.
11. Once all acceptance criteria pass, stop implementation and produce the final handoff report.
12. After project closure, make changes only to fix verified defects, security vulnerabilities, or broken deployment compatibility. Do not expand functionality without an explicit new instruction.

The definition of success is a finished and verifiable application, not the number of features or lines of code produced.