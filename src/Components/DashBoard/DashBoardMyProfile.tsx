import React, { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { ProfileSlick } from "../../Components/DashBoard/ProfileDetails/ProfileSlick";
import { MdLocalPrintshop } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ProfileDetailsSettings } from "../../Components/DashBoard/ProfileDetails/ProfileDetailsSettings"

interface DashBoardMyProfileProps {
    dashBoardAgain: () => void;
}

export const DashBoardMyProfile: React.FC<DashBoardMyProfileProps> = ({ dashBoardAgain }) => {

    // Declaration for Horoscope State
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen);
    // };

    const handleSelectLanguage = (language: string) => {
        setSelectedLanguage(language);
        setIsOpen(false);
    };

    // Circular Progress bar value
    const percentage = 85;

    return (
        <div>
            <div className="bg-grayBg py-20 max-lg:py-14 max-md:py-10 max-sm:py-10">
                <div className="container mx-auto">
                    <div className="flex items-center mb-5">
                        <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" />
                        <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-sm:text-[20px]"> My Profile
                            {/* <span className="text-sm text-primary"> (234)</span> */}
                        </h4>
                    </div>

                    <div className="grid grid-rows-1 grid-cols-3 justify-start items-start space-x-10 max-lg:grid-cols-1 max-lg:space-x-0">

                        <div className="">
                            <ProfileSlick />
                        </div>


                        {/* Profile Details */}
                        <div className="col-span-2">
                            <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:mb-2">
                                <div className="">
                                    <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2 max-lg:text-[28px] max-md:text-[24px] max-sm:text-[20px]">Harini
                                        <MdVerifiedUser className="text-checkGreen ml-2" /></h4>
                                </div>

                                {/* Print Horoscope */}
                                <div className="flex justify-center items-center space-x-10 max-sm:flex-wrap"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="relative"

                                    >
                                        <p className="flex items-center text-ash cursor-pointer"
                                        >
                                            <MdLocalPrintshop className="text-[22px] mr-2" />Print Horoscope
                                            <MdArrowDropDown className="text-[22px] ml-2" />
                                        </p>

                                        {(isHovered || isOpen) && (
                                            <div
                                                className="absolute top-4 right-0 mt-2 w-40 bg-white rounded-md shadow-lg"
                                                onMouseEnter={() => setIsOpen(true)}
                                                onMouseLeave={() => setIsOpen(false)}
                                            >
                                                <ul>
                                                    {/* <li
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                                        onClick={() => handleSelectLanguage('Tamil')}
                                                    >
                                                        Tamil
                                                    </li> */}
                                                    <li
                                                        className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                                                        onClick={() => handleSelectLanguage('English')}
                                                    >
                                                        English
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    {selectedLanguage && <p className="ml-4 text-ash">Selected: {selectedLanguage}</p>}
                                </div>

                            </div>

                            {/* Vysyamala ID */}
                            <p className="text-[20px] text-primary font-bold mb-2 max-md:text-[16px]">VM30492</p>

                            {/* Plan & Date */}
                            <div className="flex items-center space-x-5 mb-2 max-sm:flex-wrap max-sm:space-x-0 max-sm:gap-y-3 max-md:gap-4">
                                <p className="w-fit bg-gradientGold text-primary font-semibold rounded-md px-3 py-0.5">Gold</p>
                                <p className=" text-primary">Valid Upto : 16-July-2024</p>
                            </div>

                            {/* Add-Ons */}
                            <div className="my-3">
                                <button className="flex items-center text-lg text-main font-semibold  max-md:text-base">Add-On-Packages
                                    <FaArrowRight className="ml-2" /></button>
                            </div>

                            <div className="w-1/2 mb-16 max-sm:w-full max-sm:mb-8 max-lg:w-full">
                                {/* Profile Details Content */}
                                <div>
                                    {/* Age & height */}
                                    <div className="flex justify-start gap-4 items-center mb-3  max-lg:flex-wrap max-sm:gap-3 max-sm:flex-col max-sm:items-start">
                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Age :
                                            <span className="font-normal"> 22 years</span></h5>

                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Height :
                                            <span className="font-normal"> 5ft 5inch (165cms)</span></h5>
                                    </div>

                                    <div className="mb-3">
                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Weight :
                                            <span className="font-normal"> 68 Kgs</span></h5>
                                    </div>

                                    {/* Star & Gothram */}
                                    <div className="flex justify-start gap-4 items-center mb-3  max-lg:flex-wrap max-sm:gap-3 max-sm:flex-col max-sm:items-start">
                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Star :
                                            <span className="font-normal"> Anusham</span></h5>

                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Gothram :
                                            <span className="font-normal"> Nabila</span></h5>
                                    </div>

                                    <div className="mb-3">
                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Profession :
                                            <span className="font-normal"> Employed</span></h5>
                                    </div>

                                    <div className="mb-3">
                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">Education :
                                            <span className="font-normal"> B.Tech., Mech</span></h5>
                                    </div>

                                    <div className="mb-3">
                                        <h5 className="text-[18px] text-ash font-semibold max-sm:text-[16px]">About :
                                            <span className="font-normal"> B.Tech., Mech</span></h5>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-vysyamalaLightSandal px-5 py-7 rounded-xl max-sm:border-none max-sm:p-5"
                            style = {{
                                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='11' ry='11'  stroke='%23F2BD6DFF' stroke-width='2' stroke-dasharray='10' stroke-dashoffset='25' stroke-linecap='square'/%3e%3c/svg%3e")`}
                              }
                            >
                                <div className="flex justify-between items-start max-lg:flex-wrap max-sm:flex-col-reverse max-sm:gap-y-3">
                                    <div>
                                        <h5 className="text-lg text-primary font-semibold max-sm:text-base">Your profile is now 85% complete</h5>
                                        <p className="text-sm text-primary">Complete your profile we will suggest profiles based on your preference</p>

                                        <button className="flex items-center text-lg text-main font-semibold my-3 max-sm:text-base">Complete Your Profile <FaArrowRight className="ml-2" /></button>
                                    </div>
                                    <div className="w-24 h-24 text-primary font-semibold max-sm:w-16 max-sm:h-16">
                                        <CircularProgressbar value={percentage} text={`${percentage}%`}
                                            styles={buildStyles({
                                                pathColor: `rgba(47, 189, 18, ${percentage / 100})`,
                                                textColor: '#535665',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <ProfileDetailsSettings />
        </div>
    )
}
