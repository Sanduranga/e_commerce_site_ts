import { useEffect, useState } from "react";
import { fetchData } from "../../redux/features/HomeItemSlice";
import Pagenation from "../Pagenation";
import {
  boughtItems,
  cartPrice,
  itemCountPlus,
  showCartMenu,
} from "../../redux/features/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartPopup from "./CartPopup";
import Slider from "../Slider";

const HomeItems = () => {
  interface buyItemstype {
    price: number;
    id: string;
    url: string;
    details: string;
    noOfItems: number;
  }

  const dispatch = useDispatch();

  const { items, pageNo } = useSelector((state: RootState) => state.items);
  const buyGoods = useSelector((state: RootState) => state.cart.cartItems);
  const totalCartPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  const showCart = useSelector((state: RootState) => state.cart.cartMenu);

  const [buyHomeItems, setBuyHomeItems] = useState<buyItemstype[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchData(pageNo) as any);
    setBuyHomeItems(buyGoods);
    setTotalPrice(totalCartPrice);
  }, [dispatch, pageNo]);

  useEffect(() => {
    dispatch(boughtItems(buyHomeItems));
    dispatch(cartPrice(totalPrice));
  }, [dispatch, buyHomeItems, totalPrice]);

  const buyHomeItem = (
    price: number,
    id: string,
    url: string,
    details: string,
    noOfItems: number
  ) => {
    setTotalPrice((prevState) => prevState + price);
    setBuyHomeItems([...buyHomeItems, { price, id, url, details, noOfItems }]);
    dispatch(itemCountPlus());
    dispatch(showCartMenu());
  };

  const noOfItems = 1;
  type itemTypes = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  };

  const homeItemMap = () =>
    items.map((item: itemTypes, index) => (
      <div
        key={index}
        className="flex flex-col rounded-lg bg-gradient-to-b mt-3 from-gray-300/20 to-gray-600/50 overflow-hidden font-mono p-4 shadow-lg"
      >
        <img
          src={item.download_url}
          alt="HomeItemImages"
          className="md:h-[30vh] h-[20vh] w-full object-cover"
        />
        <div>
          <p>{item.author}</p>
          <span className="font-bold">
            LKR.<span className="text-xl font-bold">{item.width}</span>
          </span>
        </div>
        <div>
          <span>+Shipping: LKR.{item.height}</span>
        </div>
        <div>
          <button
            onClick={() =>
              buyHomeItem(
                item.width,
                item.id,
                item.download_url,
                item.author,
                noOfItems
              )
            }
            className="text-center font-bold text-black px-2 bg-yellow-400 rounded-lg py-1 w-auto shadow-md shadow-black"
          >
            Buy Item
          </button>
        </div>
      </div>
    ));

  return (
    <div className="flex relative justify-center flex-col items-center md:grid-cols-1  sm:gap-20 gap-7">
      <Slider />
      <div className="">
        <div
          className={`grid gap-1 grid-cols-2 ${
            showCart ? "blur-sm" : "blur-0"
          } sm:grid-cols-4 lg:grid-cols-5 px-3 md:px-5 `}
        >
          {homeItemMap()}
        </div>
        <Pagenation />
      </div>
      <div
        className={`bg-gray-800/70 h-full w-full absolute top-0 left-0 ${
          showCart ? "block" : "hidden"
        }`}
      ></div>

      <div>
        <CartPopup />
      </div>
    </div>
  );
};

export default HomeItems;
