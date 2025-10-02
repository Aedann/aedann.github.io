import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/utilites.css";
import "./styles/themes.css";
import "./styles/layout.css";

import { I18nProvider } from "@lingui/react";
import { initI18n } from "./i18n/i18n";
import { i18n } from "@lingui/core";

initI18n().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <I18nProvider i18n={i18n}>
          <App />
        </I18nProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
