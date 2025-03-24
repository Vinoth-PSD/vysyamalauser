import { useNavigate } from "react-router-dom";
import noResultFound from "../../../assets/images/noResultFound.png";

export const ProfileNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-auto w-[450px] max-sm:w-full">
            <div className="flex flex-col items-center">
                <img src={noResultFound} className="" alt="No Results Found" />
                <div className="text-center mt-8">
                    <h5 className="text-[24px] font-bold text-black mb-3">No Results Found</h5>
                    <p className="text-base text-black text-center">
                        Sorry, there are no results for this search. Please try another filter. Click
                        <span
                            className="text-base text-black border-b-2 border-bltext-black cursor-pointer"
                            onClick={() => navigate("/Search")}
                        >
                            {" "}advanced Search
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
};