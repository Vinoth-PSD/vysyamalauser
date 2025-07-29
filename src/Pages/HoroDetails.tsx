/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import RasiGrid from "../Components/HoroDetails/RasiGrid";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AmsamGrid from "../Components/HoroDetails/AmsamGrid";
import apiClient from "../API";
import { ToastNotification, NotifyError, NotifySuccess } from "../Components/Toast/ToastNotification";
//import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";

// Define validation schema with zod
const schema = zod.object({
  // day: zod.string().min(1, "Day is required"),
  // month: zod.string().min(1, "Month is required"),
  // year: zod.string().min(1, "Year is required"),
  //timeOfBirth: zod.string().min(1, "Time of birth is required"),
  placeOfBirth: zod.string().min(3, "Place of birth is required"),
  birthStar: zod.string().min(1, "Birth star is required"),
  rasi: zod.string().min(1, "Rasi is required"),
  // lagnam: zod.string().min(1, "Lagnam is required"),
  //dosham: zod.string().min(1, "Dosham is required"),
  // naalikai: zod.string().min(1, "Naalikai is required"),
  // dasaName: zod.string().min(1, "Dasa name is required"),
  //dasaBalance: zod.string().min(1, "Dasa balance is required"),
  // horoscopeHints: zod.string().min(1, "Horoscope hints are required"),
});
// .refine(
//   (data) => {
//     const { day, month, year } = data;
//     const date = new Date(`${year}-${month}-${day}`);
//     return date instanceof Date && !isNaN(date.valueOf());
//   },
//   {
//     message: "Invalid date",
//     path: ["day", "month", "year"],
//   }
// );

interface HoroDetailsInputs {
  day: string;
  month: string;
  year: string;
  timeOfBirth: string;
  placeOfBirth: string;
  birthStar: string;
  rasi: string;
  lagnam: string;
  dosham: string;
  naalikai: string;
  dasaName: string;
  dasaBalance: string;
  horoscopeHints: string;
  chevvaiDhosam: string;
  sarpaDhosham: string;
  period: "AM" | "PM";
  hour: string;
  minute: string;
}

interface HoroDetailsProps { }

interface BirthStar {
  birth_id: number;
  birth_star: string;
}

interface Rasi {
  rasi_id: number;
  rasi_name: string;
}

interface Lagnam {
  didi_id: number;
  didi_description: string;
}

const HoroDetails: React.FC<HoroDetailsProps> = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<HoroDetailsInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
  });

  //const profileId = sessionStorage.getItem('profile_id_new');

  const [birthPlace, setBirthPlace] = useState("");
  const [birthStarId, setBirthStarId] = useState("");
  const [rasiId, setRasiId] = useState("");
  const [didi, setDidi] = useState("");
  const [nalikai, setNalikai] = useState("");
  const [horoHint, setHoroHint] = useState("");
  useEffect(() => {
    const fetchProfileData = async () => {
      const profileId =
        localStorage.getItem("profile_id_new") ||
        localStorage.getItem("loginuser_profile_id");
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 5,
          };

          const response = await apiClient.post(
            `/auth/Get_save_details/`,
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          //console.log("API Response:", response.data); // Log the entire API response

          const profileData = response.data.data; // Access the 'data' object directly

          //console.log("Profile Data:", profileData); // Log the profile data

          // //console.log("rasi:",profileData.rasi_kattam);
          // //console.log("amsam:",profileData.amsa_kattam);

          // sessionStorage.setItem("formattedDatarasi", profileData.rasi_kattam);
          // sessionStorage.setItem("formattedDatamsam", profileData.amsa_kattam);

          // Set other form values here after fetching data
          //setValue("timeOfBirth", profileData.time_of_birth);
          setBirthPlace(profileData.place_of_birth);
          setBirthStarId(profileData.birthstar_name);
          setRasiId(profileData.birth_rasi_name);
          setDidi(profileData.lagnam_didi);
          setValue("placeOfBirth", profileData.place_of_birth);
          setValue("birthStar", profileData.birthstar_name);
          setValue("rasi", profileData.birth_rasi_name);
          setValue("lagnam", profileData.lagnam_didi);
          setValue("chevvaiDhosam", profileData.chevvai_dosaham);
          setValue("sarpaDhosham", profileData.ragu_dosham);
          setValue("naalikai", profileData.nalikai);
          setValue("dasaName", profileData.dasa_name);
          setValue("horoscopeHints", profileData.horoscope_hints);
          setChevvaiDhosam(profileData.chevvai_dosaham);
          setSarpaDhosham(profileData.ragu_dosham);
          setSelectedDasa(profileData.dasa_name);
          setHoroHint(profileData.horoscope_hints);
          setNalikai(profileData.nalikai);
          // Parse and set dasa_balance values
          const dasaBalance1 = profileData.dasa_balance; // Assume this is the format you get: "day:3,month:2,year:4"
          const [dayPart, monthPart, yearPart] = dasaBalance1
          // .split(",")
          // .map((item: string) => item.split(":")[1]);
          const day = dayPart.split(':')[1].padStart(2, '0');
          const month = monthPart.split(':')[1].padStart(2, '0');
          const year = yearPart.split(':')[1];
          setValue("day", day);
          setValue("month", month);
          setValue("year", year);

          const timeOfBirth = profileData.time_of_birth;
          const [time, period] = timeOfBirth.split(" ");
          const [hours, minutes] = time.split(":");
          setValue("hour", hours);
          setValue("minute", minutes);
          setValue("period", period);
          sethour(hours);
          setminute(minutes);
          setperiod(period);

          // Update state for brother and sister data
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchProfileData();
  }, [setValue]);

  const [selectedDasa, setSelectedDasa] = useState<string>(""); // State to hold selected dasa
  const [hours, sethour] = useState("");
  const [minutes, setminute] = useState("");
  const [periods, setperiod] = useState("");
  const [dasa, getDasa] = useState<any>([]);
  const getDasaName = async () => {
    try {
      const response = await apiClient.post(
        "/auth/Get_Dasa_Name/"
      );
      //console.log("dasa:", response.data);

      // Assuming response.data.value is an array of dasa names
      const dasaValue = Array.isArray(response.data)
        ? response.data
        : Object.values(response.data); // If it's not an array, convert it

      getDasa(dasaValue);
    } catch (error) {
      console.error("Error in posting data:", error);
      throw error; // Re-throw the error for further handling
    }
  };
  useEffect(() => {
    getDasaName();
  }, []);
  const onSubmit: SubmitHandler<HoroDetailsInputs> = async () => {
    let storedData = "";
    let storedData1 = "";

    // Retrieve 'formattedData' from sessionStorage
    const storedDataString = sessionStorage.getItem("formattedData");
    if (storedDataString) {
      storedData = JSON.parse(storedDataString); // No need to parse as it's already a string
      //console.log("Retrieved formattedData from sessionStorage:", storedData);
    } else {
      //console.log("No formattedData found in sessionStorage");
    }

    // Retrieve 'formattedData1' from sessionStorage
    const storedDataString1 = sessionStorage.getItem("formattedData1");
    if (storedDataString1) {
      storedData1 = JSON.parse(storedDataString1); // No need to parse as it's already a string
      //console.log("Retrieved formattedData1 from sessionStorage:", storedData1);
    } else {
      //console.log("No formattedData1 found in sessionStorage");
    }

    // const hour = watch("hour");
    // const minute = watch("minute");
    // const period = watch("period");
    const combinedTime = `${hours}:${minutes} ${periods}`;
    combinedTime;

    try {
      // Format the data as expected by the backend
      const profileId = localStorage.getItem("profile_id_new");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }

      const formattedData = {
        profile_id: profileId,
        time_of_birth: combinedTime,
        place_of_birth: birthPlace,
        birthstar_name: birthStarId,
        birth_rasi_name: rasiId,
        lagnam_didi: didi,
        chevvai_dosaham: chevvaiDhosam,
        ragu_dosham: sarpaDhosham,
        nalikai: nalikai,
        dasa_name: selectedDasa,
        dasa_balance: dasaBalance,
        horoscope_hints: horoHint,
        rasi_kattam: storedData,
        amsa_kattam: storedData1,
      };
      sessionStorage.setItem('birth_rasi_name', rasiId);
      //console.log("Formatted Data:", formattedData);
      setIsSubmitting(true);
      const response = await apiClient.post(
        `/auth/Horoscope_registration/`,
        formattedData
      );
      setIsSubmitting(false);

      if (response.data.Status === 1) {
        NotifySuccess("Horoscope details saved successfully");

        setTimeout(() => {
          navigate("/PartnerSettings");
        }, 2000);
        sessionStorage.removeItem("formattedDatarasi");
        sessionStorage.removeItem("formattedDatamsam");
      } else {
        NotifyError("Failed to upload Horoscope details");
        // Handle error or show message to the user
        console.error("Error: Response status is not 1", response.data);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setIsSubmitting(false);
    }
  };

  const [birthStar, setBirthStar] = useState<BirthStar[]>([]);
  const [rasi, setRasiOptions] = useState<Rasi[]>([]);
  const [lagnam, setLagnamOptions] = useState<Lagnam[]>([]);
  const [chevvaiDhosam, setChevvaiDhosam] = useState("");
  const [sarpaDhosham, setSarpaDhosham] = useState("");
  const [dasaBalance, setDasaBalance] = useState<string>("");

  // const selectedStar = watch("birthStar");

  // sessionStorage.setItem("selectedstar", selectedStar);
  sessionStorage.setItem("selectedstar", birthStarId);
  localStorage.setItem("selectedstar", birthStarId);
  //console.log("selectedstar", birthStarId);

  sessionStorage.setItem("selectedRasi", rasiId);
  localStorage.setItem("selectedRasi", rasiId);

  //console.log("selectedRasi", rasiId);

  useEffect(() => {
    const fetchBirthStar = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Birth_Star/`, {
          state_id: " ",
        });
        const options = Object.values(response.data) as BirthStar[];
        setBirthStar(options);
      } catch (error) {
        console.error("Error fetching birth star options:", error);
      }
    };
    fetchBirthStar();
  }, []);

  useEffect(() => {
    if (birthStarId) {
      const fetchStateStatus = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_Rasi/`, {
            birth_id: birthStarId,
          });
          const options = Object.values(response.data) as Rasi[];
          setRasiOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [birthStarId]);

  useEffect(() => {
    const fetchLagnam = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Lagnam_Didi/`);
        const options = Object.values(response.data) as Lagnam[];
        setLagnamOptions(options);
      } catch (error) {
        console.error("Error fetching Laganam options:", error);
      }
    };
    fetchLagnam();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    if (id === "chevvaiDhosam") {
      setChevvaiDhosam(value);
    } else if (id === "sarpaDhosham") {
      setSarpaDhosham(value);
    }
  };
  // const buttonClass = (isSelected: boolean) => isSelected ? "bg-secondary text-white" : "border-gray hover:bg-secondary hover:text-white";

  // const handleDoshamChange = (value: string) => {
  //   setSelectedDosham(value);
  //   setValue("dosham", value, { shouldValidate: true });
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTimeChange = () => {
    const hour = hours;
    const minute = minutes;
    const period = periods;
    // const combinedTime = `${hour}:${minute} ${period}`;
    // setTime(combinedTime);
    let formattedHour = parseInt(hour, 10);
    if (period === "PM" && formattedHour < 12) {
      formattedHour += 12;
    } else if (period === "AM" && formattedHour === 12) {
      formattedHour = 0;
    }

    const formattedTime = `${formattedHour
      .toString()
      .padStart(2, "0")}:${minute}`;
    setValue("timeOfBirth", formattedTime);
  };
  useEffect(() => {
    if (hours && minutes && periods) {
      handleTimeChange();
    }
  }, [hours, minutes, periods]);
  const day = useWatch({ control, name: "day" });
  const month = useWatch({ control, name: "month" });
  const year = useWatch({ control, name: "year" });

  useEffect(() => {
    const balance = `${day}days, ${month}months, ${year}years`;
    setDasaBalance(balance);
    console.log(balance); // Optional: Log the balance for debugging
  }, [day, month, year]);

  // OnChange function for day
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("day", value); // Update the value in react-hook-form
    console.log(`Day: ${value}`);
  };

  // OnChange function for month
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("month", value); // Update the value in react-hook-form
    console.log(`Month: ${value}`);
  };

  // OnChange function for year
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("year", value); // Update the value in react-hook-form
    console.log(`Year: ${value}`);
  };

  useEffect(() => {
    console.log(`Day: ${day}, Months: ${month}, Year: ${year}`);
  }, [day, month, year]);

  const [rasiKey, setRasiKey] = useState(Date.now());
  const [amsamKey, setAmsamKey] = useState(Date.now());

  useEffect(() => {
    // Automatically update the key values when the component mounts
    setRasiKey(Date.now());
    setAmsamKey(Date.now());
  }, []);

  return (
    <div className="mt-24 max-lg:mt-20">
      <ContentBlackCard
        link="/EduDetails"
        heading={"Horoscope Details"}
        desc="Please enter your horoscope details to assist in finding a compatible match based on astrological preferences."
      />
      <div className="mx-auto w-[60%]  my-10  max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-full max-md:w-full max-md:my-5">

        <div className="container flex justify-between space-x-24  max-lg:flex-col max-lg:space-x-0 max-lg:gap-y-8 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <div className="w-full space-y-5">

              <div>
                <label htmlFor="timeOfBirth" className="block mb-1 text-primary font-medium ">
                  Time of Birth
                </label>
                <div className="flex items-center space-x-2">
                  <div className="relative w-full">
                    <select
                      value={hours}
                      // {...register("hour")}
                      onChange={(e) => sethour(e.target.value)}
                      className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    >
                      <option value="" disabled>Select hour</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                        <option key={hour} value={hour.toString().padStart(2, "0")}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    <IoMdArrowDropdown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={20}
                    />
                  </div>
                  <span>:</span>
                  <div className="relative w-full">
                    <select
                      value={minutes}
                      // {...register("minute")}
                      onChange={(e) => setminute(e.target.value)}
                      className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    >
                      <option value="" disabled>Select minute</option>
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <option
                          key={minute}
                          value={minute.toString().padStart(2, "0")}
                        >
                          {minute.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <IoMdArrowDropdown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={20}
                    />
                  </div>
                  <div className="relative w-full">
                    <select
                      value={periods}
                      // {...register("period")}
                      onChange={(e) => setperiod(e.target.value)}
                      className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    >
                      <option value="" disabled> AM or PM</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                    <IoMdArrowDropdown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>
                {/* {errors.timeOfBirth && (
              <span className="text-red-500">{errors.timeOfBirth.message}</span>
            )} */}
              </div>

              {/* <div>
            <InputField
              label={"Place of Birth"}
              value={birthPlace}
             // onChange={(e) => setBirthPlace(e.target.value)}
              {...register("placeOfBirth", {
                setValueAs: (value) => value.trim(),
              })}
              required
            />
            {errors.placeOfBirth && (
              <span className="text-red-500">
                {errors.placeOfBirth.message}
              </span>
            )}
          </div> */}

              <div>
                <InputField
                  label={"Place of Birth"}
                  {...register("placeOfBirth", {
                    setValueAs: (value) => value.trim(),
                    required: "Place of Birth is required", // Example validation message
                  })}
                  onChange={(e) => {
                    setBirthPlace(e.target.value); // Update state explicitly
                    setValue("placeOfBirth", e.target.value); // Update form value explicitly
                  }}
                  required
                />
                {errors.placeOfBirth && (
                  <span className="text-red-500">
                    {errors.placeOfBirth.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="birthStar" className="block mb-1 text-primary font-medium ">
                  Birth Star <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="birthStar"
                    value={birthStarId}
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("birthStar")}

                    onChange={(e) => setBirthStarId(e.target.value)}

                  >
                    <option value="" selected disabled>
                      Select your Birth Star
                    </option>
                    {birthStar.map((option) => (
                      <option key={option.birth_id} value={option.birth_id}>
                        {option.birth_star}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.birthStar && (
                  <span className="text-red-500">{errors.birthStar.message}</span>
                )}
              </div>

              <div>
                <label htmlFor="rasi" className="block mb-1 text-primary font-medium ">
                  Rasi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={rasiId}
                    id="rasi"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("rasi")}
                    onChange={(e) => setRasiId(e.target.value)}
                    required
                  >
                    <option value="" selected disabled>
                      Select your Rasi
                    </option>
                    {rasi.map((option) => (
                      <option key={option.rasi_id} value={option.rasi_id}>
                        {option.rasi_name}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.rasi && (
                  <span className="text-red-500">{errors.rasi.message}</span>
                )}
              </div>

              <div>
                <label htmlFor="lagnam" className="block mb-1 text-primary font-medium ">
                  lagnam / Didi
                </label>
                <div className="relative">
                  <select
                    value={didi}
                    id="lagnam"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    // {...register("lagnam")}
                    onChange={(e) => setDidi(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select your lagnam / Didi
                    </option>
                    {lagnam.map((option) => (
                      <option key={option.didi_id} value={option.didi_id}>
                        {option.didi_description}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {/* {errors.lagnam && (
              <span className="text-red-500">{errors.lagnam.message}</span>
            )} */}
              </div>

              <div>
                <label htmlFor="lagnam" className="block mb-1 text-primary font-medium">
                  Didi
                </label>
                <input
                  type="text"
                  id="lagnam"
                  //value={didi}
                  //onChange={(e) => setDidi(e.target.value)}
                  className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
                  placeholder="Enter your Didi"
                />
                {/* {errors.lagnam && (
    <span className="text-red-500">{errors.lagnam.message}</span>
  )} */}
              </div>

              {/* <div className="mt-3">
            <h1 className="mb-3">Dosham</h1>

            <div className="w-full inline-flex rounded">
              {["1", "2", "3", "4", "5+"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`w-full px-5 py-3 text-sm font-medium border ${buttonClass(selectedDosham === type)}`}
                  onClick={() => handleDoshamChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.dosham && (
              <span className="text-red-500">{errors.dosham.message}</span>
            )}
          </div> */}

              <div>
                <label htmlFor="chevvaiDhosam" className="block mb-1 text-primary font-medium ">
                  Chevvai Dhosam
                </label>
                <div className="relative">
                  <select
                    id="chevvaiDhosam"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("chevvaiDhosam")}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Select Chevvai Dhosam
                    </option>
                    {["UnKnown", "Yes", "No"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.chevvaiDhosam && (
                  <span className="text-red-500">
                    {errors.chevvaiDhosam.message}
                  </span>
                )}


              </div>
              <div>
                <label htmlFor="sarpaDhosham" className="block mb-1 text-primary font-medium ">
                  Sarpa dasa/ragu,kethu dhosam
                </label>
                <div className="relative">
                  <select
                    id="sarpaDhosham"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("sarpaDhosham")}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled>
                      Select Sarpa Dhosham
                    </option>
                    {["UnKnown", "Yes", "No"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.sarpaDhosham && (
                  <span className="text-red-500">
                    {errors.sarpaDhosham.message}
                  </span>
                )}

                {/* Display the selected values for debugging purposes */}
                <div>
                  {/* <p>Selected Chevvai Dhosam: {chevvaiDhosam}</p>
        <p>Selected Sarpa Dhosham: {sarpaDhosham}</p> */}
                </div>
              </div>

              <div>
                <InputField
                  label={"Naalikai"}
                  value={nalikai}
                  onChange={(e) => setNalikai(e.target.value)}
                // {...register("naalikai", { setValueAs: (value) => value.trim() })}
                />
                {/* {errors.naalikai && (
              <span className="text-red-500">{errors.naalikai.message}</span>
            )} */}
              </div>

              <div>
                <label htmlFor="dasaDropdown" className="block mb-1 text-primary font-medium ">
                  Dasa Name
                </label>
                <div className="relative">
                  <select
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    id="dasaDropdown"
                    value={selectedDasa}
                    onChange={(e) => setSelectedDasa(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Select Dasa Name
                    </option>

                    {dasa.map((dasa: any, index: any) => (
                      <option key={index} value={dasa.dasa_description}>
                        {dasa.dasa_description}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block mb-1 text-primary font-medium ">
                  Dasa Balance
                </label>
                <div className="flex space-x-2">
                  <div className=" w-full">
                    <div className="relative">
                      <select
                        id="day"
                        className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                        {...register("day")}
                        onChange={handleDayChange}
                      >
                        <option value="" disabled>
                          Day
                        </option>
                        <option value="00">00</option>
                        {Array.from({ length: 31 }, (_, i) => {
                          const day = (i + 1).toString().padStart(2, '0');
                          return (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          );
                        })}
                      </select>
                      <IoMdArrowDropdown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                      />
                    </div>
                    {errors.day && (
                      <span className="text-red-500">{errors.day.message}</span>
                    )}
                  </div>
                  <div className="w-full ">
                    <div className="relative">
                      <select
                        id="month"
                        className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                        {...register("month")}
                        onChange={handleMonthChange}
                      >
                        <option value="" disabled>
                          Month
                        </option>
                        <option value="00">00</option>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, '0');
                          return (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          );
                        })}
                      </select>
                      <IoMdArrowDropdown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                      />
                    </div>
                    {errors.month && (
                      <span className="text-red-500">{errors.month.message}</span>
                    )}
                  </div>
                  <div className="w-full">
                    <div className="relative">
                      <select
                        id="year"
                        className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                        {...register("year")}
                        onChange={handleYearChange}
                      >
                        <option value="" disabled>
                          Year
                        </option>
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <IoMdArrowDropdown
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={20}
                      />
                    </div>
                    {errors.year && (
                      <span className="text-red-500">{errors.year.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <InputField
                label={"Horoscope Hints"}
                value={horoHint}
                onChange={(e) => setHoroHint(e.target.value)}
              />
            </div>

            {/* RasiGrid */}
            <DndProvider backend={HTML5Backend}>
              <RasiGrid key={rasiKey} centerLabel={"Rasi"} rasiTemp={undefined} />
            </DndProvider>

            <DndProvider backend={HTML5Backend}>
              <AmsamGrid key={amsamKey} centerLabel={"Amsam"} rasiTemp={undefined} />
            </DndProvider>

            <div className="mt-7 flex justify-end">
              {/* <div className="">
                <Link to={"/EduDetails"}>
                  <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2 max-sm:px-8">
                    Back
                  </button>
                </Link>
              </div> */}

              <div className="flex space-x-4">
                {/* <button className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2" >
                Skip
              </button> */}
                <Link to={"/PartnerSettings"}>
                  <button className="py-[10px] px-14 bg-white text-main font-semibold rounded-[6px] mt-2  max-sm:hidden">
                    Skip
                  </button>
                </Link>

                <button
                  type="submit"
                  className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] shadow-redboxshadow mt-2 max-sm:px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Next"}
                  <span>
                    <img src={arrow} alt="next arrow" className="ml-2" />
                  </span>
                </button>
              </div>
            </div>
          </form>
          <SideContent />
        </div>
      </div>
      <ToastNotification />
    </div>
  );
};

export default HoroDetails;
