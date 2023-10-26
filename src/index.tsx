import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/pages/Footer";
import NavBar from "./components/NavBar";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <NavBar />
        <App />
        <Footer />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
