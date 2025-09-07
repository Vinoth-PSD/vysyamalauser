/* eslint-disable @typescript-eslint/no-explicit-any */
// import BrideIcon from "../../assets/images/BrideIcon.png";
// import MenIcon from "../../assets/icons/men.png"
// import { FaRegCalendar } from "react-icons/fa";
// import { MdStars } from "react-icons/md";
// import { IoSchool } from "react-icons/io5";
// // import { IoTriangle } from "react-icons/io5";
// import { justRegistered } from "../../commonapicall";
// import { useEffect, useState } from "react";
// import './TrustedPeople.css'; // Import CSS for sliding animations
// import Triangle from "../../assets/images/trustedTrianlge.png"
// import ArrowTriangle from "../../assets/images/TrustedFoldArrow.png"
// import CountUp from 'react-countup';
// import { useInView } from "react-intersection-observer";
// import { motion, useAnimation } from "framer-motion";


// const TrustedPeople = () => {
//   const [activeProfile, setActiveProfile] = useState<number>();
//   const [happyCustomers, setHappyCustomers] = useState<number>(0);
//   const [cardData, setCardData] = useState<any[]>([]);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [, setIsSliding] = useState<boolean>(false); // State to handle sliding effect

//   const fetchGalleryItems = async () => {
//     try {
//       const response = await justRegistered();
//       setHappyCustomers(response?.data.happy_customers_count);
//       setActiveProfile(response?.data.active_profiles_count);
//       setCardData(response?.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchGalleryItems();
//   }, []);

//   // Rotate through cardData every 2 seconds with sliding effect
//   useEffect(() => {
//     if (cardData.length > 0) {
//       const interval = setInterval(() => {
//         setIsSliding(true); // Start sliding out
//         setTimeout(() => {
//           setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length); // Update card data
//           setIsSliding(false); // Start sliding in
//         }, 2500); // Match sliding animation duration
//       }, 2500);

//       return () => clearInterval(interval);
//     }
//   }, [cardData]);

//   const currentCard = cardData[currentIndex];

//   // const [happyCustomers, setHappyCustomers] = useState<number>(0);
//   const { ref, inView } = useInView({
//     triggerOnce: true, // Trigger only once
//   });


//   const controls = useAnimation(); // Controls for the animation
//   // const [ref, inView] = useInView({
//   //     triggerOnce: true, // Trigger animation only once
//   //     threshold: 0.2, // Trigger when 20% of the element is visible
//   // });

//   useEffect(() => {
//       if (inView) {
//           controls.start("visible"); // Start animation when in view
//       }
//   }, [controls, inView]);



//   return (
//     <div className="bg-trustedWhite trusted-slider  overflow-hidden">
//       <div className="container  mt-[116px] mb-[76px] max-lg:mt-24 max-lg:mb-28 max-md:mt-14 max-mb-15 max-sm:mt-8 max-sm:mb-8 ">
//       <motion.div
//                ref={ref} // Attach the ref to the element
//                initial="hidden" // Initial state
//                animate={controls} // Control animations with `controls`
//                variants={{
//                    hidden: { opacity: 0, translateY: 150 }, // Hidden state
//                    visible: { opacity: 1, translateY: 0 }, // Visible state
//                }}
//                transition={{ duration: 0.8, ease: "easeOut" }}
//            >
//         <div className="flex flex-col justify-center items-center pt-10 mb-20 max-md:mb-4 max-md:pt-5">
//           <h1 className="text-secondary text-3xl font-bold mb-4 max-lg:text-[30px] max-md:text-[28px] max-sm:text-[24px] max-sm:mb-2">
//             Trusted by 32K people
//           </h1>
//           <p className="text-xl text-ash text-center max-md:text-medium max-sm:text-base">
//             Most trusted online matrimonial exclusive for Arya Vysya Community
//             since 2008.
//           </p>
//         </div>
//         </motion.div>

//         <div className="mt-16 pb-14 max-md:mt-16 max-sm:mt-10 relative z-0 max-md:pb-6">

//           <div className=" bg-white flex justify-between items-center px-20 py-10 rounded-xl shadow-trustedBoxShadow  max-lg:px-10 max-md:px-5 max-md:py-15 max-md:flex-col max-md:gap-y-80 max-sm:py-8 max-sm:px-5 max-md:w-[70%] max-md:mx-auto">

//             <div className="text-center">
//               {/* <h1 className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center">
//                 {activeProfile}
//               </h1> */}
//               <div ref={ref}>
//                 {inView && (
//                   <CountUp
//                     start={0}
//                     end={activeProfile ?? 0}
//                     delay={0}
//                   >
//                     {({ countUpRef }) => (
//                       <div>
//                         <span
//                           className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center"
//                           ref={countUpRef}
//                         />
//                       </div>
//                     )}
//                   </CountUp>
//                 )}
//               </div>

//               <p className="text-base font-semibold text-ash max-sm:text-center">Active Profiles</p>
//             </div>

//             {/* card fold triangle */}
//             <div
//               className={`absolute bg-white -top-5 left-0 right-0 z-[-1] mx-auto w-[375px] flex-col justify-center items-start  text-primary rounded-md shadow-trustedBoxShadow transition-all  max-md:w-[100%] max-md:top-[28%] max-sm:py-10 max-sm:px-4`}
//             >

//               <div className="absolute -left-[20px] top-[-9px] z-[-2]  max-md:hidden">
//                 <img src={Triangle} alt="Triangle-img" className="size-10" />
//               </div>
//               <div className="absolute -right-[20px] top-[-9px] z-[-2] max-md:hidden">
//                 <img src={Triangle} alt="Triangle-img" className="size-10" />
//               </div>
//               {/* mobile arrow fold */}
//               <div className="hidden max-md:block absolute -left-[0px] top-[-20px] z-[-2]">
//                 <img src={ArrowTriangle} alt="" className="w-28 h-10" />
//               </div>
//               <div className="hidden max-md:block absolute right-[0px]  top-[-20px] z-[-2] rotate-180">
//                 <img src={ArrowTriangle} alt="" className="w-28 h-10" />
//               </div>


//             </div>
//             {/* card field with sliding effect */}
//             {currentCard && (

//               <div
//                 className={`slideIn absolute bg-white -top-7 left-0 right-0 z-[0] mx-auto w-[375px] shadow-profileCardShadow overflow-hidden    max-md:w-[100%] max-md:top-[28%] 
//                   `}
//               >
//                 <div className={`flex-col justify-center items-center py-8 px-5  text-primary transition-all  overflow-hidden z-0 max-sm:py-10 max-sm:px-2 
//                 ${currentCard.gender === "male" ? "slide-in" : "slide-out"}
//                 `}>
//                   {/* just registered */}
//                   <div className={`absolute top-0 left-0 right-0 w-fit mx-auto bg-ash text-xs px-3 py-0.5 text-white rounded-b`}>
//                     <h1>Just registered</h1>
//                   </div>
//                   <div>
//                     <img src={currentCard.gender === "male" ? MenIcon : BrideIcon} alt="brideicon" className="size-12 mx-auto" />
//                   </div>
//                   <div className="mt-3 flex flex-col justify-between items-center space-x-3 gap-y-2">
//                     {/* <p className="text-xl text-secondary font-semibold">Harini</p> */}
//                     <p className="text-xl text-secondary font-semibold">{currentCard.profile_id}</p>
//                     <div className="flex items-center gap-4 max-sm:gap-2">
//                       <div>
//                         <FaRegCalendar />
//                       </div>
//                       <h1>{currentCard.age} yrs</h1>
//                       <span>|</span>
//                       <div>
//                         <MdStars />
//                       </div>
//                       <h1>{currentCard.birthstar}</h1>
//                     </div>
//                     <div>
//                       <div className=" flex items-center space-x-3">
//                         <IoSchool />
//                         <p>{currentCard.education}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             )}

//             {/* card field */}
//             <div className="text-center">
//               {/* <h1 className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center">{happyCustomers}</h1> */}
//               <div ref={ref}>
//                 {inView && (
//                   <CountUp
//                     start={0}
//                     end={happyCustomers ?? 0}
//                     delay={0}
//                   >
//                     {({ countUpRef }) => (
//                       <div>
//                         <span
//                           className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center"
//                           ref={countUpRef}
//                         />
//                       </div>
//                     )}
//                   </CountUp>
//                 )}
//               </div>
//               <p className="text-base font-semibold text-ash max-sm:text-center">Happy Customers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrustedPeople;




import BrideIcon from "../../assets/images/BrideIcon.png";
import MenIcon from "../../assets/icons/men.png"
import { FaRegCalendar } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
// import { IoTriangle } from "react-icons/io5";
import { justRegistered } from "../../commonapicall";
import { useEffect, useState } from "react";
import './TrustedPeople.css'; // Import CSS for sliding animations
import Triangle from "../../assets/images/trustedTrianlge.png"
import ArrowTriangle from "../../assets/images/TrustedFoldArrow.png"
import CountUp from 'react-countup';
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const TrustedPeople = () => {
  // const [happyCustomers, setHappyCustomers] = useState<number>(0);
  const [happyCustomers,] = useState<number>(52000);
  const [activeProfile, setActiveProfile] = useState<number>(0);
  // const [originalData, setOriginalData] = useState<any[]>([]);
  const [, setOriginalData] = useState<any[]>([]);

  const [cardData, setCardData] = useState<any[]>([]);

  const fetchGalleryItems = async () => {
    try {
      const response = await justRegistered(); // Replace `justRegistered` with your actual API call function
     // setHappyCustomers(response?.data.happy_customers_count);
      setActiveProfile(response?.data.active_profiles_count);

      const fetchedData = response?.data.data || [];
      setOriginalData(fetchedData);

      // Separate male and female cards
      const males = fetchedData.filter((card: { gender: string; }) => card.gender === "male");
      const females = fetchedData.filter((card: { gender: string; }) => card.gender === "female");

      // Interleave male and female cards
      const interleaved = [];
      const maxLength = Math.max(males.length, females.length);
      for (let i = 0; i < maxLength; i++) {
        if (males[i]) interleaved.push(males[i]);
        if (females[i]) interleaved.push(females[i]);
      }
      setCardData(interleaved); // Set interleaved data
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once
  });

  const controls = useAnimation(); // Controls for the animation

  useEffect(() => {
    if (inView) {
      controls.start("visible"); // Start animation when in view
    }
  }, [controls, inView]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    // cssEase: "easeInOut",
    pauseOnHover: true,
    arrows: false,
  };



  return (
    <div ref={ref} className="bg-trustedWhite trusted-slider  overflow-hidden">
      <div className="container  mt-[80px] mb-[76px] max-lg:mt-24 max-lg:mb-28 max-md:mt-14 max-mb-15 max-sm:mt-8 max-sm:mb-8 ">
        <motion.div
          ref={ref} // Attach the ref to the element
          initial="hidden" // Initial state
          animate={controls} // Control animations with `controls`
          variants={{
            hidden: { opacity: 0, translateY: 150 }, // Hidden state
            visible: { opacity: 1, translateY: 0 }, // Visible state
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col justify-center items-center pt-10 mb-20 max-md:mb-4 max-md:pt-5">
            <h1 className="text-main text-3xl font-bold mb-2 max-lg:text-[30px] max-md:text-[28px] max-sm:text-[24px] max-sm:mb-2">
              {/* Total happy customer = Trusted people. */}
              Trusted by 52K people
            </h1>
            <p className="text-xl text-vysyamalaBlack text-center max-md:text-medium max-sm:text-base">
              Most trusted online matrimonial exclusive for Arya Vysya Community
              since 2008.
            </p>
          </div>
        </motion.div>

        <div className="mt-16 pb-14 max-md:mt-16 max-sm:mt-10 relative z-0 max-md:pb-6">

          <div className=" w-[1100px] mx-auto bg-white  flex justify-between items-center px-10 py-10 rounded-xl shadow-trustedBoxShadow max-xl:w-[1000px] max-lg:w-[100%] max-md:px-5 max-md:py-15 max-md:flex-col max-md:gap-y-80 max-sm:py-8 max-sm:px-5 max-md:w-[70%] max-md:mx-auto">

            <div className="text-start">
              {/* <h1 className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center">
                {activeProfile}
              </h1> */}
              <div ref={ref}>
                {inView && (
                  <CountUp
                    start={0}
                    end={activeProfile ?? 0}
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <div>
                        <span
                          className="text-main text-4xl font-bold leading-[54px] mb-2 max-lg:text-3xl max-md:text-4xl max-sm:text-center"
                          ref={countUpRef}
                        />
                      </div>
                    )}
                  </CountUp>
                )}
              </div>

              <p className="text-[18px] font-semibold text-ash max-lg:text-sm max-sm:text-center">Active Profiles</p>
            </div>

            {/* card fold triangle */}
            <div
              className={`absolute bg-white -top-5 left-0 right-0 z-[-1] mx-auto w-[375px] flex-col justify-center items-start  text-primary rounded-md shadow-trustedBoxShadow transition-all  max-md:w-[100%] max-md:top-[28%] max-sm:py-10 max-sm:px-4`}
            >

              <div className="absolute -left-[20px] top-[-9px] z-[-2]  max-md:hidden">
                <img src={Triangle} alt="Triangle-img" className="size-10" />
              </div>
              <div className="absolute -right-[20px] top-[-9px] z-[-2] max-md:hidden">
                <img src={Triangle} alt="Triangle-img" className="size-10" />
              </div>
              {/* mobile arrow fold */}
              <div className="hidden max-md:block absolute -left-[0px] top-[-20px] z-[-2]">
                <img src={ArrowTriangle} alt="" className="w-28 h-10" />
              </div>
              <div className="hidden max-md:block absolute right-[0px]  top-[-20px] z-[-2] rotate-180">
                <img src={ArrowTriangle} alt="" className="w-28 h-10" />
              </div>


            </div>
            {/* card field with sliding effect */}

            {cardData.length > 0 && (
              <div className={`slideIn absolute bg-white -top-7 left-0 right-0 z-0 mx-auto w-[375px] shadow-profileCardShadow overflow-hidden max-md:w-[100%] max-md:top-[28%]
        `}>
                <Slider {...settings}>
                  {cardData.map((card, index) => (
                    <div
                      key={index}
                      className={`relative flex-col justify-center items-center py-8 px-5 text-primary transition-all overflow-hidden z-0 max-sm:py-10 max-sm:px-2
                      ${card.gender === "male" ? "slide-bgdark" : "slide-bglight"}
                  `}
                    >
                      {/* Header */}
                      <div className="absolute top-0 left-0 right-0 w-fit mx-auto bg-ash text-xs px-3 py-0.5 text-white rounded-b">
                        <h1>Just registered</h1>
                      </div>
                      {/* Profile Image */}
                      <div>
                        <img
                          src={card.gender === "male" ? MenIcon : BrideIcon}
                          alt="icon"
                          className="size-12 mx-auto"
                        />
                      </div>
                      {/* Profile Details */}
                      <div className="mt-3 flex flex-col justify-between items-center space-x-3 gap-y-2">
                        <p className="text-xl text-main font-semibold">{card.profile_id}</p>
                        <div className="flex items-center gap-4 max-sm:gap-2">
                          <FaRegCalendar />
                          <h1>{card.age} yrs</h1>
                          <span>|</span>
                          <MdStars />
                          <h1>{card.birthstar}</h1>
                        </div>
                        <div className="flex items-center space-x-3">
                          <IoSchool />
                          <p>{card.education}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}


            {/* card field */}
            <div className="text-end">
              {/* <h1 className="text-secondary text-4xl font-bold mb-2 max-lg:text-4xl max-md:text-4xl max-sm:text-center">{happyCustomers}</h1> */}
              <div ref={ref}>
                {inView && (
                  <CountUp
                    start={0}
                    end={happyCustomers ?? 0}
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <div>
                        <span
                          className="text-main text-4xl font-bold mb-2 leading-[54px]  max-lg:text-3xl max-md:text-4xl max-sm:text-center"
                          ref={countUpRef}
                        />
                      </div>
                    )}
                  </CountUp>
                )}
              </div>
              <p className="text-[18px] font-semibold text-ash max-lg:text-sm max-sm:text-center">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedPeople;
