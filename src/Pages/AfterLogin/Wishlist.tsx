// import { ListCard } from '../../Components/LoginHome/MatchingProfiles/ProfileCard/ListCard'
import { useContext, useEffect, useState } from "react";
import { SuggestedProfiles } from "../../Components/LoginHome/SuggestedProfiles";
import { WishlistCard } from "../../Components/Wishlist/WishlistCard";
import { ProfileContext } from "../../ProfileContext";
// import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Pagination from "../../Components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

export const Wishlist = () => {
  const [sortBy, setSortBy] = useState<string>("datetime");
  useEffect(() => {
    sessionStorage.removeItem("searchvalue");
  }, []);

  const context = useContext(ProfileContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const getInitialPageNumber = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = searchParams.get('page');
    return pageFromUrl ? parseInt(pageFromUrl) : 1;
  };

  const { TotalRecords, totalPage } = context;
  // const [page, setPage] = useState<number>(1);
  const [page, setPage] = useState<number>(getInitialPageNumber());
  const perPage = 10;

  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());

    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [page, location.search, navigate]);

  const toggleSort = () => {
    setSortBy((prev) =>
      prev === "profile_id" ? "datetime" : "profile_id"
    );
    setPage(1); // reset to first page on sort change
  };



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
        <div className="flex justify-between items-center mb-5 max-md:flex-wrap max-md:gap-y-5">
          <div className="flex items-center gap-3">
            {/* Back Icon */}
            <button
              onClick={() => navigate(-1)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <IoArrowBackOutline className="w-6 h-6 text-vysyamalaBlackSecondary" />
            </button>

            {/* Title */}
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-md:text-[18px] flex items-center gap-2">
              Wishlist
              <span className="text-sm text-primary">
                ({TotalRecords?.toString()})
              </span>
            </h4>
            </div>
            <div className="flex items-center space-x-2">
              {sortBy === "profile_id" ? (
                <MdToggleOff
                  onClick={toggleSort}
                  className="text-5xl text-gray-400 cursor-pointer hover:text-primary transition"
                />
              ) : (
                <MdToggleOn
                  onClick={toggleSort}
                  className="text-5xl text-primary cursor-pointer hover:text-primary-dark transition"
                />
              )}
              <span className="text-lg font-medium text-primary whitespace-nowrap">
                {sortBy === "profile_id" ? "Sort by Profile ID" : "Sort by Date"}
              </span>
            </div>
          </div>
          {/* WishlistCard */}
          <div>
            <WishlistCard perPage={perPage} page={page} sortBy={sortBy}/>
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
