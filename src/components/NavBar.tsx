import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { toggleMode } from "../redux/features/theme/Theme.";
import { Link } from "react-router-dom";

export default function NavBar() {
  const darkMode = useAppSelector((state) => state.theme.dark);
  const numberOfCartItems = useAppSelector(state => state.buyGoods.numberOfItems)
  const dispatch = useAppDispatch();

  const handleDarkMode = () => {
    dispatch(toggleMode());
  };

  return (
    <div className="bg-green-800 py-3">
      <div className="flex justify-around items-center font-bold text-xl">
        <div>
          <Link to={"/"}>
            <h1>E_Cmz_Redux_Ts.lk</h1>
          </Link>
        </div>
        <div
          className={`rounded-full w-14  h-6 cursor-pointer ${
            darkMode ? "bg-slate-700" : "bg-gray-300"
          } transition-colors duration-300`}
          onClick={handleDarkMode}
        >
          <span
            className={`relative rounded-full text-fuchsia-950 ${
              darkMode
                ? "transform translate-x-8 duration-500"
                : "transform translate-x-0 duration-500"
            } block w-6 h-6 bg-slate-400  shadow`}
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {darkMode ? "🌞" : "🌙"}
            </span>
          </span>
        </div>

        <div className=" rounded-full bg-slate-100 p-2 flex justify-center items-center">
          <Link to={"/cart"}>
            <div className="relative">
              <div className="t-0 absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                  {numberOfCartItems}
                </p>
              </div>
              <FaShoppingCart size="30px" color="blue" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
