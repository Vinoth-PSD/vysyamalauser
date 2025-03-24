// import { IoArrowBackOutline } from "react-icons/io5";
// import { WishlistCard } from '../../Components/Wishlist/WishlistCard';
// import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles';

// interface DashBoardWishlistProps {
//     dashBoardAgain: () => void;
// }
// export const DashBoardWishlist: React.FC<DashBoardWishlistProps> = ({ dashBoardAgain }) => {
//     return (
//         <div className="bg-grayBg">
//             <div className="container mx-auto py-10">

//                 <div className="flex items-center mb-5">
//                     <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
//                     <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Wishlist
//                         <span className="text-sm text-primary"> (05)</span>
//                     </h4>
//                 </div>

//                 {/* ListCard */}
//                 <div>
//                     <WishlistCard page={0} perPage={0} />
//                     {/* <ListCard />
//                     <ListCard />
//                     <ListCard />
//                     <ListCard /> */}
//                 </div>
//             </div>
//             {/* Suggested Profiles */}
//             <SuggestedProfiles />

//         </div>
//     )
// }


// import { Wishlist } from "../../Pages/AfterLogin/Wishlist"


// export const DashBoardWishlist: React.FC = () => {
//     return (
//         <div>
          
// <Wishlist/>
//         </div>
//     )
// }



import { useContext, useEffect, useState } from "react";
import { SuggestedProfiles } from "../../Components/LoginHome/SuggestedProfiles";
import { WishlistCard } from "../../Components/Wishlist/WishlistCard";
import { ProfileContext } from "../../ProfileContext";
import Pagination from "../../Components/Pagination";
import { IoArrowBackOutline } from "react-icons/io5";
interface DashBoardWishlistProps {
    dashBoardAgain: () => void;
}

export const DashBoardWishlist:React.FC<DashBoardWishlistProps> = ({ dashBoardAgain }) => {
  useEffect(() => {
    sessionStorage.removeItem("searchvalue");
  }, []);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { TotalRecords, totalPage } = context;
  const [page, setPage] = useState<number>(1);
  const perPage = 10;


  

  const {
    setFromAge,
    setToAge,
    setFromHeight,
    setToHeight,
    setWorkLocation,
    setAdvanceSelectedProfessions,
    Set_Maritial_Status,
    setAdvanceSelectedEducation,

    setSelectedIncomes,
    setChevvai_dhosam,
    setRehuDhosam,
    setAdvanceSelectedBirthStar,
    setNativeState,
    setPeopleOnlyWithPhoto,
    setAdvanceSearchData
  } = context;

  useEffect(() => {
    setFromAge(0);
    setToAge(0);
    setFromHeight(0);
    setToHeight(0);
    setWorkLocation("");
    setAdvanceSelectedProfessions([]);
    Set_Maritial_Status([]);
    setAdvanceSelectedEducation("");
    setSelectedIncomes("");
    setChevvai_dhosam("no");
    setRehuDhosam("no");
    setAdvanceSelectedBirthStar("");
    setNativeState([]);
    setPeopleOnlyWithPhoto(0);
    setAdvanceSearchData([]);
  }, []);

return (
  <div className="bg-grayBg">
    <div className="container mx-auto py-10 max-md:py-8">
      
        <div className="flex items-center mb-5">
          <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            Wishlist
            <span className="text-sm text-primary"> ({TotalRecords?.toString()})</span>
          </h4>
        </div>

        {/* {/ WishlistCard /} */}
        <div>
          <WishlistCard perPage={perPage} page={page} />

          <Pagination
            pageNumber={page}
            setPageNumber={setPage}
            totalRecords={TotalRecords}
            dataPerPage={perPage}
            toptalPages={totalPage}
          />
        </div>
     

      {/* {/ Suggested Profiles /} */}
      <SuggestedProfiles />
    </div>
  </div>
);
};
