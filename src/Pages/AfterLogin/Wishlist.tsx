// import { ListCard } from '../../Components/LoginHome/MatchingProfiles/ProfileCard/ListCard'
import { useContext, useEffect, useState } from "react";
import { SuggestedProfiles } from "../../Components/LoginHome/SuggestedProfiles";
import { WishlistCard } from "../../Components/Wishlist/WishlistCard";
import { ProfileContext } from "../../ProfileContext";
// import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Pagination from "../../Components/Pagination";

export const Wishlist = () => {
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

  // const startResult = (page - 1) * perPage + 1;

  // Ensure endResult doesn't exceed TotalRecords
  // const endResult = Math.min(page * perPage, TotalRecords);


  

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
      <div className="container mx-auto py-10">
        <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold mb-5 max-md:text-[18px]">
          Wishlist
          <span className="text-sm text-primary">
            {" "}
            ({TotalRecords?.toString()})
          </span>
        </h4>

        {/* WishlistCard */}
        <div>
          <WishlistCard perPage={perPage} page={page} />
          {/* <WishlistCard />
                    <WishlistCard /> */}

          <Pagination
            pageNumber={page}
            setPageNumber={setPage}
            totalRecords={TotalRecords}
            dataPerPage={perPage}
            toptalPages={totalPage}
          />


        </div>
      </div>

      {/* Suggested Profiles */}

      <SuggestedProfiles />
    </div>
  );
};
