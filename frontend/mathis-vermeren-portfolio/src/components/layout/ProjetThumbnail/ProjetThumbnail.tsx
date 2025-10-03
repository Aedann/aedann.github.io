import { useState } from "react";
import PopupReadme from "../../../components/common/PopupReadme/PopupReadme";
import "./ProjetThumbnailCss.css";
import Play from "../../../assets/svg/play.svg";
import Github from "../../../assets/svg/github.svg";
import ExternalLink from "../../../assets/svg/external-link.svg";
import { useLingui } from "@lingui/react";
import type { Projet } from "../../../types.d";

export default function ProjetThumbnail({ projet }: { projet: Projet }) {
  const { i18n } = useLingui();
  const [selected, setSelected] = useState<Projet | null>(null);
  console.log("selected : ", selected);
  return projet.titre ? (
    <div
      key={projet.titre}
      className={`thumbnail thumbnail-${projet.categorie} glass-card`}
      onClick={() => {
        console.log("clicked");
        setSelected(projet);
      }}
    >
      <h3>{projet.titre}</h3>
      {i18n.locale === "fr" ? projet.description : projet.descriptionEN}
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
        <PopupReadme
          titre={selected.titre}
          // readmeUrl={selected.readme}
          readmeUrl="https://raw.githubusercontent.com/Aedann/MurImage/refs/heads/main/Readme.md"
          onClose={() => {
            console.log("Popup closed");
            setSelected(null);
          }}
          isOpen={!!selected}
        />
      )}
    </div>
  ) : (
    <div className="thumbnail thumbnail-empty">
      <p>Données du projet manquantes.</p>
    </div>
  );
}
