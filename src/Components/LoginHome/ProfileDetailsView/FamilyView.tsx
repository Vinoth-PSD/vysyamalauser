import React from 'react';
//import axios from 'axios';
// import apiClient from '../../../API';
import { useProfileData } from './ViewApicall/ProfileDataProvider';
// import { useParams } from 'react-router-dom';

// interface FamilyDetails {
//     about_family: string;
//     father_name: string;
//     father_occupation: string;
//     mother_name: string;
//     mother_occupation: string;
//     family_status: string;
//     no_of_sisters: string;
//     no_of_brothers: string;
//     no_of_sis_married: string;
//     no_of_bro_married: string;
//     property_details: string;
//     father_alive: string;
//     mother_alive: string;
// }

export const FamilyView: React.FC = () => {
    const { family_details } = useProfileData();
    // const [familyDetails, setFamilyDetails] = useState<FamilyDetails | null>(null);
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    // const [family_details, setFormData] = useState<FamilyDetails>({
    //     about_family: '',
    //     father_name: '',
    //     father_occupation: '',
    //     mother_name: '',
    //     mother_occupation: '',
    //     family_status: '',
    //     no_of_sisters: '',
    //     no_of_brothers: '',
    //     no_of_sis_married: '',
    //     no_of_bro_married: '',
    //     property_details: '',
    //     father_alive: '',
    //     mother_alive: ''
    // });

    // // const { user_profile_id } = useParams<{ user_profile_id: string }>();
    // const queryParams = new URLSearchParams(location.search);
    // const id = queryParams.get('id');
    // const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    // let page_id = "2"; // Default
    // if (location.pathname === "/LoginHome" || location.pathname === "/Search") {
    //     page_id = "1";
    // }

    // useEffect(() => {
    //     const fetchFamilyDetails = async () => {
    //         try {
    //             const response = await apiClient.post('/auth/Get_profile_det_match/', {
    //                 profile_id: loginuser_profileId,
    //                 user_profile_id: id,
    //                 page_id: page_id
    //             });

    //             // Extract family_details from the response
    //             const data = response.data.family_details;

    //             setFamilyDetails(data);
    //             setFormData(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchFamilyDetails();
    // }, [id]);


    // // const handleEditClick = () => {
    // //     setIsEditing(!isEditing);
    // // };

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...family_details,
    //         [name]: value
    //     });
    // };

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         const response = await apiClient.post('/auth/Family_registration/', family_details);
    //         console.log('Form submission response:', response.data);
    //         setIsEditing(false);
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // };

    // if (!familyDetails) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">Family Details</h2>

            <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
                <div>
                    {family_details?.about_family && family_details.about_family !== "" && family_details.about_family !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">About My Family:
                            <span className="font-normal"> {family_details.about_family || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.father_name && family_details.father_name !== "" && family_details.father_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Father Name:
                            <span className="font-normal"> {family_details.father_name || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.father_occupation && family_details.father_occupation !== "" && family_details.father_occupation !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Father Occupation:
                            <span className="font-normal"> {family_details.father_occupation || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.mother_name && family_details.mother_name !== "" && family_details.mother_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mother Name:
                            <span className="font-normal"> {family_details.mother_name || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.mother_occupation && family_details.mother_occupation !== "" && family_details.mother_occupation !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mother Occupation:
                            <span className="font-normal"> {family_details.mother_occupation || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.family_status && family_details.family_status !== "" && family_details.family_status !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Family Status:
                            <span className="font-normal"> {family_details.family_status || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.no_of_sisters && family_details.no_of_sisters !== "" && family_details.no_of_sisters !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Sisters:
                            <span className="font-normal">
                                {/* {family_details.no_of_sisters === "0"
                                    ? "No"
                                    : family_details.no_of_sisters?.toString().trim()
                                        ? family_details.no_of_sisters
                                        : "N/A"} */}
                                {family_details.personal_sis?.toString().trim()
                                    ? family_details.no_of_sisters
                                    : "N/A"}
                            </span>
                        </h5>
                    )}
                </div>

                <div>
                    {family_details?.no_of_sis_married && family_details.no_of_sis_married !== "" && family_details.no_of_sis_married !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Sisters Married:
                            <span className="font-normal">
                                {/* {family_details.no_of_sis_married === "0"
                                    ? "No"
                                    : family_details.no_of_sis_married?.toString().trim()
                                        ? family_details.no_of_sis_married
                                        : "N/A"} */}
                                {family_details.no_of_sis_married?.toString().trim()
                                    ? family_details.no_of_sis_married
                                    : "N/A"}
                            </span>
                        </h5>
                    )}

                    {family_details?.no_of_brothers && family_details.no_of_brothers !== "" && family_details.no_of_brothers !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Brothers:
                            <span className="font-normal">
                                {/* {family_details.no_of_brothers === "0"
                                    ? "No"
                                    : family_details.no_of_brothers?.toString().trim()
                                        ? family_details.no_of_brothers
                                        : "N/A"} */}
                                {family_details.no_of_brothers?.toString().trim()
                                    ? family_details.no_of_brothers
                                    : "N/A"}
                            </span>
                        </h5>
                    )}

                    {family_details?.no_of_bro_married && family_details.no_of_bro_married !== "" && family_details.no_of_bro_married !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Brothers Married:
                            <span className="font-normal">
                                {/* {family_details.no_of_bro_married === "0"
                                    ? "No"
                                    : family_details.no_of_bro_married?.toString().trim()
                                        ? family_details.no_of_bro_married
                                        : "N/A"} */}
                                {family_details.no_of_bro_married?.toString().trim()
                                    ? family_details.no_of_bro_married
                                    : "N/A"}
                            </span>
                        </h5>
                    )}

                    {family_details?.property_details && family_details.property_details !== "" && family_details.property_details !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Property Details:
                            <span className="font-normal"> {family_details.property_details || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.father_alive && family_details.father_alive !== "" && family_details.father_alive !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Father Alive:
                            <span className="font-normal"> {family_details.father_alive || "N/A"}</span>
                        </h5>
                    )}

                    {family_details?.mother_alive && family_details.mother_alive !== "" && family_details.mother_alive !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mother Alive:
                            <span className="font-normal"> {family_details.father_alive || "N/A"}</span>
                        </h5>
                    )}
                </div>
            </div>
        </div>
    );
};