// import { useState } from "react";
// import { IoArrowBackOutline } from "react-icons/io5";
// import { FiFilter } from "react-icons/fi";
// import { HiOutlineSearch } from "react-icons/hi";
// import { FaSuitcase } from "react-icons/fa";
// import { IoCalendar } from "react-icons/io5";
// import { FaLocationDot } from "react-icons/fa6";
// import { HiMiniViewColumns } from "react-icons/hi2";
// import { BsFillGrid3X3GapFill } from "react-icons/bs";
// import { ImMenu } from "react-icons/im";
// import { BsSortDown } from "react-icons/bs";
// // import { BsSortUp } from "react-icons/bs";
// // import { GridView } from "./MatchingProfiles/GridView";
// // import { ListView } from "./MatchingProfiles/ListView";
// // import { GridListView } from "./MatchingProfiles/GridListView";
// // import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
// // import { IoChevronBackOutline } from "react-icons/io5";
// // import { IoChevronForwardOutline } from "react-icons/io5";
// // import { MatchingProfiles } from "../../Components/LoginHome/MatchingProfiles";
// import { GridListView } from "../LoginHome/MatchingProfiles/GridListView";
// import { ListView } from "../LoginHome/MatchingProfiles/ListView";
// import { GridView } from "../LoginHome/MatchingProfiles/GridView";
// import { AdvancedSearchPopup } from "../LoginHome/MatchingProfiles/FilterPopup/AdvancedSearchPopup";

// // const items = [
// //     { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
// //     { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
// //     { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
// //   ];

// interface DashBoardMatchingProfilesProps {
//   dashBoardAgain: () => void;
// }

// export const DashBoardMatchingProfiles: React.FC<
//   DashBoardMatchingProfilesProps
// > = ({ dashBoardAgain }) => {
//   // View state changed
//   const [currentView, setCurrentView] = useState("gridlist");

//   // Advanced Search Popup
//   const [showAdvancedSearchPopup, setShowAdvancedSearchPopup] = useState(false);

//   const handleAdvancedSearchPopup = () => {
//     setShowAdvancedSearchPopup(!showAdvancedSearchPopup);
//   };

//   const closeAdvancedSearchPopup = () => {
//     setShowAdvancedSearchPopup(false);
//   };

//   return (
//     <div className="">
//       <div className="bg-grayBg">
//         <div className="container mx-auto py-10">
//           <div className="flex items-center mb-5">
//             <IoArrowBackOutline
//               onClick={dashBoardAgain}
//               className="text-[24px] mr-2 cursor-pointer"
//             />
//             <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">
//               {" "}
//               Matching Profiles
//               <span className="text-sm text-primary"> (05)</span>
//             </h4>
//           </div>

//           {/* Search Bar */}
//           <div className="bg-white flex justify-center items-center rounded-lg space-x-5 shadow-lg my-5 px-3 py-3">
//             <div className="relative w-[150rem]">
//               <input
//                 type="text"
//                 placeholder="Search Profile ID on Matching Profiles"
//                 className="w-full bg-white border-r-2 border-gray pl-10 py-3 focus-visible:outline-0"
//               />
//               <HiOutlineSearch className="absolute top-4 text-[22px] text-ashSecondary" />
//             </div>

//             <div className="relative w-[100rem]">
//               <select
//                 name=""
//                 id=""
//                 className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
//               >
//                 <option value="">Profession</option>
//                 <option value="two">two</option>
//                 <option value="three">three</option>
//                 <option value="four">four</option>
//               </select>
//               <FaSuitcase className="absolute top-3 text-[22px] text-ashSecondary" />
//             </div>

//             <div className="relative w-full">
//               <select
//                 name=""
//                 id=""
//                 className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
//               >
//                 <option value="">Age</option>
//                 <option value="two">two</option>
//                 <option value="three">three</option>
//                 <option value="four">four</option>
//               </select>
//               <IoCalendar className="absolute top-3 text-[22px] text-ashSecondary" />
//               <div className="absolute top-0 left-[-12px]  w-0.5 h-full bg-gray"></div>
//               <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
//             </div>

//             <div className="relative w-full">
//               <select
//                 name=""
//                 id=""
//                 className="w-full bg-white pl-10 py-3 cursor-pointer focus-visible:outline-0"
//               >
//                 <option value="">Location</option>
//                 <option value="two">two</option>
//                 <option value="three">three</option>
//                 <option value="four">four</option>
//               </select>
//               <FaLocationDot className="absolute top-3 text-[22px] text-ashSecondary" />
//               <div className="absolute top-0 right-[-12px]  w-0.5 h-full bg-gray"></div>
//             </div>

//             <div onClick={handleAdvancedSearchPopup} className="w-fit">
//               <FiFilter className="text-[22px] text-secondary mx-5 my-3 cursor-pointer" />
//               {showAdvancedSearchPopup && (
//                 <div onClick={(e) => e.stopPropagation()} className="relative">
//                   <AdvancedSearchPopup closePopup={closeAdvancedSearchPopup} />
//                 </div>
//               )}
//             </div>

//             <div className="w-full">
//               <button className="w-full bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3">
//                 Find Match
//               </button>
//             </div>
//           </div>

//           {/* Icon Sort */}
//           <div className="flex justify-between items-center">
//             {/* View icons */}
//             <div className="flex justify-start items-start">
//               <div
//                 className={`border-[1px] border-ashSecondary rounded-l-md p-2 cursor-pointer
//                 ${currentView === "gridlist" ? "" : ""}`}
//                 title="Gridlist View"
//                 onClick={() => setCurrentView("gridlist")}
//               >
//                 <HiMiniViewColumns
//                   className={`text-[22px] 
//                     ${
//                       currentView === "gridlist"
//                         ? "text-secondary"
//                         : "text-ashSecondary"
//                     } hover:text-secondary}`}
//                 />
//               </div>
//               <div
//                 className={`border-[1px] border-ashSecondary p-2 cursor-pointer 
//                 ${currentView === "list" ? "" : ""}}`}
//                 title="List View"
//                 onClick={() => setCurrentView("list")}
//               >
//                 <ImMenu
//                   className={`text-[22px] ${
//                     currentView === "list"
//                       ? "text-secondary"
//                       : "text-ashSecondary"
//                   } hover:text-secondary}`}
//                 />
//               </div>
//               <div
//                 className={`border-[1px] border-ashSecondary rounded-r-md p-2 cursor-pointer
//                  ${currentView === "grid" ? "" : ""}}`}
//                 title="Grid View"
//                 onClick={() => setCurrentView("grid")}
//               >
//                 <BsFillGrid3X3GapFill
//                   className={`text-[22px] ${
//                     currentView === "grid"
//                       ? "text-secondary"
//                       : "text-ashSecondary"
//                   } hover:text-secondary}`}
//                 />
//               </div>
//             </div>

//             {/* Sort my date */}
//             <div className="flex justify-start items-center">
//               <BsSortDown className="text-[22px] text-ashSecondary cursor-pointer hover:text-secondary mr-2" />
//               {/* <BsSortUp /> */}
//               <p className="text-vysyamalaBlack font-semibold">Sort by date</p>
//             </div>
//           </div>

//           <div>
//             {/* Conditionally render views based on currentView state */}
//             {currentView === "gridlist" && (
//               <GridListView
//                 profile_name={""}
//                 profile_id={undefined}
//                 profile_age={undefined}
//                 height={undefined}
//                 searchResult={undefined} searchvalues={undefined}              />
//             )}
//             {currentView === "list" && (
//               <ListView
//                 profile_name={""}
//                 profile_id={undefined}
//                 profile_age={undefined}
//                 height={undefined} searchvalues={undefined}                // searchResult={undefined}
//               />
//             )}
//             {currentView === "grid" && (
//               <GridView
//                 profile_name={""}
//                 profile_id={undefined}
//                 profile_age={undefined}
//                 height={undefined}
//                 searchResult={undefined} searchvalues={undefined}              />
//             )}
//           </div>
//         </div>
//       </div>
//       {/* <MatchingProfiles /> */}
//     </div>
//   );
// };


import { MatchingProfiles } from "../LoginHome/MatchingProfiles";


interface DashBoardMatchingProfilesProps {
  dashBoardAgain: () => void;
}

export const DashBoardMatchingProfiles: React.FC<
  DashBoardMatchingProfilesProps
> = () => {
  
  

  return (
    <div className="">
   
      <MatchingProfiles />
    </div>
  );
};
