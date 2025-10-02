import Home from "../../../assets/svg/idCard.svg?react";
import Projects from "../../../assets/svg/projects3.svg?react";
import Career from "../../../assets/svg/career2.svg?react";
import "./SommaireCss.css";

export default function Sommaire() {
  return (
    <nav className="sommaire">
      <a href="#presentation" className="sommaire-btn" title="Présentation">
        <Home width={28} height={28} fill="var(--accent)" stroke="var(--accent)" />
      </a>
      <a href="#projets" className="sommaire-btn" title="Projets">
        <Projects width={28} height={28} fill="var(--accent)" stroke="var(--accent)" />
      </a>
      <a href="#parcours" className="sommaire-btn" title="Parcours">
        <Career width={28} height={28} fill="var(--accent)" stroke="var(--accent)" />
      </a>
    </nav>
  );
}
