import React from 'react';
// import axios from 'axios';
// import apiClient from '../../../API';
// import { useNavigate } from 'react-router-dom';
import { useProfileData  } from './ViewApicall/ProfileDataProvider';
// import { useParams } from 'react-router-dom';

// interface ContactDetails {
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     phone: string;
//     mobile: string;
//     whatsapp: string;
//     email: string;
// }

export const ContactView: React.FC = () => {
  const { contact_details } = useProfileData ();
  // const [contact_details, setContactDetails] = useState<ContactDetails | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // // const { user_profile_id } = useParams<{ user_profile_id: string }>();
  // const queryParams = new URLSearchParams(location.search);
  // const id = queryParams.get('id');
  // const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  // const navigate = useNavigate();

  // let page_id = "2"; // Default
  // if (location.pathname === "/LoginHome" || location.pathname === "/Search") {
  //   page_id = "1";
  // }

  // useEffect(() => {
  //   const fetchContactDetails = async () => {
  //     try {
  //       const response = await apiClient.post("/auth/Get_profile_det_match/", {
  //         profile_id: loginuser_profileId,
  //         user_profile_id: id,
  //         page_id: page_id
  //       });
  //       //console.log("API Response:", response.data);
  //       // Accessing the contact_details property in the response data
  //       if (response.data && response.data.contact_details) {
  //         setContactDetails(response.data.contact_details);
  //       } else {
  //         //setError("Contact details not found in the response");
  //         navigate('/UpgradePlan');
  //       }
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
  //   fetchContactDetails();
  // }, [id]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  // if (!contact_details) return <p>No contact details available</p>;

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
        Contact Details
      </h2>
      <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
        <div>
          {contact_details?.address && contact_details.address !== "" && contact_details.address !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Address:
              <span className="font-normal"> {contact_details.address}</span></h5>)}

          {contact_details?.city && contact_details.city !== "" && contact_details.city !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">City:
              <span className="font-normal"> {contact_details.city}</span></h5>)}

          {contact_details?.state && contact_details.state !== "" && contact_details.state !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">State:
              <span className="font-normal"> {contact_details.state}</span></h5>)}

          {contact_details?.country && contact_details.country !== "" && contact_details.country !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Country:
              <span className="font-normal"> {contact_details.country}</span></h5>)}
        </div>
        <div>
          {contact_details?.phone && contact_details.phone !== "" && contact_details.phone !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Phone:
              <span className="font-normal"> {contact_details.phone}</span></h5>)}

          {contact_details?.mobile && contact_details.mobile !== "" && contact_details.mobile !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mobile:
              <span className="font-normal"> {contact_details.mobile}</span></h5>)}

          {contact_details?.whatsapp && contact_details.whatsapp !== "" && contact_details.whatsapp !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">WhatsApp:
              <span className="font-normal"> {contact_details.whatsapp}</span></h5>)}

          {contact_details?.email && contact_details.email !== "" && contact_details.email !== null && (
            <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Email:
              <span className="font-normal"> {contact_details.email}</span></h5>)}
        </div>
      </div>
    </div>
  );
};
