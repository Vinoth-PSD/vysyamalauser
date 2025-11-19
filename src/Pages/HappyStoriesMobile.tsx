// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import MarriedSlick from "./HappyStories/MarriedSlick";
// import { PopupModal } from "./PopUpsReg/PopupModal";
// import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal";
//import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
//import axios from "axios";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MarriedSlick from "../Components/HomePage/HappyStories/MarriedSlick";
import apiClient from "../API";

export interface HappyStoriesType {
    couple_name: string;
    details: string;
    photo: string;
}

const HappyStoriesMobile = () => {
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 5000,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     initialSlide: 0,
    //     autoplay: true,
    //     // autoplaySpeed: 5000,
    //     cssEase: "linear",
    //     arrows: false,
    //     pauseOnHover: true,
    //     rtl: false,

    //     responsive: [
    //         {
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2,
    //                 infinite: true,
    //             },
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1,
    //                 initialSlide: 2,
    //             },
    //         },

    //     ],
    // };

    const [happyCouples, setHappyCouples] = useState<HappyStoriesType[]>([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    // const [isAccountSetupOpen, setIsAccountSetupOpen] = useState(false);
    // let isLoginPopupOpen

    const fetchHappyStories = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.post("/auth/Success_stories/");
            setHappyCouples(response.data.data);
        } catch (error) {
            console.error("Error fetching happy stories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHappyStories();
    }, []);

    // const handleRegisterClick = () => setIsAccountSetupOpen(true);
    // const handleCloseAccountSetup = () => {
    //   setIsAccountSetupOpen(false);
    //   //console.log("Closing PopupModal popup");
    // };



    // function handleCloseLoginPopup(): void {
    //   throw new Error("Function not implemented.");
    // }



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

    const LoadingComponent = () => (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center space-y-4">
                {/* Red loading spinner */}
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                {/* <p className="text-red-500 text-lg font-medium">Loading Happy Stories...</p> */}
            </div>
        </div>
    );

    const ErrorComponent = () => (
        <div className="flex justify-center items-center py-12">
            <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-500 text-lg font-medium">{error}</p>
                <button
                    onClick={fetchHappyStories}
                    className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div ref={ref} className="container overflow-hidden">
            <div className="py-[72px] max-md:py-10 max-sm:py-4">
                {/* Show loading state */}
                {loading && <LoadingComponent />}

                {/* Show error state */}
                {error && !loading && <ErrorComponent />}

                {/* Show content when not loading and no error */}
                {!loading && !error && (
                    <div className="mt-8 hover:cursor-grab">
                        {happyCouples.length > 0 ? (
                            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-y-5">
                                {happyCouples.map((data, index) => (
                                    <MarriedSlick key={index} data={data} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                {/* <div className="text-red-500 text-6xl mb-4">😔</div> */}
                                <p className="text-black text-lg font-medium">No happy stories.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HappyStoriesMobile; 