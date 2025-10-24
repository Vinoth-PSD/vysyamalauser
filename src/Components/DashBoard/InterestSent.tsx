import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { InterestSentCard } from "./InterestSent/InterestSentCard";
import Pagination from "../Pagination";
//import axios from "axios";
//import { IoMdArrowDropdown } from "react-icons/io";
import apiClient from "../../API";
import { useLocation, useNavigate } from "react-router-dom";
import { MdToggleOff, MdToggleOn } from "react-icons/md";

interface InterestSentProps {
  dashBoardAgain: () => void;
}

export const InterestSent: React.FC<InterestSentProps> = ({

}) => {
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [dataPerPage, setDataPerPage] = useState(0);
  const toptalPages = dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;
  // const [totalPages,setTotalPages]=useState<number>(0)
  //const [sortBy, setSortBy] = useState<string>("datetime"); // 👈 default sort


  //console.log(dataPerPage, "dataPerPage" ,toptalPages,"toptalPages",totalRecords,"totalRecords");
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
    const response = await apiClient.post(
      "/auth/My_intrests_list/",
      {
        profile_id: loginuser_profileId,
      }
    );
    setTotalRecords(response.data.data.total_records);
    setDataPerPage(response.data.data.per_page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber, sortBy,]);

  useEffect(() => {
    fetchData();
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
    setPageNumber(1); // 👈 reset to first page on sort change
  };


  return (
    <div className="bg-grayBg py-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5 max-md:flex-wrap max-md:gap-y-5">
          <div className="w-full flex justify-start items-center">
            <IoArrowBackOutline
              onClick={handleBackToDashboard}
              className="text-[24px] mr-2 cursor-pointer"
            />
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-sm:text-[18px]">
              {" "}
              Interest Sent
              <span className="text-sm text-primary"> ({totalRecords})</span>
            </h4>
          </div>
          {/* 👇 Toggle added */}
          <div className="flex items-center space-x-2 mr-5">
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
              {sortBy === "profile_id"
                ? "Sort by Profile ID"
                : "Sort by Date"}
            </span>
          </div>


          {/* <div className="relative max-md:w-full max-md:text-end">
            <select
              name="month"
              id="month"
              className="w-[160px] rounded-md px-4 py-[10px] text-sm text-primary-400  shadow border border-ashSecondary focus-visible:outline-none appearance-none"
            >
              <option value="jan">January</option>
              <option value="feb">February</option>
              <option value="mar">March</option>
              <option value="Apr">April</option>
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

        {/* Interest Sent Card */}
        <div className="bg-white rounded-xl shadow-profileCardShadow px-5 py-5">
          <p className="text-ashSecondary font-semibold">Today</p>

          <InterestSentCard pageNumber={pageNumber} dataPerPage={dataPerPage} sortBy={sortBy} />
          {/* <InterestSentCard /> */}

        </div>
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalRecords={totalRecords}
          dataPerPage={dataPerPage}
          toptalPages={toptalPages}
        //sortBy={sortBy} 
        />
      </div>
    </div>
  );
};
