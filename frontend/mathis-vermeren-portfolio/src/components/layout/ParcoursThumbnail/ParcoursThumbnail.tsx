import "./ParcoursThumbnailCss.css";
import Student from "../../../assets/svg/student-cap.svg";
import Briefcase from "../../../assets/svg/briefcase.svg";
import Freiburg from "../../../assets/svg/Freiburg.svg";
import Sorbonne from "../../../assets/svg/Sorbonne.svg";
import Dumont from "../../../assets/svg/Dumont.svg";
import ParisCite from "../../../assets/svg/ParisCite.svg";
import { useLingui } from "@lingui/react";

interface Parcours {
  type: "formation" | "travail";
  titre: string;
  etablissement: string;
  logoName: string;
  lieu: string;
  date_debut: string; // YYYY-MM
  date_fin: string;
  description: string;
  descriptionEN: string;
}

const logoMap: { [key: string]: string } = {
  Freiburg: Freiburg,
  Sorbonne: Sorbonne,
  Dumont: Dumont,
  ParisCite: ParisCite,
};

export default function ParcoursThumbnail({ item }: { item: Parcours }) {
  const { i18n } = useLingui();

  const icon = item.type === "formation" ? Student : Briefcase;

  const startDate = new Date(item.date_debut);
  const endDate = new Date(item.date_fin);
  const durationInMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const formatDate = (date: string) => {
    const [year, month] = date.split("-");
    return `${month}/${year}`;
  };

  const logoSrc = logoMap[item.logoName] || null;

  return (
    <div
      className={`parcours-thumbnail type-${item.type}`}
      style={{ "--duration-months": durationInMonths } as React.CSSProperties}
    >
      <div className="parcours-background-icon">
        <img src={icon} alt={item.type} />
      </div>

      <div className="parcours-header">
        <div>
          <div className="flex">
            {logoSrc && <img src={logoSrc} alt={item.etablissement} className="logo" />}
            <h3 className="titre">{item.titre}</h3>
          </div>
          <p className="etablissement">
            {item.etablissement} – {item.lieu}
          </p>
        </div>
      </div>

      <div className="parcours-dates">
        {formatDate(item.date_debut)} → {formatDate(item.date_fin)}
      </div>

      <p className="description">{i18n.locale === "fr" ? item.description : item.descriptionEN}</p>
    </div>
  );
}
