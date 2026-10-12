import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { PortalShell } from "@/components/portal/shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://developers.fonitas.com"),
  title: { default: "Publish Your Account in Three Steps", template: "%s — Fonitas Developers" },
  description: "Developer registration and application workflow with Fonitas as publisher.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === "fa" || locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={await getMessages()}>
          <PortalShell>{children}</PortalShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
