# Attendly — Security & Access Control Model

## 1. Authentication & Session Strategy
- **Identity Provider:** Supabase Auth using Email and Password.
- **Session Transmission:** HTTP-only, SameSite=Lax, Secure cookies managed via Next.js middleware and `@supabase/ssr`.
- **Credential Storage:** Hashed with bcrypt by Supabase Auth; secrets are never handled in application state.

## 2. Row Level Security (RLS) Policies

All tables have RLS enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).

1. **Institutions:**
   - Users can only read the institution record matching `auth.jwt() -> app_metadata / profiles.institution_id`.
2. **Profiles:**
   - Any authenticated user can read public profile names of peers in their institution.
   - Only admins can write or modify profiles.
   - Users can update their own avatar/display name if permitted.
3. **Sections & Subjects:**
   - Readable by all users within the same `institution_id`.
   - Modifiable only by users with role `'admin'`.
4. **Attendance Sessions & Records:**
   - **Teachers:** Insert/update sessions only where `teacher_id = auth.uid()` and matches active `teacher_assignments`.
   - **Students:** SELECT only where `student_id = auth.uid()` AND `session.status = 'submitted'`.
   - **Admins:** Full read-only or authorized administrative access within their `institution_id`.

## 3. Defense-in-Depth Measures
- **Role Verification in Server Actions:** Before any database mutation, verify user role in JWT/session context on the server side. Never trust client payload role claims.
- **CSV Formula Injection Sanitization:** Prefix formula trigger characters (`=`, `+`, `-`, `@`, `\t`, `\r`) with a single quote `'` in CSV export streams.
- **No Client Service Keys:** The Supabase Service Role Key is strictly restricted to server-side administrator seed/bootstrap CLI scripts and never bundled into client JS.
