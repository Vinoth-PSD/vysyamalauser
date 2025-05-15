/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
// import { BrideSlick } from "./Featured/BrideSlick";
// import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal"; // Assuming you have this component

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 15000,
//   slidesToShow: 6,
//   slidesToScroll: 3,
//   initialSlide: 0,
//   autoplay: true,
//   cssEase: "linear",
//   pauseOnHover: true,
//   arrows: false,
//   responsive: [
//     {
//       breakpoint: 1279,
//       settings: {
//         slidesToShow: 4,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 1023,
//       settings: {
//         slidesToShow: 3,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 639,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//   ],
// };

// export const FeaturedBride: React.FC = () => {
//   const [profiles, setProfiles] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [, setError] = useState<string | null>(null);
//   const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const response = await axios.post(
//           "https://matrimonyapi.rainyseasun.com/auth/Get_featured_profiles/",
//           {
//             gender: "female",
//           }
//         );
//         if (response.data.Status === 1) {
//           setProfiles(response.data.profiles);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (error) {
//         setError("Error fetching profiles.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   const handleImageClick = (profileId: string) => {

//     setIsLoginPopupOpen(true);
//     // Store the profileId in sessionStorage
//     sessionStorage.setItem("selectedProfileId", profileId);
//     console.log(`Stored profileId: ${profileId} in session storage`);
//     // You can navigate or perform other actions here
//   };

//   const handleCloseLoginPopup = () => {
//     setIsLoginPopupOpen(false);
//     console.log("Closing Login PopupModal popup");
//   };

//   if (loading) return <p>Loading...</p>;
//   // if (error) return <p>{error}</p>;

//   return (
//     // Conditionally render the section only when profiles exist
//     profiles.length > 0 && (
//       <div className="bg-white overflow-hidden">
//         <div className="container mx-auto mt-10 mb-20 max-xl:my-8 max-lg:my-6">
//           <div className="text-center max-md:text-start">
//             <h4 className="text-primary-700 text-[36px] font-bold pb-2 max-xl:text-[34px] max-lg:text-[30px] max-md:text-[28px] max-sm:text-[24px]">
//               Featured Brides
//             </h4>
//             <p className="text-primary text-[21px]  max-xl:text-[18px] max-lg:text-[16px]">
//               Dreaming of your partner? Is she a singer? Dancer? It’s time to turn
//               this dream into reality! Find some of our brides in the spotlight
//               below.
//             </p>
//           </div>

//           {/* Bride Slick */}
//           <div className="slider-container featuredStyle ">
//             <Slider {...settings}>
//               {profiles.map((profile) => (
//                 <BrideSlick
//                   key={profile.profile_id}
//                   profileImage={profile.profile_img}
//                   profileId={profile.profile_id}
//                   age={profile.profile_age.toString()}
//                   onClick={() => handleImageClick(profile.profile_id)} // Pass profileId on click
//                 />
//               ))}
//             </Slider>
//           </div>
//           {/* view more */}
//           {/* <div className="text-center pt-6 max-md:pt-4">
//             <button className=" bg-main py-2 px-5 text-white text-lg font-medium rounded-md">View More</button>
//           </div> */}
//         </div>

//         {/* Show LoginPopupModal conditionally */}
//         {isLoginPopupOpen && (
//           <LoginPopupModal
//             onClose={handleCloseLoginPopup}
//             onForgetPassword={() => {
//               console.log("Forgot password clicked.");
//             }}
//             isopen={true} // Set it to true to show the modal when triggered
//           />
//         )}
//       </div>
//     )
//   );
// }

import React, { useEffect, useState } from "react";
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import axios from "axios";
import { BrideSlick } from "./Featured/BrideSlick";
import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal"; // Assuming you have this component
import apiClient from "../../API";
import { useNavigate } from "react-router-dom";

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 15000,
//   slidesToShow: 6,
//   slidesToScroll: 3,
//   initialSlide: 0,
//   autoplay: false,
//   cssEase: "linear",
//   pauseOnHover: true,
//   arrows: false,
//   rows:2,
//   responsive: [
//     {
//       breakpoint: 1279,
//       settings: {
//         slidesToShow: 4,
//         infinite: true,
//         dots: true,
//       },
//     },
//     {
//       breakpoint: 1023,
//       settings: {
//         slidesToShow: 3,
//         initialSlide: 2,
//       },
//     },
//     {
//       breakpoint: 639,
//       settings: {
//         slidesToShow: 2,
//       },
//     },
//   ],
// };

export const FeaturedBride: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    navigate("/FeaturedBrideCard");
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.post(
          // "https://matrimonyapi.rainyseasun.com/auth/Get_featured_profiles/",
          "/auth/Get_featured_profiles/",
          {
            gender: "female",
          }
        );
        if (response.data.Status === 1) {
          setProfiles(response.data.profiles);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("Error fetching profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleImageClick = (profileId: string) => {
    setIsLoginPopupOpen(true);
    // Store the profileId in sessionStorage
    sessionStorage.setItem("selectedProfileId", profileId);
    console.log(`Stored profileId: ${profileId} in session storage`);
    // You can navigate or perform other actions here
  };

  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false);
    console.log("Closing Login PopupModal popup");
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    // Conditionally render the section only when profiles exist
    profiles.length > 0 && (
      <div className="bg-white overflow-hidden">
        <div className="container mx-auto mt-10 mb-20 max-xl:my-8 max-lg:my-6">
          <div className="text-center max-md:text-start">
            <h4 className="text-vysyamalaBlack text-[36px] font-bold pb-1 max-xl:text-[34px] max-lg:text-[30px] max-md:text-[28px] max-sm:text-[24px]">
              Featured Brides
            </h4>
            <p className="text-vysyamalaBlack text-[21px]  max-xl:text-[18px] max-lg:text-[16px]">
              Dreaming of your partner? Is she a singer? Dancer? It’s time to
              turn this dream into reality!<br className="max-md:hidden"></br>{" "}
              Find some of our brides in the spotlight below.
            </p>
          </div>

          {/* Bride Slick */}
          {/* <div className="slider-container featuredStyle ">
            <Slider {...settings}>
              {profiles.map((profile) => (
                <BrideSlick
                  key={profile.profile_id}
                  profileImage={profile.profile_img}
                  profileId={profile.profile_id}
                  age={profile.profile_age.toString()}
                  onClick={() => handleImageClick(profile.profile_id)} // Pass profileId on click
                />
              ))}
            </Slider>
            <p className="text-vysyamalaBlack text-base font-medium text-end"> <a className="border-b-[1px]"  onClick={handleViewMoreClick}>View More</a></p>
          </div> */}
          {/* view more */}
          {/* <div className="text-center pt-6 max-md:pt-4">
            <button className=" bg-main py-2 px-5 text-white text-lg font-medium rounded-md">View More</button>
          </div> */}

          <div className="feature-profile grid grid-cols-5 gap-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 mt-10">
            {/* Render the first 9 profiles */}
            {profiles.slice(0, 9).map((profile) => (
              <BrideSlick
                key={profile.profile_id}
                profileImage={profile.profile_img}
                profileId={profile.profile_id}
                age={profile.profile_age.toString()}
                onClick={() => handleImageClick(profile.profile_id)} // Pass profileId on click
              />
            ))}

            {/* Render the "View More" card as the 10th card */}
            {profiles.length > 9 && (
              <div
                className="flex items-center justify-center bg-gray border border-vysyamalaPink mx-[10px] mb-5 w-[90%] cursor-pointer shadow-reviewBoxShadow rounded-lg  max-sm:mb-5  max-md:mx-auto"
                onClick={handleViewMoreClick} // Function to handle "View More" click
              >
                <a
                  className="text-vysyamalaBlack text-xl  font-semibold hover:text-main max-md:text-xs"
                  onClick={handleViewMoreClick}
                >
                  View More
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Show LoginPopupModal conditionally */}
        {isLoginPopupOpen && (
          <LoginPopupModal
            onClose={handleCloseLoginPopup}
            onForgetPassword={() => {
              console.log("Forgot password clicked.");
            }}
            isopen={true} // Set it to true to show the modal when triggered
          />
        )}
      </div>
    )
  );
};
