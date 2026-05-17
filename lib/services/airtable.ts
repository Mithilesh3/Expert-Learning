import { env, hasAirtableEnv } from "@/lib/env";

export async function pushLeadToAirtable(payload: {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}) {
  if (!hasAirtableEnv) {
    return { skipped: true };
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${env.airtableBaseId}/${encodeURIComponent(env.airtableTableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: payload.name,
          Email: payload.email,
          Phone: payload.phone,
          Course: payload.course,
          Message: payload.message,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Unable to sync lead to Airtable.");
  }

  return response.json();
}
