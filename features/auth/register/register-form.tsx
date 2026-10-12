"use client";

import { api, errorMessage } from "@/lib/api/client";
import { sessionUser } from "@/lib/api/identity";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRegisterSchema, type RegisterFormValues, type RegisterRequest } from "./register.schema";

const getApiError = errorMessage;

export function RegisterForm() {
  const t = useTranslations();
  const [requestError, setRequestError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(createRegisterSchema(t)),
    defaultValues: { display_name: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setRequestError(null); setSuccessMessage(null);
    const body: RegisterRequest = { tenant_slug: "fonitas", display_name: values.display_name.trim(), email: values.email.trim(), password: values.password };
    try {
      const response = await api.request("/auth/register", { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) { setRequestError(getApiError(payload, t("auth_registerGenericError"))); return; }
      const user = sessionUser(payload);
      if (!user) { setRequestError(t("auth_unexpectedResponse")); return; }
      setSuccessMessage(user.primary_email.is_verified ? t("auth_registerSuccess") : t("auth_registerVerifyNext"));
    } catch { setRequestError(t("auth_connectionError")); }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {requestError && <div role="alert" aria-live="assertive" className="alert alert-error text-sm">{requestError}</div>}
      {successMessage && <div role="status" aria-live="polite" className="alert alert-success text-sm">{successMessage}</div>}
      <label className="form-control w-full gap-2"><span className="label-text">{t("auth_fullName")}</span>
        <input {...register("display_name")} type="text" autoComplete="name" placeholder={t("auth_namePlaceholder")} className="input input-bordered w-full" aria-invalid={!!errors.display_name} />
        {errors.display_name && <p className="text-xs text-error">{errors.display_name.message}</p>}
      </label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("auth_email")}</span>
        <input {...register("email")} type="email" autoComplete="email" placeholder={t("auth_emailPlaceholder")} className="input input-bordered w-full" aria-invalid={!!errors.email} />
        {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
      </label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("auth_password")}</span>
        <input {...register("password")} type="password" autoComplete="new-password" placeholder={t("auth_createPasswordPlaceholder")} className="input input-bordered w-full" aria-invalid={!!errors.password} />
        {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
      </label>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? t("auth_creatingAccount") : `${t("auth_createAccount")} ↗`}</button>
    </form>
  );
}
