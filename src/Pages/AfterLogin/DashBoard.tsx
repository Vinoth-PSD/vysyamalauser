import { useState, useEffect, useContext } from "react";
import { DashBoardGrid } from "../../Components/DashBoard/DashBoardGrid";
import { DashBoardMutualInterest } from "../../Components/DashBoard/DashBoardMutualInterest";
import { DashBoardWishlist } from "../../Components/DashBoard/DashBoardWishlist";
import { DashBoardMyProfile } from "../../Components/DashBoard/DashBoardMyProfile";
import { OtherSettings } from "../../Components/DashBoard/OtherSettings";
import { DashBoardMatchingProfiles } from "../../Components/DashBoard/DashBoardMatchingProfiles";
import { InterestSent } from "../../Components/DashBoard/InterestSent";
import { ViewedProfiles } from "../../Components/DashBoard/ViewedProfiles";
import { MyVisitors } from "../../Components/DashBoard/MyVisitors";
import { PersonalNotes } from "../../Components/DashBoard/PersonalNotes";
import PhotoRequest from "../../Components/DashBoard/PhotoRequest";
import { VysAssist } from "../../Components/DashBoard/VysAssist";
import Gallary from "../../Components/DashBoard/Gallary";
import { ProfileContext } from "../../ProfileContext";
import { useLocation } from "react-router-dom";

export const DashBoard = () => {
  // State to manage which section to display
  const [showDashBoardMatchingProfiles, setShowDashBoardMatchingProfiles] = useState(false);
  const [showDashBoardMutualInterest, setShowDashBoardMutualInterest] = useState(false);
  const [showDashBoardWishlist, setShowDashBoardWishlist] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [showInterestSent, setShowInterestSent] = useState(false);
  const [showViewedProfiles, setShowViewedProfiles] = useState(false);
  const [showMyVisitors, setShowMyVisitors] = useState(false);
  const [showPersonalNotes, setShowPersonalNotes] = useState(false);
  const [showVysAssist, setShowVysAssist] = useState(false);
  const [showOtherSettings, setShowOtherSettings] = useState(false);
  const [showPhotoRequest, setShowPhotoRequest] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem('searchvalue');
  }, []);

  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    setFromAge,
    setToAge,
    setFromHeight,
    setToHeight,
    setWorkLocation,
    setAdvanceSelectedProfessions,
    Set_Maritial_Status,
    setAdvanceSelectedEducation,
    setSelectedIncomes,
    setChevvai_dhosam,
    setRehuDhosam,
    setAdvanceSelectedBirthStar,
    setNativeState,
    setPeopleOnlyWithPhoto,
    setAdvanceSearchData
  } = context;

  useEffect(() => {
    setFromAge(0);
    setToAge(0);
    setFromHeight(0);
    setToHeight(0);
    setWorkLocation("");
    setAdvanceSelectedProfessions([]);
    Set_Maritial_Status([]);
    setAdvanceSelectedEducation("");
    setSelectedIncomes("");
    setChevvai_dhosam("no");
    setRehuDhosam("no");
    setAdvanceSelectedBirthStar("");
    setNativeState([]);
    setPeopleOnlyWithPhoto(0);
    setAdvanceSearchData([]);
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const interestParam = queryParams.get("key");

  useEffect(() => {
    if (interestParam) {
      setShowOtherSettings(true)
    }
  }, [interestParam])
  
  
  return (
    <div>
      {showProfileDetails ? (
        <DashBoardMyProfile
          dashBoardAgain={() => setShowProfileDetails(false)}
        />
      ) : showPhotoRequest ? (
        <PhotoRequest dashBoardAgain={() => setShowPhotoRequest(false)} />
      ) : showDashBoardMutualInterest ? (
        <DashBoardMutualInterest
          dashBoardAgain={() => setShowDashBoardMutualInterest(false)}
        />
      ) : showDashBoardMatchingProfiles ? (
        <DashBoardMatchingProfiles
          dashBoardAgain={() => setShowDashBoardMatchingProfiles(false)}
        />
      ) : showDashBoardWishlist ? (
        <DashBoardWishlist
          dashBoardAgain={() => setShowDashBoardWishlist(false)}
        />
      ) : showInterestSent ? (
        <InterestSent dashBoardAgain={() => setShowInterestSent(false)} />
      ) : showViewedProfiles ? (
        <ViewedProfiles dashBoardAgain={() => setShowViewedProfiles(false)} />
      ) : showMyVisitors ? (
        <MyVisitors dashBoardAgain={() => setShowMyVisitors(false)} />
      ) : showPersonalNotes ? (
        <PersonalNotes dashBoardAgain={() => setShowPersonalNotes(false)} />
      ) : showVysAssist ? (
        <VysAssist dashBoardAgain={() => setShowVysAssist(false)} />
      ) : showOtherSettings ? (
        <OtherSettings dashBoardAgain={() => setShowOtherSettings(false)} />
      ) : showGallery ? (
        <Gallary dashBoardAgain={() => setShowGallery(false)} />) : (
        // <DashBoardGrid
        //   onDashBoardMutualInterest={() =>
        //     setShowDashBoardMutualInterest(true)
        //   }
        //   onDashBoardMatchingProfiles={() =>
        //     setShowDashBoardMatchingProfiles(true)
        //   }
        //   onDashBoardWishlist={() => setShowDashBoardWishlist(true)}
        //   // Profile Card
        //   onProfileDetails={() => setShowProfileDetails(true)}
        //   // Indicator Cards
        //   onViewedProfiles={() => setShowViewedProfiles(true)}
        //   onInterestSent={() => setShowInterestSent(true)}
        //   onMyVisitors={() => setShowMyVisitors(true)}
        //   onPhotoRequest={() => setShowPhotoRequest(true)}
        //   onGallery={() => setShowGallery(true)}
        //   // Optional Cards
        //   onPersonalNotes={() => setShowPersonalNotes(true)}
        //   onVysAssist={() => setShowVysAssist(true)}
        //   onOtherSettings={() => setShowOtherSettings(true)}
        // />
        <DashBoardGrid />
      )}
    </div>
  );
};
