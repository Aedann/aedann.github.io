"use client";
import { useState } from "react";
import wasmInit from "./wasm/laby.js";   // glue JS générée par emcc
import AnsiToHtml from "ansi-to-html";

const convert = new AnsiToHtml();

export default function LabyrinthRunner() {
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  async function runProgram() {
    setRunning(true);
    setOutput("");

    try {
      await wasmInit({
        print: (t) => setOutput((prev) => prev + t + "\n"),
        printErr: (t) => setOutput((prev) => prev + "[ERR] " + t + "\n"),
        locateFile: (path) => "/WASM/" + path, // wasm/data doivent être dans public/WASM
      });
    } catch (e) {
      setOutput((prev) => prev + "\n[ERR] " + e.message);
    }

    setRunning(false);
  }

  return (
    <div className="flex flex-col items-start gap-4 p-4 w-full">
      <button onClick={runProgram} disabled={running}>
        {running ? "Exécution..." : "Lancer le labyrinthe"}
      </button>

    <div
      className="w-full bg-black text-green-400 p-4 rounded-lg overflow-auto h-96 shadow-inner border border-gray-700" 
      style={{
        backgroundColor : "black",
        whiteSpace: "pre-wrap",
        lineHeight: "1.2em",
        fontSize: "14px",
        fontFamily: "'Fira Code', 'Cascadia Mono', 'DejaVu Sans Mono', monospace",
      }}
      dangerouslySetInnerHTML={{ __html: convert.toHtml(output) }}
    />
    </div>
  );
}
