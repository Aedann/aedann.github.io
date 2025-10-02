import { useEffect } from "react";
import "./ParallaxCss.css";

interface Props {
  theme: string;
}

export default function ParallaxEnr({ theme }: Props) {
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}px`);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (theme === "enr") {
    return (
      <div className="parallax-enr parallax">
        <div className="layer layer1"></div>
        <div className="layer layer2"></div>
        <div className="layer layer3"></div>
        <div className="layer layer4"></div>
      </div>
    );
  } else if (theme === "elec") {
    return (
      <div className="parallax">
        <div className="parallax-elec"></div>
        <div className="gradient"></div>
      </div>
    );
  } else {
    return (
      <div id="AAAAAAAAAA" className="parallax">
        <div className="gradient"></div>
      </div>
    );
  }
}
