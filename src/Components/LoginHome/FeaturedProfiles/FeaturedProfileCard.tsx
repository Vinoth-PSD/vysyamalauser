// import React from "react";
// // import { useDispatch } from "react-redux";
// // import { showInterest } from "../../../redux/slices/interestSlice";
// import FeaturedProfileImg from "../../../assets/images/FeaturedProfileImg.png";
// import { IoCalendar } from "react-icons/io5";
// import { FaPersonArrowUpFromLine } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// interface FeaturedProfileCardProps {
//   profileName: string;
//   profileId: string,
//   age: string,
//   height: string,
// }

// export const FeaturedProfileCard: React.FC<FeaturedProfileCardProps> = ({ profileName, profileId, age, height }) => {

//   // Redux
//   // const dispatch = useDispatch();

//   // const handleCardClick = () => {
//   //   dispatch(showInterest());
//   // };

//   return (
//     <Link to="/ProfileDetails" target="_blank">

//       <div>
//         <div
//           // onClick={handleCardClick} 
//           className="w-10/12 relative fade-bottom mx-auto my-5 cursor-pointer">
//           <img src={FeaturedProfileImg} alt="" className="w-full" />

//           <div className="w-full absolute bottom-0 px-2 py-3 z-10">
//             <h5 className="text-white font-semibold">
//               {profileName} <span>({profileId})</span>
//             </h5>
//             <div className="flex justify-between items-center">
//               <p className="text-white font-normal flex items-center">
//                 {" "}
//                 <IoCalendar className="mr-2" /> {age}
//               </p>
//               <p className="text-white font-normal flex items-center">
//                 <FaPersonArrowUpFromLine className="mr-2" /> {height}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };





import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";

interface FeaturedProfileCardProps {
  profileName: string;
  profileId: string;
  age: string;
  height: string;
  profileImage: string;
}

export const FeaturedProfileCard: React.FC<FeaturedProfileCardProps> = ({
  profileName,
  profileId,
  age,
  height,
  profileImage,
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/ProfileDetails?id=${profileId}&rasi=1`);
  };

  return (
    <div
      className="w-10/12 relative fade-bottom mx-auto my-5 cursor-pointer rounded-lg after:!rounded-lg after:left-0"
      onClick={handleProfileClick}
      role="button"
      tabIndex={0}
    >
      <img src={profileImage} alt={profileName} className="w-full rounded-lg" />
      <div className="w-full absolute bottom-0 px-3 py-3 z-10">
        <h5 className="text-white font-semibold">
          {profileName} <span>({profileId})</span>
        </h5>
        <div className="flex justify-between items-center">
          <p className="text-white font-normal flex items-center">
            <IoCalendar className="mr-2" /> {age}
          </p>
          <p className="text-white font-normal flex items-center">
            <FaPersonArrowUpFromLine className="mr-2" /> {height}
          </p>
        </div>
      </div>
    </div>
  );
};
