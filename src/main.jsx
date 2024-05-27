import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import "./assets/styles/index.scss";
import { initYandexMetrica } from "./utils/yandexMetrica";

const container = document.getElementById("root");
const root = createRoot(container);
initYandexMetrica();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
