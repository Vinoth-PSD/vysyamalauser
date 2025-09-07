import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import React, { useContext, useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { HiUsers } from "react-icons/hi";
import { RiHeartsFill } from "react-icons/ri";
import { MdBookmark } from "react-icons/md";
import PinkLayer from "../../assets/images/pinkLayer.png";
import VioletLayer from "../../assets/images/violetLayer.png";
import YellowLayer from "../../assets/images/yellowLayer.png";
import { FaArrowRight } from "react-icons/fa6";
import InterestCard from "./DashBoardGrid/InterestCard";
import { IndicatorCard } from "./DashBoardGrid/IndicatorCard";
import { OptionCard } from "./DashBoardGrid/OptionCard";
import { ProfileContext } from "../../ProfileContext";
import ProfileImageGroup from "./DashBoardMatchingProfiles/ProfileImageGroup";
import InterestSent from "../../assets/icons/InterestSent.png";
import ViewedProfile from "../../assets/icons/ViewedProfile.png";
import VysAssist from "../../assets/icons/VysAssist.png";
import MyVisitors from "../../assets/icons/MyVisitors.png";
import OtherSettings from "../../assets/icons/OtherSettings.png";
import Gallery from "../../assets/icons/Gallery.png";
import PersonalNote from "../../assets/icons/PersonalNote.png";
import PhotoReq from "../../assets/icons/PhotoReq.png";
import { Puff } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";

// interface DashBoardGridProps {
//   onDashBoardMatchingProfiles: () => void;
//   onDashBoardMutualInterest: () => void;
//   onDashBoardWishlist: () => void;
//   // Profile Card
//   onProfileDetails: () => void;
//   // Indicator Cards
//   onInterestSent: () => void;
//   onViewedProfiles: () => void;
//   onMyVisitors: () => void;
//   onPhotoRequest: () => void;
//   onGallery: () => void;
//   // Optional Cards
//   onPersonalNotes: () => void;
//   onVysAssist: () => void;
//   onOtherSettings: () => void;
// }

export const DashBoardGrid: React.FC = () => {
  // Circular Progress bar value

  // Use context safely
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("DashBoardGrid must be used within a ProfileProvider");
  }
  const { dashboardDetails, fetchDashboardDetails } = context;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //console.log(dashboardDetails, "dashbordDetails");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchDashboardDetails();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);


  const { profileImages } = useContext(ProfileContext) || { profileImages: [] };

  const completionPer = Number(dashboardDetails?.profile_details.completion_per)

  if (loading) {
    return (
      <div className="w-fit mx-auto py-40">
        <Puff
          height="100"
          width="100"
          color="#FF6666"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-sm">Please wait...</p>
      </div>
    );
  }

  const handleViewedProfilesClick = () => {
    navigate('/Dashboard/viewedprofiles');
  };

  const handleInterestProfilesClick = () => {
    navigate('/Dashboard/interestsent');
  };

  const handleMutualInterestProfilesClick = () => {
    navigate('/Dashboard/MutualInterest');
  };

  const handleGalleryClick = () => {
    navigate('/Dashboard/Gallery');
  };

  const handleMyvisitorsProfilesClick = () => {
    navigate('/Dashboard/Myvisitors');
  };

  const handlePhotoRequestClick = () => {
    navigate('/Dashboard/PhotoRequest');
  };
  const handlePersonalNotesClick = () => {
    navigate('/Dashboard/PersonalNotes');
  };
  const handleVysAssistClick = () => {
    navigate('/Dashboard/VysAssit');
  };
  const handleOtherSettingsClick = () => {
    navigate('/Dashboard/OtherSettings');
  };
  const handleWishlistClick = () => {
    navigate('/Dashboard/Wishlisting');
  };
  const handleMatchingProfilesClick = () => {
    navigate('/LoginHome/MatchingProfiles');
  };


  return (
    <div className="container mx-auto py-10 overflow-hidden">
      <h4 className="text-[30px] text-vysyamalaBlackSecondary font-bold mb-6">
        Dashboard
      </h4>

      <div className="">
        <div className="grid grid-rows-1 grid-cols-2 gap-5 items-center max-lg:grid-cols-1 mb-6">
          {/* {/ 3 Dashboard Cards /} */}
          <div>
            <div className="grid grid-rows-2 grid-cols-2 gap-5 items-center max-sm:grid-cols-1">
              {/* {/ Matching Profiles /} */}
              <div
                onClick={handleMatchingProfilesClick}
                className="relative row-span-2 w-full h-full bg-vysyamalaPink shadow-matchingProfileShadow rounded-xl p-5 cursor-pointer z-[1]"
              >
                <div className="absolute top-0 bottom-0 right-0 z-[-1]">
                  <img src={PinkLayer} alt="" className="w-full h-full" />
                </div>
                <div>
                  <HiUsers className="text-[36px] text-white" />
                  <h4 className="text-[20px] text-white font-semibold mt-3">
                    Matching Profiles
                  </h4>
                  <p className="text-[48px] text-white font-semibold my-5">
                    {dashboardDetails?.matching_profile_count}
                  </p>
                  <div>
                    {/* {/ <img src={ProfileImgRounded} alt="" /> /} */}
                    <ProfileImageGroup
                      images={profileImages || []}
                      maxVisible={4}
                      extraCount={profileImages?.length ?? 0}
                    />
                  </div>
                </div>
              </div>

              {/* {/ Mutual Interest /} */}
              <div
                // onClick={onDashBoardMutualInterest}
                onClick={handleMutualInterestProfilesClick}
                className="relative w-full h-full bg-vysyamalaViolet rounded-xl shadow-mutualIntersetShadow p-5 cursor-pointer z-[1]"
              >
                <div className="absolute top-0 bottom-0 right-0 z-[-1]">
                  <img src={VioletLayer} alt="" className="w-full h-full" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[20px] text-white font-semibold">
                      Mutual Interest
                    </h4>
                    <p className="text-[48px] text-white font-semibold">
                      {dashboardDetails?.mutual_int_count}
                    </p>
                  </div>

                  <div className="z-10">
                    <RiHeartsFill className="text-[48px] text-white" />
                  </div>
                </div>
              </div>

              {/* {/ Wishlist /} */}
              <div
                //onClick={onDashBoardWishlist}
                onClick={handleWishlistClick}
                className="relative w-full bg-vysyamalaYellow rounded-xl shadow-WishlistShadow p-5 cursor-pointer z-[1]"
              >
                <div className="absolute top-0 bottom-0 right-0 z-[-1]">
                  <img src={YellowLayer} alt="" className="w-full h-full" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-[20px] text-white font-semibold">
                      Wishlist
                    </h4>
                    <p className="text-[48px] text-white font-semibold">
                      {dashboardDetails?.wishlist_count}
                    </p>
                  </div>

                  <div className="z-10">
                    <MdBookmark className="text-[48px] text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {/ My Profile /} */}
          <div>
            <div className="bg-white rounded-xl shadow-profileCardShadow p-5 max-sm:p-4">
              <div className="flex justify-between items-start mb-6">
                <div className="flex justify-center items-center space-x-5 max-sm:flex-col max-sm:items-start max-md:space-x-0">
                  <div>
                    <img
                      src={dashboardDetails?.profile_details.profile_image}
                      alt="My Profile Image"
                      className=" w-[88px] rounded-[6px]"
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="text-[21px] text-vysyamalaBlackSecondary font-bold mb-2">
                      {dashboardDetails?.profile_details.profile_name}
                    </h4>
                    <p className="text-primary font-semibold  mb-2">
                      {dashboardDetails?.profile_details.profile_id}
                    </p>
                    <p className="text-primary font-semibold  mb-2">
                      {dashboardDetails?.profile_details.package_validity}
                    </p>
                  </div>
                </div>


                <div>
                  <p className="bg-gradientGold text-primary font-semibold rounded-md px-3 py-0.5 ">
                    {dashboardDetails?.profile_details.package_name}
                  </p>
                </div>
              </div>

              <div className="bg-vysyamalaLightSandal p-6 rounded-xl max-sm:p-5">
                <div className="flex justify-between items-start max-lg:flex-wrap max-sm:flex-col-reverse max-sm:gap-y-3">
                  <div>
                    <h5 className="text-lg text-primary font-semibold mb-[5px] max-sm:text-base">
                      Your profile is now{" "}
                      {`${dashboardDetails?.profile_details.completion_per}%`}{" "}
                      complete
                    </h5>
                    {typeof dashboardDetails?.profile_details.completion_per === "number" &&
                      dashboardDetails?.profile_details.completion_per < 100 && (
                        <>
                          <p className="text-sm text-primary">
                            Complete your profile we will suggest profiles based on
                            your preference
                          </p>

                          <button
                            onClick={() => navigate("/MyProfile")}
                            className="flex items-center text-sm text-main font-medium leading-6 my-3 max-sm:text-base"
                          >
                            Complete Your Profile <FaArrowRight className="ml-2" />
                          </button>
                        </>
                      )}
                  </div>
                  {typeof dashboardDetails?.profile_details.completion_per === "number" &&
                    dashboardDetails?.profile_details.completion_per < 100 && (

                      <div className="w-[86px] h-[86px] text-primary font-semibold max-sm:w-16 max-sm:h-16">
                        {/* <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                      styles={buildStyles({
                        pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                        textColor: "#535665",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    /> */}

                        <CircularProgressbar
                          value={completionPer}
                          text={`${dashboardDetails?.profile_details.completion_per || 0}%`}
                          styles={buildStyles({
                            pathColor: `rgba(47, 189, 18, ${(dashboardDetails?.profile_details.completion_per || 0)})`,
                            textColor: "#535665",
                            trailColor: "#d6d6d6",
                            backgroundColor: "#3e98c7",

                          })}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-1 grid-cols-2 gap-5 items-start  max-lg:grid-cols-1">
          {/* {/ Received Interest /} */}
          <div className="bg-white shadow-profileCardShadow p-6">
            <h4 className="text-[20px] text-primary font-semibold mb-6 max-sm:text-[18px]">
              Received Interest
              <span className="text-sm">
                {" "}
                ({dashboardDetails?.received_int_count})
              </span>
            </h4>
            <div className="message-box h-[22rem]  overflow-scroll overflow-x-hidden overscroll-y-auto max-md:h-auto">
              <p className="text-sm text-ashSecondary font-semibold mb-3">
                Today
              </p>
              <InterestCard pageNumber={1} dataPerPage={10} />
            </div>
          </div>

          {/* {/ My Options /} */}
          <div>
            <div className="grid grid-rows-2 grid-cols-2 gap-6  max-sm:grid-cols-1">
              <IndicatorCard
                // onClick={onInterestSent}
                onClick={handleInterestProfilesClick}
                cardTitle="Interest Sent"
                cardCount={String(dashboardDetails?.sent_int_count || 0)}
                cardIcon={InterestSent}
              />
              <IndicatorCard
                //onClick={onViewedProfiles}
                onClick={handleViewedProfilesClick}
                cardTitle="Viewed Profiles"
                cardCount={String(dashboardDetails?.viewed_profile_count || 0)}
                cardIcon={ViewedProfile}
              />
              <IndicatorCard
                // onClick={onMyVisitors}
                onClick={handleMyvisitorsProfilesClick}
                cardTitle="My Visitors"
                cardCount={String(dashboardDetails?.myvisitor_count || 0)}
                cardIcon={MyVisitors}
              />


              <IndicatorCard
                // onClick={onGallery}
                onClick={handleGalleryClick}
                cardTitle="Gallery"
                cardCount={String(dashboardDetails?.gallery_count || 0)}
                cardIcon={Gallery}
              />

              <IndicatorCard
                // onClick={onPhotoRequest}
                onClick={handlePhotoRequestClick}
                cardTitle="Photo Request"
                cardCount={String(dashboardDetails?.photo_int_count || 0)}
                cardIcon={PhotoReq}
              />

            </div>

            {/* {/ Other options /} */}
            <div className="mt-5">
              <div className="flex justify-start items-center gap-6 max-sm:flex-col">
                <OptionCard
                  //onClick={onPersonalNotes}
                  onClick={handlePersonalNotesClick}
                  cardTitle="Personal Notes"
                  cardIcon={PersonalNote}
                />
                <OptionCard
                  cardTitle="Vys Assist"
                  cardIcon={VysAssist}
                  // onClick={onVysAssist}
                  onClick={handleVysAssistClick}
                />

                <OptionCard
                  // onClick={onOtherSettings}
                  onClick={handleOtherSettingsClick}
                  cardTitle="Other Settings"
                  cardIcon={OtherSettings}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
