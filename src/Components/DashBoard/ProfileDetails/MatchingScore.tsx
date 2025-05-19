// // import { useState, ChangeEvent } from "react";
// import React, { useState, useEffect } from 'react';


// interface MatchingScoreProps {
//   scorePercentage?: any;
// }

// const MatchingScore: React.FC<MatchingScoreProps> = ({ scorePercentage }) => {
//   const [score, setScore] = useState<number>(0);
//   {console.log(scorePercentage, "asasas");}

//   const getEmoji = () => {
//     if (score >= 75) return "😊";
//     if (score >= 50) return "🙂";
//     if (score >= 25) return "😐";
//     return "😞";
//   };

//   const getIndicatorColor = () => {
//     if (score >= 75) return "green";
//     if (score >= 50) return "yellow";
//     if (score >= 25) return "orange";
//     return "red";
//   };


//   useEffect(() => {
//     if (scorePercentage) {
//       setScore(scorePercentage);a
//     }
//   }, [scorePercentage]); 


//   return (
//     <div className="flex flex-col items-center p-4">
//       <div className="relative w-48 h-24 overflow-hidden">
//         <div
//           className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
//           style={{
//             clipPath: "inset(0 0 50% 0)",
//             background: `conic-gradient(${getIndicatorColor()} 360deg, ${getIndicatorColor()} ${score * 1.8
//               }deg, transparent ${score * 1.8}deg, transparent 180deg)`,
//             transform: "rotate(360deg)", // Rotate -90deg to start from the left
//           }}
//         ></div>
//         <div
//           className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
//           style={{ clipPath: "inset(50% 0 0 0)", backgroundColor: "white" }}
//         ></div>
//         <div className="absolute top-0 left-0 w-48 h-24 flex items-center justify-center">
//           <div className="">
//             <span className="text-3xl bg-white rounded-full w-12 h-12 flex justify-center items-center">
//               {getEmoji()}
//             </span>
//           </div>
//         </div>

//         {/* {/ Needle indicator /} */}
//         <div
//           className="absolute bottom-[2px] left-[40%] w-10 h-10 flex justify-center items-center"
//           style={{
//             transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
//             transformOrigin: "50% 100%",
//           }}
//         >
//           <div className="w-[5px] h-10 rounded-lg bg-secondary"></div>
//         </div>

//         {/* {/ Needle semi circle /} */}
//         <div
//           className="absolute bottom-[-20px] left-[40%] w-10 h-10 flex justify-center items-center">
//           <div className="w-4 h-4 rounded-full bg-secondary"></div>
//         </div>

//       </div>

//       {/* {/ Input Style /} */}
//       {/* <div className="mt-4">
//         <input
//           type="number"
//           value={score}
//           onChange={handleChange}
//           className="border border-gray rounded p-2"
//           min="0"
//           max="100"
//         />
//       </div> */}

//       {/* {/ <div className="mt-2 text-lg font-semibold">Matching Score: {score}%</div> /} */}
//       <div className="mt-2 text-lg font-semibold">Matching Score: {scorePercentage}%</div>

//     </div>
//   );
// };

// export default MatchingScore;



// import { useState, ChangeEvent } from "react";
import React, { useState, useEffect } from 'react';
import SlightlyFrowningFace from "../../../assets/icons/SlightlyFrowningFace.png";
import GrinningFacewithBigEyes from "../../../assets/icons/GrinningFacewithBigEyes.png";
import SmilingFacewithHeartEyes from "../../../assets/icons/SmilingFacewithHeartEyes.png";
import SlightlySmilingFace from "../../../assets/icons/SlightlySmilingFace.png";


interface MatchingScoreProps {
  scorePercentage?: any;
}

const MatchingScore: React.FC<MatchingScoreProps> = ({ scorePercentage }) => {
  const [score, setScore] = useState<number>(0);
  { console.log(scorePercentage, "asasas"); }

  const getEmoji = () => {
    if (score >= 75) return SmilingFacewithHeartEyes;
    if (score >= 50) return GrinningFacewithBigEyes;
    if (score >= 25) return SlightlySmilingFace;
    return SlightlyFrowningFace;
  };

  // const getIndicatorColor = () => {
  //   if (score >= 75) return "green";
  //   if (score >= 50) return "yellow";
  //   if (score >= 25) return "orange";
  //   return "red";
  // };


  useEffect(() => {
    if (scorePercentage) {
      setScore(scorePercentage);
    }
  }, [scorePercentage]);


  return (
    <div className="relative flex flex-col items-center p-4">
      <div className="relative w-48 h-24 overflow-hidden">

        {/* Color Gradient */}
        {/* <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
          style={{
            clipPath: "inset(0 0 50% 0)",
            background: `conic-gradient(${getIndicatorColor()} 360deg, ${getIndicatorColor()} ${score * 1.8
              }deg, transparent ${score * 1.8}deg, transparent 180deg)`,
            transform: "rotate(360deg)", // Rotate -90deg to start from the left
            transition: "all 0.5s ease-out"
          }}
        >
        </div> */}

        <div id="main-div" className="flex flex-row justify-around items-center flex-wrap">
          {/* <!-- Scorer 1 Starts --> */}
          <div className="w-48 h-24 flex items-center justify-center my-6 md:my-8">
            <div id="score-meter-1" className="w-48 h-36 relative overflow-hidden rounded-t-full flex items-center justify-center my-10">
              {/* <div id="scorer-1-inner-div" className="absolute left-1/5 bottom-0 top-2/5 w-3/5 h-3/5 rounded-t-full bg-white z-20"></div> */}
              <div id="scorer-1-inner-div-2" className="absolute left-[-127px] top-0 w-full h-full rounded-t-full  border-r-[100px] border-l-[100px] transform rotate-[-130deg] origin-bottom-center z-0"
                style={{
                  borderLeft: "100px solid transparent",
                  borderRight: "100px solid transparent",
                  borderBottomWidth: "140px",
                  // borderBottomColor: getIndicatorColor(), 
                  borderBottomColor: "#B7F7C2",
                }}
              ></div>
              <div id="scorer-1-inner-div-4" className="absolute left-[18px] top-[-30px] transform  rounded-t-full rotate-[165deg] origin-bottom-center border-l-transparent border-r-transparent"
                style={{
                  borderLeft: "30px solid transparent",
                  borderRight: "60px solid transparent",
                  borderBottomWidth: "140px",
                  borderBottomColor: "#98ECA6",
                }}

              ></div>
              <div id="scorer-1-inner-div-3" className="absolute right-[-71px] top-0 w-full h-full  rounded-t-full transform rotate-[91deg] origin-bottom-center z-0"
                style={{
                  borderLeft: "30px solid transparent",
                  borderRight: "154px solid transparent",
                  borderBottomWidth: "62px",
                  borderBottomColor: "#53E56B",

                }}
              ></div>
              <div id="scorer-1-inner-div-3" className="absolute right-[-124px] top-0 w-full h-full  rounded-t-full transform rotate-[116deg] origin-bottom-center z-0"
                style={{
                  borderLeft: "100px solid transparent",
                  borderRight: "100px solid transparent",
                  borderBottomWidth: "140px",
                  borderBottomColor: "#399248",

                }}
              ></div>


            </div>
          </div>
        </div>

        {/* Cover Half Bottom */}
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-gray"
          style={{ clipPath: "inset(50% 0 0 0)", backgroundColor: "white" }}
        >
        </div>

        {/* Emoji and Score */}
        {/* <div>
          <div className="absolute top-0 left-0 w-48 h-24 flex items-center justify-center">
            <div className="">
              <span className="text-3xl bg-white rounded-full w-12 h-12 flex justify-center items-center">
                {getEmoji()}
              </span>
            </div>
          </div>
        </div> */}


        {/* Needle indicator */}
        {/* <div
          className="absolute top-[-2.2rem] left-[40%] w-10 h-32 flex justify-center items-center z-[1]"
          style={{
            transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
            transformOrigin: "50% 100%",
          }}
        >
          <div className="w-[5px] h-10 rounded-lg bg-secondary"></div>
        </div> */}

        {/* Needle Center Circle */}
        {/* <div
          className="absolute top-[4.5rem] left-[40%] w-10 h-10 flex justify-center items-center">
          <div className="w-4 h-4 rounded-full bg-ash"></div>
        </div> */}

      </div>

      {/* Emoji and Score */}
      <div className='bg-white rounded-full w-[110px] h-[110px] top-14 left-0 right-0 mx-auto absolute flex justify-center items-center'>
        <div className="bg-ash rounded-full w-[98px] h-[98px] top-2 left-0 right-0 mx-auto absolute flex justify-center items-center">

          {/* Needle indicator */}
          <div
            className="absolute top-[-2.0rem] left-[35%] w-10 h-20 flex justify-center items-center"
            style={{
              transform: `rotate(${score * 1.8 - 90}deg)`, // Rotate needle according to score
              transformOrigin: "50% 100%",
            }}
          >
            <div className="w-[100px] h-20 rounded-lg bg-slate-300 z-10"
              style={{ clipPath: `polygon(50% 0%, 35% 100%, 65% 100%)`, }}
            ></div>
          </div>

          {/* Needle Center Circle */}
          <div
            className="absolute top-[3.5rem] left-[40%] w-10 h-10 flex justify-center items-center">
            <div className="w-4 h-4 rounded-full bg-ash"></div>
          </div>

          <div className=" flex items-center justify-center ">
            <div className="drop-shadow-2xl">
              <span className=" text-2xl bg-white drop-shadow-2xl rounded-full w-[68px] h-[68px] flex flex-col gap-1 justify-center items-center">
                <img src={getEmoji()} alt="" />
               


                <div className="text-sm text-ash font-semibold z-10">
                  {scorePercentage}%
                </div>
              </span>
            </div>

          </div>

        </div>
      </div>


      {/* {/ Input Style /} */}
      {/* <div className="mt-20">
        <input
          type="number"
          value={score}
          // onChange={handleChange}
          onChange={(e) => setScore(Number(e.target.value))}
          className="border border-gray rounded p-2"
          min="0"
          max="100"
        />
      </div> */}

      {/* Matching Score */}
      {/* {/ <div className="mt-2 text-lg font-semibold">Matching Score: {score}%</div> /} */}
      <div className="mt-16 text-lg text-center font-semibold">Matching Score: {scorePercentage}%</div>

    </div>
  );
};

export default MatchingScore;