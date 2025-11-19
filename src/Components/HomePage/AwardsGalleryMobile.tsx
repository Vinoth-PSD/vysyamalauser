import { useEffect, useState } from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Featured/FeaturedSlickStyle.css";
//import axios from "axios";
import { AwardCard } from "./AwardGallery/AwardCard";
import { PopupModal } from "./PopUpsReg/PopupModal"; // Assuming this is the same component used in HappyStories
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import apiClient from "../../API";



export interface AwardType {
    name: string;
    image: string;
    description: string;
}

export const AwardsGalleryMobile = () => {
    const [awards, setAwards] = useState<AwardType[]>([]);
    const [isAccountSetupOpen, setIsAccountSetupOpen] = useState(false); // Modal state

    const cleanHTMLEntities = (text: string): string => {
        if (!text) return '';

        // Method 1: Use DOMParser (most reliable)
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        let cleaned = doc.body.textContent || '';

        // Method 2: Also manually replace common entities as fallback
        cleaned = cleaned
            .replace(/&nbsp;/gi, ' ')
            .replace(/&amp;/gi, '&')
            .replace(/&lt;/gi, '<')
            .replace(/&gt;/gi, '>')
            .replace(/&quot;/gi, '"')
            .replace(/&#39;/gi, "'")
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim();

        return cleaned;
    };

    const happyStories = async () => {
        const response = await apiClient.post(
            "/auth/Awards_gallery/"
        );
        const cleanedAwards = response.data.data.map((award: AwardType) => ({
            ...award,
            name: cleanHTMLEntities(award.name),
            description: cleanHTMLEntities(award.description)
        }));

        setAwards(cleanedAwards);
        return response.data;
    };
    useEffect(() => {
        happyStories();
    }, []);

    // Assuming you have this component

    // const handleRegisterClick = () => {
    //     setIsAccountSetupOpen(true); // Open modal when "Register" button is clicked
    // };

    const handleCloseAccountSetup = () => {
        setIsAccountSetupOpen(false); // Close modal
    };

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 3000,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     initialSlide: 0,
    //     autoplay: true,
    //     cssEase: "ease",
    //     pauseOnHover: true,
    //     arrows: false,
    //     // rtl: true,
    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 infinite: true,
    //                 dots: true,
    //             },
    //         },
    //         {
    //             breakpoint: 1023,
    //             settings: {
    //                 slidesToShow: 2,
    //                 autoplay: true,

    //             },
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 autoplay: true,

    //             },
    //         },

    //         {
    //             breakpoint: 639,
    //             settings: {
    //                 slidesToShow: 1,
    //                 autoplay: true,

    //             },
    //         },
    //     ],
    // };


    const controls = useAnimation(); // Controls for the animation
    const [ref, inView] = useInView({
        triggerOnce: true, // Trigger animation only once
        threshold: 0.2, // Trigger when 20% of the element is visible
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible"); // Start animation when in view
        }
    }, [controls, inView]);




    return (

        <div ref={ref} className="relative  overflowx-hidden">

            <div className="container mx-auto mt-[40px] mb-20 max-xl:my-8 max-lg:my-6">
                <div className="mx-auto">
                    {/* <div className="text-center">
                        <div className="">
                            <img src={Award} alt="Award-icon" className="w-fit mx-auto" />
                        </div>
                        <h4 className="text-vysyamalaBlack text-[36px] font-bold max-xl:text-[34px] max-lg:text-[30px] max-sm:text-[24px]">
                            Awards
                        </h4>
                    </div> */}

                    {/* Groom Slick */}
                    <div className="slider-container featuredStyle pb-[72px] awardSlider max-lg:pb-5 max-md:pb-10">
                        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-y-5">
                            {/* <Slider {...settings}> */}
                            {awards.map((data) => (

                                <div className="flex justify-between items-center px-2  max-xl:gap-3 max-sm:flex-wrap max-sm:justify-center max-sm:mt-5">
                                    <AwardCard
                                        image={data.image}
                                        awardName={data.name}
                                        awardDesc={data.description}
                                    />
                                </div>

                            ))}
                            {/* </Slider> */}
                        </div>
                    </div>
                    {/* view more */}
                    {/* <div className="text-center pt-0 max-md:pt-4">
            <button className=" bg-main py-2 px-5 text-white text-lg font-medium rounded-md">View More</button>
          </div> */}
                </div>
            </div>

            {/* <motion.div
                ref={ref} // Attach the ref to the element
                initial="hidden" // Initial state
                animate={controls} // Control animations with `controls`
                variants={{
                    hidden: { opacity: 0, rotateX: 90 }, // Hidden state
                    visible: { opacity: 1, rotateX: 0 }, // Visible state
                }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="absolute left-0 right-0 bottom-[-23%] mx-auto max-xl:bottom-[-15%] max-md:relative">
                    <div className="flex items-center justify-between bg-gradient w-[860px] rounded-2xl py-6 px-10 mx-auto max-xl:w-[80%] max-lg:w-[700px] max-md:w-[100%] max-md:rounded-none max-sm:flex-col max-sm:items-start max-sm:gap-6 max-sm:p-4">
                        <div>
                            <h5 className="text-white text-xl font-semibold pb-1 max-lg:text-[16px] max-sm:pb-0">Most trusted matrimonial portal</h5>
                            <p className="text-white text-[26px] font-bold max-lg:text-xl">Find your dream soul mate in Vysyamala</p>
                        </div>
                        <button className="flex items-center gap-3 bg-white py-3 px-8 text-main  text-lg font-medium rounded-md group max-lg:px-6"
                            onClick={handleRegisterClick} // Add this onClick event
                        >
                            <span className=" group-hover:-translate-x-[8px] transition-all duration-500">Register</span>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-main text-[22px]  group-hover:translate-x-[8px] transition-all duration-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path></svg>
                        </button>
                    </div>
                </div>
            </motion.div> */}

            {/* Render PopupModal if open */}
            {isAccountSetupOpen && (
                <PopupModal onClose={handleCloseAccountSetup} />
            )}
        </div>
    );
};
