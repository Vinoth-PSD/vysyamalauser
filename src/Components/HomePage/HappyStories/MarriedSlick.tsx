// import React from "react";



// export interface happyStoriesType {
//   couple_name: string;
//   details: string;
//   photo: string;
// }

// interface MarriedSlickProps {
//   data: happyStoriesType;
// }

// const MarriedSlick: React.FC<MarriedSlickProps> = ({ data }) => {
//   return (
//     <div className="mx-3">
//   <div className="relative fade-bottom after:rounded-xl z-[0] group bg-happyStorybglayer rounded-xl  group-hover:after:fade-none ">
//     <div className="overflow-hidden rounded-xl">
//     <img src={data.photo} alt={data.couple_name} className="rounded-xl overflow-hidden transition-all duration-500 ease-in-out group-hover:scale-[1.1] group-hover:translate-y-[-20px]  group-hover:opacity-[0.3] " />
//     </div>

//     <div className="absolute top-[85%] left-0 w-full h-full rounded-xl flex flex-col items-start justify-start p-6 text-white z-[4] transition-all duration-500 ease-in-out group-hover:top-0 max-2xl:top-[80%] max-xl:top-[80%] max-lg:p-5 max-md:top-[89%] max-sm:top-[80%] max-sm:p-4">
//       <h1 className="text-2xl font-semibold mb-5 max-xl:text-xl max-lg:text-lg max-lg:mb-4 max-md:mb-5 max-sm:mb-0 ">
//         {data.couple_name}
//       </h1>
//       <p className="text-md text-white font-medium max-lg:font-medium max-md:font-normal">
//         We connected over Vysyamala chat and then soon exchanged mobile numbers, and rest was a roller coaster ride till we finally got married after 5 months since our first meet. Today I am happy and feeling life at it's best. Thanks to Vysyamala.
//       </p>
//     </div>
//   </div>
// </div>

//   );
// };

// export default MarriedSlick;



import React from "react";



export interface happyStoriesType {
  couple_name: string;
  details: string;
  photo: string;
}

interface MarriedSlickProps {
  data: happyStoriesType;
}

const MarriedSlick: React.FC<MarriedSlickProps> = ({ data }) => {
  return (
    <div className="mx-3">
  <div className="relative fade-bottom after:rounded-xl z-[0] group bg-happyStorybglayer rounded-xl  group-hover:after:fade-none ">
    <div className="overflow-hidden rounded-xl">
    <img src={data.photo} alt={data.couple_name} className="rounded-xl overflow-hidden transition-all duration-500 ease-in-out group-hover:scale-[1.1] group-hover:translate-y-[-20px]  group-hover:opacity-[0.3] " />
    </div>

    <div className="absolute top-[85%] left-0 w-full h-full rounded-xl flex flex-col items-start justify-start p-6 text-white z-[4] transition-all duration-500 ease-in-out group-hover:top-0 max-2xl:top-[80%] max-xl:top-[80%] max-lg:p-5 max-md:top-[89%] max-sm:top-[80%] max-sm:p-4">
      <h1 className="font-segoesc text-2xl font-normal mb-5 max-xl:text-xl max-lg:text-lg max-lg:mb-4 max-md:mb-5 max-sm:mb-0 ">
        {data.couple_name}
      </h1>
      {/* <p className="text-md text-white font-medium max-lg:font-medium max-md:font-normal">
        We connected over Vysyamala chat and then soon exchanged mobile numbers, and rest was a roller coaster ride till we finally got married after 5 months since our first meet. Today I am happy and feeling life at it's best. Thanks to Vysyamala.
      </p> */}
    </div>
  </div>
</div>

  );
};

export default MarriedSlick;
