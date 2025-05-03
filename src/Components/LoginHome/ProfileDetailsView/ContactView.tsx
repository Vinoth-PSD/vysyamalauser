import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../../../API';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

interface ContactDetails {
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    mobile: string;
    whatsapp: string;
    email: string;
}

export const ContactView: React.FC = () => {
    const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContactDetails = async () => {
          try {
            const response = await apiClient.post("/auth/Get_profile_det_match/", {
              profile_id: loginuser_profileId,
              user_profile_id:id
            });
      
            console.log("API Response:", response.data);
      
            // Accessing the contact_details property in the response data
            if (response.data && response.data.contact_details) {
              setContactDetails(response.data.contact_details);
            } else {
              //setError("Contact details not found in the response");
              navigate('/UpgradePlan');
            }
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
      
        fetchContactDetails();
      }, [id]);
      
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!contactDetails) return <p>No contact details available</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
                Contact Details
            </h2>
            <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
                <div>
                {contactDetails?.address && contactDetails.address !== "" && contactDetails.address !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Address:
                        <span className="font-normal"> {contactDetails.address}</span></h5>)}

                        {contactDetails?.city && contactDetails.city !== "" && contactDetails.city !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">City:
                        <span className="font-normal"> {contactDetails.city}</span></h5>)}

                        {contactDetails?.state && contactDetails.state !== "" && contactDetails.state !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">State:
                        <span className="font-normal"> {contactDetails.state}</span></h5>)}

                        {contactDetails?.country && contactDetails.country !== "" && contactDetails.country !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Country:
                        <span className="font-normal"> {contactDetails.country}</span></h5>)}
                </div>
                <div>
                {contactDetails?.phone && contactDetails.phone !== "" && contactDetails.phone !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Phone:
                        <span className="font-normal"> {contactDetails.phone}</span></h5>)}

                        {contactDetails?.mobile && contactDetails.mobile !== "" && contactDetails.mobile !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Mobile:
                        <span className="font-normal"> {contactDetails.mobile}</span></h5>)}

                        {contactDetails?.whatsapp && contactDetails.whatsapp !== "" && contactDetails.whatsapp !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">WhatsApp:
                        <span className="font-normal"> {contactDetails.whatsapp}</span></h5>)}

                        {contactDetails?.email && contactDetails.email !== "" && contactDetails.email !== null && (
                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Email:
                        <span className="font-normal"> {contactDetails.email}</span></h5>)}
                </div>
            </div>
        </div>
    );
};
