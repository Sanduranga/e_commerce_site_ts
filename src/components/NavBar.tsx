import { FaShoppingCart } from "react-icons/fa";
import { RootState } from "../redux/store";
import { toggleMode } from "../redux/features/theme/Theme.";
import { Link } from "react-router-dom";
import { showCartMenu } from "../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ImSearch } from "react-icons/im";
import { PiSignIn } from "react-icons/pi";
import logo from "./images/logo.png";

export default function NavBar() {
  const darkMode = useSelector((state: RootState) => state.theme.dark);
  const numberOfCartItems = useSelector(
    (state: RootState) => state.cart.numberOfItems
  );
  const dispatch = useDispatch();

  const handleDarkMode = () => {
    dispatch(toggleMode());
  };

  return (
    <div className="w-full z-40 bg-gradient-to-b from-slate-500 to-slate-900/70 py-2 m-0 lg:h-auto h-[15vh]">
      <div className="flex justify-around items-center font-bold mb-4 lg:text-xl md:text-lg text-sm">
        <div>
          <Link to="/e_commerce_site_ts">
            <div className="flex">
              <img
                src={logo}
                alt="logo"
                className="md:w-16 md:h-16 w-12 h-12"
              />
              <h1 className="text-slate-200 p-2 rounded-md">
                E_Commerce <br /> Toolkit Site
              </h1>
            </div>
          </Link>
        </div>

        <div className="flex ">
          <input
            placeholder="What are u looking for?"
            className="font-normal shadow-md shadow-black h-6 p-4 rounded-l-full w-auto"
          />
          <div className="flex justify-center shadow-md shadow-black py-4 items-center  bg-white w-10 rounded-r-full h-6">
            <h1 className="hover:rotate-45">
              <ImSearch />
            </h1>
          </div>
        </div>

        <div
          className={`rounded-full w-16 shadow-black shadow-md flex items-center h-7 p-1 cursor-pointer ${
            darkMode ? "bg-slate-700" : "bg-gray-300"
          } transition-colors duration-300`}
          onClick={handleDarkMode}
        >
          <span
            className={`relative rounded-full text-fuchsia-950 shadow-sm shadow-black ${
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
        <div className="flex items-center justify-between md:text-sm text-xs cursor-pointer">
          <h1 className="text-white mr-5">About</h1>
          <h1 className="text-white cursor-pointer">
            <PiSignIn />
            <h1>Sign in</h1>
          </h1>
        </div>

        <div
          onClick={() => dispatch(showCartMenu())}
          className=" rounded-full z-40 bg-gray-800 opacity-80 md:p-4 p-2 fixed right-5 md:top-28 bottom-12 md:bottom-auto hover:opacity-100 "
        >
          <div className="relative p-1">
            <div className="absolute right-1">
              <p className="flex h-3 w-3 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-white">
                {numberOfCartItems}
              </p>
            </div>
            <h1
              className={`${
                darkMode ? "text-white" : "text-yellow-400"
              } text-4xl`}
            >
              <FaShoppingCart />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
