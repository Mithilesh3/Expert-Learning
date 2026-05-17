import twilio from "twilio";
import { env, hasTwilioEnv } from "@/lib/env";

let twilioClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (!hasTwilioEnv) {
    return null;
  }

  if (!twilioClient) {
    twilioClient = twilio(env.twilioAccountSid, env.twilioAuthToken);
  }

  return twilioClient;
}

export async function sendWhatsAppNotification(payload: {
  phone: string;
  body: string;
}) {
  const client = getTwilioClient();

  if (!client) {
    return { skipped: true };
  }

  await client.messages.create({
    from: env.twilioWhatsappFrom,
    to: `whatsapp:${payload.phone.startsWith("+") ? payload.phone : `+${payload.phone}`}`,
    body: payload.body,
  });
}
