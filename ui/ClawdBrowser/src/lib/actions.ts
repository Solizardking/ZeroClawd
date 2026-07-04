"use server";

import { client, clientV2 } from "./api";

export async function createSession(opts: {
  model: string;
  profileId?: string;
  workspaceId?: string;
  proxyCountryCode?: string;
  enableRecording?: boolean;
}) {
  const session = await client.sessions.create({
    model: opts.model as "bu-mini" | "bu-max",
    keepAlive: true,
    ...(opts.profileId && { profileId: opts.profileId }),
    ...(opts.workspaceId && { workspaceId: opts.workspaceId }),
    ...(opts.proxyCountryCode && { proxyCountryCode: opts.proxyCountryCode as any }),
    ...(opts.enableRecording && { enableRecording: true }),
  });
  // Return only serializable fields the client needs
  return { id: session.id, liveUrl: session.liveUrl, status: session.status };
}

export async function stopTask(id: string) {
  await client.sessions.stop(id, { strategy: "task" });
}

export async function waitForRecording(_id: string): Promise<string[]> {
  // Browser-Use v3 dropped waitForRecording from the Sessions class. Recording
  // URLs now arrive on the SessionResult returned by `client.run()` — the
  // session-context already captures that via __done. Until the SDK ships a
  // dedicated lookup helper, return [] so the UI gracefully hides the link.
  return [];
}

// Profiles (v2 — not yet on v3 SDK client)
export async function listProfiles() {
  const res = await clientV2.profiles.list({ pageSize: 100 });
  return res.items ?? [];
}

export async function listWorkspaces() {
  const res = await client.workspaces.list({ pageSize: 100 });
  return res.items ?? [];
}
