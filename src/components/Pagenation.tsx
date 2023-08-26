
import { pageNext, pagePrev } from "../redux/features/HomeItemSlice"
import { useAppSelector, useAppDispatch } from "../redux/store"

export default function Pagenation() {

    const pageNo = useAppSelector((state => state.items.pageNo))
    const dispatch = useAppDispatch()

    const handlePrev = () => {
        if (pageNo > 1)
            dispatch(pagePrev())
    }
    const handleNext = () => {
        dispatch(pageNext())
    }

    return (
        <div className="flex items-center justify-center my-5">
            <button onClick={handlePrev} className="py-1 px-4 bg-transparent mr-1 text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                Prev.
            </button>
            <button onClick={handleNext} className="py-1 px-4 bg-transparent ml-1 text-red-600 font-semibold border border-red-600 rounded hover:bg-red-600 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                Next
            </button>
        </div>
    )
}