

import { motion, useAnimation } from "framer-motion";
import VysyamalaApp from "../../assets/images/VysyamalaApps.png";
import VysyamalaDownload from "../../assets/images/VysyamalaDownloads.png";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


// Define the interface for the API response
// interface AppData {
//   id: number;
//   vysyamala_apps: string;
// }

const VysyamalaApps = () => {



  const controls = useAnimation(); // Controls for the animation
  const [ref, inView] = useInView({
      triggerOnce: true, // Trigger animation only once
      threshold: 0.2, // Trigger when 20% of the element is visible
  });

  useEffect(() => {
      if (inView) {
          controls.start("visible"); // Start animation when in view
      }
  }, [controls, inView]);




  return (
    <div ref={ref} className="bg-gradient py-[120px] relative overflow-hidden max-xl:py-20  max-lg:py-10 max-md:py-16 max-sm:py-10">
      <div className="container  ">
        {/* Map through appData array */}
        {/* {appData.map((app) => ( */}
        <div
          //  key={app.id} 
          className="flex items-center max-sm:flex-col-reverse">
              <motion.div
               ref={ref} // Attach the ref to the element
               initial="hidden" // Initial state
               animate={controls} // Control animations with `controls`
               variants={{
                   hidden: { opacity: 0, translateX: -200 }, // Hidden state
                   visible: { opacity: 1, translateX: 0 }, // Visible state
               }}
               transition={{ duration: 1, ease: "easeOut" }}
           >
          <div className="max-sm:py-5">
            <p className="text-[22px] text-white font-noraml max-md:text-[14px]">Place holder Text</p>
            <h1 className="text-white text-4xl font-semibold mb-10 max-lg:text-3xl max-lg:mb-6 max-md:text-2xl max-sm:text-xl max-sm:mb-4">
              Vysyamala Apps
            </h1>
            <p className="text-white w-3/4 tracking-wide leading-7 max-lg:w-3/4 max-md:w-4/5 max-sm:w-full">
              {/* {app.vysyamala_apps} */}
              Access quick & simple search, instant updates and a great user experience on your phone. Download our apps rated best in the online matrimony segment.
            </p>

            <img
              src={VysyamalaApp}
              alt="VysyamalaApp"
              className="mt-10 hover:cursor-pointer max-sm:mt-5"
            />
          </div>
          </motion.div>
          <div className=" w-full h-full">
            <img src={VysyamalaDownload} alt="VysyamalaDownload" className="w-full h-[540px] object-contain absolute bottom-0 right-[-25%] z-[0] max-xl:-right-[18%] max-xl:h-[450px] max-lg:h-[300px] max-lg:-right-[22%] max-md:static max-md:h-full " />
          </div>
        </div>
        {/* ))} */}
      </div>
    </div>


  );
};

export default VysyamalaApps;