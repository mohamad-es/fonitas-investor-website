"use client";

import { api, errorMessage } from "@/lib/api/client";
import { sessionUser } from "@/lib/api/identity";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";


function getErrorMessage(payload: unknown, t: (key: string) => string): string {
  return errorMessage(payload, t("auth_verifyGenericError"));
}

export function VerifyEmailContent() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verification = useRef<{ token: string; promise: Promise<Response> } | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [resendMessage, setResendMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const queryEmail = searchParams.get("email");
    if (queryEmail) setEmail(queryEmail);
  }, [searchParams]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function resendVerification() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || cooldown > 0 || resendStatus === "sending") return;
    setResendStatus("sending");
    setResendMessage("");
    try {
      const response = await api.request("/auth/verification/resend", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ tenant_slug: "fonitas", email: normalizedEmail }),
      });
      if (response.status === 204 || response.ok) {
        setResendStatus("sent");
        setResendMessage(t("auth_resendSuccess"));
        setCooldown(120);
      } else {
        const payload: unknown = await response.json().catch(() => null);
        setResendStatus("error");
        setResendMessage(response.status === 429 ? t("auth_rateLimitWaitSimple") : getErrorMessage(payload, t));
        if (response.status === 429) {
          const retryAfter = Number(response.headers.get("Retry-After"));
          setCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 120);
        }
      }
    } catch {
      setResendStatus("error");
      setResendMessage(t("auth_connectionError"));
    }
  }

  useEffect(() => {
    if (!token?.trim()) {
      setStatus("error");
      setMessage(t("auth_missingVerificationToken"));
      return;
    }

    let active = true;
    if (verification.current?.token !== token) {
      verification.current = { token, promise: api.request("/auth/verify-email", {
        method: "POST", body: JSON.stringify({ token }),
      }) };
    }
    async function verifyEmail() {
      try {
        const response = await verification.current!.promise;
        const payload: unknown = await response.clone().json().catch(() => null);
        if (!active) return;
        if (!response.ok) { setStatus("error"); setMessage(getErrorMessage(payload, t)); return; }
        const user = sessionUser(payload);
        if (!user?.primary_email.is_verified) {
          setStatus("error"); setMessage(t("auth_verificationNotConfirmed")); return;
        }
        setStatus("success"); setMessage(t("auth_verificationSuccess"));
      } catch {
        if (active) { setStatus("error"); setMessage(t("auth_connectionErrorRefresh")); }
      }
    }
    void verifyEmail();
    return () => { active = false; };
  }, [token, t]);

  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#E5E8E5] bg-white">
        {status === "loading" ? (
          <span aria-hidden="true" className="h-7 w-7 animate-spin rounded-full border-2 border-[#DDE2DF] border-t-[#27B681]" />
        ) : status === "success" ? (
          <span aria-hidden="true" className="text-3xl text-[#159A6A]">✓</span>
        ) : (
          <span aria-hidden="true" className="text-3xl text-red-400">!</span>
        )}
      </div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#159A6A]">{t("auth_emailVerification")}</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {status === "loading" ? t("auth_verifyingEmail") : status === "success" ? t("auth_emailVerified") : t("auth_verificationFailed")}
      </h1>
      <p role={status === "error" ? "alert" : "status"} aria-live="polite" className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#777777]">
        {status === "loading" ? t("auth_verificationWaiting") : message}
      </p>
      {status !== "success" && (
        <div className="mx-auto mt-8 max-w-sm text-left">
          <label htmlFor="resend-email" className="mb-2 block text-sm font-medium text-[#666666]">{t("auth_emailAddress")}</label>
          <input suppressHydrationWarning id="resend-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("auth_emailPlaceholder")} className="w-full rounded-xl border border-[#DDE2DF] bg-white px-4 py-3 text-sm text-[#303030] outline-none transition placeholder:text-[#A0A7A3] focus:border-[#27B681]" />
          <button type="button" onClick={resendVerification} disabled={!email.trim() || cooldown > 0 || resendStatus === "sending"} className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#27B681] px-6 py-3 text-sm font-semibold text-[#159A6A] transition hover:bg-[#EAF7F2] disabled:cursor-not-allowed disabled:opacity-40">
            {resendStatus === "sending" ? t("auth_sending") : cooldown > 0 ? t("auth_resendAvailable", { time: `${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, "0")}` }) : t("auth_resendVerification")}
          </button>
          {resendMessage && <p role="status" aria-live="polite" className="mt-3 text-sm leading-6 text-[#777777]">{resendMessage}</p>}
        </div>
      )}
      {status === "success" && <Link href="/login" className="btn btn-primary mt-8">{t("auth_continueSignIn")} ↗</Link>}
    </div>
  );
}
