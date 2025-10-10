import React, { useState, useEffect } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SuggestedCard } from "./SuggestedProfiles/SuggestedCard";
//import axios from "axios";
import "./SuggestedProfiles/SuggestedStyle.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import apiClient from "../../API";


// Define the interface for the profile data
interface Profile {
  profile_id: string;
  profile_name: string;
  profile_img: string;
  profile_age: number;
  profile_height: number;
}


interface SlickArrowProps {
  onClick: () => void;
}
interface SlickArrowProps {
  onClick: () => void;
}

// SlickNextArrow Component
const SlickNextArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute -right-5 top-[40%] z-10 bg-secondary p-4 rounded-full shadow-lg hover:cursor-pointer group hover:bg-white max-xl:-right-5"
      onClick={onClick}
    >
      <FaArrowRight className="text-white group-hover:text-secondary" />
    </div>
  );
};

// SlickPrevArrow Component
const SlickPrevArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute -left-5 top-[40%] z-10 bg-secondary p-4 rounded-full shadow-lg hover:cursor-pointer group hover:bg-white max-xl:-left-5"
      onClick={onClick}
    >
      <FaArrowLeft className="text-white group-hover:text-secondary" />
    </div>
  );
};



const settings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  // autoplaySpeed: 5000,
  cssEase: "linear",
  pauseOnHover: true,
  nextArrow: (
    <SlickNextArrow
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),
  prevArrow: (
    <SlickPrevArrow
      onClick={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  ),

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};


export const SuggestedProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]); // Typing the state as an array of Profile objects
  const [totalCount, setTotalCount] = useState<number>(0)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.post("/auth/Get_Suggested_List/", {
          profile_id: localStorage.getItem("loginuser_profile_id"),
          per_page: 6,
          page_number: 1,
        });
        if (response.data.status === "success") {
          setProfiles(response.data.data);
          setTotalCount(response.data.total_count || response.data.data.length);
        } else {
          console.error("Failed to fetch profiles");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleNavigate = () => {
    navigate('/ViewAllSuggestedProfiles'); // Replace with your target path
  };
  if (totalCount === 0) return null;
  return (
    <div className="bg-vysyamalaSandal overflow-hidden px-5 max-xl:py-4 max-lg:py-3">
      <div className="container mx-auto my-10 max-lg:my-8 max-md:my-6">
        <div className="flex justify-between items-center max-sm:flex-wrap max-sm:gap-2">
          <div>
            <h4 className="text-[24px] text-vysyamalaBlack font-bold  max-xl:text-[22px] max-lg:text-[20px] max-md:text-[18px]">
              Suggested Profiles {" "}
              <span className="text-sm text-primary font-bold">
                {/* ({totalCount}) */}

              </span>
            </h4>
          </div>
          <div>
            <button className="flex items-center text-sm text-secondary font-semibold max-md:text-[14px]"
              onClick={handleNavigate}
            >
              View All <IoChevronForwardOutline className="ml-2" />
            </button>
          </div>
        </div>

        {/* Suggested Profile Slick */}
        <div className="slider-container suggestedStyle" >
          <Slider {...settings}>
            {profiles.map((profile) => (
              <SuggestedCard
                key={profile.profile_id}
                profile_name={profile.profile_name}
                profileImg={profile.profile_img}
                profileId={profile.profile_id}
                age={profile.profile_age.toString()}
                height={`${Math.floor(profile.profile_height / 30.48)}ft ${Math.round((profile.profile_height % 30.48) / 2.54)}in`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

