


import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdVerifiedUser, MdBookmark, MdBookmarkBorder } from "react-icons/md";
import axios from "axios";
import ProfileListImg from "../../../../assets/images/ProfileListImg.png";
import { ProfileContext, Profile } from "../../../../ProfileContext"; // Adjust the path as needed
// import { Link } from "react-router-dom";
// import { fetchProfiles } from "../../../../commonapicall"; // Import the API function
// import Spinner from "../../../Spinner";

// import { toast } from "react-toastify";
// import { ToastNotification } from "../../../Toast/ToastNotification";


import "react-toastify"
import { IoMdLock } from "react-icons/io";
import apiClient from "../../../../API";
// import { toast } from "react-toastify";
// import { ToastNotification } from "../../../Toast/ToastNotification";

interface GridListCardProps {
  profileId: string;
  searchvalues: string;
  profile: Profile;
}

export const GridListCard: React.FC<GridListCardProps> = ({ profileId, profile }) => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  // const { MatchingProfilepageNumber, MatchingProfileperPage, sortOrder } =
  //   context;

  // const [profile, setProfile] = useState<Profile | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { addBookmark, removeBookmark, setSelectedProfiles } = useContext(
    ProfileContext
  ) || {
    addBookmark: () => { },
    removeBookmark: () => { },
    setSelectedProfiles: () => { },
  };
  const navigate = useNavigate();
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  // useEffect(() => {
  //   const loadProfile = async () => {
  //     if (!loginuser_profileId) {
  //       console.error("Login user profile ID is not available");
  //       return;
  //     }

  //     try {
  //       const data = await fetchProfiles(
  //         loginuser_profileId,
  //         MatchingProfilepageNumber,
  //         MatchingProfileperPage,
  //         sortOrder
  //       );
  //       console.log("Fetched profile data:", data);
  //       if (data && data.profiles) {
  //         const profileData = data.profiles.find(
  //           (profile: Profile) => profile.profile_id === profileId
  //         );
  //         setProfile(profileData || null);
  //       } else {
  //         console.error("No profile data found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };

  //   loadProfile();
  // }, [loginuser_profileId, profileId, MatchingProfilepageNumber, sortOrder]);

  useEffect(() => {
    if (profile) {
      const bookmarkedProfiles = JSON.parse(
        localStorage.getItem("bookmarkedProfiles") || "[]"
      );
      const isBookmarked = bookmarkedProfiles.some(
        (item: Profile) => item.profile_id === profile.profile_id
      );
      setIsBookmarked(isBookmarked);
    }
  }, [profile]);

  const handleBookmark = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Prevent triggering card click

    if (!profile) return;

    let updatedBookmarks = JSON.parse(
      localStorage.getItem("bookmarkedProfiles") || "[]"
    );

    if (isBookmarked) {
      // Remove bookmark
      updatedBookmarks = updatedBookmarks.filter(
        (item: Profile) => item.profile_id !== profile.profile_id
      );
      removeBookmark(profile.profile_id);
      setSelectedProfiles(updatedBookmarks);
      // toast.success("Bookmarke Removed successfully")
    } else {
      // Add bookmark
      updatedBookmarks.push(profile);
      addBookmark(profile);
      setSelectedProfiles(updatedBookmarks);
      //toast.success("Bookmarke Added successfully")


    }

    localStorage.setItem(
      "bookmarkedProfiles",
      JSON.stringify(updatedBookmarks)
    );
    setIsBookmarked(!isBookmarked);
  };



  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);





  const handleCardClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const shouldNavigate = true; // Replace this with your actual condition

    if (shouldNavigate && profileId) {
      try {
        const response = await apiClient.post(
          "/auth/Create_profile_visit/",
          {
            profile_id: loginuser_profileId,
            viewed_profile: profileId,
          }
        );

        if (response.data.Status === 1) {
          console.log("Profile visit created successfully:", response.data);
          navigate(`/ProfileDetails?id=${profileId}&rasi=1`);
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
    }
  };

  // if (!profile) return <Spinner />;
  // if (!profile)
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner />
  //     </div>
  //   );

  // useEffect(()=>{
  //   const count =0
  //   if(searchProfile){}
  // },[searchProfile])

  const {
    profile_img,
    profile_name,
    profile_id,
    profile_age,
    height,
    degree,
    profession,
    location,
    verified,
  } = profile;

  return (
    // <Link to="/ProfileDetails" target="_blank">

    <div
      className="flex justify-start items-center space-x-5 relative rounded-xl shadow-profileCardShadow px-4 py-[18px]  max-sm:w-fit max-sm:mx-auto "
      onClick={handleCardClick}
    >

      
        <div className="flex justify-between gap-x-4 max-sm:flex-col max-sm:w-full max-sm:gap-2">
          {/* {/ Profile Image /} */}
          {/* <div className="relative max-sm:w-full">
            <img
              src={profile_img || ProfileListImg}
              alt="Profile-image"
              className="w-[180px] rounded-[6px] max-sm:w-full max-sm:h-[250px]"
            />
            {isBookmarked ? (
              <MdBookmark
                onClick={handleBookmark}
                className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
              />
            ) : (
              <MdBookmarkBorder
                onClick={handleBookmark}
                className="absolute top-2 right-2 text-secondary text-[22px] cursor-pointer"
              />
            )}
          </div> */}



          <div className="relative w-[180px] h-full flex-shrink-[0] max-sm:w-full">
            {profile.photo_protection === 1 ? (
              <>
                <img
                  src={profile_img || ProfileListImg}
                  alt="Profile-image"
                  className="w-[180px] h-[180px] rounded-[6px] max-sm:w-full max-sm:h-[250px] object-cover object-top"
                />
                {/* Lock overlay */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50 rounded-[6px]">
                  <IoMdLock className="w-fit mx-auto text-secondary text-[50px]" />
                  <p className="text-sm text-white font-semibold">
                    Click and Enter password to view profile photo
                  </p>
                </div>
              </>
            ) : (
              <img
                src={profile_img || ProfileListImg}
                alt="Profile-image"
                className="w-[180px] h-[180px] rounded-[6px] max-sm:w-full max-sm:h-[250px] object-cover object-top"
              />
            )}

            {/* Bookmark Icon */}
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





          {/* {/ Profile Details /} */}
          <div className="max-sm:w-full">
            {/* {/ Name & Profile ID /} */}
            <div className="relative mb-2 max-sm:w-full">
              {/* <Link to={`/ProfileDetails?id=${profile_id}&rasi=1`}> */}
              <div className="flex items-center">
                <h5 className="text-secondary text-[20px] font-bold cursor-pointer">
                  {profile_name || "Unknown"}{" "}

                </h5>
                {verified === 1 && (
                  <MdVerifiedUser className="ml-2 text-checkGreen text-[20px]" />
                )}
              </div>
              {/* </Link> */}
            </div>
            <div className="mb-1">
              <p className="text-sm text-primary-400">
                ({profile_id || "N/A"})
              </p>
            </div>

            {/* {/ Years & Height /} */}
            <div className="flex items-center space-x-3 mb-1">
              <p className="flex items-center text-sm text-primary-400">
                {/* <IoCalendar className="mr-2" /> */}
                {profile_age || "N/A"} yrs
              </p>
              <p className="text-gray">|</p>
              <p className="flex items-center text-sm text-primary-400">
                {/* <FaPersonArrowUpFromLine className="mr-2" /> */}
                {height || "N/A"}
              </p>
            </div>

            {/* {/ Degree /} */}
            <div className="mb-1">
              <p className="w-[180px] text-sm text-primary-400 whitespace-nowrap overflow-hidden text-ellipsis ">
                {/* <IoSchool className="mr-2" /> */}
                {degree || "N/A"}
              </p>
            </div>

            {/* {/ Profession /} */}
            <div className="mb-1">
              <p className="flex items-center text-sm text-primary-400">
                {/* <FaSuitcase className="mr-2" /> */}
                {profession || "N/A"}
              </p>
            </div>

            {/* {/ Location /} */}
            <div className="mb-1">
              <p className="flex items-center text-sm text-primary-400">
                {/* <FaLocationDot className="mr-2" /> */}
                {location || "N/A"}
              </p>
            </div>
          </div>
        </div>
      
      {/* <ToastNotification/> */}

    </div>
    // </Link>
  );
};

