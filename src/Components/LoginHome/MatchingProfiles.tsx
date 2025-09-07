import { useState, useEffect, useRef, useContext } from "react";
// import { HiOutlineSearch } from "react-icons/hi";
// import { FaSuitcase } from "react-icons/fa";
// import { IoCalendar } from "react-icons/io5";
// import { FaLocationDot } from "react-icons/fa6";
import { HiMiniViewColumns } from "react-icons/hi2";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { ImMenu } from "react-icons/im";
import { BsSortDown } from "react-icons/bs";
// import { BsSortUp } from "react-icons/bs";
import { GridView } from "./MatchingProfiles/GridView";
import { ListView } from "./MatchingProfiles/ListView";
import { GridListView } from "./MatchingProfiles/GridListView";
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import FilterIcon from "../../assets/icons/FilterIcon.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import professionIcon from "../../assets/icons/professionIcon.png";
import ageIcon from "../../assets/icons/ageIcon.png";
import locationIcon from "../../assets/icons/locationIcon.png";
import { ProfileContext } from "../../ProfileContext";
import { fetchProfiles, fetchSearchProfiles } from "../../commonapicall";
import axios from "axios";
// import { AdvancedSearchPopup } from "./MatchingProfiles/FilterPopup/AdvancedSearchPopup";
// import { FiXCircle } from "react-icons/fi";
//import { LuFilterX } from "react-icons/lu";
// import { number } from "zod";
import Pagination from "../Pagination";
// import Spinner from "../Spinner";
import { ToastNotification } from "../Toast/ToastNotification";
import { IoMdArrowDropdown } from "react-icons/io";
import apiClient from "../../API";
import { Hearts } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
// import { log } from "console";

// const items = [
//     { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//     { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//     { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
//   ];

// export interface SearchResultProps {
//   profile_name: string;
//   profile_id: any;
//   profile_age: any;
//   height: any;
//   profile_img: string;
//   searchResult: any; // Replace 'any' with the appropriate type if you know the structure
// }
interface ProfesPrefType {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface State {
  State_Pref_id: string;
  State_id: string; // Adjust the type if it's a number or another type
  State_name: string;
}
export interface SearchResultProps {
  profile_name: string;
  profile_id: string;
  profile_age: string;
  height: string;
  profile_img?: string;
  matching_score?: number;
}

sessionStorage.removeItem("photolock");
sessionStorage.removeItem("photolockval");

export const MatchingProfiles = () => {
  const context = useContext(ProfileContext);
  const scrollRef = useRef<HTMLDivElement>(null); // Type the ref as HTMLDivElement
  // State for managing scrolling
  const [shouldScroll, setShouldScroll] = useState(false);
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    MatchingProfileperPage,
    MatchingProfilepageNumber,
    MatchingProfiletotalCount,
    setMatchingProfilePageNumber,
    setMatchingProfileTotalCount,
    toggleSortOrder,
    sortOrder,
  } = context;


  const noOfPages = Math.ceil(
    MatchingProfiletotalCount / MatchingProfileperPage
  );

  // View state changed
  const [currentView, setCurrentView] = useState("gridlist");

  // Function to sort profiles by name and toggle order

  // Advanced Popup Show
  let showAdvancedSearchPopup;
  // const [showAdvancedSearchPopup, setShowAdvancedSearchPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [Get_Profes_Pref, setGet_Profes_Pref] = useState<ProfesPrefType[]>([]);
  const [profession, setProfession] = useState<string>("");

  const handleAdvancedSearchPopup = () => {
    setProfession("");
    setSelectAge("");
    setSelectedLocation("");
    // setSelectedLocation("");
    setSearchProfileId("");
    sessionStorage.removeItem("searchvalue");
  };

  const [states, setStates] = useState<State[]>([]); // Adjust the State type according to the response structure
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectAge, setSelectAge] = useState<string>("");
  //console.log(selectedLocation);

  // const closeAdvancedSearchPopup = () => {
  //   setShowAdvancedSearchPopup(false);
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
  //     closeAdvancedSearchPopup();
  //   }
  // };

  const [searchProfileId, setSearchProfileId] = useState("");
  const [, setSearchStatus] = useState<number>();
  const [searchResult, setSearchResult] = useState<any[]>([]);

  // useEffect(() => {
  //   if (showAdvancedSearchPopup) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showAdvancedSearchPopup]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder
        );

        setMatchingProfileTotalCount(data.total_count);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchData();
  }, [
    loginuser_profileId,
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
    setMatchingProfileTotalCount,
  ]);

  const pegeDataCount = 20;
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalCountSearch, setCount] = useState<number>(0);

  const totalPageCount = Math.ceil(Number(totalCount) / pegeDataCount) || 0;
  //const [paginationValue, setPaginationValue] = useState(1);
  const [loading, setLoading] = useState(false);
  // const matchingProfileRef = useRef<HTMLDivElement>(null); // Define the ref

  const navigate = useNavigate();
  const location = useLocation();

  // Get page number from URL query parameter or default to 1
  const getInitialPageNumber = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = searchParams.get('page');
    return pageFromUrl ? parseInt(pageFromUrl) : 1;
  };

  const [paginationValue, setPaginationValue] = useState<number>(getInitialPageNumber());

  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', paginationValue.toString());

    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [paginationValue, location.search, navigate]);

  useEffect(() => {
    handleFindMatch()
  }, [sortOrder]);

  const handleFindMatch = async () => {
    setLoading(true); // Show the spinner while the search is being processed

    try {
      const result = await fetchSearchProfiles(
        searchProfileId,
        profession,
        selectAge,
        selectedLocation,
        paginationValue,
        sortOrder
      );
      ////console.log("count", result.total_count);
      setCount(result.total_count);
      // //console.log("Search result:", result.profiles);
      // //console.log("Search value:", result.search_result);
      // //console.log("Search status:", result.Status);
      sessionStorage.setItem("searchvalue", result.search_result);

      setTotalCount(result.total_count);
      setSearchStatus(result.Status);
      setSearchResult(result.profiles); // Set the response data in the state
      setShouldScroll(true);

    } catch (error) {
      console.error("Search failed:", error);
      // Handle error as needed
    }
    finally {
      setLoading(false); // Hide the spinner once the search completes
    }
  };


  useEffect(() => {

    if (shouldScroll && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScroll(false); // Reset the flag after scrolling
    }
  }, [searchResult, shouldScroll]);

  useEffect(() => {
    if (paginationValue > 1) {
      handleFindMatch();
    }
  }, [paginationValue]);
  //console.log(searchResult);
  //console.log(matchingProfileSearchId, "matchingProfileSearchId");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchProfileId(value || "");
    sessionStorage.removeItem("searchvalue");

    if (value.trim() === "") {
      // Clear the session storage when the input field is empty
      sessionStorage.removeItem("searchvalue");
    }
  };
  const searchvalue = sessionStorage.getItem("searchvalue") || " ";

  useEffect(() => {
    const fetchProfesPref = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Profes_Pref/"
        );

        // Assuming response.data is an object, transform it to an array
        const profesPrefArray = Object.values(
          response.data
        ) as ProfesPrefType[];

        setGet_Profes_Pref(profesPrefArray);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchProfesPref();
  }, []);

  //state

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_State_Pref/"
        );
        // Assuming response.data is an object, transform it to an array of State
        const statesArray = Object.values(response.data) as State[];
        setStates(statesArray);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };
    fetchStates();
  }, []);

  if (loading) {
    return (
      // <div className="flex justify-center items-center h-screen">
      //   <Spinner />
      // </div>
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
    );
  }

  return (
    <div className=" max-xl:py-4 max-lg:py-3 bg-grayBg">
      <div className="container mx-auto py-10 max-lg:py-8 max-md:py-6">
        <div>
          <h4 className="text-[24px] text-vysyamalaBlack font-bold mb-8 max-lg:text-[20px] max-md:text-[18px]" ref={scrollRef}>
            Matching Profiles&nbsp;
            <span className="text-sm text-primary font-bold">
              {searchvalue === "1"
                ? `(${totalCountSearch || 0})`
                : `(${MatchingProfiletotalCount || 0})`}
            </span>



          </h4>
        </div>

        <div className="bg-white grid grid-cols-6 justify-center items-center rounded-lg  gap-4 shadow-profileCardShadow mb-5 px-2 py-[4px] divide-x-[1.5px] divide-ashSecondary max-lg:flex-wrap max-lg:col-gap-5 max-lg:space-x-0 max-xl:grid-cols-3 max-xl:items-end max-sm:grid-cols-1 max-sm:gap-1 max-sm:divide-x-0 max-sm:divide-y-[1px] max-sm:divide-ashSecondary">
          <div className="relative flex items-center col-span-2 max-sm:col-span-1">
            <img src={searchIcon} className="text-[22px] text-ashSecondary" />
            <input
              type="text"
              placeholder="Search Profile ID on Matching Profiles"
              className="w-full bg-white text-sm text-primary  pl-3 py-3 focus-visible:outline-0 max-xl:border-0"
              value={searchProfileId}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative w-full px-[18px] flex items-center">
            <img src={professionIcon} className="text-[22px] text-ashSecondary" />
            <select
              value={profession} // Bind the value of the select to the profession state
              onChange={(e) => setProfession(e.target.value)}
              name=""
              id=""
              className="w-full  text-sm text-primary bg-white pl-3 py-3 cursor-pointer focus-visible:outline-0 appearance-none"
            >
              <option value="" selected disabled>
                Profession
              </option>
              {Get_Profes_Pref.map((profession) => (
                <option
                  key={profession.Profes_Pref_id}
                  value={profession.Profes_Pref_id}
                >
                  {profession.Profes_name}
                </option>
              ))}
            </select>
            <div className="absolute right-1 top-4 ">
              <IoMdArrowDropdown className="text-ashSecondary" />
            </div>
          </div>

          <div className="relative w-full px-[18px] flex items-center">
            <img src={ageIcon} className="text-[22px] text-ashSecondary" />
            <select
              value={selectAge}
              onChange={(e) => setSelectAge(e.target.value)}
              name=""
              id=""
              className="w-full  text-sm text-primary bg-white pl-3 py-3 cursor-pointer focus-visible:outline-0 appearance-none"
            >
              <option value="" selected disabled>
                Age Difference
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <div className="absolute right-1 top-4 ">
              <IoMdArrowDropdown className="text-ashSecondary" />
            </div>
          </div>

          <div className="relative w-full px-[18px] flex items-center">
            <img src={locationIcon} className="text-[22px] text-ashSecondary" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              name=""
              id=""
              className="w-full text-sm text-primary bg-white pl-3 py-3 cursor-pointer focus-visible:outline-0 appearance-none"
            >
              <option value="" selected disabled>
                Location
              </option>
              {states.map((state) => (
                <option key={state.State_Pref_id} value={state.State_Pref_id}>
                  {state.State_name}
                </option>
              ))}
            </select>
            <div className="absolute right-1 top-4 ">
              <IoMdArrowDropdown className="text-ashSecondary" />
            </div>
          </div>

          <div className="w-full flex items-center justify-end max-xl:lg max-sm:flex-col">
            <div onClick={handleAdvancedSearchPopup} className="w-fit mx-4 my-3" title="Remove Filter">
              {/*<FiFilter className="text-[22px] text-secondary mx-5 my-3 cursor-pointer" />*/}
              <div className="">
                <img src={FilterIcon} className="w-8 text-main  cursor-pointer max-sm:w-5" />
              </div>


              {showAdvancedSearchPopup && (
                <div
                  ref={popupRef}
                  onClick={(e) => e.stopPropagation()}
                  className="relative"
                >
                  {/* <AdvancedSearchPopup closePopup={closeAdvancedSearchPopup} /> */}
                </div>
              )}
            </div>
            <div className="w-full">
              <button
                // disabled={!searchProfileId}
                className="w-full  bg-gradient text-white text-sm   rounded-r-[6px] font-semibold px-[26px] py-[14px]   max-xl:px-4 max-sm:rounded-md"
                onClick={handleFindMatch}
              >
                Find Match
              </button>
            </div>


          </div>
        </div>

        {/* Icon Sort */}
        <div className="flex justify-between items-center pb-3">
          {/* View icons */}
          <div className="flex justify-start items-start border-[1px] border-ashSecondary rounded-[4px]">
            <div
              className={`border-r-[1px] border-ashSecondary rounded-l-md p-2 cursor-pointer
        ${currentView === "gridlist" ? "bg-lightGray" : ""}`}
              title="Gridlist View"
              onClick={() => setCurrentView("gridlist")}
            >
              <HiMiniViewColumns
                className={`text-[22px] 
          ${currentView === "gridlist" ? "text-secondary" : "text-ashSecondary"
                  } 
          hover:text-secondary`}
              />
            </div>
            <div
              className={`border-r-[1px] border-ashSecondary p-2 cursor-pointer
        ${currentView === "list" ? "bg-lightGray" : ""}`}
              title="List View"
              onClick={() => setCurrentView("list")}
            >
              <ImMenu
                className={`text-[22px] 
          ${currentView === "list" ? "text-secondary" : "text-ashSecondary"} 
          hover:text-secondary`}
              />
            </div>
            <div
              className={`border-r-none border-ashSecondary  p-2 cursor-pointer
        ${currentView === "grid" ? "bg-lightGray" : ""}`}
              title="Grid View"
              onClick={() => setCurrentView("grid")}
            >
              <BsFillGrid3X3GapFill
                className={`text-[22px] 
          ${currentView === "grid" ? "text-secondary" : "text-ashSecondary"} 
          hover:text-secondary`}
              />
            </div>
          </div>

          <button
            onClick={toggleSortOrder}
            className="flex justify-start items-center"
          >
            <BsSortDown className="text-[22px] text-main cursor-pointer hover:text-secondary mr-2" />
            {/* You can uncomment this if you have an alternative sorting direction */}
            {/* <BsSortUp /> */}
            <p className="text-vysyamalaBlack text-sm font-normal">Sort by date</p>
          </button>
        </div>

        <div className="jhjgj" id="temp">
          {/* Conditionally render views based on currentView state */}
          {/* {currentView === "gridlist" && <GridListView />}
          {currentView === "list" && <ListView />}
          {currentView === "grid" && <GridView />} */}

          {currentView === "gridlist" && (
            <GridListView
              searchResult={searchResult}
              profile_name={""}
              profile_id={undefined}
              profile_age={undefined}
              height={undefined}
              profile_img={""}
              searchvalues={searchResult}
            />
          )}
          {currentView === "grid" && (
            <GridView
              searchResult={searchResult}
              profile_name={""}
              profile_id={undefined}
              profile_age={undefined}
              height={undefined}
              profile_img={""}
              searchvalues={searchResult} />
          )}

          {currentView === "list" && (
            <ListView
              profile_name={""}
              profile_id={undefined}
              profile_age={undefined}
              height={undefined}
              star={undefined}
              matching_score={undefined}
              profile_img={""}
              searchvalues={searchResult}
            />
          )}
        </div>

        {/* {searchvalue === "1" && (
        <div>
          <SearchCard profile={defaultProfile} searchvalues={searchResult} />
        </div>
        )} */}
        {/* Pagination */}

        {/* pagination for filter */}

        {searchvalue === "1" ? (
          <>
            <Pagination
              pageNumber={paginationValue}
              setPageNumber={setPaginationValue}
              totalRecords={Number(totalCount)}
              dataPerPage={pegeDataCount}
              toptalPages={totalPageCount}
            />
          </>
        ) : (
          <>
            <Pagination
              pageNumber={MatchingProfilepageNumber}
              setPageNumber={setMatchingProfilePageNumber}
              totalRecords={MatchingProfiletotalCount}
              dataPerPage={MatchingProfileperPage}
              toptalPages={noOfPages}
            />
          </>
        )}
      </div>
      <ToastNotification />
    </div>
  );
};
