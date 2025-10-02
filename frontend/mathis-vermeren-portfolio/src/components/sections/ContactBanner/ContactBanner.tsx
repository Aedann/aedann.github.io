import Github from "../../../assets/svg/github.svg";
import Linkedin from "../../../assets/svg/linkedin.svg";
import Mail from "../../../assets/svg/mail.svg";
import "./ContactBannerCss.css";

export default function ContactBanner() {
  return (
    <footer className="contact-footer">
      <div className="contact-icons">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={Linkedin} alt="LinkedIn" className="w-7 h-7" />
        </a>
        <a href="https://github.com/Aedann" target="_blank" rel="noopener noreferrer">
          <img src={Github} alt="GitHub" className="w-7 h-7" />
        </a>
        <a href="mailto:mail@example.com">
          <img src={Mail} alt="Mail" className="w-7 h-7" />
        </a>
      </div>
      <div className="license">
        <a
          href="https://github.com/Aedann/MathisVermeren?tab=GPL-3.0-1-ov-file"
          target="_blank"
          rel="noopener noreferrer"
        >
          GPL 3.0 © Mathis Vermeren 2025
        </a>
      </div>
    </footer>
  );
}
