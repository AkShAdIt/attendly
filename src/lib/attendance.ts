/**
 * Attendance calculation engine and projection utilities.
 */

export interface SubjectAttendanceSummary {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  credits?: number;
  totalHeld: number;
  presentCount: number;
  absentCount: number;
  percentage: number | null; // null if totalHeld === 0
}

/**
 * Calculates attendance percentage safely.
 * Returns null if totalHeld is 0 to signify "No attendance recorded".
 */
export function calculateAttendancePercentage(
  presentCount: number,
  totalHeld: number
): number | null {
  if (totalHeld <= 0) return null;
  return (presentCount / totalHeld) * 100;
}

export interface TargetProjectionResult {
  currentPercentage: number | null;
  targetPercentage: number;
  classesNeeded: number;
  isAlreadyAchieved: boolean;
  canAchieve: boolean;
  message: string;
}

/**
 * Calculates how many consecutive upcoming classes a student must attend
 * to reach their desired target attendance percentage.
 *
 * Formula:
 * Let P = present, T = total held, R = target percentage / 100, x = consecutive classes needed.
 * (P + x) / (T + x) >= R
 * P + x >= R * T + R * x
 * x * (1 - R) >= R * T - P
 * x = ceil((R * T - P) / (1 - R))
 */
export function calculateConsecutiveClassesNeeded(
  presentCount: number,
  totalHeld: number,
  targetPercentage: number = 85
): TargetProjectionResult {
  const current = calculateAttendancePercentage(presentCount, totalHeld);

  // If no classes have been held yet
  if (totalHeld === 0 || current === null) {
    return {
      currentPercentage: null,
      targetPercentage,
      classesNeeded: 0,
      isAlreadyAchieved: true,
      canAchieve: true,
      message: "No sessions recorded yet.",
    };
  }

  // If already at or above target
  if (current >= targetPercentage) {
    return {
      currentPercentage: Number(current.toFixed(1)),
      targetPercentage,
      classesNeeded: 0,
      isAlreadyAchieved: true,
      canAchieve: true,
      message: `You're currently on track at ${current.toFixed(1)}%! Keep it up.`,
    };
  }

  // Target cannot be 100% or greater if a class has already been missed
  const R = targetPercentage / 100;
  if (R >= 1.0) {
    return {
      currentPercentage: Number(current.toFixed(1)),
      targetPercentage,
      classesNeeded: 0,
      isAlreadyAchieved: false,
      canAchieve: false,
      message: "Target of 100% is impossible once a class is missed.",
    };
  }

  const numerator = R * totalHeld - presentCount;
  const denominator = 1 - R;
  const classesNeeded = Math.ceil(numerator / denominator);

  return {
    currentPercentage: Number(current.toFixed(1)),
    targetPercentage,
    classesNeeded: Math.max(0, classesNeeded),
    isAlreadyAchieved: false,
    canAchieve: true,
    message: `Attend the next ${classesNeeded} consecutive ${classesNeeded === 1 ? "class" : "classes"} to reach ${targetPercentage}%.`,
  };
}
