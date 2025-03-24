// import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { showInterest } from "../../../redux/slices/interestSlice";
// // import { RootState } from '../../../redux/store';
// import { IoCalendar } from "react-icons/io5";
// import { FaPersonArrowUpFromLine } from "react-icons/fa6";
// import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
// import { Link } from "react-router-dom";

// interface SuggestedCardProps {
//   profileImg?: string;
//   profileId: string;
//   age: string;
//   height: string;
// }

// export const SuggestedCard: React.FC<SuggestedCardProps> = ({ profileImg, profileId, age, height }) => {
//   // Use Selector
//   // const showExpressInterest = useSelector((state: RootState) => state.interest.SuggestedProfilesShow);

//   // Redux
//   // const dispatch = useDispatch();

//   // const handleCardClick = () => {
//   //   dispatch(showInterest());
//   // };

//   // State to track if the card is bookmarked or not
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const handleBookmark = (event: React.MouseEvent) => {
//     event.stopPropagation();
//     setIsBookmarked(!isBookmarked);
//   };

//   return (
//     <Link to="/ProfileDetails" target="_blank">

//       <div
//         // onClick={handleCardClick}
//         className="relative w-fit mx-auto bg-white rounded-xl shadow-md px-3 py-3 my-5 cursor-pointer"
//       >
//         <div className="mb-3">
//           {profileImg ? (
//             <img src={profileImg} alt="Profile" className="w-full" />
//           ) : (
//             <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
//               <span className="text-gray-500">No Image</span>
//             </div>
//           )}
//         </div>
//         <div>
//           <h4 className="text-secondary text-[20px] font-semibold">
//             Harini{" "}
//             <span className="text-vysyamalaBlack text-[12px] font-bold">
//               ({profileId})
//             </span>
//           </h4>
//           <div className="flex justify-between items-center">
//             <p className="text-primary flex items-center">
//               <IoCalendar className="mr-2" /> {age} yrs{" "}
//             </p>
//             <p className="text-primary flex items-center">
//               <FaPersonArrowUpFromLine className="mr-2" /> {height}
//             </p>
//           </div>
//         </div>
//         {isBookmarked ? (
//           <MdBookmark
//             onClick={handleBookmark}
//             className="absolute top-5 right-5 text-white text-[22px] cursor-pointer"
//           />
//         ) : (
//           <MdBookmarkBorder
//             onClick={handleBookmark}
//             className="absolute top-5 right-5 text-white text-[22px] cursor-pointer"
//           />
//         )}
//       </div>
//     </Link>
//   );
// };

import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { showInterest } from "../../../redux/slices/interestSlice";
// import { RootState } from '../../../redux/store';
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

import { useNavigate } from "react-router-dom";

interface SuggestedCardProps {
  profileImg?: string;
  profile_name?:string;
  profileId: string;
  age: string;
  height: string;
}

export const SuggestedCard: React.FC<SuggestedCardProps> = ({
  profileImg,
  profile_name,
  profileId,
  age,
  height,
}) => {
  // Use Selector
  // const showExpressInterest = useSelector((state: RootState) => state.interest.SuggestedProfilesShow);

  // Redux
  // const dispatch = useDispatch();

  // const handleCardClick = () => {
  //   dispatch(showInterest());
  // };

  // State to track if the card is bookmarked or not
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/ProfileDetails?id=${profileId}&rasi=1`);
  };
  return (
    <div
      // onClick={handleCardClick}
      className="relative w-[90%] mx-auto bg-white rounded-xl shadow-md px-3 py-3 my-5 cursor-pointer"
      onClick={handleProfileClick}
    >
      <div className="mb-3">
        {profileImg ? (
          <img src={profileImg} alt="Profile" className="w-full" />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div>
        <h4 className=" text-secondary text-[20px] font-semibold">
          {/* Harini{" "} */}
         ({profile_name})
          <span className="text-vysyamalaBlack text-[12px] font-normal">
            ({profileId})
          </span>
        </h4>
        <div className="flex justify-between items-center">
          <p className="text-sm text-primary flex items-center">
            <IoCalendar className="mr-2" /> {age} yrs{" "}
          </p>
          <p className="text-sm text-primary flex items-center">
            <FaPersonArrowUpFromLine className="mr-2" /> {height}
          </p>
        </div>
      </div>
      {isBookmarked ? (
        <MdBookmark
          onClick={handleBookmark}
          className="absolute top-5 right-5 text-white text-[22px] fill-main cursor-pointer"
        />
      ) : (
        <MdBookmarkBorder
          onClick={handleBookmark}
          className="absolute top-5 right-5 text-white text-[22px] fill-[#72727240] cursor-pointer"
        />
      )}
    </div>
  );
};
