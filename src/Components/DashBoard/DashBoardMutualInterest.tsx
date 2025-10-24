// 

import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MutualInterestCard } from './DashBoardMutualInterest/MutualInterestCard';
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles';
import Pagination from '../Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdToggleOff, MdToggleOn } from 'react-icons/md';

interface DashBoardMutualInterestProps {
  dashBoardAgain: () => void;

}

export const DashBoardMutualInterest: React.FC<DashBoardMutualInterestProps> = ({ }) => {
  const [count, setCount] = useState<number>(0)
  const [dataPerPage, setDataPerPage] = useState(0);
  const [ViewCount, setViewCount] = useState<number>(0)
  const [totalRecords, setTotalRecords] = useState<number>(0);
  //const [sortBy, setSortBy] = useState<string>("datetime"); // 👈 default sort
  //  const [pageNumber, setPageNumber] = useState<number>(1);

  const toptalPages = dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;
  console.log(ViewCount, "ViewCount");



  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());
    searchParams.set('sortBy', sortBy);
    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [pageNumber, sortBy, location.search, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber, sortBy]);

  const handleBackToDashboard = () => {
    navigate('/Dashboard');
  };

  const toggleSort = () => {
    setSortBy((prev) =>
      prev === "profile_id" ? "datetime" : "profile_id"
    );
    setPageNumber(1); // reset to page 1 when sorting changes
  };

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-5 max-md:flex-wrap max-md:gap-y-5">
          <div className="flex items-center">
            <IoArrowBackOutline onClick={handleBackToDashboard} className="text-[24px] mr-2 cursor-pointer" />
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
              Mutual Interest
              <span className="text-sm text-primary"> ({count})</span>
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

        <div>
          <MutualInterestCard setCount={setCount} setTotalRecords={setTotalRecords} setDataPerPage={setDataPerPage} setViewCount={setViewCount} sortBy={sortBy} pageNumber={pageNumber} />
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
      <SuggestedProfiles />

    </div>
  );
};