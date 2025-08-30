import { useEffect } from "react";
import { Routes, Route, useSearchParams, Navigate } from "react-router-dom";
import BarreCateg from "./components/layout/BarreCateg/BarreCateg";
import BlocPresentation from "./components/sections/BlocPresentation/BlocPresentation";
import NavigateurProjet from "./components/sections/NavigateurProjet/NavigateurProjet";
import ParcoursTimeline from "./components/sections/ParcoursTimeline/ParcoursTimeline";
import projetsData from "./data/projets.json";
import parcoursData from "./data/parcours.json";

export default function App() {
  const [params] = useSearchParams();
  const section = params.get("section"); // ?section=enr

  useEffect(() => {
    const theme = (section ?? "web").toLowerCase();
    document.documentElement.setAttribute("data-theme", theme);
  }, [section]);

  return (
    <main className=" ">
      <div className="flex flex-col ">
        <BarreCateg />
        <BlocPresentation />
        <NavigateurProjet
          projets={projetsData.map((projet) => ({
            ...projet,
            categorie: projet.categorie as "elec" | "info" | "enr" | "web" | "autres",
          }))}
        />
        <ParcoursTimeline parcours={parcoursData} />
      </div>
      <Routes>
        <Route path="/" element={<div />} />
      </Routes>
    </main>
  );
}
