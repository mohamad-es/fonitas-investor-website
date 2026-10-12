import { api, isRecord, responseData } from "./client.ts";

export const organizationTypes = ["INDIVIDUAL", "COMPANY", "ORGANIZATION"] as const;
export type OrganizationType = typeof organizationTypes[number];
export type OrganizationFields = {
  legal_name: string; display_name: string; country_code: string;
  registration_number: string | null; tax_number: string | null;
};
export type Organization = OrganizationFields & {
  public_id: string; type: OrganizationType; status: "ACTIVE" | "SUSPENDED";
};
export type DeveloperProfile = {
  public_id: string; organization_id: string; display_name: string;
  country_code: string; contact_email: string; bio: string | null; website: string | null;
};
export type ProfileFields = Omit<DeveloperProfile, "public_id" | "organization_id">;
export type Onboarding = {
  organization: Organization; developer_profile: DeveloperProfile | null;
  can_edit: boolean; profile_complete: boolean; next_step: "developer_profile" | "application";
};
export type OrganizationPage = { organizations: Organization[]; page: number; last_page: number };
export type DeveloperErrorKind = "anonymous" | "forbidden" | "missing" | "validation" | "unavailable";
export class DeveloperError extends Error {
  readonly kind: DeveloperErrorKind;
  constructor(kind: DeveloperErrorKind) { super(kind); this.kind = kind; }
}
export function isOrganizationId(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
function optionalText(value: unknown): value is string | null { return value === null || typeof value === "string"; }
function text(value: unknown): value is string { return typeof value === "string" && value.trim().length > 0; }
export function organization(value: unknown): Organization | null {
  if (!isRecord(value) || !isOrganizationId(value.public_id) || !text(value.legal_name) || !text(value.display_name) ||
    typeof value.country_code !== "string" || !/^[A-Z]{2}$/.test(value.country_code) ||
    !optionalText(value.registration_number) || !optionalText(value.tax_number) ||
    (value.status !== "ACTIVE" && value.status !== "SUSPENDED") ||
    (value.type !== "INDIVIDUAL" && value.type !== "COMPANY" && value.type !== "ORGANIZATION")) return null;
  return { public_id: value.public_id, type: value.type, legal_name: value.legal_name, display_name: value.display_name,
    country_code: value.country_code, registration_number: value.registration_number, tax_number: value.tax_number, status: value.status };
}
export function developerProfile(value: unknown): DeveloperProfile | null {
  if (!isRecord(value) || !isOrganizationId(value.public_id) || !isOrganizationId(value.organization_id) ||
    !text(value.display_name) || !text(value.contact_email) || typeof value.country_code !== "string" ||
    !/^[A-Z]{2}$/.test(value.country_code) || !optionalText(value.bio) || !optionalText(value.website)) return null;
  return { public_id: value.public_id, organization_id: value.organization_id, display_name: value.display_name,
    contact_email: value.contact_email, country_code: value.country_code, bio: value.bio, website: value.website };
}
export function onboarding(payload: unknown, expectedId: string): Onboarding | null {
  const data = responseData(payload);
  if (!isRecord(data)) return null;
  const org = organization(data.organization);
  const profile = data.developer_profile === null ? null : developerProfile(data.developer_profile);
  if (!org || org.public_id !== expectedId || (data.developer_profile !== null && !profile) ||
    (profile && profile.organization_id !== expectedId) || typeof data.can_edit !== "boolean" ||
    data.profile_complete !== (profile !== null) || data.next_step !== (profile ? "application" : "developer_profile")) return null;
  return { organization: org, developer_profile: profile, can_edit: data.can_edit,
    profile_complete: data.profile_complete, next_step: profile ? "application" : "developer_profile" };
}
export function organizationPage(payload: unknown, expectedPage: number): OrganizationPage | null {
  if (!isRecord(payload) || !Array.isArray(payload.data) || !isRecord(payload.meta)) return null;
  const meta = payload.meta;
  if (meta.page !== expectedPage || !Number.isSafeInteger(meta.last_page) || typeof meta.last_page !== "number" || meta.last_page < 1) return null;
  const organizations: Organization[] = [];
  for (const value of payload.data) { const org = organization(value); if (!org) return null; organizations.push(org); }
  if (new Set(organizations.map(org => org.public_id)).size !== organizations.length) return null;
  return { organizations, page: expectedPage, last_page: meta.last_page };
}
async function request(path: string, init: RequestInit = {}): Promise<unknown> {
  let response: Response;
  try { response = await api.request(path, init, true); }
  catch { throw new DeveloperError("unavailable"); }
  if (!response.ok) {
    const kind = response.status === 401 ? "anonymous" : response.status === 403 ? "forbidden" :
      response.status === 404 ? "missing" : response.status === 422 ? "validation" : "unavailable";
    throw new DeveloperError(kind);
  }
  try { return await response.json(); } catch { throw new DeveloperError("unavailable"); }
}
function requireId(id: string) { if (!isOrganizationId(id)) throw new DeveloperError("validation"); }
export async function listOrganizations(page = 1): Promise<OrganizationPage> {
  if (!Number.isSafeInteger(page) || page < 1) throw new DeveloperError("validation");
  const result = organizationPage(await request(`/organizations?page=${page}`), page);
  if (!result) throw new DeveloperError("unavailable");
  return result;
}
export async function getOnboarding(id: string): Promise<Onboarding> {
  requireId(id);
  const result = onboarding(await request(`/organizations/${id}/developer-onboarding`), id);
  if (!result) throw new DeveloperError("unavailable");
  return result;
}
export async function createDeveloperRegistration(fields: OrganizationFields, type: OrganizationType): Promise<Organization> {
  const result = organization(responseData(await request("/organizations/developer-onboarding", { method: "POST", body: JSON.stringify({ ...fields, type }) })));
  if (!result) throw new DeveloperError("unavailable");
  return result;
}
export async function saveOrganization(id: string, fields: OrganizationFields): Promise<void> {
  requireId(id);
  const result = organization(responseData(await request(`/organizations/${id}/developer-onboarding/organization`, { method: "PUT", body: JSON.stringify(fields) })));
  if (!result || result.public_id !== id) throw new DeveloperError("unavailable");
}
export async function saveProfile(id: string, fields: ProfileFields): Promise<void> {
  requireId(id);
  const result = developerProfile(responseData(await request(`/organizations/${id}/developer-onboarding/profile`, { method: "PUT", body: JSON.stringify(fields) })));
  if (!result || result.organization_id !== id) throw new DeveloperError("unavailable");
}
