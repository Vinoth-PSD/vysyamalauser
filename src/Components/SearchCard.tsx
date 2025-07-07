import React, { useState, useContext, useEffect } from "react";
import { IoCalendar, IoSchool } from "react-icons/io5";
import { FaLocationDot, FaPersonArrowUpFromLine, FaSuitcase } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder, MdStars, MdVerifiedUser } from "react-icons/md";
import axios from "axios";
import { ProfileContext, Profile } from "../../src/ProfileContext";
import { Link, useNavigate } from "react-router-dom";
import MatchingScore from "./DashBoard/ProfileDetails/MatchingScore";
import apiClient from "../API";

interface SearchCardProps {
  profile: Profile;
  searchvalues: Profile[]; // Updated to reflect an array of profiles
}

export const SearchCard: React.FC<SearchCardProps> = ({
  searchvalues,
  profile,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addBookmark, removeBookmark, setSelectedProfiles } = useContext(
    ProfileContext
  ) || {
    addBookmark: () => { },
    removeBookmark: () => { },
    setSelectedProfiles: () => { },
  };
  const navigate = useNavigate();
  ////console.log("searchvalues", searchvalues);
  useEffect(() => {
    const bookmarkedProfiles = JSON.parse(
      localStorage.getItem("bookmarkedProfiles") || "[]"
    );
    const isBookmarked = bookmarkedProfiles.some(
      (item: Profile) => item.profile_id === profile.profile_id
    );
    setIsBookmarked(isBookmarked);
  }, [profile.profile_id]);

  const handleBookmark = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let updatedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProfiles") || "[]"
    );

    if (isBookmarked) {
      updatedBookmarks = updatedBookmarks.filter(
        (item: Profile) => item.profile_id !== profile.profile_id
      );
      removeBookmark(profile.profile_id);
      setSelectedProfiles(updatedBookmarks);
    } else {
      updatedBookmarks.push(profile);
      addBookmark(profile);
      setSelectedProfiles(updatedBookmarks);
    }

    localStorage.setItem(
      "bookmarkedProfiles",
      JSON.stringify(updatedBookmarks)
    );
    setIsBookmarked(!isBookmarked);
  };

  const handleCardClick = async (
    profile: Profile, // Accept the profile directly
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    try {
      const response = await apiClient.post(
        "/auth/Create_profile_visit/",
        {
          profile_id: loginuser_profileId,
          viewed_profile: profile.profile_id,
        }
      );

      if (response.data.Status === 1) {
        navigate(
          `/ProfileDetails?id=${profile.profile_id}`
        );
        ////console.log("Profile visit created successfully:", response.data);
      } else {
        console.error("Failed to create profile visit:", response.statusText);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating profile visit:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const isEmpty = !Array.isArray(searchvalues);


  return (
    <div>
      <div className="">
        {isEmpty ? (
          <p className="text-center text-gray-500">No Match Found</p>
        ) : (
          searchvalues.map((profile) => (
            <div
              key={profile.profile_id}
              className="flex justify-between items-start space-x-5 relative rounded-xl shadow-md px-3 py-3 mb-5"
              onClick={(e) => handleCardClick(profile, e)}
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex justify-between md:items-center space-x-5">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={profile.profile_img || 'default_image_url'}
                      alt="Profile-image"
                      className="w-[200px] rounded-[6px]"
                    />
                    {isBookmarked ? (
                      <MdBookmark
                        onClick={(e) => { e.stopPropagation(); handleBookmark(e); }}
                        className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
                      />
                    ) : (
                      <MdBookmarkBorder
                        onClick={(e) => { e.stopPropagation(); handleBookmark(e); }}
                        className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
                      />
                    )}
                  </div>

                  {/* Profile Details */}
                  <div>
                    {/* Name & Profile ID */}
                    <div className="relative mb-2">
                      <Link to={`/ProfileDetails?id=${profile.profile_id}`}>
                        <div className="flex items-center">
                          <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                            {profile.profile_name || "Unknown"}{" "}
                            <span className="text-sm text-ashSecondary">
                              ({profile.profile_id || "N/A"})
                            </span>
                          </h5>
                          {profile.verified === 1 && (
                            <MdVerifiedUser className="ml-2 text-checkGreen text-[20px]" />
                          )}
                        </div>
                      </Link>
                    </div>

                    {/* Years & Height */}
                    <div className="flex items-center space-x-3 mb-2">
                      <p className="flex items-center text-ashSecondary font-semibold">
                        <IoCalendar className="mr-2" />
                        {profile.profile_age || "N/A"} yrs
                      </p>

                      <p className="text-gray font-semibold">|</p>

                      <p className="flex items-center text-ashSecondary font-semibold">
                        <FaPersonArrowUpFromLine className="mr-2" />
                        {profile.height || "N/A"}
                      </p>
                    </div>

                    {/* Uthiram */}
                    <div className="mb-2">
                      <p className="flex items-center text-ashSecondary font-semibold">
                        <MdStars className="mr-2" />
                        Uthiram
                      </p>
                    </div>

                    {/* Degree */}
                    <div className="mb-2">
                      <p className="flex items-center text-ashSecondary font-semibold">
                        <IoSchool className="mr-2" />
                        {profile.degree || "N/A"}
                      </p>
                    </div>

                    {/* Profession */}
                    <div className="mb-2">
                      <p className="flex items-center text-ashSecondary font-semibold">
                        <FaSuitcase className="mr-2" />
                        {profile.profession || "N/A"}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="mb-2">
                      <p className="flex items-center text-ashSecondary font-semibold">
                        <FaLocationDot className="mr-2" />
                        {profile.location || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:hidden md:block">
                  <MatchingScore scorePercentage={profile.matching_score} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


