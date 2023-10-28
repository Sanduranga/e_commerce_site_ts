import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { showCartMenu } from "../../redux/features/CartSlice";
import { Link } from "react-router-dom";

function CartPopup() {
  const showCart = useSelector((state: RootState) => state.cart.cartMenu);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const dispatch = useDispatch();

  interface itemTypes {
    price: number;
    id: string;
    url: string;
  }
  const cartPopupItems = () => {
    return cartItems.map((boughtItems: itemTypes, index) => (
      <div
        key={index}
        className="text-white mt-2 flex justify-center md:text-xl items-center"
      >
        <img
          className="rounded-md mr-3 md:w-16 md:h-8 w-12 h-6"
          src={boughtItems.url}
          alt="images"
        />
        <div> {boughtItems.price} </div>
      </div>
    ));
  };

  return (
    <motion.div
      className="fixed h-[55vh] w-[70vw] rounded-md shadow-xl shadow-black left-1/2 -translate-x-1/2 bg-slate-400/90"
      initial={{
        top: "100%",
      }}
      animate={{
        top: showCart ? "25%" : "100%",
      }}
    >
      <div>
        <span
          onClick={() => dispatch(showCartMenu())}
          className="absolute cursor-pointer right-0 top-0 m-2 text-red-600 font-bold border-red-600 py-1 px-2 border-4"
        >
          X
        </span>
      </div>
      <div className="grid md:grid-cols-autofit h-full grid-cols-1 sm:grid-cols-2 sm:justify-items-center place-items-center">
        {/* <div className="top-0 mt-5 font-bold sm:left-1/2 sm:-translate-x-1/2 font-mono md:absolute sm:text-2xl text-lg">
          your cart
        </div> */}
        <div className="font-mono grid grid-cols-1 md:absolute sm:w-auto w-[40vw] left-5 md:top-1/2 md:-translate-y-1/2 text-sm sm:text-md text-black font-bold">
          <Link
            className="sm:p-2 p-1 sm:mt-2 m-1 rounded-md shadow-md bg-yellow-400 hover:-translate-y-1 text-center "
            to="/cart"
          >
            <button className="">View Cart</button>
          </Link>
          <button
            onClick={() => dispatch(showCartMenu())}
            className="sm:p-2 p-1 sm:mt-2 m-1 rounded-md shadow-md bg-yellow-400 hover:-translate-y-1"
          >
            Continue Shopping
          </button>
          <button className="sm:p-2 p-1 sm:mt-2 m-1 rounded-md shadow-md bg-yellow-400 hover:-translate-y-1">
            Checkout
          </button>
        </div>
        <div className="sm:w-[25vw] sm:h-[35vh] sm:justify-self-start w-[50vw] h-[20vh] overflow-y-scroll md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:absolute border border-black p-2">
          {cartPopupItems()}
        </div>
        <div className="font-mono sm:justify-self-end font-bold md:absolute sm:right-10 md:top-1/2 md:-translate-y-1/2 sm:text-2xl text-lg text-white">
          <h1>Subtotal</h1>
          <h1>Rs. {cartPrice}</h1>
        </div>
      </div>
    </motion.div>
  );
}

export default CartPopup;
