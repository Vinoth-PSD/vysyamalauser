import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdVerifiedUser } from "react-icons/md";
import { IoCalendar, IoEye } from "react-icons/io5";
import { FaPersonArrowUpFromLine, FaSuitcase, FaLocationDot, FaUser } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder, MdOutlineGrid3X3 } from "react-icons/md";
import { IoSchool } from "react-icons/io5";

// Define the interface for a profile
interface Profile {
    profile_id: string;
    profile_name: string;
    profile_img: string;
    profile_age: number;
    profile_gender: string;
    height: string;
    degree: string;
    profession: string;
    location: string;
}

// Define the API response interface
interface ApiResponse {
    Status: number;
    message: string;
    profiles: Profile[];
}

const API_URL = "https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth/Get_featured_profiles/";
//const API_URL = "http://103.214.132.20:8000/auth/Get_featured_profiles/";

export const FeaturedBrideCard: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.post<ApiResponse>(API_URL, { gender: "female" });
                if (response.data.Status === 1) {
                    setProfiles(response.data.profiles);
                    console.log('featuredbride', response.data.profiles)
                } else {
                    console.error("Failed to fetch profiles");
                }
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="container mx-auto my-28 max-md:my-14">
            <div className="grid grid-cols-2 gap-5 2xl:grid-cols-3 max-lg:grid-cols-1 max-md:grid-cols-1">
            {profiles.map((profile) => (
                <div key={profile.profile_id} className="space-y-5 rounded-xl shadow-md p-5 mb-5">
                    <div className="flex justify-start items-center space-x-5 relative">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-between items-center space-x-5 max-sm:flex-col max-sm:gap-5 max-sm:w-full max-sm:items-start">
                                {/* Profile Image */}
                                <div className="relative max-sm:w-full">
                                    <img src={profile.profile_img} alt={`${profile.profile_name}-image`}
                                        className="rounded-[6px] w-[218px] h-[218px]  max-md:w-full"
                                    />
                                    {isBookmarked ? (
                                        <MdBookmark
                                            onClick={handleBookmark}
                                            className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                                        />
                                    ) : (
                                        <MdBookmarkBorder
                                            onClick={handleBookmark}
                                            className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
                                        />
                                    )}
                                </div>

                                {/* Profile Details */}
                                <div>
                                    <div className="relative mb-2">
                                        <div className="flex items-center flex-wrap">
                                            <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                                                {profile.profile_name}{" "}
                                                <span className="text-sm text-ashSecondary">({profile.profile_id})</span>
                                            </h5>
                                            <MdVerifiedUser className="text-[20px] text-checkGreen ml-2" />

                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 mb-2">
                                            <p className="flex items-center text-sm text-primary font-normal">
                                                <IoCalendar className="mr-2 text-primary" />
                                                {profile.profile_age} yrs
                                            </p>
                                            <p className="text-gray font-semibold">|</p>
                                            <p className="flex items-center text-sm text-primary font-normal">
                                                <FaPersonArrowUpFromLine className="mr-2 text-primary" />
                                                {profile.height} cms
                                            </p>
                                        </div>

                                        <div className="mb-2">
                                            <p className="flex items-center text-sm text-primary font-normal">
                                                <IoSchool className="mr-2 text-primary" />
                                                {profile.degree || "Degree not specified"}
                                            </p>
                                        </div>

                                        <div className="mb-2">
                                            <p className="flex items-center text-sm text-primary font-normal">
                                                <FaSuitcase className="mr-2 text-primary" />
                                                {profile.profession || "Profession not specified"}
                                            </p>
                                        </div>

                                        <div className="mb-2">
                                            <p className="flex items-center text-sm text-primary font-normal">
                                                <FaLocationDot className="mr-2 text-primary" />
                                                {profile.location}
                                            </p>
                                        </div>


                                        <div className="hidden flex justify-start items-center gap-3 max-2xl:flex-wrap max-md:hidden">
                                            <div>
                                                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                                    <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                                                </p>
                                            </div>

                                            <div>
                                                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                                    <FaUser className="mr-2" /> Active user
                                                </p>
                                            </div>

                                            <div>
                                                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                                    <IoCalendar className="mr-2" /> Last visit on June 30, 2024
                                                </p>
                                            </div>

                                            <div>
                                                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                                                    <IoEye className="mr-2" /> 31 views
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            ))}
            </div>
                </div>
            );
};
