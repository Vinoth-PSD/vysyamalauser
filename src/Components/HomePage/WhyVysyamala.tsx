// import { WhyReasons } from './WhyVysyamala/WhyReasons'
// import ProfileCoverage from "../../assets/icons/profileCoverage.png"
// import CustomerSupport from "../../assets/icons/CustomerSupport.png"
// import Gothras from "../../assets/icons/Gothras.png"
// import UserFriendly from "../../assets/icons/UserFriendly.png"
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useEffect } from "react";


// export const WhyVysyamala = () => {

//     const controls = useAnimation(); // Controls for the animation
//     const [ref, inView] = useInView({
//         triggerOnce: true, // Trigger animation only once
//         threshold: 0.2, // Trigger when 20% of the element is visible
//     });

//     useEffect(() => {
//         if (inView) {
//             controls.start("visible"); // Start animation when in view
//         }
//     }, [controls, inView]);


//     return (
//         <div>
//             <div className="container mx-auto pt-16 max-sm:py-6">
//             <motion.div
//                ref={ref} // Attach the ref to the element
//                initial="hidden" // Initial state
//                animate={controls} // Control animations with `controls`
//                variants={{
//                    hidden: { opacity: 0, translateX: -200 }, // Hidden state
//                    visible: { opacity: 1, translateX: 0 }, // Visible state
//                }}
//                transition={{ duration: 0.8, ease: "easeOut" }}
//            >
//                 <div>
//                     <h4 className="text-primary-700 text-[36px] font-bold pb-3 max-xl:text-[34px] max-lg:text-[30px] max-lg:pb-2 max-md:text-[28px] max-sm:text-[24px]">
//                         Why Vysyamala?
//                     </h4>
//                     <p className="text-primary text-[20px] max-xl:text-[18px] max-lg:text-[16px]">
//                         Vysyamala is a platform initiated to ensure quality and culture. With
//                         our platform, it is a given that you will find your soul mate. But what
//                         makes us special is our keen eye on{" "}
//                         <span className="font-bold">Arya Vysya Traditions</span>. Below are
//                         some of the other reasons to choose us.
//                     </p>
//                 </div>
//                 </motion.div>

//                 <div className="grid grid-rows-2 grid-cols-2 gap-x-[80px] gap-y-[40px] my-14 max-sm:grid-cols-1 max-sm:gap-5 max-sm:my-10">
//                     <motion.div
//                         ref={ref} // Attach the ref to the element
//                         initial="hidden" // Initial state
//                         animate={controls} // Control animations with `controls`
//                         variants={{
//                             hidden: { opacity: 0, y: 200 }, // Hidden state
//                             visible: { opacity: 1, y: 0 }, // Visible state
//                         }}
//                         transition={{ duration: 0.8, ease: "easeOut" }}
//                     >
//                         <WhyReasons
//                             icon={ProfileCoverage}
//                             heading={"Wide profile coverage"}
//                             desc={
//                                 "Ensuring to provide the best service, we have curated our profile section to cover all the details of your prospects. A few easy clicks and you shall find your soul mate!"
//                             }
//                         />
//                     </motion.div>
//                     <motion.div
//                         ref={ref} // Attach the ref to the element
//                         initial="hidden" // Initial state
//                         animate={controls} // Control animations with `controls`
//                         variants={{
//                             hidden: { opacity: 0, y: 200 }, // Hidden state
//                             visible: { opacity: 1, y: 0 }, // Visible state
//                         }}
//                         transition={{ duration: 1.0, ease: "easeOut" }}
//                     >
//                     <WhyReasons
//                         icon={CustomerSupport}
//                         heading={"Customer support"}
//                         desc={
//                             "Have an issue? Need someone to help you through the website? Any problem, we strive to provide you with an instant solution. Our customer support extends through various channels like email, live chat, call, etc."
//                         }
//                     />
//                     </motion.div>
//                     <motion.div
//                         ref={ref} // Attach the ref to the element
//                         initial="hidden" // Initial state
//                         animate={controls} // Control animations with `controls`
//                         variants={{
//                             hidden: { opacity: 0, y: 200 }, // Hidden state
//                             visible: { opacity: 1, y: 0 }, // Visible state
//                         }}
//                         transition={{ duration: 1.2, ease: "easeOut" }}
//                     >
//                     <WhyReasons
//                         icon={Gothras}
//                         heading={"Arya Vysya Gotras"}
//                         desc={
//                             "Want to know about all Arya Vysya Gotras? Well, your search ends here as we have the list of all the Arya Vysya Gotras for your easy convenience."
//                         }
//                     />
//                     </motion.div>
//                     <motion.div
//                         ref={ref} // Attach the ref to the element
//                         initial="hidden" // Initial state
//                         animate={controls} // Control animations with `controls`
//                         variants={{
//                             hidden: { opacity: 0, y: 200 }, // Hidden state
//                             visible: { opacity: 1, y: 0 }, // Visible state
//                         }}
//                         transition={{ duration: 1.4, ease: "easeOut" }}
//                     >
//                     <WhyReasons
//                         icon={UserFriendly}
//                         heading={"User-friendly movement through the portal website"}
//                         desc={
//                             "Our app is designed to be simple yet fulfilling. Our portal can be accessed from baby boomers to gen Zs."
//                         }
//                     />
//                     </motion.div>
//                 </div>

//                 <hr className="text-gray" />
//             </div>
//         </div>

//     )
// }



import { WhyReasons } from './WhyVysyamala/WhyReasons'
import ProfileCoverage from "../../assets/icons/profileCoverage.png"
import CustomerSupport from "../../assets/icons/CustomerSupport.png"
import Gothras from "../../assets/icons/Gothras.png"
import UserFriendly from "../../assets/icons/UserFriendly.png"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


export const WhyVysyamala = () => {

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
        <div>
            <div ref={ref} className="container mx-auto pt-16 max-sm:py-6">
            <motion.div
               ref={ref} // Attach the ref to the element
               initial="hidden" // Initial state
               animate={controls} // Control animations with `controls`
               variants={{
                   hidden: { opacity: 0, translateX: -200 }, // Hidden state
                   visible: { opacity: 1, translateX: 0 }, // Visible state
               }}
               transition={{ duration: 0.8, ease: "easeOut" }}
           >
                <div>
                    <h4 className="text-vysyamalaBlack text-[36px] font-bold pb-2 max-xl:text-[34px] max-lg:text-[30px] max-lg:pb-2 max-md:text-[28px] max-sm:text-[24px]">
                        Why Vysyamala?
                    </h4>
                    <p className="text-vysyamalaBlack text-[20px] font-normal max-xl:text-[18px] max-lg:text-[16px]">
                        Vysyamala is a platform initiated to ensure quality and culture. With
                        our platform, it is a given that you will find your soul mate. But what
                        makes us special is our keen eye on{" "}
                        <span className="font-bold">Arya Vysya Traditions</span>. Below are
                        some of the other reasons to choose us.
                    </p>
                </div>
                </motion.div>

                <div className="grid grid-rows-2 grid-cols-2 gap-x-[80px] gap-y-[40px] my-10 max-sm:grid-cols-1 max-sm:gap-5 max-sm:my-10">
                    <motion.div
                        ref={ref} // Attach the ref to the element
                        initial="hidden" // Initial state
                        animate={controls} // Control animations with `controls`
                        variants={{
                            hidden: { opacity: 0, y: 200 }, // Hidden state
                            visible: { opacity: 1, y: 0 }, // Visible state
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <WhyReasons
                            icon={ProfileCoverage}
                            heading={"Wide profile coverage"}
                            desc={
                                "Ensuring to provide the best service, we have curated our profile section to cover all the details of your prospects. A few easy clicks and you shall find your soul mate!"
                            }
                        />
                    </motion.div>
                    <motion.div
                        ref={ref} // Attach the ref to the element
                        initial="hidden" // Initial state
                        animate={controls} // Control animations with `controls`
                        variants={{
                            hidden: { opacity: 0, y: 200 }, // Hidden state
                            visible: { opacity: 1, y: 0 }, // Visible state
                        }}
                        transition={{ duration: 1.0, ease: "easeOut" }}
                    >
                    <WhyReasons
                        icon={CustomerSupport}
                        heading={"Customer support"}
                        desc={
                            "Have an issue? Need someone to help you through the website? Any problem, we strive to provide you with an instant solution. Our customer support extends through various channels like email, live chat, call, etc."
                        }
                    />
                    </motion.div>
                    <motion.div
                        ref={ref} // Attach the ref to the element
                        initial="hidden" // Initial state
                        animate={controls} // Control animations with `controls`
                        variants={{
                            hidden: { opacity: 0, y: 200 }, // Hidden state
                            visible: { opacity: 1, y: 0 }, // Visible state
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                    <WhyReasons
                        icon={Gothras}
                        heading={"Arya Vysya Gotras"}
                        desc={
                            "Want to know about all Arya Vysya Gotras? Well, your search ends here as we have the list of all the Arya Vysya Gotras for your easy convenience."
                        }
                    />
                    </motion.div>
                    <motion.div
                        ref={ref} // Attach the ref to the element
                        initial="hidden" // Initial state
                        animate={controls} // Control animations with `controls`
                        variants={{
                            hidden: { opacity: 0, y: 200 }, // Hidden state
                            visible: { opacity: 1, y: 0 }, // Visible state
                        }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                    >
                    <WhyReasons
                        icon={UserFriendly}
                        heading={"User-friendly movement through the portal website"}
                        desc={
                            "Our app is designed to be simple yet fulfilling. Our portal can be accessed from baby boomers to gen Zs."
                        }
                    />
                    </motion.div>
                </div>

                <hr className="text-gray" />
            </div>
        </div>

    )
}
