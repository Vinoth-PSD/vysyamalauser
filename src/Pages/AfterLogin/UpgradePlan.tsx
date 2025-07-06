/* eslint-disable @typescript-eslint/no-explicit-any */
import arrowRed from "../../assets/icons/arrowred.png";
import { UpgradePlanCard } from "../../Components/MembershipPlan/UpgradePlanCard";
import { useState, useEffect, useContext } from "react";
import apiClient from "../../API";
import { ProfileContext } from "../../ProfileContext";
import { useNavigate } from "react-router-dom";  // Import the useNavigate hook
import { FaCheck } from "react-icons/fa6";
//import { toast, ToastContainer } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const UpgradePlan: React.FC = () => {

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





    const navigate = useNavigate(); // Initialize navigate function
    const [plans, setPlans] = useState<any[]>([]); // State to hold plans data
    const loginuser_profileId = localStorage.getItem("loginuser_profile_id") || localStorage.getItem("profile_id_new");


    useEffect(() => {
        // Define an async function to fetch plans data
        const fetchPlans = async () => {
            try {
                const formData = new FormData();
                formData.append('profile_id', String(loginuser_profileId)); // 👈 Pass profile_id here
                const response = await apiClient.post(`/auth/Get_palns/`,formData);
                const { data } = response.data;

                const updatedPlans = Object.keys(data).map(planName => ({
                    id: data[planName][0].plan_id, // Assuming plan_id is available in the response
                    price: parseFloat(data[planName][0].plan_price), // Assuming the price is a float number
                    period: data[planName][0].plan_renewal_cycle,
                    planName: planName,
                    features: data[planName].map((feature: any) => feature.feature_name)
                }));
                setPlans(updatedPlans);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        fetchPlans(); // Call the async function
    }, []);

    const handleSkipClick = () => {
        navigate("/ThankYouReg"); // Navigate to the PayNow page
    };


    const handleContactClick = () => {
        alert("Thanks for choosing Vysyamala Delight, our premium customer support executive will contact you shortly.")
        // toast.success('Thanks for choosing Vysyamala Delight, our premium customer support executive will contact you shortly.');
    };


    return (
        <div className="bg-grayBg">
            <div className="container  mx-auto pt-16 pb-16 max-lg:pt-10 max-lg:pb-16 max-md:pt-10 max-md:pb-10 ">
                <div className="flex justify-between items-center max-md:flex-wrap max-md:items-start mb-5">
                    <h5 className="text-[36px] text-primary font-bold max-2xl:text-[36px] max-xl:text-[36px] max-lg:text-[28px] max-sm:text-[24px] ">Membership Plans</h5>

                    <button
                        className="flex items-center py-[10px] text-main font-semibold mt-2 max-md:px-0 max-md:mt-0"
                        onClick={handleSkipClick} // Add onClick handler
                    >
                        Skip for Free
                        <span>
                            <img src={arrowRed} alt="next arrow" className="ml-2" />
                        </span>
                    </button>
                </div>

                <div>
                    <p className="font-normal text-ashSecondary">Upgrade your plan as per your customized requirements, with a paid membership, you can seamlessly connect with your prospects and get more responses. Here are some key benefits</p>
                </div>

                <div className="flex justify-center w-fit mx-auto  rounded-3xl shadow-profileCardShadow bg-white relative mt-24 max-xl:flex-wrap max-xl:justify-start max-sm:justify-center  max-sm:shadow-none max-sm:gap-y-8  max-sm:bg-transparent max-md:mt-14">
                    {plans.map((plan, index) => (
                        <UpgradePlanCard
                            key={index}
                            id={plan.id} // Pass the id to PlanCard component
                            price={plan.price}
                            period={plan.period}
                            planName={plan.planName}
                            features={plan.features}
                            className={`rounded-3xl ${index === 1 ? "bg-gradientBgImg bg-cover bg-center translate-y-[-50px] text-white shadow-PlanCardShadow pb-4 max-xl:translate-y-[-30px] max-sm:translate-y-0" : ""}`}
                            customStyles={index === 1 ? "text-white" : "text-ash"}
                            customStylesOne={index === 1 ? "text-white" : "text-vysyamalaBlack"}
                            customStylesTwo={index === 1 ? "text-white" : "text-main"}
                            customStylesThree={index === 1 ? "bg-white" : "bg-light-pink"}
                            isCenterCard={index === 1}
                        >
                            {index === 1 && (
                                <div className="absolute top-[0px] left-1/2 transform -translate-x-1/2 bg-light-pink text-main text-[10px] uppercase text-center tracking-wider font-bold py-[6px] px-[15px] rounded-b-md max-sm:py-1">
                                    Most Popular
                                </div>
                            )}
                        </UpgradePlanCard>
                    ))}
                </div>

                <div className="flex justify-center  mx-auto  rounded-3xl relative mt-14  max-lg:w-full  max-lg:flex-wrap max-lg:justify-start max-sm:justify-center max-sm:shadow-none max-sm:gap-y-8  max-sm:bg-transparent max-md:mt-14">
                    <div className="w-full flex flex-row justify-between bg-white p-8 rounded-3xl shadow-profileCardShadow max-lg:flex-col max-sm:w-[300px] max-sm:flex-col">
                        <div>
                            <h4 className={`text-[22px] text-main font-bold mb-2 max-2xl:text-[28px] max-xl:text-[20px]`}>
                                VYSYAMALA DELIGHT
                            </h4>
                            <p className="text-sm text-black font-semibold mb-4">
                                {/* Contact 99448 51550 for the Price<br></br> */}
                                <span className="text-base font-semibold">Valid for 12 months</span>
                            </p>
                            <p className="relative text-sm text-ash pl-[30px] mb-4">
                                <FaCheck className="absolute top-0.5 left-[-0px] text-[14px] text-checkGreen bg-[#ffffff1a] w-[20px] h-[20px] p-1  rounded-full" />
                                Special Matrimonial package for Rich and Affluent</p>
                            <p className="relative text-sm text-ash pl-[30px] mb-4">
                                <FaCheck className="absolute top-0.5 left-[-0px] text-[14px] text-checkGreen bg-[#ffffff1a] w-[20px] h-[20px] p-1  rounded-full" />
                                Al-based matching profile report for 10 matches Special Attention from Founder</p>
                            <p className="relative text-sm text-ash pl-[30px] mb-4">
                                <FaCheck className="absolute top-0.5 left-[-0px] text-[14px] text-checkGreen bg-[#ffffff1a] w-[20px] h-[20px] p-1  rounded-full" />
                                AI based matching report (10 matches) & support</p>
                            <p className="relative text-sm text-ash pl-[30px] mb-4">
                                <FaCheck className="absolute top-0.5 left-[-0px] text-[14px] text-checkGreen bg-[#ffffff1a] w-[20px] h-[20px] p-1  rounded-full" />
                                Special attention from Founder</p>
                        </div>
                        <button
                            onClick={handleContactClick}

                            className={` w-fit h-fit rounded-full py-[12px] px-10 bg-light-pink text-main text-[16px] text-center font-semibold mt-10 self-end cursor-pointer max-sm:w-full`}
                        >
                            Choose Plan
                        </button>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000}
                    style={{
                        maxWidth: "400px", // Maximum width of the toast
                        width: "100%",
                    }}
                />

            </div>
        </div>
    );
};
