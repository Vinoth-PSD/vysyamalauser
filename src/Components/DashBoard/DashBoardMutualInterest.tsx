// 

import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MutualInterestCard } from './DashBoardMutualInterest/MutualInterestCard';
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles';
import Pagination from '../Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

interface DashBoardMutualInterestProps {
  dashBoardAgain: () => void;

}

export const DashBoardMutualInterest: React.FC<DashBoardMutualInterestProps> = ({ }) => {
  const [count, setCount] = useState<number>(0)
  const [dataPerPage, setDataPerPage] = useState(0);
  const [ViewCount, setViewCount] = useState<number>(0)
  const [totalRecords, setTotalRecords] = useState<number>(0);
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

  const [pageNumber, setPageNumber] = useState<number>(getInitialPageNumber());

  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());

    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [pageNumber, location.search, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);

  const handleBackToDashboard = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline onClick={handleBackToDashboard} className="text-[24px] mr-2 cursor-pointer" />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            Mutual Interest
            <span className="text-sm text-primary"> ({count})</span>
          </h4>
        </div>

        <div>
          <MutualInterestCard setCount={setCount} setTotalRecords={setTotalRecords} setDataPerPage={setDataPerPage} setViewCount={setViewCount} />
        </div>
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalRecords={totalRecords}
          dataPerPage={dataPerPage}
          toptalPages={toptalPages}
        />
      </div>
      <SuggestedProfiles />

    </div>
  );
};