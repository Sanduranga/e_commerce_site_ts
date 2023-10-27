import { FaShoppingCart } from "react-icons/fa";
import { BsMenuButtonFill } from "react-icons/bs";
import { RootState } from "../redux/store";
import { toggleMode } from "../redux/features/theme/Theme.";
import { Link } from "react-router-dom";
import { showCartMenu } from "../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";

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
      <div className="flex justify-around items-center font-bold mb-4 text-xl">
        {/* <div
          className="cursor-pointer"
          onClick={() => dispatch(showCartMenu())}
        >
          <BsMenuButtonFill />
        </div> */}

        <div>
          <Link to="/e_commerce_site_ts">
            <h1 className="text-slate-300 bg-red-400 p-2 rounded-md">
              E_Commerce <br /> Toolkit Site
            </h1>
          </Link>
        </div>

        <div className="relative h-10 bg-green-400">
          <input className="font-normal px-2 absolute  rounded-full w-auto" />
          <div className="bg-gray-700 w-10 absolute right-0 h-6"></div>
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

        <div className=" rounded-full z-40 bg-gray-800 opacity-80 p-2 fixed right-5 md:bottom-5 bottom-10 hover:opacity-100 ">
          <div
            onClick={() => dispatch(showCartMenu())}
            className="relative p-3"
          >
            <div className="t-0 absolute left-3">
              <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-white">
                {numberOfCartItems}
              </p>
            </div>
            <FaShoppingCart size="50px" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
