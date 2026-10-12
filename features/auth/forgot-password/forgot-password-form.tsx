"use client";

import { api, errorMessage } from "@/lib/api/client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const inputClass = "mt-2 w-full rounded-xl border border-[#DDE2DF] bg-white px-4 py-3.5 text-[#303030] outline-none transition placeholder:text-[#A0A7A3] focus:border-[#27B681] focus:ring-4 focus:ring-[#27B681]/10";


const apiMessage = errorMessage;

function ForgotPasswordFormContent() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || cooldown > 0) return;
    setStatus("sending");
    setMessage("");

    try {
      if (token) {
        if (password.length < 8) {
          setStatus("error");
          setMessage(t("auth_validationPasswordMin"));
          return;
        }
        if (password !== confirmPassword) {
          setStatus("error");
          setMessage(t("auth_passwordMismatch"));
          return;
        }

        const response = await api.request("/auth/password/reset", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });

        if (response.status === 204 || response.ok) {
          setStatus("sent");
          setMessage(t("auth_passwordResetSuccess"));
          setPassword("");
          setConfirmPassword("");
        } else {
          const payload: unknown = await response.json().catch(() => null);
          setStatus("error");
          if (response.status === 429) {
            const retryAfter = Number(response.headers.get("Retry-After"));
            setMessage(retryAfter > 0
              ? t("auth_rateLimitTryAgain", { seconds: retryAfter })
              : t("auth_rateLimitWaitSimple"));
          } else if (response.status === 401 || response.status === 422) {
            setMessage(apiMessage(payload, t("auth_recoveryGenericError")) || t("auth_resetLinkInvalid"));
          } else {
            setMessage(apiMessage(payload, t("auth_recoveryGenericError")));
          }
        }
      } else {
        const response = await api.request("/auth/password/forgot", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ tenant_slug: "fonitas", email: email.trim() }),
        });
        if (response.status === 204 || response.ok) {
          setStatus("sent");
          setMessage(t("auth_resetSent"));
          setCooldown(120);
        } else {
          const payload: unknown = await response.json().catch(() => null);
          setStatus("error");
          setMessage(response.status === 429 ? t("auth_rateLimitWaitSimple") : apiMessage(payload, t("auth_recoveryGenericError")));
          if (response.status === 429) {
            const retryAfter = Number(response.headers.get("Retry-After"));
            setCooldown(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 120);
          }
        }
      }
    } catch {
      setStatus("error");
      setMessage(t("auth_connectionError"));
    }
  }

  if (token) {
    return (
      <form onSubmit={submit} className="space-y-5">
        {message && <div role={status === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${status === "error" ? "border-red-500/30 bg-red-500/10 text-red-800" : "border-[#27B681]/25 bg-[#EAF7F2] text-[#267A5D]"}`}>{message}</div>}
        {status !== "sent" && <>
          <label className="block text-sm text-[#666666]" htmlFor="new-password">{t("auth_newPassword")}
            <input id="new-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={t("auth_passwordMinPlaceholder")} className={inputClass} />
          </label>
          <label className="block text-sm text-[#666666]" htmlFor="confirm-password">{t("auth_confirmPassword")}
            <input id="confirm-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder={t("auth_confirmPasswordPlaceholder")} className={inputClass} />
          </label>
          <button type="submit" disabled={status === "sending" || !password || !confirmPassword} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
            {status === "sending" ? t("auth_updatingPassword") : `${t("auth_resetPassword")} ↗`}
          </button>
        </>}
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {message && <div role={status === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${status === "error" ? "border-red-500/30 bg-red-500/10 text-red-800" : "border-primary/30 bg-primary/10 text-orange-200"}`}>{message}</div>}
      <label className="block text-sm text-white/70" htmlFor="forgot-email">{t("auth_emailAddress")}
        <input id="forgot-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className={inputClass} />
      </label>
      <button type="submit" disabled={!email.trim() || status === "sending" || cooldown > 0} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? t("auth_sending") : cooldown > 0 ? t("auth_requestSentTryAgain", { time: `${Math.floor(cooldown / 60)}:${String(cooldown % 60).padStart(2, "0")}` }) : `${t("auth_sendResetEmail")} ↗`}
      </button>
      {status === "sent" && <p className="text-xs leading-5 text-[#777777]">{t("auth_securityResetNotice")}</p>}
    </form>
  );
}

export function ForgotPasswordForm() {
  return <Suspense fallback={<div className="text-sm text-[#777777]">Loading password recovery...</div>}><ForgotPasswordFormContent /></Suspense>;
}
