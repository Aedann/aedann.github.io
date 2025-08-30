import "./BlocPresentationCss.css";
import Portrait from "../../../assets/Portrait.png";
import Github from "../../../assets/svg/github.svg";
import Linkedin from "../../../assets/svg/linkedin.svg";
import Mail from "../../../assets/svg/mail.svg";

export default function BlocPresentation() {
  return (
    <section className="bloc-presentation flex items-center gap-6 p-6">
      <img src={Portrait} alt="Portrait" className="portrait" />

      <div className="flex flex-col gap-3 ">
        <h2 className="name text-2xl font-bold">Mathis Vermeren</h2>
        <p className="age text-base opacity-80">23 ans</p>
        <p className="intro max-w-lg">
          Petit texte introductif, qui dépend du thème choisi et s’adapte à la couleur globale.
        </p>

        <div className="flex gap-3 mt-2">
          <a href="https://linkedin.com" className="btn-social linkedin">
            <img src={Linkedin} alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a href="https://github.com/Aedann" className="btn-social github">
            <img src={Github} alt="GitHub" className="w-6 h-6" />
          </a>
          <a href="mailto:mail@example.com" className="btn-social mail">
            <img src={Mail} alt="Mail" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
