import "./App.css";
import NavBar from "./components/NavBar";
import HomeItems from "./components/pages/HomeItems";
import Pagenation from "./components/Pagenation";
import { useAppSelector } from "./redux/store";
import Cart from "./components/pages/Cart";
import { Routes, Route } from "react-router-dom";

function App() {
  const darkMode = useAppSelector((state) => state.theme.dark);

  return (
    <div className={`${darkMode ? "bg-slate-700 text-white" : "bg-gray-300"}`}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeItems />} />
      </Routes>
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
