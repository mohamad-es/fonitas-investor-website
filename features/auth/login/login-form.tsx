"use client";

import { api, errorCode, errorMessage } from "@/lib/api/client";
import { mfaChallenge, sessionUser } from "@/lib/api/identity";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormValues = { email: string; password: string };

const getApiError = errorMessage;

export function LoginForm() {
  const t = useTranslations();
  const loginSchema = z.object({
    email: z.string().trim().email(t("auth_validationEmail")).max(254),
    password: z.string().min(1, t("auth_validationPassword")).max(128),
  });
  const [requestError, setRequestError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [mfaChallengeToken, setMfaChallengeToken] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setRequestError(null);
    setNotice(null);
    setMfaChallengeToken(null);
    try {
      const response = await api.request("/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ tenant_slug: "fonitas", email: values.email.trim(), password: values.password }),
      });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const apiMessage = getApiError(payload, t("auth_loginGenericError"));
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          setRequestError(retryAfter ? t("auth_rateLimitTryAgain", { seconds: retryAfter }) : apiMessage);
        } else setRequestError(apiMessage);
        return;
      }
      const challenge = mfaChallenge(payload);
      if (challenge) { setMfaChallengeToken(challenge); setNotice(t("auth_mfaRequired")); return; }
      const user = sessionUser(payload);
      if (!user) { setRequestError(t("auth_unexpectedResponse")); return; }
      if (!user.primary_email.is_verified) { setNotice(t("auth_emailNotVerified")); return; }
      window.location.assign("/dashboard");
    } catch { setRequestError(t("auth_connectionError")); }
  };

  async function verifyMfa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (verifying || !mfaChallengeToken || !/^\d{6}$/.test(mfaCode)) return;
    setVerifying(true); setRequestError(null);
    try {
      const response = await api.request("/auth/mfa/verify", { method: "POST", body: JSON.stringify({ token: mfaChallengeToken, code: mfaCode }) });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        setRequestError(getApiError(payload, t("auth_loginGenericError")));
        if (errorCode(payload) === "INVALID_MFA_TOKEN") { setMfaChallengeToken(null); setMfaCode(""); }
        return;
      }
      if (!sessionUser(payload)) { setRequestError(t("auth_unexpectedResponse")); return; }
      setMfaChallengeToken(null); setMfaCode(""); window.location.assign("/dashboard");
    } catch { setRequestError(t("auth_connectionError")); }
    finally { setVerifying(false); }
  }

  if (mfaChallengeToken) return (
    <form className="space-y-5" onSubmit={verifyMfa}>
      <p role="status" className="alert alert-info">{t("auth_mfaRequired")}</p>
      {requestError && <p role="alert" className="text-sm text-error">{requestError}</p>}
      <label className="form-control w-full gap-2"><span className="label-text">{t("identity.mfaCode")}</span>
        <input className="input input-bordered w-full" value={mfaCode} onChange={(event) => setMfaCode(event.target.value)} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required autoFocus dir="ltr" />
      </label>
      <button className="btn btn-primary w-full" disabled={verifying || !/^\d{6}$/.test(mfaCode)}>{t(verifying ? "auth_signingIn" : "identity.verifyCode")}</button>
      <button type="button" className="btn btn-ghost w-full" disabled={verifying} onClick={() => { setMfaChallengeToken(null); setMfaCode(""); setNotice(null); setRequestError(null); }}>{t("auth_backToSignIn")}</button>
    </form>
  );

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {requestError && <div role="alert" aria-live="assertive" className="alert alert-error text-sm">{requestError}</div>}
      {notice && <div role="status" aria-live="polite" className="alert alert-info text-sm">{notice}</div>}
      <label className="form-control w-full gap-2"><span className="label-text">{t("auth_email")}</span>
        <input {...register("email")} type="email" autoComplete="email" required placeholder={t("auth_emailPlaceholder")} className="input input-bordered w-full" aria-invalid={!!errors.email} />
        {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
      </label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("auth_password")}</span>
        <input {...register("password")} type="password" autoComplete="current-password" required placeholder={t("auth_passwordPlaceholder")} className="input input-bordered w-full" aria-invalid={!!errors.password} />
        {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
      </label>
      <div className="flex items-center justify-between text-sm"><a href="/forgot-password" className="link link-primary">{t("auth_forgotPassword")}</a></div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? t("auth_signingIn") : `${t("auth_signIn")} ↗`}</button>
    </form>
  );
}
