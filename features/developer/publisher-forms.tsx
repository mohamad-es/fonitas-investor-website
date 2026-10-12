"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { organizationTypes, type Organization, type OrganizationFields, type OrganizationType, type ProfileFields } from "@/lib/api/developer";

function optional(value: string) { return value.trim() || null; }

const fieldClass = "input input-bordered w-full";
const selectClass = "select select-bordered w-full";
const textareaClass = "textarea textarea-bordered w-full";

export function OrganizationForm({ initial, disabled, onSave }: {
  initial: Organization | null; disabled: boolean;
  onSave: (fields: OrganizationFields, type: OrganizationType) => Promise<void>;
}) {
  const t = useTranslations("developer");
  const [type, setType] = useState<OrganizationType>(initial?.type ?? "INDIVIDUAL");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    await onSave({ legal_name: field("legal_name"), display_name: field("display_name"), country_code: field("country_code").toUpperCase(),
      registration_number: optional(field("registration_number")), tax_number: optional(field("tax_number")) }, type);
  }
  return <form onSubmit={submit} className="space-y-5">
    <fieldset disabled={disabled} className="space-y-5">
      <legend className="text-xl font-semibold">{t(initial ? "organizationTitle" : "newTitle")}</legend>
      <label className="form-control w-full gap-2"><span className="label-text">{t("type")}</span><select name="type" className={selectClass} value={type} disabled={!!initial} onChange={event => {
        const value = event.target.value;
        if (value === "INDIVIDUAL" || value === "COMPANY" || value === "ORGANIZATION") setType(value);
      }}>{organizationTypes.map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("legalName")}</span><input className={fieldClass} name="legal_name" required maxLength={255} defaultValue={initial?.legal_name ?? ""} /></label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("displayName")}</span><input className={fieldClass} name="display_name" required maxLength={255} defaultValue={initial?.display_name ?? ""} /></label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("country")}</span><input className={fieldClass} name="country_code" dir="ltr" required pattern="[A-Za-z]{2}" maxLength={2} placeholder="DE" aria-describedby="publisher-country-help" defaultValue={initial?.country_code ?? ""} /></label>
      <p id="publisher-country-help" className="text-sm text-base-content/60">{t("countryHelp")}</p>
      <label className="form-control w-full gap-2"><span className="label-text">{t("registrationNumber")}</span><input className={fieldClass} name="registration_number" maxLength={64} defaultValue={initial?.registration_number ?? ""} /></label>
      <label className="form-control w-full gap-2"><span className="label-text">{t("taxNumber")}</span><input className={fieldClass} name="tax_number" maxLength={64} defaultValue={initial?.tax_number ?? ""} /></label>
      <button type="submit" className="btn btn-primary">{t(initial ? "saveOrganization" : "createPublisher")}</button>
    </fieldset>
  </form>;
}

export function ProfileForm({ initial, country, disabled, onSave }: {
  initial: ProfileFields | null; country: string; disabled: boolean; onSave: (fields: ProfileFields) => Promise<void>;
}) {
  const t = useTranslations("developer");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    await onSave({ display_name: field("display_name"), country_code: field("country_code").toUpperCase(), contact_email: field("contact_email"),
      bio: optional(field("bio")), website: optional(field("website")) });
  }
  return <form onSubmit={submit} className="space-y-5"><fieldset disabled={disabled} className="space-y-5">
    <legend className="text-xl font-semibold">{t("profileTitle")}</legend>
    <label className="form-control w-full gap-2"><span className="label-text">{t("profileName")}</span><input className={fieldClass} name="display_name" required maxLength={255} defaultValue={initial?.display_name ?? ""} /></label>
    <label className="form-control w-full gap-2"><span className="label-text">{t("country")}</span><input className={fieldClass} name="country_code" dir="ltr" required maxLength={2} pattern="[A-Za-z]{2}" defaultValue={initial?.country_code ?? country} /></label>
    <label className="form-control w-full gap-2"><span className="label-text">{t("contactEmail")}</span><input className={fieldClass} name="contact_email" dir="ltr" type="email" required defaultValue={initial?.contact_email ?? ""} /></label>
    <label className="form-control w-full gap-2"><span className="label-text">{t("website")}</span><input className={fieldClass} name="website" dir="ltr" type="url" maxLength={255} defaultValue={initial?.website ?? ""} /></label>
    <label className="form-control w-full gap-2"><span className="label-text">{t("bio")}</span><textarea className={textareaClass} name="bio" maxLength={5000} rows={4} defaultValue={initial?.bio ?? ""} /></label>
    <button type="submit" className="btn btn-primary">{t("saveProfile")}</button>
  </fieldset></form>;
}
