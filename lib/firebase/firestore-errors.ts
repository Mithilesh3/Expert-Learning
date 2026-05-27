const recoverableFirestorePatterns = [
  /client is offline/i,
  /database '\(default\)' not found/i,
  /network-request-failed/i,
];

const permissionFirestorePatterns = [
  /missing or insufficient permissions/i,
  /permission-denied/i,
  /requires authentication/i,
];

export function isFirestorePermissionError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error ? String(error.code) : "";
  const message = "message" in error && typeof error.message === "string" ? error.message : "";

  if (["permission-denied", "unauthenticated"].includes(code)) {
    return true;
  }

  return permissionFirestorePatterns.some((pattern) => pattern.test(message));
}

export function isRecoverableFirestoreError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error ? String(error.code) : "";
  const message = "message" in error && typeof error.message === "string" ? error.message : "";

  if (["unavailable", "failed-precondition", "network-request-failed"].includes(code)) {
    return true;
  }

  return recoverableFirestorePatterns.some((pattern) => pattern.test(message));
}

export function logFirestoreIssue(scope: string, error: unknown) {
  if (isRecoverableFirestoreError(error) || isFirestorePermissionError(error)) {
    console.warn(scope, error);
    return;
  }

  console.error(scope, error);
}
