const courseSlugAliases: Record<string, string> = {
  "openai-llm-engineering": "agentic-ai-engineering",
  "ai-business": "ai-for-business-automation",
  "ai-for-business": "ai-for-business-automation",
  "aws-sysops-administrator": "aws-developer-associate",
  "azure-ai-engineer": "azure-fundamentals",
  "jenkins-github-actions": "ci-cd-pipeline-engineering",
  terraform: "ci-cd-pipeline-engineering",
};

const canonicalIdBySlug: Record<string, string> = {
  "azure-fundamentals": "az-900",
  "azure-administrator": "az-104",
  "azure-developer-az-204": "az-204",
  "azure-solutions-architect": "az-305",
  "aws-cloud-practitioner": "clf-c02",
  "aws-solutions-architect": "saa-c03",
  "aws-developer-associate": "dva-c02",
  "aws-devops-engineer": "soa-c02",
};

const slugByCanonicalId: Record<string, string> = Object.fromEntries(
  Object.entries(canonicalIdBySlug).map(([slug, canonical]) => [canonical, slug]),
);

export function resolveCourseSlugAlias(input: string) {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) {
    return "";
  }

  return courseSlugAliases[trimmed] || trimmed;
}

export function getCanonicalCourseIdBySlug(slug: string) {
  const resolvedSlug = resolveCourseSlugAlias(slug);
  return canonicalIdBySlug[resolvedSlug] || resolvedSlug;
}

export function getCanonicalCourseId(input: string) {
  const resolvedInput = resolveCourseSlugAlias(input);

  if (!resolvedInput) {
    return "";
  }

  if (canonicalIdBySlug[resolvedInput]) {
    return canonicalIdBySlug[resolvedInput];
  }

  if (slugByCanonicalId[resolvedInput]) {
    return resolvedInput;
  }

  return resolvedInput;
}

export function getCourseSlugByCourseId(input: string) {
  const canonicalCourseId = getCanonicalCourseId(input);

  if (!canonicalCourseId) {
    return "";
  }

  return slugByCanonicalId[canonicalCourseId] || resolveCourseSlugAlias(input) || canonicalCourseId;
}

export function listAliasedCourseSlugs() {
  return Object.keys(courseSlugAliases);
}
