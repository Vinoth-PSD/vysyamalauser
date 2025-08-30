// 

import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MutualInterestCard } from './DashBoardMutualInterest/MutualInterestCard';
import { SuggestedProfiles } from '../../Components/LoginHome/SuggestedProfiles';
import Pagination from '../Pagination';

interface DashBoardMutualInterestProps {
  dashBoardAgain: () => void;

}

export const DashBoardMutualInterest: React.FC<DashBoardMutualInterestProps> = ({ dashBoardAgain }) => {
  const [count, setCount] = useState<number>(0)
  const [dataPerPage, setDataPerPage] = useState(0);
  const [ViewCount, setViewCount] = useState<number>(0)
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const toptalPages = dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;
  console.log(ViewCount, "ViewCount");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto py-10">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
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