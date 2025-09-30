import React, { useState, useContext, SetStateAction, Dispatch, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { HiMiniViewColumns } from "react-icons/hi2";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
// import { BsSortDown } from "react-icons/bs";
// import { BsSortUp } from "react-icons/bs";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { Hearts } from "react-loader-spinner";
import { GridView } from "../LoginHome/MatchingProfiles/GridView";
import { ListView } from "../LoginHome/MatchingProfiles/ListView";
import { GridListView } from "../LoginHome/MatchingProfiles/GridListView";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import { ProfileContext } from "../../ProfileContext";
import Pagination from "../Pagination";
//import axios from "axios";
import apiClient from "../../API";
import { ProfileNotFound } from "../LoginHome/MatchingProfiles/ProfileNotFound";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface SearchResultsProps {
  onSearchAgain: () => void; // Call back function to trigger search again when user clicks on search again button
  calculatedPerPage: number;
  totalPages: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  pageNo: number;
  error: boolean;
  totalCount: number;
  responseMsg: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  //onSearchAgain,
  calculatedPerPage,
  totalPages,
  setPageNo,
  pageNo,
  error,
  //responseMsg,
}) => {
  // View state changed
  const [currentView, setCurrentView] = useState("gridlist");
  const [loading, setLoading] = useState(true);
  const context = useContext(ProfileContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    totalCount,
    setTotalCount, // <--- ADD THIS
    // setFromAge,
    // setToAge,
    // setFromHeight,
    // setToHeight,
    // setWorkLocation,
    // setAdvanceSelectedProfessions,
    // Set_Maritial_Status,
    // setAdvanceSelectedEducation,
    setAdvanceSearchData,
    // setSelectedIncomes,
    // setChevvai_dhosam,
    // setRehuDhosam,
    // setAdvanceSelectedBirthStar,
    // setNativeState,
    // setPeopleOnlyWithPhoto,
    advanceSearchData,
  } = context;


  useEffect(() => {
    // Set loading to false when data is available
    if (advanceSearchData) {
      setLoading(false);
    }
  }, [advanceSearchData]);

  // const noOfPages = Math.ceil(totalCount / perPage);

  // const handlePrevious = () => {
  //   setPageNumber((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNext = () => {
  //   setPageNumber((prev) => Math.min(prev + 1, noOfPages));
  // };

  // const searchAgain = () => {
  //   setFromAge(0);
  //   setToAge(0);
  //   setFromHeight(0);
  //   setToHeight(0);
  //   setWorkLocation("");
  //   setAdvanceSelectedProfessions([]);
  //   Set_Maritial_Status([]);
  //   setAdvanceSelectedEducation("");
  //   setSelectedIncomes("");
  //   setChevvai_dhosam("no");
  //   setRehuDhosam("no");
  //   setAdvanceSelectedBirthStar("");
  //   setNativeState([]);
  //   setPeopleOnlyWithPhoto(0);
  //   setAdvanceSearchData([]);
  //   onSearchAgain();
  // };
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  const [searchProfile, setSearchProfile] = useState<string>("");

  const HandlesearchProfile = async () => {
    try {
      const response = await apiClient.post(
        "/auth/Search_byprofile_id/",
        {
          profile_id: loginuser_profileId,
          search_profile_id: searchProfile,
        }
      );
      if (response.status == 200) {
        console.log(response.data.data);
        setAdvanceSearchData(response.data.data);
        setTotalCount(response.data.data.length); // <--- ADD THIS LINE
        // setAdvanceSearchData()
      }
    } catch (error) {
      console.log(error);
      setAdvanceSearchData([]);
      setTotalCount(0); // <--- ADD THIS LINE
    }
  };
  console.log(advanceSearchData, "advanceSearchData");
  console.log("totalCount", totalCount)

  return (
    <div>
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline
            className="text-[24px] mr-2 cursor-pointer"
            // onClick={searchAgain}
            onClick={() => navigate('/Search')}
          />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            {" "}
            Search results
            <span className="text-sm text-primary"> ({totalCount})</span>
          </h4>
        </div>

        <div className="relative flex justify-center items-center bg-white rounded-lg p-1.5 shadow-md">
          <input
            onChange={(e) => setSearchProfile(e.target.value)}
            type="text"
            name=""
            id=""
            placeholder="Search by Profile ID"
            className="w-full rounded-l-lg px-10 py-3 focus-visible:outline-none"
          />
          <HiOutlineSearch className="absolute left-3 top-5 text-[22px] text-ashSecondary" />

          <button
            onClick={HandlesearchProfile}
            className="w-[200px] bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3"
          >
            Find Match
          </button>
        </div>

        {/* Icon Sort */}
        <div className="flex justify-between items-center mt-10">
          {/* View icons */}
          <div className="flex justify-start items-start">
            <div
              className={`border-[1px] border-ashSecondary rounded-l-md p-2 cursor-pointer
                ${currentView === "gridlist" ? "" : ""}`}
              title="Gridlist View"
              onClick={() => setCurrentView("gridlist")}
            >
              <HiMiniViewColumns
                className={`text-[22px] 
                    ${currentView === "gridlist"
                    ? "text-secondary"
                    : "text-ashSecondary"
                  } hover:text-secondary}`}
              />
            </div>
            <div
              className={`border-[1px] border-ashSecondary p-2 cursor-pointer 
                ${currentView === "list" ? "" : ""}}`}
              title="List View"
              onClick={() => setCurrentView("list")}
            >
              <ImMenu
                className={`text-[22px] ${currentView === "list"
                  ? "text-secondary"
                  : "text-ashSecondary"
                  } hover:text-secondary}`}
              />
            </div>
            <div
              className={`border-[1px] border-ashSecondary rounded-r-md p-2 cursor-pointer
                 ${currentView === "grid" ? "" : ""}}`}
              title="Grid View"
              onClick={() => setCurrentView("grid")}
            >
              <BsFillGrid3X3GapFill
                className={`text-[22px] ${currentView === "grid"
                  ? "text-secondary"
                  : "text-ashSecondary"
                  } hover:text-secondary}`}
              />
            </div>
          </div>

          {/* Sort my date */}
          <div className="flex justify-start items-center">
            <HiAdjustmentsVertical className="text-[22px] text-ashSecondary cursor-pointer hover:text-secondary mr-2" />
            {/* <BsSortUp /> */}
            <p className="text-vysyamalaBlack font-semibold">Advanced Filter</p>
          </div>
        </div>

        {loading ? (
          <div className="w-fit mx-auto py-40">
            <Hearts
              height="100"
              width="100"
              color="#FF6666"
              ariaLabel="hearts-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p className="text-sm">Please wait...</p>
          </div>
          // ) : !error &&
          // ((advanceSearchData && advanceSearchData.length >= 1) ||
          //   responseMsg !== "At least one search criterion must be provided.") && (
        ) : !error && advanceSearchData && advanceSearchData.length > 0 ? (
          <div>
            {/* Conditionally render views based on currentView state */}
            {currentView === "gridlist" && (
              <GridListView
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                searchResult={undefined}
                searchvalues={undefined}
              />
            )}
            {currentView === "list" && (
              <ListView
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                star={undefined}
                matching_score={undefined}
                searchvalues={undefined}
              />
            )}
            {currentView === "grid" && (
              <GridView
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                searchResult={undefined}
                searchvalues={undefined}
              />
            )}
          </div>
        )
          : (
            <ProfileNotFound />
          )
        }

        {/* Pagination */}
        {error === false &&
          advanceSearchData &&
          advanceSearchData.length > 1 && (
            <Pagination
              toptalPages={totalPages}
              dataPerPage={calculatedPerPage}
              totalRecords={totalCount}
              setPageNumber={setPageNo}
              pageNumber={pageNo}
            />
          )}
      </div>
      <SuggestedProfiles />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
