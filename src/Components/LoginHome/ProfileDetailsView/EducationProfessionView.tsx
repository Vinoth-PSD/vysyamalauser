import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../../../API';
// import { useParams } from 'react-router-dom';

// Define the correct interface for your API response
interface EducationProfession {
  education_level: string;
  education_detail: string;
  about_education: string;
  profession: string;
  company_name: string;
  business_name: string;
  business_address: string;
  annual_income: string;
  gross_annual_income: string;
  place_of_stay: string;
}

interface ApiResponse {
  education_details: EducationProfession;
  // Include other fields if needed
}

export const EducationProfessionView: React.FC = () => {
  const [profileData, setProfileData] = useState<EducationProfession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const { user_profile_id } = useParams<{ user_profile_id: string }>();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  useEffect(() => {
    const fetchEducationProfessions = async () => {
      try {
        const response = await apiClient.post<ApiResponse>(
          "/auth/Get_profile_det_match/",
          {
            profile_id: loginuser_profileId,
            user_profile_id: id
          }
        );

        //console.log("API Response:", response.data);

        // Extract education_details from the response
        const data = response.data.education_details;

        setProfileData(data);
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

    fetchEducationProfessions();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>No Data Available</p>;

  if (!profileData) return <p>No data available</p>;

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
        Education & Profession Details
        {/* <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" /> */}
      </h2>

      <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
        <div>
          {profileData?.education_level && profileData.education_level !== "" && profileData.education_level !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Education Level :
              <span className="font-normal"> {profileData.education_level}</span></h5>
          )}

          {profileData?.education_detail && profileData.education_detail !== "" && profileData.education_detail !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Education Detailsss :
              <span className="font-normal"> {profileData.education_detail}</span></h5>
          )}

          {profileData?.about_education && profileData.about_education !== "" && profileData.about_education !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">About Education :
              <span className="font-normal"> {profileData.about_education || '-'}</span></h5>)}

          {profileData?.profession && profileData.profession !== "" && profileData.profession !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Profession :
              <span className="font-normal"> {profileData.profession}</span></h5>)}

          {profileData?.company_name && profileData.company_name !== "" && profileData.company_name !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Company Name :
              <span className="font-normal"> {profileData.company_name}</span></h5>
          )}


          {profileData?.business_name && profileData.business_name !== "" && profileData.business_name !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Business Name :
              <span className="font-normal"> {profileData.business_name}</span></h5>)}
        </div>

        <div>
          {profileData?.business_address && profileData.business_address !== "" && profileData.business_address !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Business Address :
              <span className="font-normal"> {profileData.business_address}</span></h5>)}

          {profileData?.annual_income && profileData.annual_income !== "" && profileData.annual_income !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Annual Income :
              <span className="font-normal"> {profileData.annual_income}</span></h5>)}

          {profileData?.gross_annual_income && profileData.gross_annual_income !== "" && profileData.gross_annual_income !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Gross Annual Income :
              <span className="font-normal"> {profileData.gross_annual_income || '-'}</span></h5>
          )}

          {profileData?.place_of_stay && profileData.place_of_stay !== "" && profileData.place_of_stay !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Place of Stay :
              <span className="font-normal"> {profileData.place_of_stay || '-'}</span></h5>)}
        </div>
      </div>
    </div>
  );
};
