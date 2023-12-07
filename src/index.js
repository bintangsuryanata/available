import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import maskot from "./assets/icon.png";

// Fungsi untuk mengganti ikon logo dinamis
function changeFavicon(path) {
  const link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = path;
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Panggil fungsi untuk mengganti ikon logo dengan menggunakan variabel maskot
changeFavicon(maskot);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
