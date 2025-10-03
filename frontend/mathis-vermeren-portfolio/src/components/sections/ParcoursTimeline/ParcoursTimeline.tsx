import ParcoursThumbnail from "../../layout/ParcoursThumbnail/ParcoursThumbnail";
import "./ParcoursTimelineCss.css";
import YearMarker2 from "../../../assets/svg/YearMarker3.svg";
import type { Parcours } from "../../../types.d";

export default function ParcoursTimeline({ parcours }: { parcours: Parcours[] }) {
  const enriched = parcours.map((p) => {
    const side = p.side; // "left" | "right" | undefined
    const start = new Date(p.date_debut);
    const end = new Date(p.date_fin);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return { ...p, side, start, end, duration };
  });

  const baseDate = enriched[0]?.start ?? new Date();

  const placed = enriched.map((item) => {
    const monthsFromStart =
      (item.start.getFullYear() - baseDate.getFullYear()) * 12 +
      (item.start.getMonth() - baseDate.getMonth());

    // if (i === 0) {
    //   side = "left";
    //   leftEnd = monthsFromStart + item.duration;
    // } else if (i === 1) {
    //   side = "right";
    //   rightEnd = monthsFromStart + item.duration;
    // } else {
    //   if (leftEnd <= rightEnd) {
    //     side = "left";
    //     leftEnd = monthsFromStart + item.duration;
    //   } else {
    //     side = "right";
    //     rightEnd = monthsFromStart + item.duration;
    //   }
    // }

    return { ...item, monthsFromStart };
  });
  const firstYear = enriched[0]?.start?.getFullYear() ?? 0;
  const lastYear = enriched[enriched.length - 1]?.end?.getFullYear() ?? 0;

  const years = [];
  for (let y = firstYear + 1; y <= lastYear; y++) {
    const monthsFromStart = (y - firstYear) * 12;
    years.push({ year: y, monthsFromStart });
  }

  console.log("years : ", years);
  const totalMonths =
    placed.length > 0 ? Math.max(...placed.map((p) => p.monthsFromStart + p.duration)) : 0;
  const OneYearMonthRem = 1.5; // 1 year = 1.5rem
  const ExtraHeightRem = 4; // extra space at the bottom
  const containerHeight = `calc(${totalMonths} * ${OneYearMonthRem}rem + ${ExtraHeightRem}rem)`;
  // Get the size of 1rem in pixels dynamically
  const getRemInPx = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
  const OneYearHeightPx = OneYearMonthRem * 12 * getRemInPx();

  console.log("containerHeight : ", containerHeight, "OneYearHeightPx : ", OneYearHeightPx);

  return (
    <div className="timeline-container" style={{ height: containerHeight }}>
      <div className="timeline-blocks">
        {placed.map((p, idx) => (
          <div
            key={idx}
            className={`timeline-slot ${p.side}`}
            style={{
              bottom: `calc(${p.monthsFromStart} * ${OneYearMonthRem}rem)`,
            }}
          >
            <ParcoursThumbnail item={{ ...p, durationInMonths: p.duration }} />
          </div>
        ))}
      </div>

      <div className="timeline-line-container">
        <div className="timeline-line ">
          {years.reverse().map((y) => (
            <div key={y.year} className="one-year-bloc" style={{ height: `${OneYearHeightPx}px` }}>
              <div className="year-marker">
                <img src={YearMarker2} alt={`Year ${y.year}`} className="year-marker-image" />
                <span className="year-marker-span">{y.year}</span>
              </div>
              <svg
                className="svg-line"
                width="18"
                height={OneYearHeightPx}
                viewBox={`0 0 18 ${OneYearHeightPx}`}
              >
                <path
                  d={`M 0 0 L 4.5 0 L 4.5 ${OneYearHeightPx} L 0 ${OneYearHeightPx} Z`}
                  fill="#db726c"
                  fillRule="evenodd"
                />
                <path
                  d={`M 4.5 0 L 13.5 0 L 13.5 ${OneYearHeightPx} L 4.5 ${OneYearHeightPx} Z`}
                  fill="#b31305ff"
                />
                <path
                  d={`M 13.5 0 L 18 0 L 18 ${OneYearHeightPx} L 13.5 ${OneYearHeightPx} Z`}
                  fill={`#85${OneYearHeightPx}7ff`}
                  fillRule="evenodd"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
