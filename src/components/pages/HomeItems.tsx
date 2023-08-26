import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchData } from "../../redux/features/HomeItemSlice";
import Pagenation from "../Pagenation";
import { buyItems, cartPrice, itemCountPlus } from "../../redux/features/CartSlice";


const HomeItems = () => {

  const dispatch = useAppDispatch();

  const { items, pageNo } = useAppSelector((state) => state.items)
  const buyGoods = useAppSelector(state => state.buyGoods.buyItems)
  const totalCartPrice = useAppSelector(state => state.buyGoods.totalPrice)

  const [buyHomeItems, setBuyHomeItems] = useState<items[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    dispatch(fetchData(pageNo))
    setBuyHomeItems(buyGoods)
    setTotalPrice(totalCartPrice) 
  }, [dispatch, pageNo]);

  type items = {
    price: number;
    id: string;
    url: string;
  };

  const buyHomeItem = (price: number, id: string, url: string) => {
    setTotalPrice(prevState => prevState + price)
    setBuyHomeItems([...buyHomeItems, { price, id, url}])
    dispatch(itemCountPlus())
    
  }

  useEffect(() => {        
    dispatch(buyItems(buyHomeItems))
    dispatch(cartPrice(totalPrice))
  },[ dispatch, buyHomeItems ])

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
        className="flex flex-col rounded-lg overflow-hidden font-mono p-4 shadow-lg"
      >
        <img
          src={item.download_url}
          alt="HomeItemImages"
          className="h-[30vh] w-full object-cover"
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
            className="text-center font-bold text-white bg-green-900 rounded-lg p-1 w-1/4"
          >
            Buy Item
          </button>
        </div>
      </div>
    ))
  

  return (
    <div className="grid grid-flow-col-dense">
      <div>
        <h4>ddddddddddd</h4>
      </div>
      <div className=" col-span-2">
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {homeItemMap()}
          <Pagenation />
        </div>
      </div>
    </div>
  );
};

export default HomeItems;
