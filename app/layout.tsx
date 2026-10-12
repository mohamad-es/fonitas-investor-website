import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { PortalShell } from "@/components/portal/shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fonitas.com"),
  title: { default: "FONITAS — Investor Relations", template: "%s — FONITAS Investors" },
  description: "Explore the FONITAS investment opportunity, market, business model, growth strategy and investor information.",
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return <html lang={locale} dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}><body><NextIntlClientProvider locale={locale} messages={await getMessages()}><PortalShell>{children}</PortalShell></NextIntlClientProvider></body></html>;
}
