import { useEffect } from "react";
import { Routes, Route, useSearchParams, Navigate } from "react-router-dom";
import BarreCateg from "./components/layout/BarreCateg/BarreCateg";
import BlocPresentation from "./components/sections/BlocPresentation/BlocPresentation";
import NavigateurProjet from "./components/sections/NavigateurProjet/NavigateurProjet";
import ParcoursTimeline from "./components/sections/ParcoursTimeline/ParcoursTimeline";
import ContactBanner from "./components/sections/ContactBanner/ContactBanner";
import Sommaire from "./components/layout/Sommaire/Sommaire";
import projetsData from "./data/projets.json";
import parcoursData from "./data/parcours.json";
import Parallax from "./components/ui/Parallax/Parallax";
import LangSwitcher from "./components/layout/LangSwitcher/LangSwitcher";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { DEFAULT_LOCALE, dynamicActivate } from "./i18n/i18n";

export default function App() {
  const [params] = useSearchParams();
  const tab = params.get("tab"); // ?tab=enr
  const theme = (tab ?? "web").toLowerCase();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    dynamicActivate(DEFAULT_LOCALE);
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <main>
        <Parallax theme={theme} />
        <div className="principal">
          <BarreCateg />
          <LangSwitcher />
          <Sommaire />
          <section id="presentation">
            <BlocPresentation />
          </section>
          <div className="bloc-parcours-projets">
            <section id="projets">
              <NavigateurProjet
                projets={projetsData.map((projet) => ({
                  ...projet,
                  categorie: projet.categorie as "elec" | "info" | "enr" | "web" | "autres",
                }))}
              />
            </section>
            <section id="parcours">
              <ParcoursTimeline parcours={parcoursData} />
            </section>
          </div>
          <ContactBanner />
        </div>
      </main>
    </I18nProvider>
  );
}
