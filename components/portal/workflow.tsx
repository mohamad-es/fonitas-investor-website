import Link from "next/link";
import { getTranslations } from "next-intl/server";
const stages = ["registration", "applications", "review", "publication"] as const;
export async function Workflow() {
  const t = await getTranslations("portal");
  return <section className="portal-grid" aria-label={t("workflow")}>
    {stages.map((stage, index) => <article className="portal-card" key={stage}>
      <span className="portal-pill">{t("step", { number: index + 1 })}</span><h2>{t(stage)}</h2><p>{t(`${stage}Description`)}</p>
      {stage === "registration" ? <Link href="/developer/onboarding" className="btn btn-primary">{t("continueRegistration")}</Link> : <span className="text-sm text-[#777]">{t("planned")}</span>}
    </article>)}
  </section>;
}
