import React, { useContext, useEffect, useState } from "react";
import ProfileListImg from "../../assets/images/ProfileListImg.png";
import { MdVerifiedUser } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { FaSuitcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import MatchingScore from "../DashBoard/ProfileDetails/MatchingScore";
import { ProfileContext } from "../../ProfileContext";
import { WhishlistNotFound } from "./WhishlistNotFound";
import apiClient from "../../API";

// Define the shape of your wishlist profile
interface WishlistProfile {
  height: string;
  degree: string;
  profession: string;
  location: string;
  wishlist_profileid: string;
  wishlist_profile_name: string;
  wishlist_Profile_img: string;
  wishlist_profile_age: number;
  wishlist_verified?: number;
  wishlist_match_score?: number;
  wishlist_height:number;
  wishlist_star:string;
  wishlist_profession:string;
  wishlist_degree:string;
  wishlist_city:string;
  wishlist_views:number;
  wishlist_lastvisit:string;
  wishlist_userstatus:string;
  wishlist_horoscope:string;
  wishlist_profile:number;
}
interface WishlistCardProps {
  page: number;
  perPage:number;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ page}) => {
  const navigate = useNavigate();

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const { setTotalPage, setTotalRecords, setWhistListPerpage } = context;


  // State to hold the profiles data
  const [wishlistProfiles, setWishlistProfiles] = useState<WishlistProfile[]>(
    []
  );

  // Fetch data from API
  const fetchWishlistProfiles = async (profileId: string) => {
    try {
      const response = await apiClient.post(
        "/auth/Get_profile_wishlist/",
        {
          profile_id: profileId,
          page_number:page,
           // Include the profile_id in the request body
        }
      );

      if (response.data.Status === 1) {
        setTotalRecords(response.data.data.total_records);
        setTotalPage(response.data.data.total_pages);
        setWhistListPerpage(response.data.data.per_page
        )
        console.log(response.data.data, "lllllllllllll");
        // Assuming you have a state to store the profiles
        setWishlistProfiles(response.data.data.profiles);
         // Scroll to the top of the window
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Adds smooth scrolling effect
      });
      
      } else {
        console.error(
          "Failed to fetch wishlist profiles:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching wishlist profiles:", error);
    }
  };

  useEffect(() => {
    // Retrieve profile_id from sessionStorage
    const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

    if (loginuser_profileId) {
      fetchWishlistProfiles(loginuser_profileId);
    } else {
      console.error("Profile ID not found in sessionStorage.");
    }
  }, [page]);

  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}&page=2`);
  };

  return (
    <div>
      <div>
        {wishlistProfiles.length === 0 ? (
          <div className="py-20">
          <WhishlistNotFound />
          </div>
        ) : (
          <div>
            {wishlistProfiles.map((profile) => (
              <div
                key={profile.wishlist_profileid}
                className="flex justify-start items-center space-x-5 relative rounded-xl shadow-profileCardShadow px-3 py-3 mb-5"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="flex justify-between items-center space-x-5  max-sm:flex-col max-sm:gap-5 max-sm:w-full max-sm:items-start">
                    {/* Profile Image */}
                    <div className="relative max-sm:w-full">
                      <img
                        src={profile.wishlist_Profile_img || ProfileListImg}
                        alt="Profile-image"
                        className="rounded-[6px] w-[218px] h-[218px]  max-md:w-full"
                      />

                      {/* No Bookmark icon functionality here */}
                    </div>

                    {/* Profile Details */}
                    <div className="">
                      {/* Name & Profile ID */}

                      <div className="relative mb-2">
                        <div className="flex items-center">
                          <h5
                            onClick={() =>
                              handleProfileClick(profile.wishlist_profileid)
                            }
                            className="text-[20px] text-secondary font-semibold cursor-pointer"
                          >
                            {profile.wishlist_profile_name}
                            <span className="text-sm text-ashSecondary">
                              ({profile.wishlist_profileid })
                            </span>
                          </h5>
                          {profile.wishlist_verified === 1 && (
                            <MdVerifiedUser className=" text-[20px] text-checkGreen ml-2" />
                          )}
                        </div>
                      </div>

                      {/* Years & Height */}
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="flex items-center text-sm text-primary font-normal">
                          <IoCalendar className="mr-2 text-primary" />
                          {profile.wishlist_profile_age } yrs
                        </p>

                        <p className="text-gray font-semibold">|</p>

                        <p className="flex items-center text-sm text-primary font-normal">
                          <FaPersonArrowUpFromLine className="mr-2 text-primary" />
                          {profile.wishlist_height }
                        </p>
                      </div>

                      {/* Uthiram */}
                      <div className="mb-2">
                        <p className="flex items-center text-sm text-primary font-normal">
                          <MdStars className="mr-2 text-primary" />
                          {profile.wishlist_star}
                        </p>
                      </div>

                      {/* Bachelors */}
                      <div className="mb-2">
                        <p className="flex items-center text-sm text-primary font-normal">
                          <IoSchool className="mr-2 text-primary" />
                          {profile.wishlist_degree}
                        </p>
                      </div>

                      {/* Employed */}
                      <div className="mb-2">
                        <p className="flex items-center text-sm text-primary font-normal">
                          <FaSuitcase className="mr-2 text-primary" />
                          {profile.wishlist_profession }
                        </p>
                      </div>

                      {/* Location */}
                      <div className="mb-2 ">
                        <p className="flex items-center text-sm text-primary font-normal ">
                          <FaLocationDot className="mr-2 text-primary" />
                          {profile.wishlist_city }
                        </p>
                      </div>

                      <div className="hidden flex justify-start items-center gap-3 max-2xl:flex-wrap max-md:hidden">
                        {/* Horoscope Available */}
                        <div>
                          <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                            <MdOutlineGrid3X3 className="mr-2 text-primary" />  {profile.wishlist_horoscope }
                          </p>
                        </div>

                        {/*  Active User */}
                        <div>
                          <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                            <FaUser className="mr-2 text-primary" />  {profile.wishlist_userstatus}
                          </p>
                        </div>

                        {/* Last Visit */}
                        <div>
                          <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                            <IoCalendar className="mr-2 text-primary" /> Last visit on  {profile.wishlist_lastvisit}
                          </p>
                        </div>

                        {/* views */}
                        <div>
                          <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                            <IoEye className="mr-2 text-primary" /> {profile.wishlist_views } views
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Matching Score */}
                  <div className="max-lg:hidden">
                    <div>
                      {/* <img
                    src={MatchingScoreImg}
                    alt="Matching Score"
                    className="w-full"
                  /> */}
                      <MatchingScore scorePercentage={profile.wishlist_match_score} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
