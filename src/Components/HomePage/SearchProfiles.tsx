/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { GetProfession, GetState, GetCity } from "../../commonapicall";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import apiClient from "../../API";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

interface professionType {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface stateType {
  State_Pref_id: number;
  State_name: string;
}

interface CityType {
  id: number;
  district: string;
}
const SearchProfiles = () => {
  const [clickedButton, setClickedButton] = useState("Occupation");
  const [professions, setProfessions] = useState<professionType[]>([]);
  const [states, setStates] = useState<stateType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);

  const navigate = useNavigate(); // Use navigate to redirect
  // const [selectedProfession, setSelectedProfession] = useState<number | null>(null); // State to hold selected profession ID
  // countryList

  // ProfessionList
  const getProfessionData = async () => {
    const response = await GetProfession();
    const object = Object.values(response?.data) as professionType[];
    setProfessions(object);
    setStates([]);
    setCities([]);
    setClickedButton("Profession");
  };
  const getStateList = async () => {
    const response = await GetState();
    const object = Object.values(response?.data) as stateType[];
    setStates(object);
    setCities([]);
    setProfessions([]);
    setClickedButton("State");
  };

  const getCityList = async () => {
    const response = await GetCity();
    const object = Object.values(response?.data) as CityType[];
    setCities(object);
    setStates([]);
    setProfessions([]);
    setClickedButton("City");
  };

  useEffect(() => {}, []);

  // const handleClick = (buttonName: SetStateAction<string>) => {
  //   setClickedButton(buttonName);
  // };
  console.log(professions,"professions");
  console.log(states,"states");
  console.log(cities,"cities");

  //const navigate = useNavigate(); // Hook to navigate to the next page


    


  // Function to call the external API
  const SearchProfiles = async (professionId?: number, StateId?: number, id?:number) => {
    try {
      // Log gender and profession for debugging purposes
      console.log("Selected Profession:", professionId);
      const response = await apiClient.post(
        "/auth/Searchbeforelogin/",
        {
          // gender: "Female",
          // profession:professionId,
          // from_age:"22",
          // to_age: "25",
          gender: "Female",
          profession: professionId,
          native_state: StateId,
          city: id,
          // city: "Trichy",
          // received_per_page: "2",
          // received_page_number: "1",
        }
      );

      console.log("API Response: ", response.data.data);
      // You can handle the response and update the UI as needed
      // Navigate to "FindSomeOneSpecial" after the API call

      const profiles = response.data.data; // Ensure profiles are in the expected format
      console.log("Profiles: ", profiles); // Check if this logs correctly
      navigate("/FindSomeOneSpecial", { state: { profiles } });
    } catch (error) {
      console.error("API call error: ", error);
      navigate("/ProfileNotFound"); // Navigate to ProfileNotFound on error as well
      console.log("profile not found");
    }


      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling effect
      });
  
  };

  
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
    <div ref={ref} className="bg-[#d4d4d44d]">
      <div className="container py-[70px] max-lg:py-14 max-sm:py-10 max-sm:pb-0">
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
        <div className="text-center">
          <h1 className="text-main text-xl font-[700] max-md:text-xl max-sm:text-base ">
            Search
          </h1>
          <h2 className=" text-vysyamalaBlack text-lg font-bold">
            Matrimonial Profiles By
          </h2>
        </div>
        </motion.div>
        <hr className="mt-4 mb-8 w-[1200px] mx-auto text-footer-text-gray max-xl:w-[1000px] max-lg:w-full max-sm:hidden" />
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
        <div className="mt-10 space-y-6 max-lg:space-y-5 max-lg:mt-8 max-sm:mt-5 max-sm:space-y-0">
          <div className="flex justify-center  space-x-5  max-sm:flex-wrap max-sm:flex-col max-sm:space-x-0">
            {/* <button
              className={`px-5 py-2 font-semibold rounded max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:border-t-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "Occupation" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => handleClick("Occupation")}
            >
              Occupation
            </button> */}
            <button
              className={`px-5 py-3 font-semibold rounded-lg max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "Profession" ? "bg-[#D4D5D9]" : ""
              }`}
              // onClick={getProfessionData}
              onClick={() => getProfessionData()}
            >
              Profession
            </button>
            <button
              className={`px-5 py-3 font-semibold rounded-lg max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "City" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => getCityList()}
            >
              City
            </button>
            <button
              className={`px-5 py-3 font-semibold rounded-lg max-sm:font-medium max-sm:bg-gray max-sm:text-start max-sm:text-[16px] max-sm:p-3 max-sm:text-primary  max-sm:border-b-[1px] max-sm:rounded-none max-sm:border-footer-text-gray ${
                clickedButton === "State" ? "bg-[#D4D5D9]" : ""
              }`}
              onClick={() => getStateList()}
            >
              State
            </button>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-y-5 space-x-6 divide-x-2 divide-footer-text-gray max-md:flex-wrap max-sm:flex-col max-sm:items-start max-sm:space-x-0  max-sm:divide-x-0  ">
            {professions &&
              professions.map((profession) => (
                <button
                  key={profession.Profes_Pref_id}
                  className="pl-6 max-sm:p-2"
                  // onClick={() => console.log(profession.Profes_Pref_id)}
                  onClick={() => SearchProfiles(profession.Profes_Pref_id)} // Call the search function
                >
                  {String(profession.Profes_name)}
                </button>
              ))}

            {states &&
              states.map((state) => (
                <button
                  key={state.State_Pref_id}
                  className="pl-6 max-sm:p-2 "
                  // onClick={() => console.log(state.State_Pref_id)}
                  onClick={() => SearchProfiles(state.State_Pref_id)} // Call the search function
                >
                  {String(state.State_name)}
                </button>
              ))}

            {cities &&
              cities.map((city) => (
                <button
                  key={city.id}
                  className="pl-6 max-sm:p-2 "
                  // onClick={() => console.log(state.State_Pref_id)}
                  onClick={() => SearchProfiles(city.id)} // Call the search function
                >
                  {String(city.district)}
                </button>
              ))}
          </div>
        </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SearchProfiles;
