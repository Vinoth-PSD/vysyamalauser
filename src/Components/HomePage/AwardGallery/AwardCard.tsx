// import React from 'react'

// interface AwardCardProps {
//   image?: string;
//   awardName: string;
//   awardDesc: string;
// }

// export const AwardCard: React.FC<AwardCardProps> = ({ image, awardName, awardDesc }) => {
//   return (
//     <div className="w-full h-[370px] p-5 border-[1px] border-gray rounded-xl max-md:mx-auto max-sm:p-2 max-xl:h-[420px] max-lg:h-[370px] max-md:h-[380px]">
//     <div className="mb-5">
//       <img src={image} alt="" className="w-full h-60 object-cover rounded-xl" />
//     </div>
//     <div className="text-center">
//       <h4 className="text-[20px] text-primary-700 font-bold mb-2 max-lg:text-[16px]">{awardName}</h4>
//       <p className="text-ash">- {awardDesc}</p>
//     </div>
//   </div>
  
//   )
// }


import React from 'react'

interface AwardCardProps {
  image?: string;
  awardName: string;
  awardDesc: string;
}

export const AwardCard: React.FC<AwardCardProps> = ({ image, awardName, awardDesc }) => {
  return (
    <div className="w-full  p-5 border-[1px] border-gray rounded-xl max-md:mx-auto max-sm:p-2 max-md:w-[420px] max-sm:w-fit">
    <div className="mb-5">
      <img src={image} alt="" className="w-full h-[165px] rounded-xl" />
    </div>
    <div className="text-center">
      <h4 className="text-[20px] text-vysyamalaBlack font-bold mb-2 max-lg:text-[16px]">{awardName}</h4>
      <p className="text-vysyamalaBlack">- {awardDesc}</p>
    </div>
  </div>
  
  )
}
