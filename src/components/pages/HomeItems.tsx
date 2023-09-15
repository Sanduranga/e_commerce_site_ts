import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchData } from "../../redux/features/HomeItemSlice";
import Pagenation from "../Pagenation";
import {
  boughtItems,
  cartPrice,
  itemCountPlus,
  showCartMenu,
} from "../../redux/features/CartSlice";
import { motion } from "framer-motion";

const HomeItems = () => {
  const dispatch = useAppDispatch();

  const { items, pageNo } = useAppSelector((state) => state.items);
  const buyGoods = useAppSelector((state) => state.buyGoods.boughtItems);
  const totalCartPrice = useAppSelector((state) => state.buyGoods.totalPrice);
  const showCart = useAppSelector((state) => state.buyGoods.cartMenu);

  const [buyHomeItems, setBuyHomeItems] = useState<itemstype[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchData(pageNo));
    setBuyHomeItems(buyGoods);
    setTotalPrice(totalCartPrice);
  }, [dispatch, pageNo]);

  useEffect(() => {
    dispatch(boughtItems(buyHomeItems));
    dispatch(cartPrice(totalPrice));
  }, [dispatch, buyHomeItems, totalPrice]);

  interface itemstype {
    price: number;
    id: string;
    url: string;
  }

  const buyHomeItem = (price: number, id: string, url: string) => {
    setTotalPrice((prevState) => prevState + price);
    setBuyHomeItems([...buyHomeItems, { price, id, url }]);
    dispatch(itemCountPlus());
  };

  type itemTypes = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  };

  const homeItemMap = () =>
    items.map((item: itemTypes) => (
      <div
        key={item.id}
        className="flex font-bold  flex-col rounded-lg bg-gradient-to-b mt-3 from-yellow-300/20 to-yellow-600/50 overflow-hidden font-mono p-4 shadow-lg"
      >
        <img
          src={item.download_url}
          alt="HomeItemImages"
          className="md:h-[30vh] h-[20vh] w-full object-cover"
        />
        <div>
          <span>Rs.{item.width}</span>
        </div>
        <div>
          <span>Discount Rs.{item.height}</span>
        </div>
        <div>
          <button
            onClick={() => buyHomeItem(item.width, item.id, item.download_url)}
            className="text-center font-bold text-white bg-green-900 rounded-lg p-1 md:w-1/3 w-[25vw]"
          >
            Buy Item
          </button>
        </div>
      </div>
    ));

  return (
    <div className="grid md:grid-flow-col-dense relative mx-5 px-3 md:px-0">
      <div>
        <h4>This is categeory side</h4>
      </div>
      <div className=" col-span-2">
        <div className="grid gap-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
          {homeItemMap()}
          <Pagenation />
        </div>
      </div>

      <motion.div
        className="h-screen bg-slate-400 absolute overflow-hidden"
        initial={{
          width: 0,
          right: 0,
        }}
        animate={{
          width: showCart ? "30%" : "0",
        }}
      >
        <button
          className=" absolute left-4 top-2 border-2 border-blue-200 px-2 py-1 text-blue-200 hover:text-red-800 hover:border-red-800"
          onClick={() => dispatch(showCartMenu())}
        >
          X
        </button>
        <div className=" absolute bg-orange-500 w-screen h-screen">
          <div className=" absolute top-1/2 ">
            <button>View Cart</button>
            <button>Continue Shopping</button>
            <button>Checkout</button>
          </div>
          <div className=" absolute top-7  ">AAAAAAAAAA</div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeItems;
