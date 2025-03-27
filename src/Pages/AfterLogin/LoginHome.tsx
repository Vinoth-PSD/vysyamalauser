// src/Components/LoginHome/LoginHome.tsx
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileDetailsExpressInterest } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsExpressInterest";
import { HandleLogin } from "../../Components/LoginHome/HandleLogin";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../ProfileContext";


export const LoginHome: React.FC = () => {






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



  const showExpressInterest = useSelector(
    (state: RootState) => state.interest.showExpressInterest
  );
  const navigate = useNavigate();

  const storedProfileCompletion: string =
    sessionStorage.getItem("profile_completion") || "0";
  // const profile_id:string=localStorage.getItem("profile_id")

  const redirectToPage = (profileCompletion: string | null) => {
    switch (profileCompletion) {
      case "1":
        navigate("/ContactDetails");
        break;
      case "2":
        navigate("/FamilyDetails");
        break;
      case "3":
        navigate("/HoroDetails");
        break;
      case "4":
        navigate("/EduDetails");
        break;
      case "5":
        navigate("/PartnerSettings");
        break;
      default:
        console.error("Invalid plan ID");
        // Optionally, you can navigate to a default page
        break;
    }
  };

  useLayoutEffect(() => {
    redirectToPage(storedProfileCompletion);
  }, [storedProfileCompletion]);
  return (
    <div>
      {showExpressInterest ? (
        <ProfileDetailsExpressInterest />
      ) : (
        <HandleLogin />
      )}
    </div>
  );
};
