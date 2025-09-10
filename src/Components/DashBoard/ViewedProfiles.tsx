import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { ViewedProfilesCard } from './ViewedProfiles/ViewedProfilesCard';
import { SuggestedProfiles } from '../LoginHome/SuggestedProfiles';
import Pagination from '../Pagination';
//import axios from 'axios';
// import { IoMdArrowDropdown } from 'react-icons/io';
import apiClient from '../../API';
import { Hearts } from 'react-loader-spinner';
import { useLocation, useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

interface ViewedProfilesProps {
    dashBoardAgain: () => void;
}

export const ViewedProfiles: React.FC<ViewedProfilesProps> = () => {
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const dataPerPage = 10
    const toptalPages = totalRecords > 0 && dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;
    const navigate = useNavigate();
    const location = useLocation();

    // Get page number from URL query parameter or default to 1
    const getInitialPageNumber = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = searchParams.get('page');
        return pageFromUrl ? parseInt(pageFromUrl) : 1;
    };

    const [pageNumber, setPageNumber] = useState<number>(getInitialPageNumber());

    const handleBackToDashboard = () => {
        navigate('/Dashboard');
    };
    // const [totalPages,setTotalPages]=useState<number>(0)

    //console.log(totalRecords, "totalRecords", dataPerPage, "dataPerPage", toptalPages, "toptalPages", totalRecords, "totalRecords");

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiClient.post(
                "/auth/My_viewed_profiles/",
                {
                    profile_id: loginuser_profileId,
                }
            );
            setTotalRecords(response.data.viewed_profile_count);

        } catch (err) {
            setError("Failed to load viewed profiles");
            console.error("Failed to load viewed profiles", err);

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        // Update URL when page changes
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', pageNumber.toString());

        // Replace current URL without causing navigation
        navigate(`?${searchParams.toString()}`, { replace: true });
    }, [pageNumber, location.search, navigate]);

    //const navigate = useNavigate();

    return (
        <div className="bg-grayBg pt-10">
            <div className="container mx-auto pb-10">

                <div className="flex justify-between items-center mb-5 max-md:flex-wrap max-md:gap-y-5">

                    <div className="w-full flex justify-start items-center">
                        <IoArrowBackOutline
                            // onClick={() => navigate("/Dashboard")} 
                            onClick={handleBackToDashboard}
                            className="text-[24px] mr-2 cursor-pointer" />
                        <h4 className=" text-[24px] text-vysyamalaBlackSecondary font-bold max-md:text-[18px]"> Viewed Profiles {" "}
                            <span className="text-sm text-primary">({totalRecords})</span>
                        </h4>
                    </div>
                </div>

                {/* viewed profiles Card */}
                {loading ? (
                    <div className='flex flex-col items-center justify-center min-h-[300px]'>
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
                ) : error ? (
                    <p className="text-red-500 text-center py-10">{error}</p>
                ) : (
                    <div className="bg-white rounded-xl shadow-profileCardShadow px-5 py-5">
                        <p className="text-ashSecondary font-semibold">Today</p>
                        <ViewedProfilesCard pageNumber={pageNumber} dataPerPage={dataPerPage} />
                        <Pagination
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalRecords={totalRecords}
                            dataPerPage={dataPerPage}
                            toptalPages={toptalPages}
                        />
                    </div>
                )}
            </div>
            <SuggestedProfiles />
        </div>
    )
}
