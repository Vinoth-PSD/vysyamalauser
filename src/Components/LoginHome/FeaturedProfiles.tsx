import { useEffect, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FeaturedProfileCard } from "./FeaturedProfiles/FeaturedProfileCard";
import "./FeaturedProfiles/FeaturedProfileStyle.css";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import apiClient from "../../API";

interface SlickArrowProps {
  onClick: () => void;
}
const SlickNextArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute -right-2 top-[38%] z-10 bg-white p-4 rounded-full shadow-lg hover:cursor-pointer group hover:bg-secondary"
      onClick={onClick}
    >
      <FaArrowRight className="text-secondary group-hover:text-white" />
    </div>
  );
};

const SlickPrevArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return <div onClick={onClick} />;
};



const settings = {
  dots: false,
  infinite: true,
  speed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  cssEase: "linear",
  pauseOnHover: true,
  rtl: true,
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
      breakpoint: 1199,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,

      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1, 
        slidesToScroll: 1,
        arrows: false,
        dots: true,

      },
    },
  ],
};

export const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetching data from the API
    const fetchProfiles = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Featured_List/",
          {
            profile_id: localStorage.getItem("loginuser_profile_id") ,
            from_age: 20,
            to_age: 40,
            from_height: 100,
            to_height: 200,
            per_page: 4,
            page_number: 1,
          }
        );
        setProfiles(response.data.data);
        setTotalCount(response.data.total_count || response.data.data.length);
        console.log("featured profilese response", response.data.data);
      } catch (error) {
        console.error("Error fetching featured profiles", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleNavigate = () => {
    navigate("/ViewAllFeaturedProfiles");
  };

  // Hide section if no profiles are available
  if (totalCount === 0) return null;
  return (
    <div className="bg-vysyamalaBlack py-5 max-xl:py-4 max-lg:py-3 overflow-hidden">
      <div className="container mx-auto my-10 max-lg:my-8 max-md:my-6">
        <div className="flex justify-between items-center  max-sm:flex-wrap max-sm:gap-2">
          <div>
            <h4 className="text-[24px] text-white font-bold max-xl:text-[22px] max-lg:text-[20px] max-md:text-[18px]">
              Featured Profiles{" "}
              <span className="text-sm text-white font-bold">
                {" "}
                ({totalCount})
              </span>
            </h4>
          </div>
          <div>
            <button
              className="flex items-center text-sm text-white font-semibold max-md:text-[14px]"
              onClick={handleNavigate}
            >
              View All <IoChevronForwardOutline className="ml-2" />
            </button>
          </div>
        </div>

        {/* Featured Profile Slick */}
        <div className="slider-container featuredProfileStyle">
          <Slider {...settings}>
            {profiles.map((profile) => (
              <FeaturedProfileCard
                key={profile.profile_id}
                profileName={profile.profile_name}
                profileId={profile.profile_id}
                age={profile.profile_age.toString()}
                height={`${profile.profile_height} cm`} // Adjust if needed
                profileImage={profile.profile_img} // Fallback image
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
