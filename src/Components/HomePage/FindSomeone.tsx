import { useState, useEffect } from "react";
//import axios from "axios";
import { IoPersonCircle } from "react-icons/io5";

import { MdOutlineSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import FindSomeoneIcon from "../../assets/images/FindSomeone.png";
// import { LoginPopupModal } from "./PopUpsLogin/LoginPopupModal";
import { useNavigate } from "react-router-dom";
import HeartBg from "../../assets/images/FindMatchesHeartBg.png"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Work from "../../assets/icons/Work.svg";
import calendar from "../../assets/icons/calendar.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import apiClient from "../../API";



interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

// interface Profile {
//   profile_id: string;
//   profile_name: string;
//   profile_age: number;
//   profile_img: string;
//   profile_height: string;
//   profession: string;
//   location: string;
// }


const FindProfessionals = () => {
  const [professions, setProfessions] = useState<Profession[]>([]);
  // const [profiles, setProfiles] = useState<Profile[]>([]);
  // const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false); // State for login popup

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validation will trigger on every change
  });

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await apiClient.post<Record<string, Profession>>(
          "/auth/Get_Profes_Pref/"
        );
        setProfessions(Object.values(response.data));
      } catch (err) {
        console.error("Failed to fetch profession preferences");
      }
    };

    fetchProfessions();
  }, []);
  const navigate = useNavigate(); // Hook to navigate to the next page

  const handleSearch = async (data: any) => {
    const { gender, profession, ageRange } = data;
    const [fromAge, toAge] = ageRange.split("-");

    try {
      const response = await apiClient.post(
        "/auth/Searchbeforelogin/",
        {
          from_age: fromAge.trim(),
          to_age: toAge.trim(),
          gender: gender,
          profession: profession,
          native_state: "Tamilnadu",
          city: "Trichy",
          received_per_page: "2",
          received_page_number: "1",
        }
      );

      const profiles = response.data.data;
      //console.log("profile found", profiles)


      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling effect
      });


      if (profiles.length === 0) {

        // Navigate to ProfileNotFound if no profiles found
        navigate("/ProfileNotFound");
        //console.log("ProfileNotFound")
      } else {
        // Navigate to the FindSomeOneCard page and pass the profiles data via state
        navigate("/FindSomeOneSpecial", { state: { profiles } });

      }
    } catch (err) {
      console.error("Failed to fetch search results");
      navigate("/ProfileNotFound"); // Navigate to ProfileNotFound on error as well
      //console.log("profile not found")

    }
  };

  // const handleViewProfileClick = () => {
  //   setIsLoginPopupOpen(true); // Open login popup
  // };

  // const handleCloseLoginPopup = () => {
  //   setIsLoginPopupOpen(false); // Close login popup
  // };

  
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
    <div ref={ref} className="bg-[#FFCCCC]"
      style={{ backgroundImage: `url(${HeartBg})`, backgroundSize: "500px" }}
    >
      <div className="bg-[#ffffff80]">
        <div className="container flex flex-col py-14 max-md:py-10 max-sm:py-8">
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
            <div>
              <img
                src={FindSomeoneIcon}
                alt="find someone"
                className="size-28 mx-auto max-md:size-16"
              />
            </div>
            <div>
              <h1 className="text-primary-700 text-center text-3xl font-bold max-lg:text-2xl max-md:text-xl max-sm:text-lg">
                Find Professional Matches
              </h1>
            </div>
            </motion.div>

            {/* {/ Form section /} */}
            <form onSubmit={handleSubmit(handleSearch)} className="mt-8 flex  max-sm:mt-4 max-sm:flex-col">
              <div className="bg-white grid grid-cols-3 px-5 py-3 text-ashSecondary divide-x-2 divide-gray w-full rounded-l-md max-lg:px-4 max-lg:py-2 max-sm:grid-cols-1 max-sm:rounded-none max-sm:rounded-tl-md max-sm:rounded-tr-md max-sm:divide-x-0">

                {/* {/ Gender selection /} */}
                <div className="pr-3 flex flex-col items-start justify-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:p-0 max-sm:py-2 max-sm:border-b-[1px] border-gray">
                  <label htmlFor="gender" className="block mb-1">
                    <IoPersonCircle className="text-[22px]  text-primary ml-1" />
                  </label>
                  <div className="relative w-full z-[1]">

                  <select
                    id="gender"
                    {...register("gender", { required: "Gender is required" })}
                    className="outline-none ps-[2px] rounded w-full  max-sm:py-2 max-sm:px-2 appearance-none bg-transparent"
                  >
                    <option value="" selected>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    {/* <option value="others">Others</option> */}
                  </select>
                  <IoMdArrowDropdown className="absolute right-2 top-[38%] text-lg text-vysyamalaBlack z-[-1]" />

                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-sm ">{String(errors.gender.message)}</p>
                  )}
                </div>

                {/* {/ Profession selection /} */}
                <div className="px-3 flex flex-col items-start justify-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:p-0 max-sm:py-2 max-sm:border-b-[1px] border-gray">
                  <label htmlFor="profession" className="block mb-1">
                    {/* <FaSuitcase className="text-[22px] text-primary ml-1" /> */}
                    <img src={Work} alt="" className="text-[22px]  ml-1" />
                  </label>
                  <div className="relative w-full z-[1]">
                  <select
                    id="profession"
                    {...register("profession", { required: "Profession is required" })}
                    className="outline-none w-full ps-[2px] rounded   max-sm:py-2 max-sm:px-2 appearance-none bg-transparent"
                  >
                    <option value="" selected>
                      Profession
                    </option>
                    {professions.map((profession) => (
                      <option
                        key={profession.Profes_Pref_id}
                        value={profession.Profes_Pref_id}
                      >
                        {profession.Profes_name}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown className="absolute right-2 top-[38%] text-lg text-vysyamalaBlack z-[-1]" />

                  </div>
                 
                  {errors.profession && (
                    <p className="text-red-500 text-sm">{String(errors.profession.message)}</p>
                  )}
                </div>

                {/* {/ Age range selection /} */}
                <div className="px-3 flex flex-col items-start justify-center max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:p-0 max-sm:py-2">
                  <label htmlFor="ageRange" className="block mb-1">
                    {/* <IoCalendar className="text-[22px]  text-primary ml-1" /> */}
                    <img src={calendar} className="text-[22px]  ml-1" />
                  </label>
                  <div className="relative w-full z-[1]">

                  <select
                    id="ageRange"
                    {...register("ageRange", { required: "Age range is required" })}
                    className="outline-none ps-[2px] rounded w-full max-sm:py-2 max-sm:px-2 appearance-none bg-transparent"
                  >
                    <option value="" selected>
                      Age
                    </option>
                    <option value="18 - 21">18 - 21</option>
                    <option value="22 - 25">22 - 25</option>
                    <option value="26 - 30">26 - 30</option>
                  </select>
                  <IoMdArrowDropdown className="absolute right-2 top-[38%] text-lg text-vysyamalaBlack z-[-1]" />

                  </div>
                  {errors.ageRange && (
                    <p className="text-red-500 text-sm ">{String(errors.ageRange.message)}</p>
                  )}
                </div>
              </div>

              {/* {/ Search button /} */}
              <div className="w-1/5 max-sm:w-full">
                <button
                  className="bg-primary flex justify-center items-center  py-[25px] w-full h-full text-lg  tracking-wide text-white rounded-r-md max-lg:text-[16px]  max-lg:flex-col max-lg:items-start max-lg:px-4 max-lg:py-[10px] max-md:py-[10px] max-md:px-[5px] max-md:flex-col max-md:items-start max-sm:flex-row max-sm:rounded-none max-sm:rounded-bl-md max-sm:rounded-br-md"
                  type="submit"
                >
                  <MdOutlineSearch className="text-3xl  mr-3 max-lg:mr-1" />
                  Find Match
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default FindProfessionals;
