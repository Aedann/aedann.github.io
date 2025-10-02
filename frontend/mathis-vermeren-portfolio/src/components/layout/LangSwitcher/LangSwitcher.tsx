import { useState, useEffect } from "react";
import { dynamicActivate, Locale, locales } from "../../../i18n/i18n";

export default function LangSwitcher() {
  const [current, setCurrent] = useState<Locale>("fr");

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "fr") setCurrent(stored);
  }, []);

  const switchTo = async (locale: Locale) => {
    await dynamicActivate(locale);
    localStorage.setItem("locale", locale);
    setCurrent(locale);
    const sp = new URLSearchParams(window.location.search);
    sp.set("lang", locale);
    history.replaceState(null, "", `${location.pathname}?${sp.toString()}`);
  };

  return (
    <div className="relative self-end right-3 z-[999] ">
      <button
        onClick={() => switchTo(current === "fr" ? "en" : "fr")}
        aria-label="Change language"
        className="rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        style={{
          background: "var(--card)",
          color: "var(--text)",
          boxShadow: "var(--clay-shadow)",
          border: "1px solid color-mix(in oklab, var(--text), transparent 80%)",
        }}
      >
        {current.toUpperCase()}
      </button>
    </div>
  );
}
