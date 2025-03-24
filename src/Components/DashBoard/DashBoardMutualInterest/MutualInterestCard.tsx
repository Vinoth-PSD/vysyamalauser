import { useState, useEffect, SetStateAction, Dispatch } from "react";
import axios from "axios";
import ProfileListImg from "../../../assets/images/ProfileListImg.png";
import {
  MdVerifiedUser,
  MdBookmark,
  MdBookmarkBorder,
  MdOutlineGrid3X3,
  MdStars,
} from "react-icons/md";
import { IoCalendar, IoEye, IoSchool } from "react-icons/io5";
import { FaUser, FaSuitcase } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import MatchingScore from "../ProfileDetails/MatchingScore";
import { ProfileNotFound } from "../../LoginHome/MatchingProfiles/ProfileNotFound";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify
import apiClient from "../../../API";

// Define the Profile interface
export interface Profile {
  mutint_Profile_img: string;
  mutint_profile_name: string;
  mutint_profileid: string;
  mutint_profile_age: number;
  horoscope_available: boolean;
  mutint_match_score?: number;
  mutint_star?: string;
  mutint_degree?: string;
  mutint_city?: string;
  mutint_profession?: string;
  mutint_horoscope?: string;
  mutint_userstatus?: string;
  mutint_lastvisit?: string;
  mutint_views?: string;
}

interface MutualInterestCardProps {
  setCount: React.Dispatch<React.SetStateAction<number>>; // Type for setState function
  setTotalRecords: Dispatch<SetStateAction<number>>;
  setViewCount: Dispatch<SetStateAction<number>>;
  setDataPerPage: Dispatch<SetStateAction<number>>;
}

export const MutualInterestCard: React.FC<MutualInterestCardProps> = ({
  setDataPerPage,
  setViewCount,
  setCount,
  setTotalRecords,
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<string[]>(() => {
    const savedBookmarks = sessionStorage.getItem("bookmarkedProfiles");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_mutual_intrests/",
          {
            profile_id: loginuser_profileId,
          }
        );
        setCount(response.data.mut_int_count);
        setTotalRecords(response.data.data.total_records || 0);
        setDataPerPage(response.data.data.per_page || 0);
        setViewCount(response.data.viewed_count || 0);
        if (response.data.Status === 1) {
          const profilesArray = response.data.data.profiles;
          setProfiles(profilesArray);
        } else {
          setError("No Data Found");
        }
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("Unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [loginuser_profileId, setCount, setTotalRecords, setDataPerPage, setViewCount]);

  const handleBookmarkToggle = async (profileId: string) => {
    if (bookmarkedProfiles.includes(profileId)) {
      await removeBookmark(profileId);
    } else {
      await addBookmark(profileId);
    }
  };

  const addBookmark = async (profileId: string) => {
    try {
      const response = await apiClient.post(
        "/auth/Mark_profile_wishlist/",
        {
          profile_id: loginuser_profileId,
          profile_to: profileId,
          status: "1",
        }
      );
      if (response.data.Status === 1) {
        toast.success("Profile added to wishlist!");
        console.log("Profile added to wishlist!");
        setBookmarkedProfiles((prev) => [...prev, profileId]);
        sessionStorage.setItem(
          "bookmarkedProfiles",
          JSON.stringify([...bookmarkedProfiles, profileId])
        );
      } else {
        toast.error("Failed to add to wishlist.");
      }
    } catch (error) {
      toast.error("An error occurred while adding to wishlist.");
      console.error("Error adding bookmark:", error);
    }
  };

  const removeBookmark = async (profileId: string) => {
    try {
      const response = await apiClient.post(
        "/auth/Mark_profile_wishlist/",
        {
          profile_id: loginuser_profileId,
          profile_to: profileId,
          status: "0",
        }
      );
      if (response.data.Status === 1) {
        toast.error("Profile removed from wishlist.");
        console.log("Profile removed from wishlist.");
        const updatedBookmarks = bookmarkedProfiles.filter((id) => id !== profileId);
        setBookmarkedProfiles(updatedBookmarks);
        sessionStorage.setItem("bookmarkedProfiles", JSON.stringify(updatedBookmarks));
      } else {
        toast.error("Failed to remove from wishlist.");
      }
    } catch (error) {
      toast.error("An error occurred while removing from wishlist.");
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <div className="">
        <ToastContainer /> {/* Include ToastContainer */}
      {profiles.length ? (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.mutint_profileid}
            profile={profile}
            isBookmarked={bookmarkedProfiles.includes(profile.mutint_profileid)}
            onBookmarkToggle={(e) => {
              e.stopPropagation();
              handleBookmarkToggle(profile.mutint_profileid);
            }}
          />
        ))
      ) : (
        <div className="py-20">
          <ProfileNotFound />
        </div>
      )}
    </div>
  );
};

interface ProfileCardProps {
  profile: Profile;
  isBookmarked: boolean;
  onBookmarkToggle: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isBookmarked,
  onBookmarkToggle,
}) => {
  const navigate = useNavigate();
  const handleProfileClick = (profileId: string) => {
    navigate(`/ProfileDetails?id=${profileId}`);
  };

  return (
    <div
      className="flex justify-start items-center space-x-5 relative rounded-xl shadow-profileCardShadow p-5 mb-5"
      onClick={() => handleProfileClick(profile.mutint_profileid)}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-between items-center space-x-5 max-sm:flex-col max-sm:gap-5 max-sm:w-full max-sm:items-start">
          <div className="relative max-sm:w-full">
            <img
              src={profile.mutint_Profile_img || ProfileListImg}
              alt="Profile image"
              className="rounded-[6px] w-[218px] h-[218px]  max-md:w-full"
            />
            {isBookmarked ? (
              <MdBookmark
                onClick={onBookmarkToggle}
                className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
              />
            ) : (
              <MdBookmarkBorder
                onClick={onBookmarkToggle}
                className="absolute top-2 right-2 text-white text-[22px] cursor-pointer"
              />
            )}
          </div>

          <div>
            <div className="relative mb-2">
              <div className="flex items-center">
                <h5 className="text-[20px] text-secondary font-semibold cursor-pointer">
                  {profile.mutint_profile_name || "Unknown"}{" "}
                  <span className="text-sm text-ashSecondary">
                    ({profile.mutint_profileid || "N/A"})
                  </span>
                </h5>

                <MdVerifiedUser className="text-[20px] text-checkGreen ml-2" />
              </div>
            </div>

            <div className=" flex items-center space-x-3 mb-2">
              <p className="flex items-center text-sm text-primary font-normal">
                <IoCalendar className="mr-2 text-primary" />
                {profile.mutint_profile_age || "N/A"} yrs
              </p>
            </div>

            <div className="mb-2">
              <p className="flex items-center text-sm text-primary font-normal">
                <MdStars className="mr-2 text-primary" />
                {profile.mutint_star || "N/A"}
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm text-primary font-normal">
                <IoSchool className="mr-2 text-primary" />
                {profile.mutint_degree || "N/A"}
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm text-primary font-normal">
                <FaSuitcase className="mr-2 text-primary" />
                {profile.mutint_profession || "N/A"}
              </p>
            </div>
            <div className="mb-2">
              <p className="flex items-center text-sm text-primary font-normal">
                <FaLocationDot className="mr-2 text-primary" />
                {profile.mutint_city || "N/A"}
              </p>
            </div>

            <div className="hidden flex justify-start items-center gap-3 max-2xl:flex-wrap max-md:hidden">
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <MdOutlineGrid3X3 className="mr-2 text-primary" />{" "}
                  {profile.mutint_horoscope || "N/A"}
                </p>
              </div>
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <FaUser className="mr-2 text-primary" /> {profile.mutint_userstatus}
                </p>
              </div>
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <IoCalendar className="mr-2 text-primary" /> Last visit on{" "}
                  {profile.mutint_lastvisit}
                </p>
              </div>
              <div>
                <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                  <IoEye className="mr-2 text-primary" /> {profile.mutint_views} views
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-lg:hidden">
          <MatchingScore scorePercentage={profile.mutint_match_score} />
        </div>
      </div>
    </div>
  );
};
