/* eslint-disable @typescript-eslint/no-explicit-any */
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import apiClient from "../API";
import { ToastNotification, NotifyError, NotifySuccess, } from "../Components/Toast/ToastNotification";
//import axios from "axios";
import currencyCodes from "currency-codes";
import currencySymbolMap from "currency-symbol-map";
import Select from "react-select";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

// Define validation schema with zod
const schema = zod.object({
  highestEducationLevel: zod.string().min(1, "Highest education level is required"),
  field_ofstudy: zod.string().optional(),
  ugDegree: zod.string().optional(),
  aboutYourEducation: zod.string().optional(),
  company_name: zod.string().optional(),
  designation: zod.string().optional(),
  profession_details: zod.string().optional(),
  business_name: zod.string().optional(),
  business_address: zod.string().optional(),
  nature_of_business: zod.string().optional(),
  currency: zod.string().optional(),
  profession: zod.string().min(1, "Profession is required"),
  annualIncome: zod.string().optional(),
  annualIncome_max: zod.string().optional(),
  actualIncome: zod.string().optional(),
  country: zod.string().optional(),
  pincode: zod.string().optional(),
  careerPlans: zod.string().optional(),
  OtherDegree: zod.string().optional(),
  WorkOtherCity: zod.string().optional(),
});

interface EduDetailsInputs {
  highestEducationLevel: string;
  ugDegree?: string;
  aboutYourEducation: string;
  profession: string;
  annualIncome: string;
  annualIncome_max: string;
  actualIncome: string;
  country: string;
  state: string;
  company_name: string;
  designation: string;
  profession_details: string;
  business_name: string;
  business_address: string;
  nature_of_business: string;
  currency: string;
  pincode: string;
  careerPlans: string;
  workCity: string;
  Workplace: string;
  selectedDistrict: string;
  field_ofstudy?: string;
  degree?: string;
  other_degree: string;
  work_district: string;
  work_city: string;
  WorkOtherCity: string;
}
interface EduDetailsProps { }
interface HighesEducation {
  education_id: number;
  education_description: string;
}
interface AnnualIncome {
  income_id: number;
  income_description: string;
}
interface CountryOption {
  country_id: number;
  country_name: string;
}
interface StateOption {
  state_id: number;
  state_name: string;
}
interface ProfessionOption {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface FieldofStudy {
  study_description: string;
  study_id: number;
}

interface DegreeOption {
  degeree_id: number;
  degeree_description: string;
}

const EduDetails: React.FC<EduDetailsProps> = () => {
  // Navigate to next page
  const navigate = useNavigate();
  // React Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
    trigger,
  } = useForm<EduDetailsInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      currency: "INR", // Set default currency to INR
    },
  });
  const [, setSelectedProfession] = useState<string | null>(null);
  const [highestEdu, setHighestEdu] = useState<HighesEducation[]>([]);
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [workPlace, setWorkPlace] = useState<string>("");
  const [workCity, setWorkCity] = useState<string>("");
  const [workCityList, setWorkCityList] = useState<any>([]);
  const [state, setState] = useState<string>("");
  const professionRef = useRef<HTMLDivElement>(null);
  const [district, getDistrict] = useState<any>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [professionOptions, setProfessionOptions] = useState<ProfessionOption[]>([]);
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldofStudy[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<DegreeOption[]>([]);
  const [eduLevel, setEduLevel] = useState(""); // Example initial value
  const [fieldOfStudy, setFieldOfStudy] = useState(""); // Example initial value
  const [selectedProfessionId, setSelectedProfessionId] = React.useState<number>(0); // Default to 0
  const currencyOptions = currencyCodes.codes();
  const [, setSelectedDegree] = useState("");
  const [customDegree, setCustomDegree] = useState("");
  const [districtValue, setDistrictValue] = useState(""); // Add state for the district value
  const [customWorkCity, setCustomWorkCity] = useState("");
  const [selectedDegrees, setSelectedDegrees] = useState<number[]>([]);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);

  const handleEduLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    // Clear all degree-related fields
    setSelectedDegrees([]);
    setCustomDegree("");
    setValue("degree", "");
    setValue("other_degree", "");

    // Reset field of study
    setFieldOfStudy("");
    setSelectedFieldOfStudy("");
    setValue("field_ofstudy", "");

    // Update education level
    setEduLevel(newValue);
  };

  const handleProfessionChange = (id: number, name: string) => {
    setSelectedProfession(name);
    setSelectedProfessionId(id);
    setValue("profession", name, { shouldValidate: true });
    trigger("profession"); // Trigger validation manually if needed
  };
  //console.log("rrrrrrrr", selectedProfessionId);

  useEffect(() => {
    const fetchProfessionData = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Profes_Pref/"
        );
        setProfessionOptions(Object.values(response.data));
        //console.log("profession", response.data);
      } catch (error) {
        console.error("Error fetching profession options:", error);
      }
    };
    fetchProfessionData();
  }, []);
  console.log(state, "state");
  const fetchDistrict = async () => {
    try {
      const response = await apiClient.post(
        "/auth/Get_District/",
        {
          state_id: state,
        }
      );

      getDistrict(Object.values(response.data));
    } catch (error) {
      console.error("distric:", error);
    }
  };

  useEffect(() => {
    if (state) {
      fetchDistrict();
    }
  }, [state]);

  useState(() => { });
  const fetchCities = async () => {
    try {
      const response = await apiClient.post(
        "/auth/Get_City/",
        {
          district_id: selectedDistrict,
        }
      );
      console.log(response.data, "work");
      setWorkCityList(Object.values(response.data));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (selectedDistrict) {
      fetchCities();
    }
  }, [selectedDistrict]);
  console.log(workCityList, "district");

  useEffect(() => {
    // Function to handle scrolling and focusing
    const handleFocus = (ref: React.RefObject<HTMLDivElement>, error: any) => {
      if (error && ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        const firstButton = ref.current.querySelector("button");
        if (firstButton) {
          firstButton.focus();
        }
      }
    };

    // Handle focus for each error condition
    handleFocus(professionRef, errors.profession);
  }, [errors.profession]);

  // const handleFieldOfStudyChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const selectedValue = e.target.value;
  //   setFieldOfStudy(selectedValue); // Update state
  //   setSelectedFieldOfStudy(selectedValue); // Sync with selectedFieldOfStudy
  //   setValue("field_ofstudy", selectedValue); // Update form value
  // };

  const handleFieldOfStudyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = e.target.value;

    // Reset degree selections when field of study changes
    setSelectedDegrees([]);
    setCustomDegree("");
    setValue("degree", "");
    setValue("other_degree", "");

    // Update field of study
    setFieldOfStudy(selectedValue);
    setSelectedFieldOfStudy(selectedValue);
    setValue("field_ofstudy", selectedValue);
  };

  const profileId = localStorage.getItem("profile_id_new");
  // Existing states...
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<string>(""); // New state

  // Fetch and Set Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (profileId) {
        try {
          const requestData = { profile_id: profileId, page_id: 4 };
          const response = await apiClient.post(
            "/auth/Get_save_details/",
            requestData
          );
          const profileData = response.data.data;
          console.log(profileData);
          // Set form values here
          setValue("highestEducationLevel", profileData.highest_education);
          setEduLevel(profileData.highest_education); // if you use eduLevel state for conditional rendering
          setValue("ugDegree", profileData.ug_degeree);
          setValue("aboutYourEducation", profileData.about_edu);
          setValue("currency", profileData.currency);
          setValue("annualIncome", profileData.anual_income);
          setValue("annualIncome_max", profileData.annualIncome_max);
          setValue("actualIncome", profileData.actual_income);
          setValue("country", profileData.work_country);
          setValue("state", profileData.work_state);
          setValue("pincode", profileData.work_pincode);
          setValue("careerPlans", profileData.career_plans);
          setValue("WorkOtherCity", profileData.work_other_city);
          setValue("company_name", profileData.company_name);
          setValue("designation", profileData.designation);
          setValue("profession_details", profileData.profession_details);
          setValue("business_name", profileData.business_name);
          setValue("business_address", profileData.business_address);
          setValue("nature_of_business", profileData.nature_of_business);
          //setValue("Workplace", profileData.work_place);
          // Set degree field
          if (profileData.degree) {
            const degreeIds = profileData.degree
              .split(",")
              .map((id: string) => parseInt(id, 10));
            setSelectedDegrees(degreeIds); // IDs for multi-select
            setCustomDegree(profileData.other_degree || ""); // Custom degree value
          }
          // Set Field of Study
          if (profileData.field_ofstudy) {
            setValue("field_ofstudy", profileData.field_ofstudy);
            setFieldOfStudy(profileData.field_ofstudy); // Update state
            setSelectedFieldOfStudy(profileData.field_ofstudy); // Sync field_ofstudy
          }
          // Find the selected profession by ID after professionOptions loads
          const selectedProfessionOption = professionOptions.find(
            (option) => option.Profes_Pref_id === Number(profileData.profession)
          );
          if (selectedProfessionOption) {
            setSelectedProfession(selectedProfessionOption.Profes_name);
            setSelectedProfessionId(selectedProfessionOption.Profes_Pref_id);
            setValue("profession", selectedProfessionOption.Profes_name, {
              shouldValidate: true,
            }); // Update form state          } else {
            //console.log("Profession not found in options");
          }
          setWorkCity(profileData.work_city);
          setState(profileData.work_state);
          // Set district by ID
          if (profileData.work_district) {
            setSelectedDistrict(profileData.work_district);
            setValue("work_district", profileData.work_district);
          }
          // Set work city
          if (profileData.work_city) {
            setWorkCity(profileData.work_city);
            setValue("work_city", profileData.work_city);
          }
          // In your existing fetchProfileData useEffect
          if (profileData.work_place) {
            setWorkPlace(profileData.work_place);
            setValue("Workplace", profileData.work_place);
          }

          // Inside fetchProfileData function
          if (profileData.currency) {
            setValue("currency", profileData.currency);
          } else {
            setValue("currency", "INR"); // Fallback to INR if no value exists
          }

        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };
    fetchProfileData();
  }, [profileId, setValue, professionOptions]); // Add professionOptions dependency

  // useEffect(() => {
  //   // Clear all profession-related fields when profession changes
  //   setValue("company_name", "");
  //   setValue("designation", "");
  //   setValue("profession_details", "");
  //   setValue("business_name", "");
  //   setValue("business_address", "");
  //   setValue("nature_of_business", "");
  // }, [selectedProfessionId, setValue]);

  // Reset fields when profession changes
  useEffect(() => {
    if (selectedProfessionId !== 1 && selectedProfessionId !== 7 && selectedProfessionId !== 6) {
      setValue("company_name", "");
      setValue("designation", "");
      setValue("profession_details", "");
    }

    if (selectedProfessionId !== 2 && selectedProfessionId !== 6) {
      setValue("business_name", "");
      setValue("business_address", "");
      setValue("nature_of_business", "");
    }

  }, [selectedProfessionId, setValue]);

  useEffect(() => {
    const fetchHighestEdu = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Highest_Education/`);
        const options = Object.values(response.data) as HighesEducation[];
        setHighestEdu(options);
      } catch (error) {
        console.error("Error fetching Highest Education options:", error);
      }
    };
    fetchHighestEdu();
  }, []);

  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Field_ofstudy/`);
        const options = Object.values(response.data) as FieldofStudy[];
        setFieldOfStudyOptions(options);
      } catch (error) {
        console.error("Error fetching Field of Study options:", error);
      }
    };

    fetchFieldOfStudy();
  }, []);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Degree_list/`, {
          edu_level: eduLevel,
          field_of_study: fieldOfStudy,
        });
        const options = Object.values(response.data) as DegreeOption[];
        setDegreeOptions(options);
      } catch (error) {
        console.error("Error fetching Degree options:", error);
      }
    };

    if (eduLevel && fieldOfStudy) {
      fetchDegrees(); // Only fetch if both parameters are available
    }
  }, [eduLevel, fieldOfStudy]); // Dependencies for re-fetching

  const handleDegreeChangeMultiSelect = (selectedOptions: any) => {
    const degreeIds = selectedOptions
      .filter((option: any) => option.value !== "86")
      .map((option: any) => option.value);

    setSelectedDegrees(degreeIds);
    setValue("degree", degreeIds.join(",")); // Update form value for degrees
    const isSpecificFieldSelected = selectedOptions.some(
      (option: any) => option.value === "86"
    );
    setSelectedDegree(isSpecificFieldSelected ? "86" : ""); // Set "others" if selected
  };
  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Annual_Income/`);
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error("Error fetching Annual Income  options:", error);
      }
    };
    fetchAnnualIncome();
  }, []);


  useEffect(() => {
    const fetchCountryStatus = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Country/`);
        const options = Object.values(response.data) as CountryOption[];
        setCountryOptions(options);
      } catch (error) {
        console.error("Error fetching country options:", error);
      }
    };
    fetchCountryStatus();
  }, []);

  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      const fetchStateStatus = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_State/`, {
            country_id: selectedCountry,
          });
          const options = Object.values(response.data) as StateOption[];
          setStateOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [selectedCountry]);

  // Background getting selected
  const buttonClass = (isSelected: boolean) =>
    // isSelected ? "bg-blue-500 text-white" : "bg-white text-black";
    isSelected
      ? "bg-secondary text-white"
      : "border-gray hover:bg-secondary hover:text-white";

  const onSubmit: SubmitHandler<EduDetailsInputs> = async (data) => {
    try {
      // Format the data as expected by the backend
      const profileId =
        localStorage.getItem("profile_id_new") ||
        localStorage.getItem("loginuser_profile_id");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }

      const degreePayload = selectedDegrees.join(","); // Only include selected degrees without '86'
      const finalOtherDegree = selectedDegrees.includes(86) ? customDegree : "";

      const formattedData = {
        profile_id: profileId,
        highest_education: data.highestEducationLevel,
        ug_degeree: data.ugDegree,
        about_edu: data.aboutYourEducation,
        profession: selectedProfessionId, // Optional: you can send the profession name
        anual_income: data.annualIncome,
        annualIncome_max: data.annualIncome_max,
        company_name: (selectedProfessionId === 1 || selectedProfessionId === 7 || selectedProfessionId === 6) ? data.company_name : "",
        designation: (selectedProfessionId === 1 || selectedProfessionId === 7 || selectedProfessionId === 6) ? data.designation : "",
        profession_details: (selectedProfessionId === 1 || selectedProfessionId === 7 || selectedProfessionId === 6) ? data.profession_details : "",
        business_name: (selectedProfessionId === 2 || selectedProfessionId === 6) ? data.business_name : "",
        business_address: (selectedProfessionId === 2 || selectedProfessionId === 6) ? data.business_address : "",
        nature_of_business: (selectedProfessionId === 2 || selectedProfessionId === 6) ? data.nature_of_business : "",
        currency: data.currency,
        actual_income: data.actualIncome,
        work_pincode: data.pincode,
        career_plans: data.careerPlans,
        status: "1",
        work_country: data.country,
        work_city: data.country === "1" ? workCity.trim() : "",
        work_district: data.country === "1" ? selectedDistrict : "",
        work_state: data.country === "1" ? state.trim() : "",
        work_place: data.country !== "1" ? workPlace.trim() : "",
        field_ofstudy: fieldOfStudy, // Pass the selected field_ofstudy ID here
        degree: degreePayload, // Combined degrees and custom degree
        other_degree: finalOtherDegree, // use customDegree instead of data.other_degree
        work_other_city: data.WorkOtherCity,
      };

      //console.log("EducationDetails:", formattedData);
      setIsSubmitting(true);
      const response = await apiClient.post(
        `/auth/Education_registration/`,
        formattedData
      );
      setIsSubmitting(false);

      if (response.data.Status === 1) {
        NotifySuccess("Education details saved successfully");

        setTimeout(() => {
          navigate("/HoroDetails");
        }, 2000);
      } else {
        // Handle error or show message to the user
        console.error("Error: Response status is not 1", response.data);
      }
    } catch (error) {
      NotifyError("Failed to upload Education Details");
      console.error("Error submitting form data:", error);
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (!selectedDegrees.includes(86)) {
      setCustomDegree(""); // Clear custom degree when "Others" is deselected
    }
  }, [selectedDegrees]);
  useEffect(() => {
    if (selectedCountry === "1" && !state) {
      setError("state", {
        type: "manual",
        message: "State is required",
      });
    }
    if (selectedCountry === "1" && !workCity) {
      setError("workCity", {
        type: "manual",
        message: "work city is required",
      });
    }
    if (selectedCountry === "1" && !selectedDistrict) {
      setError("selectedDistrict", {
        type: "manual",
        message: "District is required",
      });
    }
    if (selectedCountry === "1" && state) {
      clearErrors("state");
    }
    if (selectedCountry === "1" && selectedDistrict) {
      clearErrors("selectedDistrict");
    }
    if (selectedCountry === "1" && workCity) {
      clearErrors("workCity");
    }
  }, [selectedCountry, selectedDistrict, workCity, state]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const careerPlansValue = watch("careerPlans", "");
  const handleKeyDownTextArea = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    value: any
  ) => {
    // Prevent space if input is empty
    if (e.key === " " && value.trim() === "") {
      e.preventDefault();
    }
  };

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    // Allow Backspace, Tab, Arrow keys (left, right), Delete, and numbers (0-9)
    if (
      event.key === "Backspace" ||
      event.key === "Tab" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "Delete" ||
      /^[0-9]$/.test(event.key) // Only allow numbers 0-9
    ) {
      return; // Allow the key event
    }
    // Prevent all other keys
    event.preventDefault();
  };
  // const preferredCurrencies = [ "INR","USD", "EUR"]; // Add your preferred currencies here
  const preferredCurrencies = [
    "INR", // Indian Rupee - India
    "MYR", // Malaysian Ringgit - Malaysia
    "SGD", // Singapore Dollar - Singapore
    "GBP", // British Pound Sterling - United Kingdom
    "USD", // US Dollar - United States of America
    "AED", // United Arab Emirates Dirham - UAE
  ];

  const otherCurrencies = currencyOptions.filter(
    (code) => !preferredCurrencies.includes(code)
  );
  const sortedCurrencyOptions = [...preferredCurrencies, ...otherCurrencies]; // Combine preferred and other currencies

  return (
    <div className="mt-24 max-lg:mt-20">
      <ContentBlackCard
        link="/FamilyDetails"
        heading={"Education Details"}
        desc="Please share your educational background to help potential matches understand your values and aspirations better."
      />
      <div className="mx-auto w-[60%]  my-10  max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-full max-md:w-full max-md:my-5">
        <div className="container flex justify-between space-x-24  max-lg:flex-col max-lg:space-x-0 max-lg:gap-y-8 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4  max-sm:gap-x-0 "
          >
            <div className="w-full space-y-5">
              <div>
                <label
                  htmlFor="HighestEducationLevel"
                  className="block mb-2 text-base text-primary font-medium "
                >
                  Highest Education Level <span className="text-main">*</span>
                </label>
                <div className="relative">
                  <select
                    id="HighestEducationLevel"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("highestEducationLevel")}
                    onChange={handleEduLevelChange}
                  >
                    <option value="" selected>
                      Select your Highest Education Level
                    </option>
                    {highestEdu.map((option) => (
                      <option
                        key={option.education_id}
                        value={option.education_id}
                      >
                        {option.education_description}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.highestEducationLevel && (
                  <span className="text-red-500">
                    {errors.highestEducationLevel.message}
                  </span>
                )}
              </div>

              {/* Conditionally render Field of Study and Degree dropdowns based on eduLevel */}
              {(eduLevel === "1" ||
                eduLevel === "2" ||
                eduLevel === "3" ||
                eduLevel === "4") && (
                  <>
                    <div>
                      <label
                        htmlFor="fieldOfStudy"
                        className="block mb-2 text-base text-primary font-medium"
                      >
                        Field of Study
                      </label>
                      <div className="relative">
                        <select
                          id="fieldOfStudy"
                          className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded appearance-none"
                          value={selectedFieldOfStudy || ""}
                          onChange={handleFieldOfStudyChange}
                        >
                          <option value="" disabled>
                            Select your Field of Study
                          </option>
                          {fieldOfStudyOptions.map((option) => (
                            <option key={option.study_id} value={option.study_id}>
                              {option.study_description}
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
                      <label
                        htmlFor="degree"
                        className="block mb-2 text-base text-primary font-medium"
                      >
                        Specific Field
                      </label>
                      {degreeOptions.length > 0 ? (
                        <Select
                          isMulti
                          value={selectedDegrees.map((id) => ({
                            value: id,
                            label:
                              degreeOptions.find(
                                (option) => option.degeree_id == id
                              )?.degeree_description || id,
                          }))}
                          options={[
                            ...degreeOptions.map((option) => ({
                              value: option.degeree_id,
                              label: option.degeree_description,
                            })),
                          ]}
                          onChange={handleDegreeChangeMultiSelect}
                        />
                      ) : (
                        <input
                          type="text"
                          className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                          placeholder="Enter your degree"
                          value={customDegree}
                          onChange={(e) => setCustomDegree(e.target.value)}
                        />
                      )}
                      {selectedDegrees.includes(86) && (
                        <div className="mt-4">
                          <label
                            htmlFor="othereducation"
                            className="block mb-2 text-base text-primary font-medium"
                          >
                            Other Education
                          </label>
                          <input
                            type="text"
                            id="customDegree"
                            className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                            placeholder="Enter Specific field"
                            value={customDegree}
                            {...register("other_degree")}
                            onChange={(e) => {
                              setCustomDegree(e.target.value);
                              setValue("other_degree", e.target.value);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>

            <div>
              <InputField
                label={"About your Education"}
                {...register("aboutYourEducation", {
                  setValueAs: (value) => value.trim(),
                })}
              />
              {errors.aboutYourEducation && (
                <span className="text-red-500">
                  {errors.aboutYourEducation.message}
                </span>
              )}
            </div>

            <div className="mt-3">
              <h1 className="mb-3 text-primary">
                Profession <span className="text-main">*</span>
              </h1>
              <div
                ref={professionRef}
                className="w-full flex rounded max-sm:flex-col"
              >
                {professionOptions.map((option) => (
                  <button
                    key={option.Profes_Pref_id}
                    type="button"
                    className={`w-full px-5 py-3 text-sm text-primary font-medium border ${buttonClass(
                      selectedProfessionId === option.Profes_Pref_id // Check by ID
                    )}`}
                    onClick={() =>
                      handleProfessionChange(
                        option.Profes_Pref_id,
                        option.Profes_name
                      )
                    }
                    {...register("profession")}
                  >
                    {option.Profes_name}
                  </button>
                ))}
              </div>
              {errors.profession && (
                <span className="text-red-500">
                  {errors.profession.message}
                </span>
              )}

              {selectedProfessionId === 1 && (
                <div className="mt-4">
                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register("company_name")}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter company name"
                    />
                    {errors.company_name && (
                      <p className="text-red-500 text-sm">
                        {errors.company_name.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="designation"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Designation
                    </label>
                    <input
                      id="designation"
                      type="text"
                      {...register("designation", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter designation"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="professionDetail"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Profession Details
                    </label>
                    <textarea
                      id="professionDetail"
                      {...register("profession_details", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter profession details"
                    />
                  </div>
                </div>
              )}

              {selectedProfessionId === 2 && (
                <div className="mt-4">
                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Business Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register("company_name", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="designation"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Business Address
                    </label>
                    <input
                      id="designation"
                      type="text"
                      {...register("designation", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter designation"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="professionDetail"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Nature of Buisness
                    </label>
                    <textarea
                      id="professionDetail"
                      {...register("nature_of_business", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter  Nature of Buisness"
                    />
                  </div>
                </div>
              )}

              {selectedProfessionId === 6 && (
                <div className="mt-4">
                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register("company_name", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="designation"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Designation
                    </label>
                    <input
                      id="designation"
                      type="text"
                      {...register("designation", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter designation"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="professionDetail"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Profession Details
                    </label>
                    <textarea
                      id="professionDetail"
                      {...register("profession_details", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter profession details"
                    />
                  </div>
                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Business Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register("business_name", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="designation"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Business Address
                    </label>
                    <input
                      id="designation"
                      type="text"
                      {...register("business_address", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter designation"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="professionDetail"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Nature of Buisness
                    </label>
                    <textarea
                      id="professionDetail"
                      {...register("nature_of_business", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter  Nature of Buisness"
                    />
                  </div>
                </div>
              )}

              {selectedProfessionId === 7 && (
                <div className="mt-4">
                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="companyName"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      {...register("company_name", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="designation"
                      className="block mb-2 text-base text-primary font-medium"
                    >
                      Designation
                    </label>
                    <input
                      id="designation"
                      type="text"
                      {...register("designation", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter designation"
                    />
                  </div>

                  <div className="mb-3 text-primary">
                    <label
                      htmlFor="professionDetail"
                      className="block mb-2 text-base text-primary font-medium"
                    //style={{ color: "#1A73E8" }} // Replace with the exact color if different
                    >
                      Profession Detail
                    </label>
                    <textarea
                      id="professionDetail"
                      {...register("profession_details", {
                        setValueAs: (value) => value.trim(),
                      })}
                      className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                      placeholder="Enter profession details"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* Annual Income Dropdown */}
              <label
                htmlFor="annualIncome"
                className="block mb-2 text-base text-primary font-medium"
              >
                Annual Income
              </label>
              <div className="flex items-center space-x-2 w-full">
                <span className="outline-none w-1/25 text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded">
                  INR(₹)
                </span>
                <div className="relative w-full">
                  <select
                    id="annualIncome"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("annualIncome")}
                  >
                    <option value="" disabled selected>
                      Select your Annual Income
                    </option>
                    {annualIncome.map((option) => (
                      <option key={option.income_id} value={option.income_id}>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>
                {errors.annualIncome && (
                  <span className="text-red-500">
                    {errors.annualIncome.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="actualIncome"
                className="block mb-2 text-base text-primary font-medium"
              >
                Actual Income
              </label>
              <div className="flex items-center gap-2 w-full">
                <div className="relative">
                  <select
                    id="currency"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    style={{ width: "300px" }} // Adjust the width as needed
                    defaultValue="INR"
                    {...register("currency")}
                  >
                    <option value="" disabled>
                      Select Currency
                    </option>
                    {sortedCurrencyOptions.map((code) => (
                      <option key={code} value={code}>
                        {code} ({currencySymbolMap(code) || code})
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={20}
                  />
                </div>

                <input
                  className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                  {...register("actualIncome", {
                    setValueAs: (value) => value.trim(),
                  })}
                />
                {errors.actualIncome && (
                  <span className="text-red-500">
                    {errors.actualIncome.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-12 max-md:mt-6">
              <h1 className="font-bold text-xl text-primary mb-3">
                Work Location
              </h1>

              <div className="w-full space-y-5 mb-5">
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-base text-primary font-medium "
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("country")}
                  >
                    <option value="" selected disabled>
                      Select your Country
                    </option>
                    {countryOptions.map((option) => (
                      <option key={option.country_id} value={option.country_id}>
                        {option.country_name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCountry === "1" ? (
                  <>
                    <div>
                      <label
                        htmlFor="state"
                        className="block mb-2 text-base text-primary font-medium"
                      >
                        State
                      </label>
                      <div className="relative">
                        <select
                          id="state"
                          value={state}
                          className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                          // onChange={(e) => setState(e.target.value)}
                          onChange={(e) => {
                            setState(e.target.value);
                            setSelectedDistrict(""); // Reset district when state changes
                            setWorkCity(""); // Reset city when state changes
                          }}
                        >
                          <option value="" selected disabled>
                            Select State
                          </option>
                          {stateOptions.map((option) => (
                            <option
                              key={option.state_id}
                              value={option.state_id}
                            >
                              {option.state_name}
                            </option>
                          ))}
                        </select>
                        <IoMdArrowDropdown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                          size={20}
                        />
                      </div>
                    </div>

                    {["1", "2", "3", "4", "5", "6", "7"].includes(state) ? (
                      <div>
                        <label
                          htmlFor="district"
                          className="block mb-2 text-base text-primary font-medium"
                        >
                          District
                        </label>
                        <div className="relative">
                          <select
                            id="district"
                            value={selectedDistrict}
                            className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                            // onChange={(e) => setSelectedDistrict(e.target.value)}
                            onChange={(e) => {
                              setSelectedDistrict(e.target.value);
                              setWorkCity(""); // Reset city when district changes
                            }}
                          >
                            <option value="" selected disabled>
                              Select District
                            </option>
                            {district.map((option: any) => (
                              <option
                                key={option.disctict_id}
                                value={option.disctict_id}
                              >
                                {option.disctict_name}
                              </option>
                            ))}
                          </select>
                          <IoMdArrowDropdown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                            size={20}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <InputField
                          id="district"
                          value={districtValue}
                          onChange={(e) => setDistrictValue(e.target.value)}
                          label="District"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="workCity"
                        className="block mb-2 text-base text-primary font-medium"
                      >
                        Work City
                        <div className="relative inline-block ml-2 group">
                          <AiOutlineInfoCircle className="text-gray-500 cursor-pointer ml-2" />
                          {/* Tooltip */}
                          <div className="absolute hidden group-hover:flex flex-col bg-white border border-ashSecondary rounded shadow-md p-2 w-48 z-10">
                            <p className="text-sm text-black">
                              Select your city from the list. If your city is
                              not listed, select Others.
                            </p>
                          </div>
                        </div>
                      </label>
                      {workCity === "others" ? (
                        <InputField
                          id="customWorkCity"
                          label={""} //label="Enter City Name"
                          value={customWorkCity}
                          {...register("WorkOtherCity")}
                          onChange={(e) => setCustomWorkCity(e.target.value)}
                        />
                      ) : (
                        <div className="relative">
                          <select
                            id="workCity"
                            value={workCity}
                            className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                            onChange={(e) => setWorkCity(e.target.value)}
                          >
                            <option value="" selected disabled>
                              Select Work City
                            </option>
                            {workCityList.map((option: any) => (
                              <option
                                key={option.city_id}
                                value={option.city_id}
                              >
                                {option.city_name}
                              </option>
                            ))}
                            <option value="others">Others</option>
                          </select>
                          <IoMdArrowDropdown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                            size={20}
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div>
                    <InputField
                      value={workPlace}
                      onChange={(e) => setWorkPlace(e.target.value)}
                      label={"Work place"}
                    />
                  </div>
                )}
                <InputField
                  label={"Pincode"}
                  onKeyDown={handleKeyDown}
                  {...register("pincode", {
                    setValueAs: (value) => value.trim(),
                  })}
                />
                <div>
                  <label
                    htmlFor="careerPlans"
                    className="block mb-2 text-base text-primary font-medium "
                  >
                    Career Plans / Notes
                  </label>

                  <textarea
                    id="careerPlans"
                    rows={5}
                    placeholder=" Enter your message here..."
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    {...register("careerPlans", {
                      setValueAs: (value) => value.trim(),
                    })}
                    onKeyDown={(e) =>
                      handleKeyDownTextArea(e, careerPlansValue)
                    }
                  ></textarea>
                </div>
                <div className="mt-7 flex justify-end">
                  <div className="flex space-x-4">
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

export default EduDetails;
