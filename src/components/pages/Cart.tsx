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
        className="text-black mt-2 flex justify-between md:text-xl border-b border-black py-1 px-2 items-center"
      >
        <div className="flex justify-start w-72 items-center overflow-hidden">
          <img
            className="rounded-sm mx-3 md:w-auto w-10 h-8"
            src={boughtItems.url}
            alt="images"
          />
          {boughtItems.details}
        </div>
        <div className="text-black"> {boughtItems.price} </div>
        <div className="flex justify-evenly items-center w-20 h-7 border-2 border-black">
          <span
            onClick={() => handleItems(boughtItems.price, "minus", noOfItems)}
            className="cursor-pointer"
          >
            -
          </span>
          <span className="">{boughtItems.noOfItems}</span>
          <span
            onClick={() => handleItems(boughtItems.price, "plus", index)}
            className="cursor-pointer"
          >
            +
          </span>
        </div>
        <div className="text-black flex items-center">
          {boughtItems.price}
          <h1
            className="md:ml-5 ml-2 bg-red-600 text-white"
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
      <div className="w-[90vw] mx-auto rounded-lg md:p-7 p-5 bg-gray-200 mt-5 lg:flex md:justify-between min-h-[80vh]">
        <div className=" lg:w-[50vw] w-full border-4 lg:p-1 p-2 h-[60vh] overflow-y-scroll lg-mb-0 mb-5">
          {cartItems()}
        </div>
        <div>
          <div className="flex flex-col items-center bg-gray-400 shadow-lg rounded-md h-auto lg:w-72 w-auto lg:p-3 p-6 mb-5">
            <h1 className="flex justify-between w-full font-bold md:text-lg text-sm text-black">
              <span>Subotal: </span>
              <span>LKR.{totalCartPrice}</span>
            </h1>
            <h1 className="flex justify-between w-full font-bold md:text-lg text-sm text-black">
              Shipping: <span>LKR.550.00</span>
            </h1>
            <h1 className="flex justify-between w-full font-bold md:text-lg text-sm text-black">
              Coupon code:
            </h1>
            <h1 className="flex justify-between w-full font-bold md:text-lg text-sm text-black">
              Grand total:
              <span>
                LKR.<span className="text-2xl">{totalCartPrice + 550}</span>
              </span>
            </h1>
          </div>
          <div className="flex items-center bg-yellow-600 shadow-lg rounded-md h-10 justify-center w-auto p-5 cursor-pointer hover:translate-x-5 hover:rounded-r-full ">
            <h1 className="font-bold md:text-xl text-md text-center text-black mr-1">
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
