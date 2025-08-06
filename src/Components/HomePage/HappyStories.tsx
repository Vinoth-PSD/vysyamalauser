
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MarriedSlick from "./HappyStories/MarriedSlick";
import { useEffect, useState } from "react";
//import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import apiClient from "../../API";

export interface HappyStoriesType {
  couple_name: string;
  details: string;
  photo: string;
}

const HappyStories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    rtl: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },

    ],
  };

  const [happyCouples, setHappyCouples] = useState<HappyStoriesType[]>([]);
  // const [isAccountSetupOpen, setIsAccountSetupOpen] = useState(false);
  // let isLoginPopupOpen

  const fetchHappyStories = async () => {
    try {
      const response = await apiClient.post("/auth/Success_stories/");
      setHappyCouples(response.data.data);
    } catch (error) {
      console.error("Error fetching happy stories:", error);
    }
  };

  useEffect(() => {
    fetchHappyStories();
  }, []);

  const controls = useAnimation(); // Controls for the animation
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.3, // Trigger when 20% of the element is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible"); // Start animation when in view
    }
  }, [controls, inView]);



  return (
    <div ref={ref} className="container  overflow-hidden ">
      <div className="py-[72px] max-md:py-10 max-sm:py-4">
        <div>
          <h1 className="mb-2 text-vysyamalaBlack text-3xl font-bold max-lg:text-2xl max-lg:pb-2 max-md:text-xl max-sm:text-xl">
            Happy Stories
          </h1>
          <p className="text-lg text-vysyamalaBlack max-md:text-base">
            “Faith makes all things possible. Love makes all things easy.” Check out some of our soul mate unions
          </p>
        </div>

        <div className="mt-8 hover:cursor-grab">
          {happyCouples.length > 0 ? (
            <Slider {...settings}>
              {happyCouples.map((data, index) => (
                <MarriedSlick key={index} data={data} />
              ))}
            </Slider>
          ) : (
            <p>No stories available.</p>
          )}
        </div>


      </div>

      <div>
        <motion.div
          ref={ref} // Attach the ref to the element
          initial="hidden" // Initial state
          animate={controls} // Control animations with `controls`
          variants={{
            hidden: { opacity: 0, translateY: 150 }, // Hidden state
            visible: { opacity: 1, translateY: 0 }, // Visible state
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className=" flex flex-col justify-center items-center space-y-10 max-lg:space-y-5 max-lg:mt-10 max-sm:mt-8 max-sm:space-y-4">
            <div>
              <h2 className="text-center text-vysyamalaBlack text-lg font-noraml pb-[2px] max-md:text-base">
                Now it’s time to write your
              </h2>
              <h1 className="text-center text-vysyamalaBlack text-3xl font-bold max-lg:text-2xl max-md:text-2xl max-sm:text-[20px]">
                Happy stories with us
              </h1>
            </div>
            <div>

              <button className="flex mb-6 items-center gap-3 bg-gradient py-3 px-8 text-white text-lg font-medium shadow-redboxshadow rounded-md group max-lg:px-6"
              // onClick={handleRegisterClick}
              >
                <span className=" group-hover:-translate-x-[8px] transition-all duration-500">Register Free</span>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-white text-[22px]  group-hover:translate-x-[8px] transition-all duration-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path></svg>
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div
          ref={ref} // Attach the ref to the element
          initial="hidden" // Initial state
          animate={controls} // Control animations with `controls`
          variants={{
            hidden: { opacity: 0, scale: 0 }, // Hidden state
            visible: { opacity: 1, scale: 1 }, // Visible state
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* <div className="relative mx-auto w-[770px] pt-[140px] pb-[70px] max-lg:pt-24 max-lg:pb-14 max-lg:w-[700px] max-md:w-[95%] max-md:pt-18 max-md:pb-10 max-sm:px-0 max-sm:py-12">
            <iframe
              width={"100%"}
              height={500}
              src="https://www.youtube.com/embed/-q00JIjstxo?si=kzNSDsMpSfef1BuY"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="mx-auto rounded-3xl max-lg:h-80 max-md:h-80 "
            />
          </div> */}
        </motion.div>

        {/* {isAccountSetupOpen && <PopupModal onClose={handleCloseAccountSetup} />}
  {isLoginPopupOpen && (
    <LoginPopupModal
      onClose={handleCloseLoginPopup}
      onForgetPassword={() => {
        // Placeholder for forget password functionality
        //console.log("Forget password clicked");
      }}
      isopen={false}
    />
  )} */}
      </div>

    </div>

  );
};

export default HappyStories;
