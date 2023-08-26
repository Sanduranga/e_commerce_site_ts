
import { useAppSelector } from "../../redux/store"

const Cart = () => {

    const buyGoods = useAppSelector(state => state.buyGoods.buyItems)
    const totalCartPrice = useAppSelector(state => state.buyGoods.totalPrice)

    type itemTypes = {
        price: number,
        id: string,
        url: string,
    }

    function buyItems() {
        return buyGoods.map((buyItems: itemTypes) => (
            <div key={buyItems.id} className="flex justify-center items-center">
                <img className='mr-3 w-1/12 h-1/6' src={buyItems.url} />
                <div> {buyItems.price} </div>
            </div>
        ))
    }

    return (
        <div className="flex justify-evenly">
            <div className=" w-3/6">
                {buyItems()}
            </div>
            <div className="flex items-center">
                <h3>Your full amount = {totalCartPrice}</h3>
            </div>
        </div>
    )
}

export default Cart