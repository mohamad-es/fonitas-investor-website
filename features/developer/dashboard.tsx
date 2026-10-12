"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api/client";
import { sessionUser, type SessionUser } from "@/lib/api/identity";

export function DeveloperDashboard() {
  const t = useTranslations("identity")
  const portal = useTranslations("portal");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "anonymous" | "error">("loading");
  const [retry, setRetry] = useState(0);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await api.request("/auth/me", {}, true);
        const value = sessionUser(await response.json().catch(() => null));
        if (!active) return;
        if (response.status === 401) { setStatus("anonymous"); return; }
        if (!response.ok || !value) { setStatus("error"); return; }
        setUser(value);
        setStatus("ready");
      } catch { if (active) setStatus("error"); }
    }
    void load();
    return () => { active = false; };
  }, [retry]);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError(false);
    try {
      const response = await api.request("/auth/logout", { method: "POST" }, true);
      if (response.status !== 204 && response.status !== 401) { setLogoutError(true); return; }
      api.clearCsrf();
      setUser(null);
      window.location.replace("/login");
    } catch { setLogoutError(true); }
    finally { setLoggingOut(false); }
  }

  return <section className="mx-auto max-w-xl space-y-5 px-6 py-16">
    <h1 className="text-3xl font-semibold">{portal("dashboard")}</h1>
    {status === "loading" && <p role="status">{t("loading")}</p>}
    {status === "anonymous" && <><p>{t("signedOut")}</p><Link className="btn btn-primary" href="/login">{t("signIn")}</Link></>}
    {status === "error" && <><p role="alert">{t("loadError")}</p><button className="btn btn-primary" onClick={() => { setStatus("loading"); setRetry(retry + 1); }}>{t("retry")}</button></>}
    {status === "ready" && user && <>
      <h2 className="text-xl">{user.display_name}</h2>
      <p><bdi>{user.primary_email.email}</bdi></p>
      <p>{t(user.primary_email.is_verified ? "verified" : "unverified")}</p>
      {!user.primary_email.is_verified && <Link href="/verify">{t("verifyEmail")}</Link>}
      <p>{portal("dashboardIntro")}</p>
      <Link className="btn" href="/developer/onboarding">{t("developerOnboarding")}</Link>
      <p>{portal("publisherBoundary")}</p>
      <button className="btn btn-primary" onClick={logout} disabled={loggingOut}>{t(loggingOut ? "signingOut" : "signOut")}</button>
      {logoutError && <p role="alert">{t("logoutError")}</p>}
    </>}
  </section>;
}
