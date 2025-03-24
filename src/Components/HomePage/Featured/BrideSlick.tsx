// import React from 'react'
// import Bride from "../../../assets/images/Bride.png";

// interface BrideSlickProps {
//   profileId: string;
//   age: string;
// }

// export const BrideSlick: React.FC<BrideSlickProps> = ({ profileId, age }) => {
//   return (
//     <div>
//       <div>
//         <div className='mx-5 w-4/5 cursor-grab'>
//           <img src={Bride} alt="Bride image" className="w-full" />
//           <div className="bg-white flex justify-between items-center rounded-b-md shadow-lg px-5 py-3">
//             <h5 className="text-secondary font-semibold">{profileId}</h5>
//             <p className="text-vysyamalaBlack font-semibold">{age} yrs</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React from 'react'


interface BrideSlickProps {
  profileId: string;
  age: string;
  profileImage: string;
  onClick: () => void;
}

export const BrideSlick: React.FC<BrideSlickProps> = ({ profileId, age, profileImage, onClick }) => {
  return (
    <div>
      <div>
        <div onClick={onClick} className="mx-[10px] mb-5 w-[90%] cursor-grab shadow-reviewBoxShadow rounded-lg  max-sm:mb-5 max-md:mx-auto">
          <img src={profileImage} alt="Bride image" className="w-full rounded-lg" />
          <div className="bg-white flex justify-between items-center rounded-b-xl  px-5 py-3 max-sm:flex-col max-sm:items-start max-sm:px-2">
            <h5 className="text-secondary font-bold max-sm:font-normal">
              {profileId}
            </h5>
            <p className="text-vysyamalaBlack font-medium max-sm:font-normal">
              {age} yrs
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}