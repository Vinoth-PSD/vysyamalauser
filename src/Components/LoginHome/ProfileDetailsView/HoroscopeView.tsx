import React, { useEffect, useState } from 'react';
// import { MdModeEdit } from "react-icons/md";
import RasiGridview from '../../HoroDetails/RasiGridview';
import AmsamGridview from '../../HoroDetails/AmsamGridview';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import apiClient from '../../../API';

// import { useParams } from 'react-router-dom';

interface HoroscopeDetails {
    rasi: string;
    star_name: string;
    lagnam: string;
    nallikai: string;
    didi: string;
    surya_gothram: string;
    dasa_name: string;
    dasa_balance: string;
    chevai_dosham: string;
    sarpadosham: string;
    // rasiTemp:string;
    rasi_kattam: string;
    amsa_kattam: string;
}

export const HoroscopeView: React.FC = () => {
    const [horoscopeDetails, setHoroscopeDetails] = useState<HoroscopeDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const queryParams1 = new URLSearchParams(location.search);
    const rasi = queryParams1.get("rasi");
    // const { user_profile_id } = useParams<{ user_profile_id: string }>();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    useEffect(() => {
        const fetchHoroscopeDetails = async () => {
            console.log("logggeddduser", loginuser_profileId);
            console.log("viewid", id);
            try {
                const response = await apiClient.post("/auth/Get_profile_det_match/", {
                    profile_id: loginuser_profileId,
                    user_profile_id: id
                });

                console.log("API Response:", response.data);

                // Adjust the response processing based on the actual API response format
                setHoroscopeDetails(response.data.horoscope_details);
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

        fetchHoroscopeDetails();
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">Horoscope Details</h2>

            <div className="grid grid-rows-1 grid-cols-2 max-sm:grid-cols-1">
                <div>
                    {/* <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Tamil Year :
                        <span className="font-normal"> Srimukha</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Tamil Month :
                        <span className="font-normal"> Karthikai</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Tamil Day :
                        <span className="font-normal"> 18, Friday</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Telugu Year :
                        <span className="font-normal"> -</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Telugu Month :
                        <span className="font-normal"> -</span></h5>

                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Telugu Day :
                        <span className="font-normal"> 22 years</span></h5> */}
                    {horoscopeDetails?.rasi && horoscopeDetails.rasi !== "" && horoscopeDetails.rasi !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Rasi:
                            <span className="font-normal"> {horoscopeDetails?.rasi}</span></h5>)}

                    {horoscopeDetails?.star_name && horoscopeDetails.star_name !== "" && horoscopeDetails.star_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Star Name:
                            <span className="font-normal"> {horoscopeDetails?.star_name}</span></h5>)}

                    {horoscopeDetails?.lagnam && horoscopeDetails.lagnam !== "" && horoscopeDetails.lagnam !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Lagnam:
                            <span className="font-normal"> {horoscopeDetails?.lagnam}</span></h5>)}

                    {horoscopeDetails?.nallikai && horoscopeDetails.nallikai !== "" && horoscopeDetails.nallikai !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Nallikai:
                            <span className="font-normal"> {horoscopeDetails?.nallikai}</span></h5>)}


                    {horoscopeDetails?.didi && horoscopeDetails.didi !== "" && horoscopeDetails.didi !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Didi:
                            <span className="font-normal"> {horoscopeDetails?.didi}</span></h5>)}
                </div>

                <div>
                    {horoscopeDetails?.surya_gothram && horoscopeDetails.surya_gothram !== "" && horoscopeDetails.surya_gothram !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Surya Gothram:
                            <span className="font-normal"> {horoscopeDetails?.surya_gothram}</span></h5>)}


                    <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Madhulam :
                        <span className="font-normal"> Vasthrakula</span></h5>

                    {horoscopeDetails?.dasa_name && horoscopeDetails.dasa_name !== "" && horoscopeDetails.dasa_name !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Dasa Name:
                            <span className="font-normal"> {horoscopeDetails?.dasa_name}</span></h5>)}

                    {horoscopeDetails?.dasa_balance && horoscopeDetails.dasa_balance !== "" && horoscopeDetails.dasa_balance !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Dasa Balance:
                            <span className="font-normal"> {horoscopeDetails?.dasa_balance}</span></h5>)}

                    {horoscopeDetails?.chevai_dosham && horoscopeDetails.chevai_dosham !== "" && horoscopeDetails.chevai_dosham !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Chevvai Dosham:
                            <span className="font-normal"> {horoscopeDetails?.chevai_dosham}</span></h5>)}

                    {horoscopeDetails?.sarpadosham && horoscopeDetails.sarpadosham !== "" && horoscopeDetails.sarpadosham !== null && (
                        <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">Sarpa Dosham:
                            <span className="font-normal"> {horoscopeDetails?.sarpadosham}</span></h5>)}
                </div>
            </div>

            <div className="space-y-10 my-10">
                <div>
                    <RasiGridview centerLabel={"Rasi"} rasiTemp={rasi} data={horoscopeDetails?.rasi_kattam} />
                </div>
                <div>
                    <AmsamGridview centerLabel={"Amsam"} rasiTemp={rasi} data={horoscopeDetails?.amsa_kattam} />
                </div>
            </div>
        </div>
    );
};
