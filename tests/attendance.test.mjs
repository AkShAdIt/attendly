import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Direct testing of business logic rules
describe("Attendance Calculations & Boundary Cases", () => {
  function calculateAttendancePercentage(presentCount, totalHeld) {
    if (totalHeld <= 0) return null;
    return (presentCount / totalHeld) * 100;
  }

  function calculateConsecutiveClassesNeeded(presentCount, totalHeld, targetPercentage = 85) {
    const current = calculateAttendancePercentage(presentCount, totalHeld);
    if (totalHeld === 0 || current === null) {
      return {
        currentPercentage: null,
        targetPercentage,
        classesNeeded: 0,
        isAlreadyAchieved: true,
        canAchieve: true,
      };
    }

    if (current >= targetPercentage) {
      return {
        currentPercentage: Number(current.toFixed(1)),
        targetPercentage,
        classesNeeded: 0,
        isAlreadyAchieved: true,
        canAchieve: true,
      };
    }

    const R = targetPercentage / 100;
    if (R >= 1.0) {
      return {
        currentPercentage: Number(current.toFixed(1)),
        targetPercentage,
        classesNeeded: 0,
        isAlreadyAchieved: false,
        canAchieve: false,
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
    };
  }

  test("Zero classes held returns null to prevent false 0%", () => {
    const result = calculateAttendancePercentage(0, 0);
    assert.equal(result, null);
  });

  test("Calculates standard attendance accurately", () => {
    const result = calculateAttendancePercentage(18, 20);
    assert.equal(result, 90.0);
  });

  test("100% attendance calculation", () => {
    const result = calculateAttendancePercentage(15, 15);
    assert.equal(result, 100.0);
  });

  test("Consecutive classes needed matches specification example (32/40 at 85% requires 14)", () => {
    const projection = calculateConsecutiveClassesNeeded(32, 40, 85);
    assert.equal(projection.currentPercentage, 80.0);
    assert.equal(projection.targetPercentage, 85);
    assert.equal(projection.classesNeeded, 14);
    assert.equal(projection.isAlreadyAchieved, false);
    assert.equal(projection.canAchieve, true);

    // Verify mathematical correctness after 14 classes: (32 + 14) / (40 + 14) = 46 / 54 = 85.185% >= 85%
    const newPercentage = ((32 + 14) / (40 + 14)) * 100;
    assert.ok(newPercentage >= 85);
  });

  test("Returns 0 classes needed when student is already at or above target", () => {
    const projection = calculateConsecutiveClassesNeeded(19, 20, 85); // 95%
    assert.equal(projection.classesNeeded, 0);
    assert.equal(projection.isAlreadyAchieved, true);
  });

  test("Marks 100% target as unachievable once an absence occurs", () => {
    const projection = calculateConsecutiveClassesNeeded(9, 10, 100);
    assert.equal(projection.canAchieve, false);
  });
});

describe("Security & CSV Injection Sanitization", () => {
  function sanitizeCsvValue(val) {
    if (val === null || val === undefined) return "";
    const str = String(val);
    if (/^[=+\-@\t\r]/.test(str)) {
      return `'${str}`;
    }
    return str;
  }

  test("Sanitizes formula injection triggers (=, +, -, @)", () => {
    assert.equal(sanitizeCsvValue("=cmd|'/C calc'!A0"), "'=cmd|'/C calc'!A0");
    assert.equal(sanitizeCsvValue("+12345"), "'+12345");
    assert.equal(sanitizeCsvValue("-SUM(A1:A5)"), "'-SUM(A1:A5)");
    assert.equal(sanitizeCsvValue("@malicious_field"), "'@malicious_field");
  });

  test("Leaves safe alphanumeric values untouched", () => {
    assert.equal(sanitizeCsvValue("Aarav Sharma"), "Aarav Sharma");
    assert.equal(sanitizeCsvValue("ENG22CS001"), "ENG22CS001");
    assert.equal(sanitizeCsvValue(85.5), "85.5");
  });
});
