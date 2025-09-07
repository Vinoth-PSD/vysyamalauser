import { useContext, useEffect, useState } from "react";
import { SuggestedProfiles } from "../../Components/LoginHome/SuggestedProfiles";
import { WishlistCard } from "../../Components/Wishlist/WishlistCard";
import { ProfileContext } from "../../ProfileContext";
import Pagination from "../../Components/Pagination";
import { IoArrowBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
interface DashBoardWishlistProps {
  dashBoardAgain: () => void;
}

export const DashBoardWishlist: React.FC<DashBoardWishlistProps> = ({ }) => {
  useEffect(() => {
    sessionStorage.removeItem("searchvalue");
  }, []);

  const context = useContext(ProfileContext);

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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());

    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [page, location.search, navigate]);

  const handleBackToDashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto py-10 max-md:py-8">

        <div className="flex items-center mb-5">
          <IoArrowBackOutline onClick={handleBackToDashboard} className="text-[24px] mr-2 cursor-pointer" />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            Wishlist
            <span className="text-lg text-primary"> ({TotalRecords?.toString()})</span>
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
