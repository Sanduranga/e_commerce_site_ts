import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import {
  boughtItems,
  cartPrice,
  unshiftItemFromCart,
} from "../../redux/features/CartSlice";
import { RootState } from "../../redux/store";
import { useState } from "react";

const Cart = () => {
  const buyGoods = useSelector((state: RootState) => state.cart.cartItems);
  const totalCartPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  const darkMode = useSelector((state: RootState) => state.theme.dark);
  const clickedMenu = useSelector((state: RootState) => state.theme.menuslide);
  const [noOfItems, setNoOfItems] = useState(1);
  const dispatch = useDispatch();
  // const [cart, setCart] = useState();
  let updatedCartPrice = totalCartPrice;

  interface itemTypes {
    price: number;
    id: string;
    url: string;
    details: string;
    noOfItems: number;
  }
  const handleDeleteBoughtItems = (indexToDelete: number, price: number) => {
    dispatch(unshiftItemFromCart());
    const updatedCart = buyGoods.filter(
      (updatedGoods, index) => index !== indexToDelete
    );
    dispatch(boughtItems(updatedCart));
    updatedCartPrice = totalCartPrice - price;
    dispatch(cartPrice(updatedCartPrice));
  };
  const handleItems = (price: number, rule: string, items: number) => {
    if (rule === "plus") {
      setNoOfItems(items + 1);
      updatedCartPrice = totalCartPrice + price;
      dispatch(cartPrice(updatedCartPrice));
    }
    if (rule === "minus") {
      setNoOfItems(items - 1);
      updatedCartPrice = totalCartPrice - price;
      dispatch(cartPrice(updatedCartPrice));
    }
  };

  function cartItems() {
    return buyGoods.map((boughtItems: itemTypes, index) => (
      <div
        key={index}
        className={`mt-2 flex justify-between md:text-md lg:text-lg text-sm border-b ${
          darkMode ? "border-white" : "border-black"
        } py-1 px-2 items-center`}
      >
        <div className="flex justify-start lg:w-72 w-auto items-center overflow-hidden">
          <img
            className="rounded-sm mx-3 md:w-auto w-10 h-8"
            src={boughtItems.url}
            alt="images"
          />
          {boughtItems.details}
        </div>
        <div className=""> {boughtItems.price} </div>
        <div className="flex justify-evenly items-center w-16 h-6 rounded-md border border-black">
          <span
            onClick={() => handleItems(boughtItems.price, "minus", noOfItems)}
            className="cursor-pointer text-xl font-bold"
          >
            -
          </span>
          <span className="">{boughtItems.noOfItems}</span>
          <span
            onClick={() => handleItems(boughtItems.price, "plus", index)}
            className="cursor-pointer text-xl font-bold"
          >
            +
          </span>
        </div>
        <div className=" flex items-center">
          {boughtItems.price}
          <h1
            className="md:ml-5 ml-2 bg-red-600 text-white cursor-pointer"
            onClick={() => handleDeleteBoughtItems(index, boughtItems.price)}
          >
            <RiDeleteBack2Fill />
          </h1>
        </div>
      </div>
    ));
  }

  return (
    <div className="w-full">
      <div
        className={`${
          darkMode ? " bg-gray-700 " : " bg-gray-200 "
        }w-[90vw] mx-auto rounded-lg md:p-7 p-5  mt-5 lg:flex md:justify-evenly min-h-[80vh] mb-5`}
      >
        <div className=" lg:w-[50vw] w-full lg:p-1 p-2 h-[60vh] overflow-y-scroll lg-mb-0 mb-5">
          {cartItems()}
        </div>
        <div>
          <div
            className={`flex flex-col items-center ${
              darkMode ? "bg-gray-600" : "bg-gray-400"
            } shadow-lg rounded-md h-auto lg:w-72 w-auto lg:p-3 p-6 mb-5`}
          >
            <h1 className="flex justify-between w-full md:text-lg text-sm ">
              <span>Subotal: </span>
              <span>LKR.{totalCartPrice}</span>
            </h1>
            <h1 className="flex justify-between w-full md:text-lg text-sm ">
              Shipping: <span>LKR.550.00</span>
            </h1>
            <h1 className="flex justify-between w-full md:text-lg text-sm ">
              Coupon code:
            </h1>
            <h1 className="flex justify-between w-full font-bold md:text-lg text-sm ">
              Grand total:
              <span>
                LKR.<span className="text-2xl">{totalCartPrice + 550}</span>
              </span>
            </h1>
          </div>
          <div className="flex items-center bg-yellow-500 shadow-lg rounded-md h-10 justify-center w-auto p-5 cursor-pointer hover:translate-x-3 hover:rounded-r-full ">
            <h1 className="font-bold md:text-xl text-md text-center  mr-1">
              Checkout
            </h1>
            <FaMoneyBillTrendUp size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
