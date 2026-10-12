"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api/client";
import { sessionUser } from "@/lib/api/identity";
import { createDeveloperRegistration, DeveloperError, getOnboarding, listOrganizations, saveOrganization, saveProfile,
  type DeveloperErrorKind, type Onboarding, type OrganizationPage } from "@/lib/api/developer";
import { OrganizationForm, ProfileForm } from "./publisher-forms";

export function DeveloperOnboarding({ organizationId }: { organizationId?: string }) {
  const t = useTranslations("developer");
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "anonymous" | "error">("loading");
  const [organizations, setOrganizations] = useState<OrganizationPage | null>(null);
  const [state, setState] = useState<Onboarding | null>(null);
  const [section, setSection] = useState<"organization" | "profile">("profile");
  const [creating, setCreating] = useState(false);
  const [uncertainCreation, setUncertainCreation] = useState(false);
  const [permissionLost, setPermissionLost] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<DeveloperErrorKind | null>(null);
  const [notice, setNotice] = useState(false);
  const [retry, setRetry] = useState(0);
  const generation = useRef(0);
  const submitting = useRef(false);

  useEffect(() => {
    const requestGeneration = generation;
    const current = ++requestGeneration.current;
    async function load() {
      setStatus("loading"); setState(null); setOrganizations(null); setError(null); setNotice(false);
      setCreating(false); setPermissionLost(false); setSection("profile");
      try {
        const response = await api.request("/auth/me", {}, true);
        if (response.status === 401) throw new DeveloperError("anonymous");
        if (!response.ok || !sessionUser(await response.json().catch(() => null))) throw new DeveloperError("unavailable");
        const result = organizationId ? await getOnboarding(organizationId) : await listOrganizations();
        if (current !== generation.current) return;
        if ("organization" in result) setState(result); else setOrganizations(result);
        setStatus("ready");
      } catch (failure) {
        if (current !== generation.current) return;
        const kind = failure instanceof DeveloperError ? failure.kind : "unavailable";
        setError(kind); setStatus(kind === "anonymous" ? "anonymous" : "error");
      }
    }
    void load();
    return () => { requestGeneration.current++; };
  }, [organizationId, retry]);

  async function mutate(action: (active: () => boolean) => Promise<void>, creation = false) {
    if (submitting.current) return;
    submitting.current = true; setBusy(true); setError(null); setNotice(false);
    const current = generation.current;
    try { await action(() => current === generation.current); }
    catch (failure) {
      if (current !== generation.current) return;
      const kind = failure instanceof DeveloperError ? failure.kind : "unavailable";
      setError(kind);
      if (creation && kind === "unavailable") { setUncertainCreation(true); setCreating(false); }
      if (kind === "forbidden" || kind === "missing") setPermissionLost(true);
      if (kind === "anonymous") { setState(null); setOrganizations(null); setStatus("anonymous"); }
    } finally { submitting.current = false; setBusy(false); }
  }
  function reload() { setRetry(value => value + 1); }
  function selection() { router.push("/developer/onboarding"); }
  const editable = state?.can_edit && !permissionLost;

  return <main id="developer-main" className="mx-auto max-w-2xl space-y-6 px-6 py-16 text-[#303030]">
    <h1 className="text-3xl font-semibold">{t("title")}</h1>
    <p className="leading-7 text-[#666]">{t("intro")}</p>
    {status === "loading" && <p role="status">{t("loading")}</p>}
    {status === "anonymous" && <section className="space-y-4"><p>{t("signInHelp")}</p>
      <Link className="btn btn-primary" href="/login">{t("signIn")}</Link>{" "}<Link className="btn" href="/register">{t("register")}</Link>
    </section>}
    {error && status !== "anonymous" && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{t(error)}</p>}
    {status === "error" && <div className="flex flex-wrap gap-3"><button type="button" className="btn" onClick={reload}>{t("retry")}</button>
      <button type="button" className="btn" onClick={selection}>{t("choosePublisher")}</button></div>}
    {status === "ready" && <>
      {busy && <p role="status">{t("saving")}</p>}
      {uncertainCreation && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4">{t("uncertainCreation")}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">{t("saved")}</p>}
      {!state && organizations && <>
        <h2 className="text-xl font-semibold">{t("choosePublisher")}</h2>
        {organizations.organizations.length === 0 && <p>{t("noPublishers")}</p>}
        <ul className="space-y-3">{organizations.organizations.map(org => <li key={org.public_id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#DDE2DF] p-4">
          <span dir="auto">{org.display_name}</span><button type="button" className="btn" disabled={busy} onClick={() => router.push(`/developer/onboarding?organization=${org.public_id}`)}>{t("resume")}</button>
        </li>)}</ul>
        <nav aria-label={t("publishersPages")} className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn" disabled={busy || organizations.page <= 1} onClick={() => void mutate(async active => { const result = await listOrganizations(organizations.page - 1); if (active()) setOrganizations(result); })}>{t("previous")}</button>
          <span>{t("page", { page: organizations.page, total: organizations.last_page })}</span>
          <button type="button" className="btn" disabled={busy || organizations.page >= organizations.last_page} onClick={() => void mutate(async active => { const result = await listOrganizations(organizations.page + 1); if (active()) setOrganizations(result); })}>{t("next")}</button>
        </nav>
        <p className="text-sm text-[#666]">{t("creationHelp")}</p>
        <button type="button" className="btn" disabled={busy} onClick={reload}>{t("refreshPublishers")}</button>{" "}
        {!creating && <button type="button" className="btn btn-primary" disabled={busy || uncertainCreation} onClick={() => setCreating(true)}>{t("newTitle")}</button>}
        {creating && <section className="space-y-4"><OrganizationForm initial={null} disabled={busy} onSave={async (fields, type) => {
          await mutate(async active => { const org = await createDeveloperRegistration(fields, type); if (active()) router.push(`/developer/onboarding?organization=${org.public_id}`); }, true);
        }} /><button type="button" className="btn" disabled={busy} onClick={() => setCreating(false)}>{t("cancel")}</button></section>}
      </>}
      {state && <>
        <div className="rounded-xl border border-[#DDE2DF] p-4 space-y-2"><h2 className="text-xl font-semibold" dir="auto">{state.organization.display_name}</h2>
          <p>{t(state.profile_complete ? "complete" : "incomplete")}</p><p className="text-sm leading-6">{t("scope")}</p>
          {!state.can_edit && <p>{t("readOnly")}</p>}
        </div>
        <nav aria-label={t("sections")} className="flex flex-wrap gap-3">
          <button type="button" className="btn" disabled={busy} aria-pressed={section === "organization"} onClick={() => { setSection("organization"); setNotice(false); }}>{t("organizationTitle")}</button>
          <button type="button" className="btn" disabled={busy} aria-pressed={section === "profile"} onClick={() => { setSection("profile"); setNotice(false); }}>{t("profileTitle")}</button>
          <button type="button" className="btn" disabled={busy} onClick={selection}>{t("choosePublisher")}</button>
        </nav>
        {permissionLost && <button type="button" className="btn" onClick={reload}>{t("retry")}</button>}
        {section === "organization" ? <OrganizationForm key={state.organization.public_id} initial={state.organization} disabled={busy || !editable} onSave={async fields => {
          await mutate(async active => { await saveOrganization(state.organization.public_id, fields); const result = await getOnboarding(state.organization.public_id); if (active()) { setState(result); setSection("profile"); setNotice(true); } });
        }} /> : <ProfileForm key={state.developer_profile?.public_id ?? state.organization.public_id} initial={state.developer_profile} country={state.organization.country_code} disabled={busy || !editable} onSave={async fields => {
          await mutate(async active => { await saveProfile(state.organization.public_id, fields); const result = await getOnboarding(state.organization.public_id); if (active()) { setState(result); setNotice(true); } });
        }} />}
        {state.profile_complete && <p className="rounded-xl bg-[#f3f7f4] p-4 leading-7">{t("applicationNext")}</p>}
      </>}
    </>}
    <Link className="inline-block underline" href="/dashboard">{t("account")}</Link>
  </main>;
}
