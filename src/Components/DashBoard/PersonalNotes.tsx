import React, { useEffect, useState } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { PersonalNotesCard } from './PersonalNotes/PersonalNotesCard';
import { SuggestedProfiles } from '../LoginHome/SuggestedProfiles';
import Pagination from '../Pagination';
//import axios from 'axios';
import apiClient from '../../API';
import { useLocation, useNavigate } from 'react-router-dom';

interface PersonalNotesProps {
    dashBoardAgain: () => void;
}

export const PersonalNotes: React.FC<PersonalNotesProps> = ({  }) => {
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    const [totalRecords, setTotalRecords] = useState<number>(0);
    const dataPerPage = 10
    const toptalPages = totalRecords > 0 && dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 1;

    // const [totalPages,setTotalPages]=useState<number>(0)

    //console.log(totalRecords, "totalRecords", dataPerPage, "dataPerPage", toptalPages, "toptalPages", totalRecords, "totalRecords");

    //const [pageNumber, setPageNumber] = useState<number>(1);
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
    const fetchData = async () => {
        const response = await apiClient.post(
            "/auth/Get_personal_notes/",
            {
                profile_id: loginuser_profileId,
            }
        );
        setTotalRecords(response.data.personal_note_count)
        //console.log(response, "response")
    };
    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pageNumber]);

    useEffect(() => {
        // Update URL when page changes
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', pageNumber.toString());

        // Replace current URL without causing navigation
        navigate(`?${searchParams.toString()}`, { replace: true });
    }, [pageNumber, location.search, navigate]);


    return (
        <div className="bg-grayBg pt-10">
            <div className="container mx-auto">

                <div className="flex items-center mb-5">
                    <IoArrowBackOutline onClick={handleBackToDashboard} className="text-[24px] mr-2 cursor-pointer max-md:text-[18px]" />
                    <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold"> Personal Notes
                        <span className="text-sm text-primary"> ({totalRecords})</span>
                    </h4>
                </div>

                {/* Personal Notes Card */}
                <div className="mb-10 max-md:mb-5">
                    <PersonalNotesCard pageNumber={1} />
                    {/* <PersonalNotesCard /> */}
                    <Pagination
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                        totalRecords={totalRecords}
                        dataPerPage={dataPerPage}
                        toptalPages={toptalPages}
                    />
                </div>
            </div>
            <SuggestedProfiles />
        </div>
    )
}
