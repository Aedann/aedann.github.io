import { useState } from "react";
import ProjetThumbnail from "../../layout/ProjetThumbnail/ProjetThumbnail";
import "./NavigateurProjetCss.css";

interface Projet {
  titre: string;
  topics: string[];
  description: string;
  readme: string;
  categorie: "elec" | "info" | "enr" | "web" | "autres";
  wasm: boolean;
  lien?: string;
  github?: string;
}

interface Props {
  projets: Projet[];
  categorieActive?: "elec" | "info" | "enr" | "web" | "autres"; // optionnelle, pour initialiser
}

export default function NavigateurProjet({ projets, categorieActive }: Props) {
  const categories = ["elec", "info", "enr", "web", "autres"] as const;

  const [filtres, setFiltres] = useState<string[]>(
    categorieActive ? [categorieActive] : categories.slice(),
  );

  const toggleFiltre = (cat: string) => {
    setFiltres(
      (prev) =>
        prev.includes(cat)
          ? prev.filter((c) => c !== cat) // on retire
          : [...prev, cat], // on ajoute
    );
  };

  const varNameToString = (name: string) => {
    if (name === "elec") return "Électronique";
    if (name === "info") return "Informatique";
    if (name === "enr") return "Énergies Renouvelables";
    if (name === "web") return "Web";
    if (name === "autres") return "Autres";
    return name;
  };

  const projetsFiltres =
    filtres.length === 0
      ? projets // zero filtre donne tout
      : projets.filter((p) => filtres.includes(p.categorie));

  return (
    <div className="navigateur-projet">
      <div className="filtres">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filtre-btn ${filtres.includes(cat) ? "active" : ""}`}
            onClick={() => toggleFiltre(cat)}
          >
            {varNameToString(cat)}
          </button>
        ))}
      </div>

      <div className="projets-grid">
        {projetsFiltres.length > 0 ? (
          projetsFiltres.map((projet) => <ProjetThumbnail key={projet.titre} projet={projet} />)
        ) : (
          <p className="empty">Aucun projet trouvé.</p>
        )}
      </div>
    </div>
  );
}
