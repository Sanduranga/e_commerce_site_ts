import "./App.css";
import HomeItems from "./components/pages/HomeItems";
import { RootState } from "./redux/store";
import Cart from "./components/pages/Cart";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((state: RootState) => state.theme.dark);
  const clickedMenu = useSelector((state: RootState) => state.theme.menuslide);

  return (
    <div
      className={`flex relative font-mono overflow-x-hidden ${
        darkMode ? "bg-black/80 text-white" : "bg-gray-300"
      }`}
    >
      <Routes>
        <Route path="/e_commerce_site_ts" element={<HomeItems />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <div
        className={`absolute ${
          clickedMenu
            ? "translate-x-full transition-transform"
            : "translate-x-0 transition-transform"
        } md:w-96 lg:[20vw] w-[70vw] h-full bg-yellow-500 right-0 top-0 z-50`}
      ></div>
    </div>
  );
}

export default App;
