import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import mermaid from "mermaid";
import "highlight.js/styles/github-dark.css";
import "./PopupReadmeCss.css";

interface PopupReadmeProps {
  titre: string;
  readmeUrl: string;
  onClose: () => void;
  isOpen: boolean;
}

export default function PopupReadme({ titre, readmeUrl, onClose, isOpen }: PopupReadmeProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchReadme = async () => {
      try {
        const res = await fetch(readmeUrl);
        const text = await res.text();
        setContent(text);
      } catch (err) {
        console.error("Erreur lors du chargement du README :", err);
        setContent("# Erreur\nImpossible de charger le contenu.");
      }
    };

    fetchReadme();
  }, [readmeUrl, isOpen]);

  useEffect(() => {
    if (!content) return;

    mermaid.initialize({ startOnLoad: true, theme: "default" });
    setTimeout(() => {
      try {
        mermaid.run();
      } catch (e) {
        console.warn("Erreur mermaid :", e);
      }
    }, 100);
  }, [content]);

  const resolveUrl = (url: string | undefined): string | undefined => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    const base = readmeUrl.replace("/refs/heads/main/", "/main/").split("/").slice(0, -1).join("/");

    return `${base}/${url.replace(/^\.\//, "")}`;
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="popup-overlay"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ✕
        </button>
        <h2 className="popup-title">{titre}</h2>

        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          skipHtml={false}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              if (match?.[1] === "mermaid") {
                return <div className="mermaid">{String(children).replace(/\n$/, "")}</div>;
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            img: ({ node, ...props }) => (
              <img
                {...props}
                src={resolveUrl(props.src)}
                alt={props.alt}
                style={{ maxWidth: "100%" }}
              />
            ),
            a: ({ node, ...props }) => (
              <a {...props} href={resolveUrl(props.href)} target="_blank" />
            ),
          }}
        />
      </div>
    </div>,
    document.body,
  );
}
