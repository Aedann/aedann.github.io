import { i18n } from "@lingui/core";

export const locales = {
  fr: "Français",
  en: "English",
} as const;

export type Locale = keyof typeof locales;

export const DEFAULT_LOCALE: Locale = "fr";

export async function dynamicActivate(locale: Locale) {
  const { messages } = await import(`../locales/${locale}/messages.ts`);
  i18n.load(locale, messages);
  i18n.activate(locale);
  document.documentElement.lang = locale;
}

export async function initI18n(initial?: string | null) {
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  const fromStorage = localStorage.getItem("locale");
  const picked = (initial ?? fromQuery ?? fromStorage ?? DEFAULT_LOCALE) as Locale;
  await dynamicActivate(picked);
}
