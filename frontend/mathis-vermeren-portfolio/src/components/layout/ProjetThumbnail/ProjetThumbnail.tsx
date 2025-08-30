import { useState } from "react";
import Markdown from "markdown-to-jsx";
import "./ProjetThumbnailCss.css";
import Play from "../../../assets/svg/play.svg";
import Github from "../../../assets/svg/github.svg";
import ExternalLink from "../../../assets/svg/external-link.svg";

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

export default function ProjetThumbnail({ projet }: { projet: Projet }) {
  const [selected, setSelected] = useState<Projet | null>(null);

  return projet.titre ? (
    <div
      key={projet.titre}
      className={`thumbnail thumbnail-${projet.categorie}`}
      onClick={() => setSelected(projet)}
    >
      <h3>{projet.titre}</h3>
      <p className="desc">{projet.description}</p>
      <div className="topics">
        {Array.isArray(projet.topics) && projet.topics.length > 0 ? (
          projet.topics.map((t) => (
            <span key={t} className="topic">
              {t}
            </span>
          ))
        ) : (
          <span className="topic-empty">Aucun sujet</span>
        )}
      </div>
      <div className="actions flex gap-2 mt-2">
        {projet.wasm && (
          <button className="btn">
            <img src={Play} alt="Play Wasm" className="w-6 h-6" />
            Play Wasm
          </button>
        )}
        {projet.lien && (
          <a href={projet.lien} className="btn">
            <img src={ExternalLink} alt="External Link" className="w-6 h-6" />
            Site
          </a>
        )}
        {projet.github && (
          <a href={projet.github} className="btn">
            <img src={Github} alt="Github" className="w-6 h-6" />
            Github
          </a>
        )}
      </div>

      {selected && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selected.titre}</h2>
            <Markdown>{selected.readme}</Markdown>
            <button onClick={() => setSelected(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="thumbnail thumbnail-empty">
      <p>Données du projet manquantes.</p>
    </div>
  );
}
