import "./App.css";
import HomeItems from "./components/pages/HomeItems";
import { RootState } from "./redux/store";
import Cart from "./components/pages/Cart";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const darkMode = useSelector((state: RootState) => state.theme.dark);

  return (
    <div
      className={`flex font-mono overflow-x-hidden ${
        darkMode ? "bg-black/80 text-white" : "bg-gray-300"
      }`}
    >
      <Routes>
        <Route path="/e_commerce_site_ts" element={<HomeItems />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
