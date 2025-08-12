import React  from 'react';
// import axios from 'axios';
// import apiClient from '../../../API';
import { useProfileData  } from './ViewApicall/ProfileDataProvider';
// import { useParams } from 'react-router-dom';

// Define the correct interface for your API response
// interface EducationProfession {
//   education_level: string;
//   education_detail: string;
//   about_education: string;
//   profession: string;
//   designation: string;
//   company_name: string;
//   business_name: string;
//   business_address: string;
//   annual_income: string;
//   gross_annual_income: string;
//   place_of_stay: string;
// }

// interface ApiResponse {
//   education_details: EducationProfession;
//   // Include other fields if needed
// }

export const EducationProfessionView: React.FC = () => {
  // const [profileData, setProfileData] = useState<EducationProfession | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // // const { user_profile_id } = useParams<{ user_profile_id: string }>();
  // const queryParams = new URLSearchParams(location.search);
  // const id = queryParams.get('id');
  // const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  const { education_details } = useProfileData ();


  // let page_id = "2"; // Default
  // if (location.pathname === "/LoginHome" || location.pathname === "/Search") {
  //   page_id = "1";
  // }

  // useEffect(() => {
  //   const fetchEducationProfessions = async () => {
  //     try {
  //       const response = await apiClient.post<ApiResponse>(
  //         "/auth/Get_profile_det_match/",
  //         {
  //           profile_id: loginuser_profileId,
  //           user_profile_id: id,
  //           page_id: page_id
  //         }
  //       );

  //       //console.log("API Response:", response.data);

  //       // Extract education_details from the response
  //       const data = response.data.education_details;

  //       setProfileData(data);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error("Axios error:", error.response?.data || error.message);
  //         setError(`Axios error: ${error.response?.data || error.message}`);
  //       } else {
  //         console.error("Unexpected error:", error);
  //         setError("Unexpected error occurred");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEducationProfessions();
  // }, [id]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>No Data Available</p>;

  if (!education_details ) return <p>No data available</p>;

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
        Education & Profession Details
        {/* <MdModeEdit className="text-2xl text-main ml-2 cursor-pointer" /> */}
      </h2>

      <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
        <div>
          {education_details ?.education_level && education_details .education_level !== "" && education_details .education_level !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Education Level :
              <span className="font-normal"> {education_details .education_level || "N/A"}</span></h5>
          )}

          {/* {profileData?.education_detail && profileData.education_detail !== "" && profileData.education_detail !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Education Details :
              <span className="font-normal"> {profileData.education_detail}</span></h5>
          )} */}

          {education_details ?.about_education && education_details .about_education !== "" && education_details .about_education !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">About Education :
              <span className="font-normal"> {education_details .about_education || "N/A"}</span></h5>)}

          {/* {profileData?.profession && profileData.profession !== "" && profileData.profession !== null && ( */}
          <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Profession :
            <span className="font-normal"> {education_details .profession || "N/A"}</span></h5>
          {/* )} */}

          {education_details ?.company_name && education_details .company_name !== "" && education_details .company_name !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Company Name :
              <span className="font-normal"> {education_details .company_name || "N/A"}</span></h5>
          )}

          {education_details ?.designation && education_details .designation !== "" && education_details .designation !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Designation :
              <span className="font-normal"> {education_details .designation || "N/A"}</span></h5>
          )}
        </div>

        <div>
          {education_details ?.business_name && education_details .business_name !== "" && education_details .business_name !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Business Name :
              <span className="font-normal"> {education_details .business_name || "N/A"}</span></h5>)}

          {education_details ?.business_address && education_details .business_address !== "" && education_details .business_address !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Business Address :
              <span className="font-normal"> {education_details .business_address || "N/A"}</span></h5>)}

          {education_details ?.annual_income && education_details .annual_income !== "" && education_details .annual_income !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Annual Income :
              <span className="font-normal"> {education_details .annual_income || "N/A"}</span></h5>)}

          {education_details ?.gross_annual_income && education_details .gross_annual_income !== "" && education_details .gross_annual_income !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Gross Annual Income :
              <span className="font-normal"> {education_details .gross_annual_income || "N/A"}</span></h5>
          )}

          {education_details ?.place_of_stay && education_details .place_of_stay !== "" && education_details .place_of_stay !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Place of Stay :
              <span className="font-normal"> {education_details .place_of_stay || "N/A"}</span></h5>)}
        </div>
      </div>
    </div>
  );
};
