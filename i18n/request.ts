import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

type Locale = "en" | "fa" | "ar";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const requested = cookieStore.get("fonitas-locale")?.value;
  const locale: Locale = requested === "fa" || requested === "ar" ? requested : "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
