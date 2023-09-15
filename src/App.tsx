import "./App.css";
import NavBar from "./components/NavBar";
import HomeItems from "./components/pages/HomeItems";
import { useAppSelector } from "./redux/store";
import Cart from "./components/pages/Cart";
import { Routes, Route } from "react-router-dom";

function App() {
  const darkMode = useAppSelector((state) => state.theme.dark);

  return (
    <div
      className={`relative h-screen flex font-mono ${
        darkMode ? "bg-slate-700 text-white" : "bg-gray-300"
      }`}
    >
      {/* <div className="flex relative h-screen"> */}
      {/* <motion.div 
        className="h-screen bg-slate-400 absolute overflow-hidden"
        animate={{
          width: showCart? '30%' : '0'
        }}
        >
        <button 
          className=" absolute right-4 top-2 border-2 border-blue-200 px-2 py-1 text-blue-200 hover:text-red-800 hover:border-red-800"
          onClick={() => dispatch(showCartMenu())}>
          X
        </button>
      </motion.div> */}

      <div className="w-[100vw] h-screen">
        <NavBar />
        <Routes>
          <Route path="/e_commerce_site_ts" element={<HomeItems />} />
        </Routes>
        <Routes>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
