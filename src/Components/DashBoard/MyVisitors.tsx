import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { MyVisitorsCard } from "./MyVisitors/MyVisitorsCard";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import Pagination from "../Pagination";
//import { IoMdArrowDropdown } from "react-icons/io";
import apiClient from "../../API";
import { Hearts } from 'react-loader-spinner';
import { useLocation, useNavigate } from "react-router-dom";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

interface MyVisitorsProps {
  dashBoardAgain: () => void;
}

export const MyVisitors: React.FC<MyVisitorsProps> = ({ }) => {
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  // State for loading and error handling, similar to ViewedProfiles
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // State for pagination
  const [totalRecords, setTotalRecords] = useState<number>(0);
  //const [sortBy, setSortBy] = useState<string>("datetime");

  // Set a constant for items per page for consistency
  const dataPerPage = 10;
  const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;

  const navigate = useNavigate();
  const location = useLocation();

  // Get page number from URL query parameter or default to 1
  const getInitialPageNumber = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = searchParams.get('page');
    return pageFromUrl ? parseInt(pageFromUrl) : 1;
  };

  const getInitialSortBy = () => {
    const searchParams = new URLSearchParams(location.search);
    const sortFromUrl = searchParams.get('sortBy');
    return sortFromUrl || 'datetime';
  }
  const [pageNumber, setPageNumber] = useState<number>(getInitialPageNumber());
  const [sortBy, setSortBy] = useState<string>(getInitialSortBy());

  const handleBackToDashboard = () => {
    navigate('/Dashboard');
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.post(
        "/auth/My_profile_visit/",
        {
          profile_id: loginuser_profileId,
          page_number: pageNumber, // Add page_number parameter
        }
      );

      setTotalRecords(response.data.viewd_count || 0);

    } catch (err) {
      setError("Failed to load visitors. Please try again later.");
      console.error("Failed to load visitors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber, sortBy]);


  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());
    searchParams.set('sortBy', sortBy);
    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [pageNumber, sortBy, location.search, navigate]);

  const toggleSort = () => {
    setSortBy((prev) => (prev === "profile_id" ? "datetime" : "profile_id"));
    setPageNumber(1); // reset page when changing sort
  };

  return (
    <div className="bg-grayBg pt-10">
      <div className="container mx-auto pb-10">
        <div className="flex justify-between items-center mb-5 max-md:flex-wrap max-md:gap-y-5">
          <div className="w-full flex justify-start items-center">
            <IoArrowBackOutline
              onClick={handleBackToDashboard}
              className="text-[24px] mr-2 cursor-pointer max-sm:text-[18px]"
            />
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
              My Visitors
              <span className="text-sm text-primary"> ({totalRecords})</span>
            </h4>
          </div>


          {/* 👇 Toggle sort added */}
          <div className="flex items-center space-x-2 mr-4">
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


          {/* <div className="relative max-md:w-full max-md:text-end">
            <select
              name="month"
              id="month"
              className="w-[160px] rounded-md px-4 py-[10px] text-sm text-primary-400 shadow border border-ashSecondary focus-visible:outline-none appearance-none"
            >
              
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="apr">April</option>
              <option value="may">May</option>
              <option value="jun">June</option>
              <option value="jul">July</option>
              <option value="aug">August</option>
              <option value="sep">September</option>
              <option value="oct">October</option>
              <option value="nov">November</option>
              <option value="dec">December</option>
            </select>
            <div className="absolute right-2 top-3.5 ">
              <IoMdArrowDropdown className="text-lg text-primary-400" />
            </div>
          </div> */}
        </div>

        {/* Conditional rendering for Loading, Error, and Content states */}
        {loading ? (
          <div className='flex flex-col items-center justify-center min-h-[300px]'>
            <Hearts
              height="100"
              width="100"
              color="#FF6666"
              ariaLabel="hearts-loading"
              visible={true}
            />
            <p className="text-sm">Please wait...</p>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-10">{error}</p>
        ) : (
          <div className="bg-white rounded-xl shadow-profileCardShadow px-5 py-5 mb-10">
            <p className="text-ashSecondary font-semibold">Today</p>
            {/* Pass pagination props to the card component */}
            <MyVisitorsCard pageNumber={pageNumber} dataPerPage={dataPerPage} sortBy={sortBy} />
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalRecords={totalRecords}
              dataPerPage={dataPerPage}
              toptalPages={totalPages}
              //sortBy={sortBy}
            />
          </div>
        )}
      </div>
      <SuggestedProfiles />
    </div>
  );
};
