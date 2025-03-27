import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
//import axios from 'axios';
import apiClient from '../../../API';
// import { useParams } from 'react-router-dom';

interface FamilyDetails {
    about_family: string;
    father_name: string;
    father_occupation: string;
    mother_name: string;
    mother_occupation: string;
    family_status: string;
    no_of_sisters: string;
    no_of_brothers: string;
    no_of_sis_married: string;
    no_of_bro_married: string;
    property_details: string;
}

export const FamilyView: React.FC = () => {
    const [familyDetails, setFamilyDetails] = useState<FamilyDetails | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<FamilyDetails>({
        about_family: '',
        father_name: '',
        father_occupation: '',
        mother_name: '',
        mother_occupation: '',
        family_status: '',
        no_of_sisters: '',
        no_of_brothers: '',
        no_of_sis_married: '',
        no_of_bro_married: '',
        property_details: ''
    });

    // const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    useEffect(() => {
        const fetchFamilyDetails = async () => {
          try {
            const response = await apiClient.post('/auth/Get_profile_det_match/', {
              profile_id: loginuser_profileId,
              user_profile_id: id
            });
            
            // Extract family_details from the response
            const data = response.data.family_details;
            
            setFamilyDetails(data);
            setFormData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchFamilyDetails();
      }, [id]);
      

    // const handleEditClick = () => {
    //     setIsEditing(!isEditing);
    // };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/Family_registration/', formData);
            console.log('Form submission response:', response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!familyDetails) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">Family Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
                    <div>
                    {formData?.about_family && formData.about_family !== "" && formData.about_family !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">About My Family:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="about_family"
                                    value={formData.about_family}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.about_family || '-'}</span>
                            )}
                        </h5>)}

                        {formData?.father_name && formData.father_name !== "" && formData.father_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Father Name:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="father_name"
                                    value={formData.father_name}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.father_name || '-'}</span>
                            )}
                        </h5>)}

                        {formData?.father_occupation && formData.father_occupation !== "" && formData.father_occupation !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Father Occupation:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="father_occupation"
                                    value={formData.father_occupation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.father_occupation || '-'}</span>
                            )}
                        </h5>
                        )}


{formData?.mother_name && formData.mother_name !== "" && formData.mother_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mother Name:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mother_name"
                                    value={formData.mother_name}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.mother_name || '-'}</span>
                            )}
                        </h5>)}

                        {formData?.mother_occupation && formData.mother_occupation !== "" && formData.mother_occupation !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mother Occupation:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="mother_occupation"
                                    value={formData.mother_occupation}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.mother_occupation || '-'}</span>
                            )}
                        </h5>)}

                        {formData?.family_status && formData.family_status !== "" && formData.family_status !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Family Status:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="family_status"
                                    value={formData.family_status}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.family_status || '-'}</span>
                            )}
                        </h5>
                        )}


{formData?.no_of_sisters && formData.no_of_sisters !== "" && formData.no_of_sisters !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Sisters:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_sisters"
                                    value={formData.no_of_sisters}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_sisters || '-'}</span>
                            )}
                        </h5>)}
                    </div>

                    <div>
                    {formData?.no_of_sis_married && formData.no_of_sis_married !== "" && formData.no_of_sis_married !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Sisters Married:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_sis_married"
                                    value={formData.no_of_sis_married}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_sis_married || '-'}</span>
                            )}
                        </h5>)}


                        {formData?.no_of_brothers && formData.no_of_brothers !== "" && formData.no_of_brothers !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Brothers:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_brothers"
                                    value={formData.no_of_brothers}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_brothers || '-'}</span>
                            )}
                        </h5>)}

                        {formData?.no_of_bro_married && formData.no_of_bro_married !== "" && formData.no_of_bro_married !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Brothers Married:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="no_of_bro_married"
                                    value={formData.no_of_bro_married}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.no_of_bro_married || '-'}</span>
                            )}
                        </h5>)}

                        {formData?.property_details && formData.property_details !== "" && formData.property_details !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Property Details:
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="property_details"
                                    value={formData.property_details}
                                    onChange={handleChange}
                                    className="font-normal border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <span className="font-normal"> {formData.property_details || '-'}</span>
                            )}
                        </h5>)}
                    </div>
                </div>

                {/* {isEditing && (
                    <div className="flex justify-end items-center space-x-5">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                )}

                {!isEditing && (
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleEditClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Edit
                        </button>
                    </div>
                )} */}
            </form>
        </div>
    );
};