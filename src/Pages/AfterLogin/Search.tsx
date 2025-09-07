// import { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AdvancedSearch } from "../../Components/LoginSearch/AdvancedSearch";
// import { SearchResults } from "../../Components/LoginSearch/SearchResults";
// import { Get_advance_search } from "../../commonapicall";
// import { ProfileContext } from "../../ProfileContext";
// import axios from "axios";

// const Search = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showResults, setShowResults] = useState(false);

//   // Initialize state based on URL
//   useEffect(() => {
//     if (location.pathname.includes("/SearchResults")) {
//       setShowResults(true);
//     } else {
//       setShowResults(false);
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     // Clear session storage when navigating away from the page
//     return () => {
//       setNoRecordsFound(false);
//       sessionStorage.removeItem("advance_search_data");
//     };
//   }, []);

//   useEffect(() => {
//     sessionStorage.removeItem("searchvalue");
//   }, []);

//   const context = useContext(ProfileContext);

//   if (!context) {
//     throw new Error("MyComponent must be used within a ProfileProvider");
//   }

//   const {
//     fromAge,
//     ToAge,
//     fromHeight,
//     perPage,
//     toHeight,
//     setTotalCount,
//     totalCount,
//     setSearchProfileData,
//     AdvanceselectedProfessions,
//     selectedAdvanceEducation,
//     selectedIncomes,
//     selectedMaxIncomes,
//     advanceSelectedBirthStar,
//     nativeState,
//     workLocation,
//     peopleOnlyWithPhoto,
//     maritial_Status,
//     fieldofstudy,
//     setAdvanceSearchData,
//     advanceSearchData,
//     chevvai_dhosam,
//     rehuDhosam,
//   } = context;

//   useEffect(() => {
//     if (advanceSearchData && advanceSearchData.length > 0) {
//       setShowResults(true);
//       navigate("/Search/SearchResults"); // Update URL when results are shown
//     }
//   }, [advanceSearchData, navigate]);

//   const [calculatedPerPage, setCalculatedPerPage] = useState<number>(0);
//   //const [pageNo, setPageNo] = useState<number>(1);
//   const [, setNoRecordsFound] = useState(false);
//   const [, setResponse] = useState<number>(0);
//   const [error, setError] = useState(false);
//   const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
//   const [responseMsg, setResponseMsg] = useState<string>("");



//   // Get page number from URL query parameter or default to 1
//   const getInitialPageNumber = () => {
//     const searchParams = new URLSearchParams(location.search);
//     const pageFromUrl = searchParams.get('page');
//     return pageFromUrl ? parseInt(pageFromUrl) : 1;
//   };

//   const [pageNo, setPageNo] = useState<number>(getInitialPageNumber());

//   useEffect(() => {
//     // Update URL when page changes
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.set('page', pageNo.toString());

//     // Replace current URL without causing navigation
//     navigate(`?${searchParams.toString()}`, { replace: true });
//   }, [pageNo, location.search, navigate]);

//   const handle_Get_advance_search = async () => {
//     try {
//       const response = await axios.post(Get_advance_search, {
//         profile_id: loginuser_profileId,
//         from_age: fromAge,
//         to_age: ToAge,
//         from_height: fromHeight,
//         to_height: toHeight,
//         per_page: perPage,
//         page_number: pageNo,
//         search_marital_status: maritial_Status.join(","),
//         field_ofstudy: fieldofstudy.join(","),
//         search_profession: AdvanceselectedProfessions.join(","),
//         search_education: selectedAdvanceEducation,
//         min_income: selectedIncomes,
//         max_income: selectedMaxIncomes,
//         chevvai_dhosam: chevvai_dhosam,
//         ragukethu_dhosam: rehuDhosam,
//         search_star: advanceSelectedBirthStar,
//         search_nativestate: nativeState.join(","),
//         search_worklocation: workLocation,
//         people_withphoto: peopleOnlyWithPhoto,
//       });

//       if (response.status === 200) {
//         setResponseMsg(response.data.message);
//         sessionStorage.setItem(
//           "advance_search_data",
//           JSON.stringify(response.data.data)
//         );

//         setAdvanceSearchData(response.data.data);
//         setTotalCount(response.data.total_count);
//         setCalculatedPerPage(response.data.calculated_per_page);
//         setResponse(response.status);
//         navigate("/Search/SearchResults"); // Navigate to results page
//       } else {
//         setNoRecordsFound(true);
//       }
//     } catch (error) {
//       console.log(error);
//       if (error) {
//         setError(true);
//       }
//     }
//   };

//   useEffect(() => {
//     if (showResults && pageNo > 1) {
//       handle_Get_advance_search();
//     }
//   }, [pageNo]);

//   useEffect(() => {
//     if (context) {
//       context.setAdvanceSearchData([]);
//     }
//     // Only reset to search form if we're not already on results page
//     if (!location.pathname.includes("/SearchResults")) {
//       setShowResults(false);
//     }
//   }, []);

//   useEffect(() => {
//     setSearchProfileData("");
//     setResponseMsg("");
//     setError(false);
//   }, []);

//   const handleSearchAgain = () => {
//     setShowResults(false);
//     navigate("/Search"); // Navigate back to search form
//   };

//   const handleFindMatch = () => {
//     setShowResults(true);
//     navigate("/Search/SearchResults"); // Navigate to results page
//   };

//   const totalPages = Math.ceil(totalCount / calculatedPerPage);

//   return (
//     <div className="bg-grayBg">
//       {showResults ? (
//         <SearchResults
//           responseMsg={responseMsg}
//           totalCount={totalCount}
//           error={error}
//           pageNo={pageNo}
//           setPageNo={setPageNo}
//           totalPages={totalPages}
//           calculatedPerPage={calculatedPerPage}
//           onSearchAgain={handleSearchAgain}
//           showResults={showResults}
//           handle_Get_advance_search={handle_Get_advance_search}
//         />
//       ) : (
//         <AdvancedSearch
//           handle_Get_advance_search={handle_Get_advance_search}
//           onFindMatch={handleFindMatch}
//         />
//       )}
//     </div>
//   );
// };

// export default Search;

import { useState, useEffect, useContext } from "react";
import { AdvancedSearch } from "../../Components/LoginSearch/AdvancedSearch";
import { SearchResults } from "../../Components/LoginSearch/SearchResults";
import { Get_advance_search } from "../../commonapicall";
import { ProfileContext } from "../../ProfileContext";
import axios from "axios";
// import { Console } from "console";
// import React from "react";

const Search = () => {
  // Toggle the showResults state when the user finds a match
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Clear session storage when navigating away from the page
    return () => {
      setNoRecordsFound(false);
      sessionStorage.removeItem("advance_search_data");
    };
  }, []);

  useEffect(() => {
    sessionStorage.removeItem("searchvalue");
  }, []);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    fromAge,
    ToAge,
    fromHeight,
    perPage,
    toHeight,
    setTotalCount,
    totalCount,
    setSearchProfileData,
    // setAdvanceSelectedProfessions,
    AdvanceselectedProfessions,
    selectedAdvanceEducation,
    selectedIncomes,
    selectedMaxIncomes,
    advanceSelectedBirthStar,
    nativeState,
    workLocation,
    peopleOnlyWithPhoto,
    maritial_Status,
    fieldofstudy,
    setAdvanceSearchData,
    advanceSearchData,
    chevvai_dhosam,
    rehuDhosam,
  } = context;

  useEffect(() => {
    if (advanceSearchData && advanceSearchData.length > 0) {
      setShowResults(true);
    }
  }, [advanceSearchData]);
  const [calculatedPerPage, setCalculatedPerPage] = useState<number>(0);
  const [pageNo, setPageNo] = useState<number>(1);
  const [, setNoRecordsFound] = useState(false);
  const [, setResponse] = useState<number>(0);
  const [error, setError] = useState(false);
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  const [responseMsg, setResponseMsg] = useState<string>("");
  const handle_Get_advance_search = async () => {
    try {
      const response = await axios.post(Get_advance_search, {
        profile_id: loginuser_profileId,
        from_age: fromAge,
        to_age: ToAge,
        from_height: fromHeight,
        to_height: toHeight,
        per_page: perPage,
        page_number: pageNo,
        search_marital_status: maritial_Status.join(","),
        field_ofstudy: fieldofstudy.join(","),
        search_profession: AdvanceselectedProfessions.join(","),
        search_education: selectedAdvanceEducation,
        min_income: selectedIncomes,
        max_income: selectedMaxIncomes,
        chevvai_dhosam: chevvai_dhosam,
        ragukethu_dhosam: rehuDhosam,
        search_star: advanceSelectedBirthStar,
        search_nativestate: nativeState.join(","),
        search_worklocation: workLocation,
        people_withphoto: peopleOnlyWithPhoto,
      });

      if (response.status === 200) {
        setResponseMsg(response.data.message);
        sessionStorage.setItem(
          "advance_search_data",
          JSON.stringify(response.data.data)
        );

        setAdvanceSearchData(response.data.data);
        setTotalCount(response.data.total_count);
        setCalculatedPerPage(response.data.calculated_per_page);
        setResponse(response.status);
      } else {
        setNoRecordsFound(true);
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setError(true);
      }
    }
  };
  // useEffect(() => {
  //   if (pageNo) {
  //     handle_Get_advance_search();
  //   }
  // }, [pageNo]);

  useEffect(() => {
    // Only call the API if we are on the results page (for pagination)
    if (showResults) {
      handle_Get_advance_search();
    }
  }, [pageNo]);

  useEffect(() => {
    // This runs only once when the component mounts
    if (context) {
      context.setAdvanceSearchData([]); // Clear any old search data from context
    }
    setShowResults(false); // Ensure the search form is always shown first
  }, []);

  useEffect(() => {
    setSearchProfileData("");
    setResponseMsg("");
    setError(false);
  }, []);

  const totalPages = Math.ceil(totalCount / calculatedPerPage);
  return (
    <div className="bg-grayBg">
      {/* {searchProfileData ? (
        <>
          <AdvanceSearchCard />
        </>
      ) : (
        <> */}{" "}
      {showResults ? (
        <SearchResults
          responseMsg={responseMsg}
          totalCount={totalCount}
          error={error}
          pageNo={pageNo}
          setPageNo={setPageNo}
          totalPages={totalPages}
          calculatedPerPage={calculatedPerPage}
          onSearchAgain={() => setShowResults(false)}
        />
      ) : (
        <AdvancedSearch
          handle_Get_advance_search={handle_Get_advance_search}
          onFindMatch={() => setShowResults(true)}
        />
      )}
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default Search;
