import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import LoginLayout from "./Layout/LoginLayout";
import "./App.css"


// Pages Components
import { HomePage } from "./Pages/HomePage";
import { ThankYou } from "./Pages/ThankYou";
import ContactDetails from "./Pages/ContactDetails";
import UploadImages from "./Pages/UploadImages";
import FamilyDetails from "./Pages/FamilyDetails";
import EduDetails from "./Pages/EduDetails";
import HoroDetails from "./Pages/HoroDetails";
import PartnerSettings from "./Pages/PartnerSettings";
import { MembershipPlan } from "./Pages/MembershipPlan";
import { PayNow } from "./Pages/PayNow";
import { PayNowRegistration } from "./Pages/PayNowRegistration";
import { ThankYouReg } from "./Pages/ThankYouReg";
import { FooterPages } from "./Pages/FooterPages";
import { LoginHome } from "./Pages/AfterLogin/LoginHome";
import Search from "./Pages/AfterLogin/Search";
import { DashBoard } from "./Pages/AfterLogin/DashBoard";
import { Wishlist } from "./Pages/AfterLogin/Wishlist";
import { Notifications } from "./Pages/AfterLogin/Notifications";
import { Messages } from "./Pages/AfterLogin/Messages";
import { MyProfile } from "./Pages/AfterLogin/MyProfile";
import { ProfileDetails } from "./Pages/AfterLogin/ProfileDetails";
import { ProfileProvider } from "./ProfileContext";
import ProfileGrid from "./Components/LoginHome/MatchingProfiles/GridView";
import ListView from "./Components/LoginHome/MatchingProfiles/ListView";
import GridListView from "./Components/LoginHome/MatchingProfiles/GridListView";
import ProtectedRoute from "./Components/ProtectorRoute";
import RegistrationProtectedRoute from "./Components/RegistrationProtectedRoute";
import { UpgradePlan } from "./Pages/AfterLogin/UpgradePlan";
import { UpgradePayNow } from "./Pages/AfterLogin/UpgradePayNow";
import { UpgradeThankYouReg } from "./Pages/AfterLogin/UpgradeThankYouReg";
import { ViewAllSuggestedProfiles } from "./Components/LoginHome/ViewAllSuggestedProfiles";
import { ViewAllFeaturedProfiles } from "./Components/LoginHome/ViewAllFeaturedProfiles";
import { FeaturedBrideCard } from "./Components/FeaturedBride/FeaturedBrideCard";
import { FeaturedGroomCard } from "./Components/FeaturedGroom/FeaturedGroomCard";
import { FindSomeOneSpecial } from "./Components/SomeOneSpecial/FindSomeOneSpecial";
import { ProfileNotFound } from "./Components/LoginHome/MatchingProfiles/ProfileNotFound";
// import {ProfileNotFound} from "./Components/LoginHome/ProfileNotFound";
import { TermsandConditions } from "./Pages/TermsandConditions";
import ProfileCompletionForm from "./Pages/AfterLogin/ProfileCompletion";
import ImagePage from "./Pages/dynamicWpLink/DynaminkWpLink";
import { FoundersDesk } from "./Pages/FoundersDesk";

import { BasicInfoPdf } from "./Pages/BasicInfoPdf";
import { AwardsMobile } from "./Pages/AwardsMobile";
import { AboutUsMobile } from "./Pages/AboutUsMobile";
import HappyStoriesMobile from "./Pages/HappyStoriesMobile";



// Define prop types for AppContent
interface AppContentProps {
  token: string | null;
}

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <ProfileProvider>
      <BrowserRouter>
        <AppContent token={token} />
      </BrowserRouter>
    </ProfileProvider>
  );
}

function AppContent({ token }: AppContentProps) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   //console.log("Current token:", token);
  //   sessionStorage.removeItem("searchvalue");

  //   const handlePopState = () => {
  //     const currentToken = sessionStorage.getItem("token");
  //     if (currentToken) {
  //       navigate("/LoginHome");
  //     } else {
  //       navigate("/");
  //     }
  //   };

  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [token, navigate]);

  useEffect(() => {
    ////console.log("Current token:", token);
    sessionStorage.removeItem("searchvalue");

    const handlePopState = () => {
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        navigate("/LoginHome");
      } else {
        navigate("/");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/AwardsMobile" element={<AwardsMobile />} />
      <Route path="/AboutUsMobile" element={<AboutUsMobile />} />
      <Route path="/HappyStoriesMobile" element={<HappyStoriesMobile />} />

      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={token ? <Navigate to="/LoginHome" replace /> : <HomePage />}
        />



        <Route element={<RegistrationProtectedRoute redirectTo="/" />}>
          <Route path="/ContactDetails" element={<ContactDetails />} />
          <Route path="/UploadImages" element={<UploadImages />} />
          <Route path="/FamilyDetails" element={<FamilyDetails />} />
          <Route path="/EduDetails" element={<EduDetails />} />
          <Route path="/HoroDetails" element={<HoroDetails />} />
          <Route path="/PartnerSettings" element={<PartnerSettings />} />
          <Route path="/MembershipPlan" element={<MembershipPlan />} />
          <Route path="/PayNow" element={<PayNow />} />
          <Route path="/PayNowRegistration" element={<PayNowRegistration />} />

          <Route path="/ThankYou" element={<ThankYou />} />
          <Route path="/ThankYouReg" element={<ThankYouReg />} />
        </Route>

        <Route path="/FooterPages" element={<FooterPages />} />
        <Route path="/FoundersDesk" element={<FoundersDesk />} />
        <Route path="/TermsandConditions" element={<TermsandConditions />} />
        <Route path="/FeaturedBrideCard" element={<FeaturedBrideCard />} />
        <Route path="/FeaturedGroomCard" element={<FeaturedGroomCard />} />
        <Route path="/FindSomeOneSpecial" element={<FindSomeOneSpecial />} />
        <Route path="/ProfileNotFound" element={<ProfileNotFound />} />
        <Route path="/ProfileImage" element={<ImagePage />} />
        <Route path="/BasicInfoPdf" element={<BasicInfoPdf />} />
      </Route>


      <Route element={<ProtectedRoute redirectTo="/" />}>
        <Route element={<LoginLayout />}>
          <Route path="/LoginHome" element={<LoginHome />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/ProfileDetails" element={<ProfileDetails />} />
          <Route path="/ProfileCompletion" element={<ProfileCompletionForm />} />
          <Route
            path="/ProfileGrid"
            element={
              <ProfileGrid
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                searchResult={undefined}
                searchvalues={undefined}
              />
            }
          />
          <Route
            path="/ListView"
            element={
              <ListView
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                star={undefined}
                matching_score={undefined}
                searchvalues={undefined}
              />
            }
          />
          <Route
            path="/GridListView"
            element={
              <GridListView
                profile_name={""}
                profile_id={undefined}
                profile_age={undefined}
                height={undefined}
                searchResult={undefined}
                searchvalues={undefined}
              />
            }
          />
          <Route path="/UpgradePlan" element={<UpgradePlan />} />
          <Route path="/UpgradePayNow" element={<UpgradePayNow />} />
          <Route path="/UpgradeThankYouReg" element={<UpgradeThankYouReg />} />
          <Route
            path="/ViewAllSuggestedProfiles"
            element={<ViewAllSuggestedProfiles />}
          />
          <Route
            path="/ViewAllFeaturedProfiles"
            element={<ViewAllFeaturedProfiles />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to={token ? "/LoginHome" : "/"} replace />}
      />
    </Routes>
  );
}

export default App;
