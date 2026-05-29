import { getCanonicalCourseId, getCourseSlugByCourseId } from "@/lib/course-identity";

type EnrollmentRecordLike = {
  id: string;
  userId: string;
  courseId: string;
  canonicalCourseId?: string;
  enrolledAt: string;
};

type CourseSlugRecordLike = {
  id: string;
  courseSlug: string;
  enrolledAt: string;
};

function getEnrollmentTime(value: string) {
  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : Number.MAX_SAFE_INTEGER;
}

function getDuplicateIds(ids: string[]) {
  return ids.filter((id, index) => ids.indexOf(id) !== index);
}

export function buildEnrollmentDocId(userId: string, courseId: string, canonicalCourseId?: string) {
  const resolvedCanonicalCourseId = getCanonicalCourseId(canonicalCourseId || courseId);
  return `${userId}__${resolvedCanonicalCourseId}`;
}

export function normalizeEnrollmentRecord<T extends EnrollmentRecordLike>(record: T) {
  const canonicalCourseId = getCanonicalCourseId(record.canonicalCourseId || record.courseId);
  const courseId = getCourseSlugByCourseId(canonicalCourseId || record.courseId);

  return {
    ...record,
    courseId,
    canonicalCourseId,
  } satisfies T & { courseId: string; canonicalCourseId: string };
}

export function dedupeEnrollmentRecords<T extends EnrollmentRecordLike>(records: T[], context: string) {
  const normalizedRecords = records.map((record) => normalizeEnrollmentRecord(record));
  const oldestByUserCourse = new Map<string, (typeof normalizedRecords)[number]>();
  const duplicateCourseIds: string[] = [];
  const duplicateUserCourseKeys: string[] = [];
  const nonCanonicalEnrollmentIds: string[] = [];

  for (const record of normalizedRecords) {
    const userCourseKey = `${record.userId}::${record.canonicalCourseId}`;
    const expectedEnrollmentId = buildEnrollmentDocId(record.userId, record.courseId, record.canonicalCourseId);
    const existing = oldestByUserCourse.get(userCourseKey);

    if (record.id !== expectedEnrollmentId) {
      nonCanonicalEnrollmentIds.push(record.id);
    }

    if (!existing) {
      oldestByUserCourse.set(userCourseKey, record);
      continue;
    }

    duplicateCourseIds.push(record.courseId);
    duplicateUserCourseKeys.push(userCourseKey);

    if (getEnrollmentTime(record.enrolledAt) < getEnrollmentTime(existing.enrolledAt)) {
      oldestByUserCourse.set(userCourseKey, record);
    }
  }

  const duplicateEnrollmentIds = getDuplicateIds(normalizedRecords.map((record) => record.id));

  if (duplicateCourseIds.length > 0 || duplicateEnrollmentIds.length > 0 || nonCanonicalEnrollmentIds.length > 0) {
    console.warn(`[Enrollment Debug] ${context}`, {
      duplicateCourseIds: Array.from(new Set(duplicateCourseIds)),
      duplicateEnrollmentIds: Array.from(new Set(duplicateEnrollmentIds)),
      duplicateUserCourseKeys: Array.from(new Set(duplicateUserCourseKeys)),
      nonCanonicalEnrollmentIds: Array.from(new Set(nonCanonicalEnrollmentIds)),
      totalRecords: normalizedRecords.length,
      uniqueRecords: oldestByUserCourse.size,
    });
  }

  return Array.from(oldestByUserCourse.values()).sort(
    (left, right) => getEnrollmentTime(right.enrolledAt) - getEnrollmentTime(left.enrolledAt),
  );
}

export function dedupeCourseSlugRecords<T extends CourseSlugRecordLike>(records: T[], context: string) {
  const normalizedRecords = records.map((record) => ({
    ...record,
    courseSlug: getCourseSlugByCourseId(record.courseSlug),
  }));
  const oldestByCourseSlug = new Map<string, (typeof normalizedRecords)[number]>();
  const duplicateCourseIds: string[] = [];

  for (const record of normalizedRecords) {
    const existing = oldestByCourseSlug.get(record.courseSlug);

    if (!existing) {
      oldestByCourseSlug.set(record.courseSlug, record);
      continue;
    }

    duplicateCourseIds.push(record.courseSlug);

    if (getEnrollmentTime(record.enrolledAt) < getEnrollmentTime(existing.enrolledAt)) {
      oldestByCourseSlug.set(record.courseSlug, record);
    }
  }

  const duplicateEnrollmentIds = getDuplicateIds(normalizedRecords.map((record) => record.id));

  if (duplicateCourseIds.length > 0 || duplicateEnrollmentIds.length > 0) {
    console.warn(`[Enrollment Debug] ${context}`, {
      duplicateCourseIds: Array.from(new Set(duplicateCourseIds)),
      duplicateEnrollmentIds: Array.from(new Set(duplicateEnrollmentIds)),
      totalRecords: normalizedRecords.length,
      uniqueRecords: oldestByCourseSlug.size,
    });
  }

  return Array.from(oldestByCourseSlug.values()).sort(
    (left, right) => getEnrollmentTime(right.enrolledAt) - getEnrollmentTime(left.enrolledAt),
  );
}
