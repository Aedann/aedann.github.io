import ParcoursThumbnail from "../../layout/ParcoursThumbnail/ParcoursThumbnail";
import "./ParcoursTimelineCss.css";
import YearMarker2 from "../../../assets/svg/YearMarker3.svg";

interface Parcours {
  type: "formation" | "travail";
  titre: string;
  etablissement: string;
  logoName: string;
  lieu: string;
  date_debut: string; // YYYY-MM
  date_fin: string;
  description: string | null;
}

export default function ParcoursTimeline({ parcours }: { parcours: Parcours[] }) {
  const enriched = parcours.map((p) => {
    const start = new Date(p.date_debut);
    const end = new Date(p.date_fin);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return { ...p, start, end, duration };
  });

  let leftEnd = 0;
  let rightEnd = 0;
  const baseDate = enriched[0]?.start ?? new Date();

  const placed = enriched.map((item, i) => {
    const monthsFromStart =
      (item.start.getFullYear() - baseDate.getFullYear()) * 12 +
      (item.start.getMonth() - baseDate.getMonth());

    let side: "left" | "right";
    if (i === 0) {
      side = "left";
      leftEnd = monthsFromStart + item.duration;
    } else if (i === 1) {
      side = "right";
      rightEnd = monthsFromStart + item.duration;
    } else {
      if (leftEnd <= rightEnd) {
        side = "left";
        leftEnd = monthsFromStart + item.duration;
      } else {
        side = "right";
        rightEnd = monthsFromStart + item.duration;
      }
    }

    return { ...item, side, monthsFromStart };
  });

  const firstYear = enriched[0].start.getFullYear();
  const lastYear = enriched[enriched.length - 1].end.getFullYear();

  const years = [];
  for (let y = firstYear; y <= lastYear; y++) {
    const monthsFromStart = (y - firstYear) * 12;
    years.push({ year: y, monthsFromStart });
  }

  console.log("years : ", years);
  const totalMonths =
    placed.length > 0 ? Math.max(...placed.map((p) => p.monthsFromStart + p.duration)) : 0;
  const containerHeight = `calc(${totalMonths} * 1.5rem + 4rem)`;

  return (
    <div className="timeline-container" style={{ height: containerHeight }}>
      <div className="timeline-blocks">
        {placed.map((p, idx) => (
          <div
            key={idx}
            className={`timeline-slot ${p.side}`}
            style={{
              bottom: `calc(${p.monthsFromStart} * 1.5rem)`,
            }}
          >
            <ParcoursThumbnail item={{ ...p, durationInMonths: p.duration }} />
          </div>
        ))}
      </div>

      <div className="timeline-line ">
        {years.map((y) => (
          <div
            key={y.year}
            className="one-year-bloc"
            style={{
              bottom: `calc(${y.monthsFromStart} * 1.55rem)`,
            }}
          >
            <div className="year-marker-content">
              <img src={YearMarker2} alt={`Year ${y.year}`} className="year-marker-image" />
              <span>{y.year}</span>
            </div>
            <svg width="18" height="100" viewBox="0 0 18 100" className="year-marker-line">
              <path d="M 0 0 L 4.5 0 L 4.5 100 L 0 100 Z" fill="#db726c" fillRule="evenodd" />
              <path d="M 4.5 0 L 13.5 0 L 13.5 100 L 4.5 100 Z" fill="#b31305ff" />
              <path d="M 13.5 0 L 18 0 L 18 100 L 13.5 100 Z" fill="#851007ff" fillRule="evenodd" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
