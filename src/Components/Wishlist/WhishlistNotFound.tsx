
import WhishlistNotFoundImg from "../../assets/images/WhishlistNotFoundImg.png"

export const WhishlistNotFound = () => {
    return (
        <div className="container mx-auto  px-5">
            <div className="flex flex-col gap-4 items-center">
                <img src={WhishlistNotFoundImg} alt="noResultFound-img" />
                <h5 className="text-[20px] font-bold text-black text-center">No Profiles added to wishlist</h5>
                <p className="text-base text-black text-center">Sorry, we can’t find any profiles added to wishlist</p>
            </div>
        </div>
    )
}
