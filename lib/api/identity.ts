import { isRecord, responseData } from "./client.ts";

export type SessionUser = {
  public_id: string;
  display_name: string;
  status: string;
  tenant_public_id: string;
  primary_email: { email: string; is_verified: boolean };
  roles: string[];
  permissions: string[];
};

export function sessionUser(payload: unknown): SessionUser | null {
  const data = responseData(payload);
  if (!isRecord(data) || typeof data.public_id !== "string" || !data.public_id ||
      typeof data.display_name !== "string" || typeof data.status !== "string" ||
      typeof data.tenant_public_id !== "string" || !isRecord(data.primary_email) ||
      typeof data.primary_email.email !== "string" || typeof data.primary_email.is_verified !== "boolean") return null;
  const roles = data.roles ?? [];
  const permissions = data.permissions ?? [];
  if (!Array.isArray(roles) || !roles.every((item): item is string => typeof item === "string") ||
      !Array.isArray(permissions) || !permissions.every((item): item is string => typeof item === "string")) return null;
  return { public_id: data.public_id, display_name: data.display_name, status: data.status,
    tenant_public_id: data.tenant_public_id,
    primary_email: { email: data.primary_email.email, is_verified: data.primary_email.is_verified }, roles, permissions };
}

export function mfaChallenge(payload: unknown): string | null {
  const data = responseData(payload);
  return isRecord(data) && data.mfa_required === true && typeof data.challenge_token === "string" && data.challenge_token
    ? data.challenge_token : null;
}
