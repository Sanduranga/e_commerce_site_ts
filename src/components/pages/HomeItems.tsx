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
  const dispatch = useDispatch();

  const { items, pageNo } = useSelector((state: RootState) => state.items);
  const buyGoods = useSelector((state: RootState) => state.cart.cartItems);
  const totalCartPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  // const showCart = useSelector((state: RootState) => state.cart.cartMenu);

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

  interface buyItemstype {
    price: number;
    id: string;
    url: string;
    details: string;
  }

  const buyHomeItem = (
    price: number,
    id: string,
    url: string,
    details: string
  ) => {
    setTotalPrice((prevState) => prevState + price);
    setBuyHomeItems([...buyHomeItems, { price, id, url, details }]);
    dispatch(itemCountPlus());
    dispatch(showCartMenu());
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
              buyHomeItem(item.width, item.id, item.download_url, item.author)
            }
            className="text-center font-bold text-white bg-green-900 rounded-lg p-1 w-auto"
          >
            Buy Item
          </button>
        </div>
      </div>
    ));

  return (
    <div className="flex justify-center flex-col items-center md:grid-cols-1 relative sm:gap-20 gap-7">
      <Slider />
      <div className="grid gap-1 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 px-3 md:px-5 ">
        {homeItemMap()}
        <Pagenation />
      </div>
      <div>
        <CartPopup />
      </div>
    </div>
  );
};

export default HomeItems;