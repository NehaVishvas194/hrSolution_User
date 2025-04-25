import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import frTraslation from "../src/Location/FR/FR.json";
import gbTraslation from "../src/Location/GB/GB.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const resources = {
  FR: {
    translation: frTraslation,
  },
  GB: {
    translation: gbTraslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language"),
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
