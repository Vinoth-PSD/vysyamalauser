import { useState, useEffect, useContext, useRef, SetStateAction } from "react";
import axios from "axios";
import {
  MdVerifiedUser,
  MdLocalPrintshop,
  MdArrowDropDown,
} from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ProfileSlick } from "../../Components/DashBoard/ProfileDetails/ProfileSlick";
import { ProfileDetailsSettings } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsSettings";
import Spinner from "../../Components/Spinner";
import { ProfileContext } from "../../ProfileContext";
import { useNavigate } from "react-router-dom";
// import { Share } from "../../Components/DashBoard/ProfileDetails/Share";
import { IoShareSocialSharp } from "react-icons/io5";
import { MyProfileShare } from "../../Components/DashBoard/ProfileDetails/MyProfileShare"
import { Helmet } from "react-helmet";

// import { useNavigate } from "react-router-dom";

interface GetProfileDetMatch {
  profile_id: string;
  //   profile_name: string;
  //   age: string;
  //   weight: string;
  //   height: string;
  //   star: string;
  //   profession: string;
  //   education: string;
  //   about: string;
  //   gothram: string;
  //   horoscope_available: string;
  //   matching_score: string;
  //   verified: number;

  personal_profile_name: string;
  personal_age: number;
  personal_profile_height: string;
  personal_profile_marital_status_name: string;
  personal_about_self: string;
  personal_weight: string;
  personal_verify: number;
  package_name: string;
  valid_upto: string;
  profile_completion: string;
  star: string;
  gothram: string;
  prosession: string;
  heightest_education: string;
}


interface EmptyField {
  tab: string;
  field: string;

}

interface PersonalData {
  empty_fields: EmptyField[];
}

const fieldNameMapping = {
  Profile_idproof: "Profile ID Proof",
  horoscope_file: "Horoscope File",
  image: "Profile Image",
  property_worth: "Property Worth",
  about_self: "About Self",
  about_family: "About Family",
  career_plans: "Career Plans",
  anual_income: "Annual Income",
  Video_url: "Video URL",
};

export const MyProfile = () => {
  // const handleScrollToSettings = () => {
  //   const element = document.getElementById("ProfileDetailsSettings");
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

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
    setAdvanceSearchData,
    images
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

  sessionStorage.removeItem("selectedProfileId");

  // const [Get_profile_det_match, setGet_profile_det_match] =
  //   useState<GetProfileDetMatch | null>(null);

  const [get_myprofile_personal, setGetMyProfilePersonal] =
    useState<GetProfileDetMatch | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");
  const [percentage, setPercentage] = useState<number>(0); // Initialize with 0 or any default value
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);


  useEffect(() => {
    const storedProfileId = sessionStorage.getItem("profile_id");
    if (storedProfileId) {
      setProfileId(storedProfileId);
    } else {
      console.error("Profile ID not found in session storage");
    }
  }, []);

  useEffect(() => {
    if (profileId) {
      const fetchDashboardDetails = async () => {
        try {
          const formData = new FormData();
          formData.append("profile_id", profileId);

          const response = await axios.post(
            "https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/get_myprofile_personal/",
            formData
          );

          if (response.data.status === "success") {
            setPersonalData(response.data.data);
          } else {
            alert("Failed to fetch dashboard details");
          }
        } catch (error) {
          console.error("Error fetching dashboard details:", error);
          alert("An error occurred while fetching data.");
        }
      };

      fetchDashboardDetails();
    }
  }, [profileId]);



  useEffect(() => {
    const fetchGetMyProfilePersonal = async () => {
      setLoading(true); // Start loading when fetch begins
      try {
        const response = await axios.post(
          "https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/get_myprofile_personal/",
          {
            profile_id: loginuser_profileId,
            user_profile_id: loginuser_profileId,
          }
        );

        console.log("API Response:", response.data);

        // Ensure the response contains `data` before setting it
        if (response.data && response.data.data) {
          setGetMyProfilePersonal(response.data.data);

          // Assuming profile_completion is in percentage form like "85%" or "85"
          const completionValue =
            parseInt(response.data.data.profile_completion) || 0;
          setPercentage(completionValue); // Set the dynamic percentage
        } else {
          console.error("Unexpected response structure:", response.data);
          setError("Unexpected response structure");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
          setError(`Axios error: ${error.response?.data || error.message}`);
        } else {
          console.error("Unexpected error:", error);
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchGetMyProfilePersonal();
  }, [loginuser_profileId]); // Add `loginuser_profileId` to the dependency array if it's dynamic
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };
  const handleDownloadPdf = () => {
    const link = document.createElement("a");
    link.target = '_blank'; // Open in a new tab
    // link.href = `https://apiupg.rainyseasun.com/auth/generate-pdf/${loginuser_profileId}/${Get_profile_det_match?.profile_id}`;
    // link.download = `pdf_${Get_profile_det_match?.profile_id}.pdf`; // Customize the file name

    link.href = `https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/My_horoscope_pdf_color/${get_myprofile_personal?.profile_id}/`;
    // link.download = `pdf_${get_myprofile_personal?.profile_id}.pdf`; // Customize the file name

    link.click();

  };
  const PrintPdf = () => {
    const link = document.createElement("a");
    link.target = '_blank'; // Open in a new tab
    // link.href = `https://apiupg.rainyseasun.com/auth/generate-pdf/${loginuser_profileId}/${Get_profile_det_match?.profile_id}`;
    // link.download = `pdf_${Get_profile_det_match?.profile_id}.pdf`; // Customize the file name

    link.href = `https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/My_horoscope_black/${get_myprofile_personal?.profile_id}/`;
    // link.download = `pdf_${get_myprofile_personal?.profile_id}.pdf`; // Customize the file name

    link.click();

  };

  // const handleSelectLanguage = (language: string) => {
  //   setSelectedLanguage(language);
  //   setIsOpen(false);
  //   handleDownloadPdf();
  // };

  const navigate = useNavigate();

  // const handleClick = () => {
  //   if (get_myprofile_personal?.package_name === "Free") {
  //     navigate("/MemberShipPlan");
  //   } else {
  //     navigate("/PayNow");
  //   }
  // };



  const handleClick = () => {
    if (get_myprofile_personal?.package_name === "Free") {
      navigate("/MemberShipPlan");
    } else {
      navigate("/PayNow", {
        state: {
          profileId: loginuser_profileId,
          packageName: get_myprofile_personal?.package_name,
          //profileCompletion: percentage,
        },
      });
    }
  };


  const convertToFeet = (cm: number) => {
    if (!cm) return "N/A"; // Handle undefined or null values
    const feet = cm / 30.48; // 1 foot = 30.48 cm
    const feetPart = Math.floor(feet);
    const inches = Math.round((feet - feetPart) * 12); // Convert the fractional part to inches
    return `${feetPart}'${inches}" F`; // Format as feet and inches
  };

  // const getMatchingScorePercentage = () => {
  //   if (Get_profile_det_match?.matching_score) {
  //     return parseInt(Get_profile_det_match.matching_score.replace('%', '')) || 0;
  //   }
  //   return 0;
  // };

  // const percentage = getMatchingScorePercentage();
  // const percentage = 85;
  console.log(get_myprofile_personal, "Get_profile_det_match");

  // const [isShareVisible, setIsShareVisible] = useState(false);

  // const toggleShareVisibility = () => {
  //   setIsShareVisible(!isShareVisible);
  // };

  // const [isSharesOpen,] = useState(false);
  // const [isSharesHovered, setShareIsHovered] = useState(false);

  // const showShareDropdown= () =>{
  //   setShareIsOpen(!isSharesOpen);
  // }

    const [isShareVisible, setIsShareVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Define ref type
  
    const toggleShareVisibility = () => {
      setIsShareVisible((prevState) => !prevState);
    };
  
    // Hide dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) { // Define event type
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsShareVisible(false);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  const [openPopup, setOpenPopup] = useState(false)

  // const togglepopup = () => {
  //   setOpenPopup(!openPopup)
  // }

  const handleNextClick = () => {
    console.log("Next button clicked");
    navigate('/ProfileCompletion'); // Replace with your actual route path
  };
  // const popupRef = useRef(null);
  // // const handleClickOutside = (event: { target: any; }) => {
  // //   if (popupRef.current && !popupRef.current.contains(event.target)) {
  // //     setOpenPopup(false);
  // //   }
  // // };

  // const handleClickOutside = (_event: MouseEvent) => {
  //   // TypeScript now knows that popupRef.current is a div or null
  //   if (popupRef.current) {
  //     setOpenPopup(false);
  //   }
  // };
  // useEffect(() => {
  //   if (openPopup) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [openPopup]);

  const popupRef = useRef<HTMLDivElement | null>(null);


  const handleClickOutside = (event: MouseEvent) => {
    // Ensure TypeScript recognizes the type of `event.target`
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    if (openPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openPopup]);


  const [isPdfMenuOpen, setIsPdfMenuOpen] = useState(false);




  const handleSelectLanguage = (language: SetStateAction<string | null>) => {
    setSelectedLanguage(language);
    setIsOpen(false); // Close the language dropdown
    if (language === "Tamil" || language === "English") {
      setIsPdfMenuOpen(true); // Open the PDF menu if Tamil is selected

    } else {
      setIsPdfMenuOpen(false); // Close the PDF menu for other languages
    }
  };

  const handleViewPdf = () => {
    handleDownloadPdf();

    console.log(`Viewing PDF in ${selectedLanguage}`);
    // Add your logic to view the PDF in the selected language
  };

  // const handlePrintPdf = () => {
  //   handleDownloadPdf();
  //   console.log(`Printing PDF in ${selectedLanguage}`);
  //   // Add your logic to print the PDF in the selected language
  // };


  return (
    <div className="">
      <Helmet>
        <title>Profile of {'User'}</title>
        <meta property="og:title" content={`Profile of ${'User'}`} />
        <meta
          property="og:description"
          content={`Profile ID: ${profileId || 'N/A'}, Age: ${'25'}, Star: ${'N/A'}`}
        />
        <meta
          property="og:image"
          content={'https://matrimonyapi.rainyseasun.com/media/default_groom.png'} // Use placeholder if no image
        />
        <meta property="og:url" content={'https://matrimonyapi.rainyseasun.com/media/default_groom.png'} />
      </Helmet>
      <div className="bg-grayBg py-20 max-lg:py-14 max-md:py-10 max-sm:py-10">
        <div className="container mx-auto">
          <div className="mb-8  ">
            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-sm:text-[20px]">
              My Profile
            </h4>
          </div>

          <div className="grid grid-rows-1 grid-cols-3 justify-start items-start space-x-10 max-lg:grid-cols-1 max-lg:space-x-0">
            <div>
              <ProfileSlick />
            </div>

            <div className="col-span-2">
              {loading ? (
                <Spinner />
              ) : error ? (
                <p>{error}</p>
              ) : get_myprofile_personal ? (
                <>
                  <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:mb-2">
                    <div>
                      <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2 max-lg:text-[28px] max-md:text-[24px] max-sm:text-[20px]">
                        {get_myprofile_personal.personal_profile_name}
                        {get_myprofile_personal.personal_verify === 1 && (
                          <MdVerifiedUser className="text-checkGreen ml-2" />
                        )}

                      </h4>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="relative"
                      //onMouseEnter={() => setShareIsHovered(true)}
                      //  onMouseLeave={() => setShareIsHovered(false)}
                      >
                        <div className="relative " ref={dropdownRef}>
                          <IoShareSocialSharp
                            title="Share Profile"
                            className="text-[26px] text-vysyamalaBlack cursor-pointer "
                            onClick={toggleShareVisibility}
                          />
                          {/* {(isSharesOpen || isSharesHovered) && (
                            <div
                              className="absolute top-4 right-0 mt-2 w-52 bg-white rounded-md shadow-lg"
                            >
                              <ul>
                                <li
                                  className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                  onClick={() => {
                                    toggleShareVisibility(); // This will toggle the share visibility
                                  }}

                                >
                                Share with image
                                </li>
                                <li
                                  className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                  onClick={() => {
                                    toggleShareVisibility(); // This will toggle the share visibility
                                  }}
                                >
                                  Share without image
                                </li>
                              </ul>
                            </div>
                          )} */}
                          {isShareVisible && (
                            // <Share closePopup={toggleShareVisibility} />
                            <MyProfileShare

                              closePopup={toggleShareVisibility}
                              // profileImagess={'https://www.kannikadhanam.com/members/parthasarathyr/'}
                              profileImagess={images[1]?.imageUrl || ""}
                              profileImage={get_myprofile_personal?.profile_id}
                              profileId={get_myprofile_personal?.profile_id}
                              profileName={get_myprofile_personal?.personal_profile_name}
                              age={get_myprofile_personal?.personal_age}
                              starName={get_myprofile_personal?.star}
                            />
                          )}
                        </div>

                      </div>
                      <div
                        className="flex justify-center items-center space-x-10 max-sm:flex-wrap"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <div className="relative">
                          <p className="flex items-center text-ash cursor-pointer">
                            <MdLocalPrintshop className="text-[22px] mr-2" />
                            Print Horoscope
                            <MdArrowDropDown className="text-[22px] ml-2" />
                          </p>

                          {(isHovered || isOpen) && (
                            <div
                              className="absolute top-4 right-0 mt-2 w-40 bg-white rounded-md shadow-lg"
                              onMouseEnter={() => setIsOpen(true)}
                              onMouseLeave={() => setIsOpen(false)}
                            >
                              <ul className="relative">
                                <li
                                  className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                  onClick={() => {
                                    handleSelectLanguage("Tamil")
                                    { selectedLanguage }
                                  }}
                                  onMouseEnter={() => setIsPdfMenuOpen(true)}
                                  onMouseLeave={() => setIsPdfMenuOpen(false)}
                                >
                                  Tamil
                                </li>
                                <li
                                  className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                  onClick={() => {
                                    handleSelectLanguage("English")
                                    { selectedLanguage }
                                  }}
                                  onMouseEnter={() => setIsPdfMenuOpen(true)}
                                  onMouseLeave={() => setIsPdfMenuOpen(false)}
                                >
                                  English
                                </li>
                                {/* PDF Menu Dropdown */}
                                {(isPdfMenuOpen) && (
                                  <div
                                    className="absolute top-[100%] -left-32  w-40 bg-white rounded-md shadow-lg max-sm:left-auto max-sm:right-[-20%] max-md:top-[100%]"
                                    onMouseEnter={() => setIsPdfMenuOpen(true)}
                                    onMouseLeave={() => setIsPdfMenuOpen(false)}
                                  >
                                    <ul>
                                      <li
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                        onClick={handleViewPdf}
                                      >
                                        Download PDF
                                      </li>
                                      <li
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                        onClick={PrintPdf}
                                      >
                                        Print PDF
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </ul>
                            </div>
                          )}

                        </div>
                        {/* {selectedLanguage && (
                          <p className="ml-4 text-ash">
                            Selected: {selectedLanguage}
                          </p>
                        )} */}
                      </div>
                      {/* <div>
                        <embed src={`https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf`} width="100%" height="300px" />
                      </div> */}

                    </div>

                  </div>

                  <p className="text-[20px] text-primary font-bold mb-3 max-md:text-[16px]">
                    {get_myprofile_personal.profile_id}
                  </p>

                  <div className="flex items-center space-x-3 mb-3 max-sm:flex-wrap max-sm:space-x-0 max-sm:gap-y-3 max-md:gap-4">
                    <p className={`w-fit text-sm text-primary font-semibold rounded-md px-3 py-0.5  ${get_myprofile_personal.package_name === "Platinum"
                      ? "bg-gradientPlatinum"
                      : get_myprofile_personal.package_name === "Gold"
                        ? "bg-gradientGold"
                        : get_myprofile_personal.package_name === "Diamond"
                          ? "bg-gradient !text-white"
                          : "bg-gradient !text-white"
                      }`}>
                      {get_myprofile_personal.package_name}
                    </p>
                    <p className="text-primary">
                      Valid Upto : {get_myprofile_personal.valid_upto}
                    </p>
                  </div>

                  <div className="my-3">
                    <button
                      className="flex items-center text-sm text-main font-normal  max-md:text-base"
                      onClick={handleClick}
                    >
                      Add-On-Packages
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>

                  <div className="w-1/2 mb-8 max-sm:w-full max-sm:mb-8 max-lg:w-full">
                    <div>
                      <div className="flex justify-start  gap-x-10 gap-y-3  items-center mb-3  max-lg:flex-wrap max-sm:gap-3 max-sm:flex-col max-sm:items-start">
                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Age :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_age}
                          </span>
                        </h5>

                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Height :
                          {/* <span className="font-normal">
                              {" "}
                              {get_myprofile_personal.personal_profile_height} cms
                            </span> */}
                          <span className="font-normal">
                            {/* {` ${convertToFeet(get_myprofile_personal.personal_profile_height)}`} */}
                            {get_myprofile_personal.personal_profile_height
                              ? ` ${convertToFeet(
                                Number(
                                  get_myprofile_personal.personal_profile_height
                                )
                              )}`
                              : "N/A"}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Weight :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_weight} kg
                          </span>
                        </h5>
                      </div>

                      <div className="flex justify-start gap-x-10 gap-y-3 items-center mb-3 max-lg:flex-wrap max-sm:gap-3  max-sm:flex-col max-sm:items-start">
                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Star :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.star}
                          </span>
                        </h5>

                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Gothram :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.gothram}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Profession :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.prosession}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          Education :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.heightest_education}
                          </span>
                        </h5>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">
                          About :
                          <span className="font-normal">
                            {" "}
                            {get_myprofile_personal.personal_about_self}
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className={`bg-vysyamalaLightSandal p-6  border-vysyamalaYellow border-dashed rounded-xl max-sm:border-none max-sm:p-5 
                  ${percentage === 100 ? "w-fit" : "w-full  "}
                  `}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='11' ry='11'  stroke='%23F2BD6DFF' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='25' stroke-linecap='square'/%3e%3c/svg%3e")`
                    }
                    } >
                    <div className="flex justify-between items-start max-lg:flex-wrap max-sm:flex-col-reverse max-sm:gap-y-3">
                      <div>
                        <h5 className="text-base text-primary font-semibold mb-[5px] max-sm:text-base">
                          Your profile is now {percentage}% complete
                        </h5>
                        {percentage < 100 && (
                          <>
                            <p className="text-sm text-primary">
                              Complete your profile to receive profile suggestions
                              based on your preferences.
                            </p>

                            {/* <button className="flex items-center text-lg text-main font-semibold my-3">
                          Complete Your Profile{" "}
                          <FaArrowRight className="ml-2" />
                        </button> */}
                            <button
                              onClick={handleNextClick}
                              className="flex items-center text-sm text-main font-medium leading-[24px] mt-[15px] max-sm:text-base"
                            //onClick={handleScrollToSettings}

                            >
                              Complete Your Profile
                              <FaArrowRight className="ml-2" />
                            </button>
                          </>
                        )}
                      </div>
                      {openPopup && (
                        <div className="fixed inset-0 flex justify-center items-center  bg-black bg-opacity-50">
                          <div ref={popupRef} className="bg-white p-6 rounded shadow-lg">


                            {/* <div>
                              {personalData && personalData.empty_fields && personalData.empty_fields.length > 0 ? (
                                personalData.empty_fields.map((field, index) => (
                                  <div key={index} style={{ marginBottom: '10px' }}>
                                    <div className="flex flex-col">
                                      <button>
                                        <strong>Tab:</strong> {field.tab}
                                      </button>
                                      <button>
                                        <strong>Field:</strong> {field.field}
                                      </button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No empty fields found.</p>
                              )}
                            </div> */}

                            <div>
                              <>
                                <strong> Fill these Missing Fields</strong>
                                {personalData && personalData.empty_fields && personalData.empty_fields.length > 0 ? (
                                  personalData.empty_fields.map((field, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>

                                      <div className="flex flex-col">

                                        {/* <button>
                                        <strong>Tab:</strong> {field.tab}
                                      </button> */}
                                        <button>
                                          {/* <strong>Missing Fields:</strong> {field.field} */}
                                          {/* {fieldNameMapping[field.field] || field.field} */}
                                          {fieldNameMapping[field.field as keyof typeof fieldNameMapping] || field.field}

                                        </button>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p>No empty fields found.</p>
                                )}
                              </>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={handleNextClick}
                                className="bg-red-500 text-lg text-white px-4 py-2 rounded hover:bg-red-600"
                              >
                                Next
                              </button>
                            </div>
                          </div>

                        </div>
                      )}
                      {percentage < 100 && (

                        <div className="w-[86px] h-[86px] text-primary font-semibold max-sm:w-16 max-sm:h-16">
                          <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={buildStyles({
                              pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                              textColor: "#535665",
                              trailColor: "#d6d6d6",
                              backgroundColor: "#3e98c7",
                            })}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p>No profile details available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="ProfileDetailsSettings">
        <ProfileDetailsSettings />
      </div>
    </div>
  );
};
