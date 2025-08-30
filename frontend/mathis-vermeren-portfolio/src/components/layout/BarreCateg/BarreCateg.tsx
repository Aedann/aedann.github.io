import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sunIcon from "../../../assets/svg/sun.svg";
import keyboardIcon from "../../../assets/svg/keyboard.svg";
import circuitIcon from "../../../assets/svg/circuit.svg";
import globeIcon from "../../../assets/svg/globe.svg";
import layersIcon from "../../../assets/svg/layers.svg";
import "./BarreCategCss.css";

const categories = [
  { key: "enr", label: "Energies Renouvelables", icon: sunIcon },
  { key: "info", label: "Informatique", icon: keyboardIcon },
  { key: "elec", label: "Électronique", icon: circuitIcon },
  { key: "web", label: "Web", icon: globeIcon },
  { key: "autres", label: "Autres", icon: layersIcon },
];

export default function BarreCateg() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const active = params.get("section") || "autres";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", active);
  }, [active]);

  const handleClick = (key: string) => {
    navigate(`/?section=${key}`);
  };

  const orderedCats = [
    ...categories.filter((c) => c.key === active),
    ...categories.filter((c) => c.key !== active),
  ];
  return (
    <div className="absolute top-0 left-0 w-full">
      <nav className="h-[10vh] w-full flex items-stretch shadow-md overflow-hidden">
        {orderedCats.map(({ key, label }, index) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={`categ-tab categ-${key} ${active === key ? "active" : ""} flex-1 flex items-center justify-center gap-2 
        ${index === 0 ? "first-tab" : ""} 
        ${index === orderedCats.length - 1 ? "last-tab" : ""}`}
          >
            <span className="tab-label">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
