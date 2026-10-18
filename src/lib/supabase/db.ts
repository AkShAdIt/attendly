import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Direct admin client that bypasses any auth barriers
export const supabaseDb = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function fetchLiveSubjects() {
  const { data, error } = await supabaseDb
    .from("subjects")
    .select("*")
    .order("code", { ascending: true });

  if (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
  return data || [];
}

export async function fetchLiveSessions() {
  const { data, error } = await supabaseDb
    .from("attendance_sessions")
    .select(`
      *,
      subject:subjects(code, name),
      section:sections(name)
    `)
    .order("session_date", { ascending: false });

  if (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
  return data || [];
}

export async function recordLiveSession(payload: {
  sectionId: string;
  subjectId: string;
  teacherId?: string;
  sessionDate: string;
  period: number;
  records: Array<{ studentId: string; status: "present" | "absent" }>;
  notes?: string;
}) {
  const presentCount = payload.records.filter((r) => r.status === "present").length;
  const absentCount = payload.records.filter((r) => r.status === "absent").length;

  const { data: session, error: sessionError } = await supabaseDb
    .from("attendance_sessions")
    .insert({
      institution_id: "a0000000-0000-0000-0000-000000000001",
      section_id: payload.sectionId,
      subject_id: payload.subjectId,
      teacher_id: payload.teacherId || "f0000000-0000-0000-0000-000000000001",
      session_date: payload.sessionDate,
      period: payload.period,
      status: "submitted",
      total_students: payload.records.length,
      total_present: presentCount,
      total_absent: absentCount,
      notes: payload.notes || "Recorded via Attendly Stack Deck",
    })
    .select()
    .single();

  if (sessionError) {
    console.error("Failed to insert attendance session:", sessionError);
    throw sessionError;
  }

  // Insert individual student records
  if (session && payload.records.length > 0) {
    const studentRecords = payload.records.map((r) => ({
      session_id: session.id,
      student_id: r.studentId,
      status: r.status,
    }));

    const { error: recordsError } = await supabaseDb
      .from("attendance_records")
      .insert(studentRecords);

    if (recordsError) {
      console.error("Error inserting attendance records:", recordsError);
    }
  }

  return session;
}
