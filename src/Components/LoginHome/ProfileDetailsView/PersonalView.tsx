import React from 'react';
// import axios from 'axios';
// import apiClient from '../../../API';
import { useProfileData  } from './ViewApicall/ProfileDataProvider';
// import { useParams } from 'react-router-dom';

// Define the TypeScript interface for personal details
// interface PersonalDetails {
//     profile_name: string;
//     gender: string;
//     age: string;
//     dob: string;
//     place_of_birth: string;
//     time_of_birth: string;
//     weight: string;
//     height: string;
//     marital_status: string;
//     blood_group: string;
//     body_type: string;
//     about_self: string;
//     complexion: string;
//     hobbies: string;
//     physical_status: string;
//     eye_wear: string;
//     profile_created_by: string;
// }

// interface ApiResponse {
//     personal_details: PersonalDetails;
//     // other details if needed
// }

export const PersonalView: React.FC = () => {
     const { personal_details } = useProfileData ();
    // const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // // const { user_profile_id } = useParams<{ user_profile_id: string }>();
    // const queryParams = new URLSearchParams(location.search);
    // const id = queryParams.get('id');
    // const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    // let page_id = "2"; // Default
    // if (location.pathname === "/LoginHome" || location.pathname === "/Search") {
    //     page_id = "1";
    // }

    // useEffect(() => {
    //     const fetchPersonalDetails = async () => {
    //         try {
    //             const response = await apiClient.post("/auth/Get_profile_det_match/", {
    //                 profile_id: loginuser_profileId,
    //                 user_profile_id: id,
    //                 page_id: page_id
    //             });
    //             //console.log("API Response:", response.data);

    //             // Extract personal details from the API response
    //             const { personal_details } = response.data as ApiResponse;

    //             setPersonalDetails(personal_details);
    //         } catch (error) {
    //             if (axios.isAxiosError(error)) {
    //                 console.error("Axios error:", error.response?.data || error.message);
    //                 setError(`Axios error: ${error.response?.data || error.message}`);
    //             } else {
    //                 console.error("Unexpected error:", error);
    //                 setError("Unexpected error occurred");
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchPersonalDetails();
    // }, [id]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>No Data Available</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
                Personal Details
            </h2>
            <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
                <div>

                    {personal_details?.profile_name && personal_details.profile_name !== "" && personal_details.profile_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Name:
                            <span className="font-normal"> {personal_details?.profile_name || "N/A"}</span></h5>
                    )}

                    {personal_details?.gender && personal_details.gender !== "" && personal_details.gender !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Gender:
                            <span className="font-normal"> {personal_details?.gender || "N/A"}</span></h5>
                    )}

                    {personal_details?.age && personal_details.age !== "" && personal_details.age !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Age:
                            <span className="font-normal"> {personal_details?.age || "N/A"}</span></h5>
                    )}

                    {personal_details?.dob && personal_details.dob !== "" && personal_details.dob !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">DOB:
                            <span className="font-normal"> {personal_details?.dob || "N/A"}</span></h5>
                    )}

                    {personal_details?.place_of_birth && personal_details.place_of_birth !== "" && personal_details.place_of_birth !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Place of Birth:
                            <span className="font-normal"> {personal_details?.place_of_birth || "N/A"}</span></h5>
                    )}

                    {personal_details?.time_of_birth && personal_details.time_of_birth !== "" && personal_details.time_of_birth !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Time of Birth:
                            <span className="font-normal"> {personal_details?.time_of_birth || "N/A"}</span></h5>
                    )}


                    {personal_details?.weight && personal_details.weight !== "" && personal_details.weight !== null && personal_details.weight !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Weight:
                            <span className="font-normal"> {personal_details?.weight || "N/A"} kg</span></h5>
                    )}

                    {personal_details?.height && personal_details.height !== "" && personal_details.height !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Height:
                            <span className="font-normal"> {personal_details?.height || "N/A"}</span></h5>
                    )}

                    {personal_details?.marital_status && personal_details.marital_status !== "" && personal_details.marital_status !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Marital Status:
                            <span className="font-normal"> {personal_details?.marital_status || "N/A"}</span></h5>
                    )}
                </div>

                <div>
                

                    {personal_details?.blood_group && personal_details.blood_group !== "" && personal_details.blood_group !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Blood Group:
                            <span className="font-normal"> {personal_details?.blood_group}</span></h5>
                    )}

                    {personal_details?.body_type && personal_details.body_type !== "" && personal_details.body_type !== null && personal_details.body_type !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Body Type:
                            <span className="font-normal"> {personal_details?.body_type || "N/A"}</span></h5>
                    )}

                    {personal_details?.about_self && personal_details.about_self !== "" && personal_details.about_self !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">About Myself:
                            <span className="font-normal"> {personal_details?.about_self || "N/A"}</span></h5>
                    )}

                    {personal_details?.complexion && personal_details.complexion !== "" && personal_details.complexion !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Complexion:
                            <span className="font-normal"> {personal_details?.complexion || "N/A"}</span></h5>
                    )}

                    {personal_details?.hobbies && personal_details.hobbies !== "" && personal_details.hobbies !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Hobbies:
                            <span className="font-normal"> {personal_details?.hobbies || "N/A"}</span></h5>
                    )}


                    {personal_details?.physical_status && personal_details.physical_status !== "" && personal_details.physical_status !== null && personal_details.physical_status !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Physical Status:
                            <span className="font-normal"> {personal_details?.physical_status || "N/A"}</span></h5>
                    )}

                    {personal_details?.eye_wear && personal_details.eye_wear !== "" && personal_details.eye_wear !== null && personal_details.eye_wear !== "0" && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Eye Wear:
                            <span className="font-normal"> {personal_details?.eye_wear || "N/A"}</span></h5>
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
