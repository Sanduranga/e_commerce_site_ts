import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { RiDeleteBack2Fill } from "react-icons/ri";
import {
  boughtItems,
  cartPrice,
  itemCountMinus,
} from "../../redux/features/CartSlice";
import { useRef, useState } from "react";

const Cart = () => {
  const buyGoods = useAppSelector((state) => state.buyGoods.boughtItems);
  const totalCartPrice = useAppSelector((state) => state.buyGoods.totalPrice);
  const dispatch = useDispatch();
  const [cart, setCart] = useState();
  const updatedCartPrice = useRef(totalCartPrice);

  interface itemTypes {
    price: number;
    id: string;
    url: string;
  }
  const handleDeleteBoughtItems = (indexToDelete: number, price: number) => {
    dispatch(itemCountMinus());
    const updatedCart = buyGoods.filter(
      (updatedGoods, index) => index !== indexToDelete
    );
    dispatch(boughtItems(updatedCart));
    updatedCartPrice.current = totalCartPrice - price;
    dispatch(cartPrice(updatedCartPrice.current));
  };

  function buyItems() {
    return buyGoods.map((boughtItems: itemTypes, index) => (
      <div
        key={boughtItems.id}
        className="text-white mt-2 flex justify-center md:text-xl items-center"
      >
        <img
          className="rounded-md mr-3 md:w-1/12 md:h-1/6 w-10 h-8"
          src={boughtItems.url}
        />
        <div> {boughtItems.price} </div>
        <h1
          className="md:ml-5 ml-2"
          onClick={() => handleDeleteBoughtItems(index, boughtItems.price)}
        >
          <RiDeleteBack2Fill />
        </h1>
      </div>
    ));
  }

  return (
    <div className="md:w-[80vw] w-[90vw] mx-auto rounded-lg md:p-10 p-5 overflow-hidden bg-gradient-to-br from-blue-500 to-gray-950 mt-10 flex md:justify-evenly min-h-[80vh] justify-between">
      <div className=" w-3/6">{buyItems()}</div>
      <div className="flex items-center">
        <h3 className="font-bold md:text-xl text-md text-center text-white">
          Total Price: Rs.{totalCartPrice}
        </h3>
      </div>
    </div>
    // <div className="mx-auto my-auto w-[60vw] h-[70vh] bg-slate-400 overflow-hidden flex items-center " >
    //     <div className=" w-32 h-24 bg-red-500 inline-block z-30 absolute">
    //         HhhH
    //     </div>
    //     <div className=" w-[100vw] h-32 bg-red-300 z-20 relative">
    //         AaaA
    //     </div>

    // </div>
  );
};

export default Cart;
