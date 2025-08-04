import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../../../API';
// import { useParams } from 'react-router-dom';

// Define the TypeScript interface for personal details
interface PersonalDetails {
    profile_name: string;
    gender: string;
    age: string;
    dob: string;
    place_of_birth: string;
    time_of_birth: string;
    weight: string;
    height: string;
    marital_status: string;
    blood_group: string;
    body_type: string;
    about_self: string;
    complexion: string;
    hobbies: string;
    physical_status: string;
    eye_wear: string;
    profile_created_by: string;
}

interface ApiResponse {
    personal_details: PersonalDetails;
    // other details if needed
}

export const PersonalView: React.FC = () => {
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    let page_id = "2"; // Default
    if (location.pathname === "/LoginHome" || location.pathname === "/Search") {
        page_id = "1";
    }

    useEffect(() => {
        const fetchPersonalDetails = async () => {
            try {
                const response = await apiClient.post("/auth/Get_profile_det_match/", {
                    profile_id: loginuser_profileId,
                    user_profile_id: id,
                    page_id: page_id
                });
                //console.log("API Response:", response.data);

                // Extract personal details from the API response
                const { personal_details } = response.data as ApiResponse;

                setPersonalDetails(personal_details);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data || error.message);
                    setError(`Axios error: ${error.response?.data || error.message}`);
                } else {
                    console.error("Unexpected error:", error);
                    setError("Unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPersonalDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>No Data Available</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
                Personal Details
            </h2>
            <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
                <div>

                    {personalDetails?.profile_name && personalDetails.profile_name !== "" && personalDetails.profile_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Name:
                            <span className="font-normal"> {personalDetails?.profile_name || "N/A"}</span></h5>
                    )}

                    {personalDetails?.gender && personalDetails.gender !== "" && personalDetails.gender !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Gender:
                            <span className="font-normal"> {personalDetails?.gender || "N/A"}</span></h5>
                    )}

                    {personalDetails?.age && personalDetails.age !== "" && personalDetails.age !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Age:
                            <span className="font-normal"> {personalDetails?.age || "N/A"}</span></h5>
                    )}

                    {personalDetails?.dob && personalDetails.dob !== "" && personalDetails.dob !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">DOB:
                            <span className="font-normal"> {personalDetails?.dob || "N/A"}</span></h5>
                    )}

                    {personalDetails?.place_of_birth && personalDetails.place_of_birth !== "" && personalDetails.place_of_birth !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Place of Birth:
                            <span className="font-normal"> {personalDetails?.place_of_birth || "N/A"}</span></h5>
                    )}

                    {personalDetails?.time_of_birth && personalDetails.time_of_birth !== "" && personalDetails.time_of_birth !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Time of Birth:
                            <span className="font-normal"> {personalDetails?.time_of_birth || "N/A"}</span></h5>
                    )}


                    {personalDetails?.weight && personalDetails.weight !== "" && personalDetails.weight !== null && personalDetails.weight !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Weight:
                            <span className="font-normal"> {personalDetails?.weight || "N/A"} kg</span></h5>
                    )}

                    {personalDetails?.height && personalDetails.height !== "" && personalDetails.height !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Height:
                            <span className="font-normal"> {personalDetails?.height || "N/A"}</span></h5>
                    )}

                    {personalDetails?.marital_status && personalDetails.marital_status !== "" && personalDetails.marital_status !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Marital Status:
                            <span className="font-normal"> {personalDetails?.marital_status || "N/A"}</span></h5>
                    )}
                </div>

                <div>
                

                    {personalDetails?.blood_group && personalDetails.blood_group !== "" && personalDetails.blood_group !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Blood Group:
                            <span className="font-normal"> {personalDetails?.blood_group}</span></h5>
                    )}

                    {personalDetails?.body_type && personalDetails.body_type !== "" && personalDetails.body_type !== null && personalDetails.body_type !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Body Type:
                            <span className="font-normal"> {personalDetails?.body_type || "N/A"}</span></h5>
                    )}

                    {personalDetails?.about_self && personalDetails.about_self !== "" && personalDetails.about_self !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">About Myself:
                            <span className="font-normal"> {personalDetails?.about_self || "N/A"}</span></h5>
                    )}

                    {personalDetails?.complexion && personalDetails.complexion !== "" && personalDetails.complexion !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Complexion:
                            <span className="font-normal"> {personalDetails?.complexion || "N/A"}</span></h5>
                    )}

                    {personalDetails?.hobbies && personalDetails.hobbies !== "" && personalDetails.hobbies !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Hobbies:
                            <span className="font-normal"> {personalDetails?.hobbies || "N/A"}</span></h5>
                    )}


                    {personalDetails?.physical_status && personalDetails.physical_status !== "" && personalDetails.physical_status !== null && personalDetails.physical_status !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Physical Status:
                            <span className="font-normal"> {personalDetails?.physical_status || "N/A"}</span></h5>
                    )}

                    {personalDetails?.eye_wear && personalDetails.eye_wear !== "" && personalDetails.eye_wear !== null && personalDetails.eye_wear !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Eye Wear:
                            <span className="font-normal"> {personalDetails?.eye_wear || "N/A"}</span></h5>
                    )}

                    {/* {personalDetails?.profile_created_by && personalDetails.profile_created_by !== "" && personalDetails.profile_created_by !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Profile Created By:
                            <span className="font-normal"> {personalDetails?.profile_created_by|| "N/A"}</span></h5>
                    )} */}
                </div>
            </div>
        </div>
    );
};
