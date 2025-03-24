import { useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { RiAlertFill } from "react-icons/ri";
import { BiSolidUserVoice } from "react-icons/bi";
import { IoShareSocialSharp } from "react-icons/io5";
// import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineGrid3X3 } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdMessage } from "react-icons/md";
// import { ProfileSlick } from "./ProfileSlick";

import MatchingScoreImg from "../../../assets/images/MatchingScore.png";
import { MdLocalPrintshop } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
// import { ProfileDetailsSettings } from "./ProfileDetailsSettings"

interface ProfileDetailsRequestProps {
  // dashBoardAgain: () => void;
}

export const ProfileDetailsRequest: React.FC<
  ProfileDetailsRequestProps
> = () => {
  // Wishlist Bookmark
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

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

  return (
    <div className="bg-grayBg pt-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          {/* <IoArrowBackOutline onClick={dashBoardAgain} className="text-[24px] mr-2 cursor-pointer" /> */}
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
            {" "}
            Profile Details
            {/* <span className="text-sm text-primary"> (234)</span> */}
          </h4>
        </div>

        <div className="grid grid-rows-1 grid-cols-3 justify-start items-start space-x-10 mb-5">
          <div className=""></div>

          {/* Profile Details */}
          <div className="col-span-2">
            <div className="flex justify-between items-center">
              <div className="">
                <h4 className="flex items-center text-[30px] text-secondary font-bold mb-2">
                  Harini
                  <MdVerifiedUser className="text-checkGreen ml-2" />
                </h4>
              </div>

              {/* Icons */}
              <div className="flex justify-center items-center space-x-10">
                <div>
                  <IoShareSocialSharp
                    title="Share Profile"
                    className="text-[22px] text-vysyamalaBlack cursor-pointer"
                  />
                </div>
                <div>
                  {/* <MdBookmark title="Bookmark Profile" className="text-[22px] text-vysyamalaBlack cursor-pointer" /> */}
                  {isBookmarked ? (
                    <MdBookmark
                      title="Wishlist this Profile"
                      onClick={handleBookmark}
                      className="text-[22px] text-vysyamalaBlack cursor-pointer"
                    />
                  ) : (
                    <MdBookmarkBorder
                      title="Wishlist this Profile"
                      onClick={handleBookmark}
                      className="text-[22px] text-vysyamalaBlack cursor-pointer"
                    />
                  )}
                </div>
                <div>
                  <IoDocumentText
                    title="Personal Notes"
                    className="text-[22px] text-vysyamalaBlack cursor-pointer"
                  />
                </div>
                <div>
                  <RiAlertFill
                    title="Spot on Error"
                    className="text-[22px] text-vysyamalaBlack cursor-pointer"
                  />
                </div>
                <div>
                  <BiSolidUserVoice
                    title="Vys Assist"
                    className="text-[22px] text-vysyamalaBlack cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <p className="text-[20px] text-primary font-bold mb-2">VM30492</p>

            <div className="flex justify-between items-center">
              {/* Profile Details Content */}
              <div>
                {/* Age & height */}
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-[18px] text-ash font-semibold">
                    Age :<span className="font-normal"> 22 years</span>
                  </h5>

                  <h5 className="text-[18px] text-ash font-semibold mb-2">
                    Height :
                    <span className="font-normal"> 5ft 5inch (165cms)</span>
                  </h5>
                </div>

                <h5 className="text-[18px] text-ash font-semibold mb-2">
                  Weight :<span className="font-normal"> 68 Kgs</span>
                </h5>

                {/* Star & Gothram */}
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-[18px] text-ash font-semibold">
                    Star :<span className="font-normal"> Anusham</span>
                  </h5>

                  <h5 className="text-[18px] text-ash font-semibold mb-2">
                    Gothram :<span className="font-normal"> Nabila</span>
                  </h5>
                </div>

                <h5 className="text-[18px] text-ash font-semibold mb-2">
                  Profession :<span className="font-normal"> Employed</span>
                </h5>

                <h5 className="text-[18px] text-ash font-semibold mb-2">
                  Education :<span className="font-normal"> B.Tech., Mech</span>
                </h5>

                <h5 className="text-[18px] text-ash font-semibold mb-2">
                  About :<span className="font-normal"> B.Tech., Mech</span>
                </h5>

                <div className="flex justify-start items-center space-x-3 mt-3">
                  {/* Horoscope Available */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <MdOutlineGrid3X3 className="mr-2" /> Horoscope Available
                    </p>
                  </div>

                  {/*  Active User */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <FaUser className="mr-2" /> Active user
                    </p>
                  </div>

                  {/* Last Visit */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoCalendar className="mr-2" /> Last visit on June 30,
                      2024
                    </p>
                  </div>

                  {/* views */}
                  <div>
                    <p className="flex items-center bg-gray px-2 py-0.5 rounded-md text-ashSecondary font-semibold">
                      <IoEye className="mr-2" /> 31 views
                    </p>
                  </div>
                </div>
              </div>

              {/* Matching Meter */}
              <div>
                <img
                  src={MatchingScoreImg}
                  alt="Matching Score"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-10 mb-3">
              <div>
                <p className="text-ashSecondary">
                  I am interested in your profile. If you are interested in my
                  profile,
                  <br /> please contact me.
                </p>
              </div>

              <div
                className="flex justify-center items-center space-x-10"
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
                      <ul>
                        <li
                          className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                          onClick={() => handleSelectLanguage("Tamil")}
                        >
                          Tamil
                        </li>
                        <li
                          className="block px-4 py-2 text-gray-800 hover:bg-gray cursor-pointer"
                          onClick={() => handleSelectLanguage("English")}
                        >
                          English
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {selectedLanguage && (
                  <p className="ml-4 text-ash">Selected: {selectedLanguage}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-start items-center space-x-5">
              {/* Accept button */}
              <button className="bg-checkGreen text-white flex items-center rounded-lg px-5 py-3 cursor-pointer">
                <FaCheckCircle className="text-[22px] mr-2" /> Accept
              </button>

              {/* Decline button */}
              <button className="bg-white text-main flex items-center rounded-lg border-2 px-5 py-2.5 cursor-pointer">
                <IoMdCloseCircle className="text-[26px] mr-2" /> Decline
              </button>

              {/* Message button */}
              <button className="text-main flex items-center rounded-lg px-5 py-2.5 cursor-pointer">
                <MdMessage className="text-[26px] mr-2" /> Message
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <ProfileDetailsSettings /> */}
    </div>
  );
};
