import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBack2Fill } from "react-icons/ri";
import {
  boughtItems,
  cartPrice,
  itemCountMinus,
} from "../../redux/features/CartSlice";
import { RootState } from "../../redux/store";

const Cart = () => {
  const buyGoods = useSelector((state: RootState) => state.cart.cartItems);
  const totalCartPrice = useSelector(
    (state: RootState) => state.cart.totalPrice
  );
  const dispatch = useDispatch();
  // const [cart, setCart] = useState();
  let updatedCartPrice = totalCartPrice;

  interface itemTypes {
    price: number;
    id: string;
    url: string;
    details: string;
  }
  const handleDeleteBoughtItems = (indexToDelete: number, price: number) => {
    dispatch(itemCountMinus());
    const updatedCart = buyGoods.filter(
      (updatedGoods, index) => index !== indexToDelete
    );
    dispatch(boughtItems(updatedCart));
    updatedCartPrice = totalCartPrice - price;
    dispatch(cartPrice(updatedCartPrice));
  };

  function buyItems() {
    return buyGoods.map((boughtItems: itemTypes, index) => (
      <div
        key={boughtItems.id}
        className="text-black mt-2 flex justify-center md:text-xl border-b-4 py-1 items-center"
      >
        <p>{boughtItems.details}</p>
        <img
          className="rounded-md mx-3 md:w-1/12 md:h-1/6 w-10 h-8"
          src={boughtItems.url}
          alt="images"
        />
        <div className="text-black"> {boughtItems.price} </div>
        <h1
          className="md:ml-5 ml-2 bg-red-600 text-white"
          onClick={() => handleDeleteBoughtItems(index, boughtItems.price)}
        >
          <RiDeleteBack2Fill />
        </h1>
      </div>
    ));
  }

  return (
    <div className="w-full">
      <div className="lg:w-[80vw] w-[90vw] mx-auto rounded-lg lg:p-10 p-5 overflow-hidden bg-white mt-5 lg:flex md:justify-evenly min-h-[80vh]">
        <div className=" lg:w-3/6 w-full border-4 lg:p-5 p-2 h-[60vh] overflow-y-scroll lg-mb-0 mb-5">
          {buyItems()}
        </div>
        <div className="flex items-center bg-gray-400 shadow-lg rounded-md h-20 w-auto p-5">
          <h3 className="font-bold md:text-xl text-md text-center text-black">
            Total Price: Rs.{totalCartPrice}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
