import { PostHog } from "posthog-node";
import { env, hasPosthogEnv } from "@/lib/env";

let posthogClient: PostHog | null = null;

function getPosthogClient() {
  if (!hasPosthogEnv) {
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(env.posthogKey, {
      host: env.posthogHost,
    });
  }

  return posthogClient;
}

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
) {
  const client = getPosthogClient();

  if (!client) {
    return;
  }

  client.capture({
    distinctId,
    event,
    properties,
  });

  await client.flush();
}
