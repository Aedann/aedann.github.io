import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sunIcon from "../../../assets/svg/sun.svg";
import keyboardIcon from "../../../assets/svg/keyboard.svg";
import circuitIcon from "../../../assets/svg/circuit.svg";
import globeIcon from "../../../assets/svg/globe.svg";
import layersIcon from "../../../assets/svg/layers.svg";
import "./BarreCategCss.css";
import { Trans } from "@lingui/react/macro";

export default function BarreCateg() {
  const categories = [
    { key: "enr", label: <Trans>Energies Renouvelables</Trans>, icon: sunIcon },
    { key: "info", label: <Trans>Informatique</Trans>, icon: keyboardIcon },
    { key: "elec", label: <Trans>Électronique</Trans>, icon: circuitIcon },
    { key: "web", label: <Trans>Web</Trans>, icon: globeIcon },
    { key: "autres", label: <Trans>Autres</Trans>, icon: layersIcon },
  ];
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const active = params.get("tab") || "autres";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
  }, [active]);

  const handleClick = (key: string) => {
    navigate(`/?tab=${key}`);
  };

  const orderedCats = [
    ...categories.filter((c) => c.key === active),
    ...categories.filter((c) => c.key !== active),
  ];
  return (
    <nav className="barre-categ">
      {orderedCats.map(({ key, label }, index) => (
        <button
          key={key}
          onClick={() => handleClick(key)}
          className={`categ-tab categ-${key} ${active === key ? "active" : ""} flex-1 flex items-center justify-center  
        ${index === 0 ? "first-tab" : ""} 
        ${index === orderedCats.length - 1 ? "last-tab" : ""}`}
        >
          <span className="tab-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
