import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerSW } from "virtual:pwa-register";

// 注册Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("有新版本可用，是否刷新?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("应用已准备好离线使用");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
