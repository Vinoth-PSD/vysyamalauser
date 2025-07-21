/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import MatchingStars from "../Components/PartnerPreference/MatchingStars";
// import axios from "axios";
import apiClient from "../API";
import {
  ToastNotification,
  NotifyError,
  NotifySuccess,
} from "../Components/Toast/ToastNotification";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
// import { profile } from "console";

// const PARTNER_API_URL = await apiClient.post(`/auth/Partner_pref_registration/`);

const schema = zod
  .object({
    age: zod.string().optional(),
    heightFrom: zod.string().optional(),
    heightTo: zod.string().optional(),
    // education: zod.array(zod.string()).min(1, "Education is required"),
    // annualIncome: zod.array(zod.string()).min(1, "Annual Income is required"),
    chevvai: zod.string().optional(),
    rehu: zod.string().optional(),
  })
  .required();

interface PartnerSettingsInputs {
  age: string;
  heightFrom: string;
  heightTo: string;
  education: string[];
  annualIncome: string[];
  annualIncome_max?: string;
  chevvai: string;
  rehu: string;
  profession: string[];
  maritalStatus: string[];
  foreignInterest: string;
  nativeState?: string[];
  profilePhoto?: boolean;
  ageFrom?: string;
  ageTo?: string;
}

interface EduPref {
  Edu_Pref_id: number;
  Edu_name: string;
}
interface FieldOfStudy {
  study_id: number;
  study_description: string;
}
interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}

interface MaritalStatus {
  marital_sts_id: number;
  marital_sts_name: string;
}

interface AnnualIncome {
  income_id: number;
  income_description: string;
}

// interface BirthStar {
//   birth_id: number;
//   birth_star: string;
// }

interface MatchingStar {
  dest_rasi_id: number;
  dest_star_id: number;
  id: number;
  match_count: number;
  matching_porutham: string;
  matching_starname: string;
  matching_rasiname: string;
  protham_names: null | string[];
  source_star_id: number;
}

export interface StarAndRasiItem {
  id: string;
  matching_starId: string;
  matching_starname: string;
  matching_rasiId: string;
  matching_rasiname: string;
}

// Type for selectedStarIds
export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

// // Type for selectedStarIds
// interface SelectedStarIdItem1 {
//   id: string;
//   rasi: string;
//   star: string;
//   label: string;
// }
const PartnerSettings: React.FC = () => {
  const [eduPref, setEduPref] = useState<EduPref[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<FieldOfStudy[]>([]);
  const [ProfPref, setProfPref] = useState<Profession[]>([]);

  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [selectedStarIds, setSelectedStarIds] = React.useState<
    SelectedStarIdItem[]
  >([]);

  // const [selectedStarId, setSelectedStarId] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<
    string[]
  >(["1"]);
  // const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<string[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>(
    []
  );
  const [selectedMaxAnnualIncome, setSelectedMaxAnnualIncome] = useState<string[]>([])
  const [, setSelectedAnnualIncomesmax] = useState<string[]>(
    []
  );

  const [selectedProfession, setSelectedProfession] = useState<string[]>([]);

  // const [selectedBusiness, setSelectedBusiness] = useState(false);
  // const [selectedStudent, setSelectedStudent] = useState(false);
  // const [selectedNotWorking, setSelectedNotWorking] = useState(false);
  // const [selectedNotMentioned, setSelectedNotMentioned] = useState(false);
  // const [selectedStarRasiPairs, setSelectedStarRasiPairs] = useState<string[]>(
  //   []
  // );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<PartnerSettingsInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      foreignInterest: "both", // Set default value here
      //age: "5", // Set default value here
    },
  });

  const [foreignInterestValue, setForeignInterestValue] = useState("both");
  const foreignInterest = watch("foreignInterest");

  useEffect(() => {
    setForeignInterestValue(foreignInterest);
  }, [foreignInterest]);

  const navigate = useNavigate();

  // const handleProfessionChange = (value: string, checked: boolean) => {
  //   setSelectedProfessions((prevProfessions) => {
  //     if (checked && !prevProfessions.includes(value)) {
  //       return [...prevProfessions, value];
  //     } else {
  //       return prevProfessions.filter((profession) => profession !== value);
  //     }
  //   });

  // Handle other checkboxes as needed
  //   if (value === "business") {
  //     setSelectedBusiness(checked);
  //   } else if (value === "student") {
  //     setSelectedStudent(checked);
  //   } else if (value === "notWorking") {
  //     setSelectedNotWorking(checked);
  //   } else if (value === "notMentioned") {
  //     setSelectedNotMentioned(checked);
  //   }
  // };

  //   // Save selected star IDs to session storage
  // useEffect(() => {
  //   sessionStorage.setItem("selectedStarIds", JSON.stringify(selectedStarIds));
  // }, [selectedStarIds]);

  const onSubmit: SubmitHandler<PartnerSettingsInputs> = async (data) => {
    setIsSubmitting(true);
    //console.log("Form data:", data);

    const starArray = selectedStarIds.map((item) => item.id);
    const starRasiArray = selectedStarIds.map(
      (item) => `${item.star}-${item.rasi}`
    );

    // Create a comma-separated string for each array
    const StarString = starArray.join(",");
    const combinedString = starRasiArray.join(",");

    console.log(StarString);
    console.log(combinedString);

    const MaritalValues = selectedMaritalStatuses.join(",");
    const EducationalValues = selectedEducations.join(",");
    const fieldOfStudyValues = selectedFieldOfStudy.join(",")
    console.log(EducationalValues);
    // const IncomeValues = selectedAnnualIncomes.join(",");
    // console.log(IncomeValues);
    const IncomeValue = selectedAnnualIncomes[0]; // Extract the selected value
    //console.log("Selected Annual Income:", IncomeValue);

    const IncomeValuemax = selectedMaxAnnualIncome[0]; // Extract the selected value
    //console.log("Selected Annual Income:", IncomeValuemax);
    // const prefProfessionString = [
    //   ...(selectedProfessions.includes("employed") ? ["employed"] : []),
    //   ...(selectedBusiness ? ["business"] : []),
    //   ...(selectedStudent ? ["student"] : []),
    //   ...(selectedNotWorking ? ["notWorking"] : []),
    //   ...(selectedNotMentioned ? ["notMentioned"] : []),
    // ].join(",");
    const ProfessionValues = selectedProfession.join(",");

    try {
      const profileId =
        localStorage.getItem("profile_id_new") ||
        localStorage.getItem("loginuser_profile_id");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }

      const postData = {
        profile_id: profileId,
        pref_age_differences: data.age,
        pref_height_from: data.heightFrom,
        pref_height_to: data.heightTo,
        pref_marital_status: MaritalValues,
        pref_profession: ProfessionValues,
        pref_education: EducationalValues,
        pref_fieldof_study: fieldOfStudyValues,
        pref_anual_income: IncomeValue,
        pref_anual_income_max: IncomeValuemax,
        pref_chevvai: data.chevvai,
        pref_ragukethu: data.rehu,
        pref_foreign_intrest: foreignInterestValue,
        pref_porutham_star: StarString,
        pref_porutham_star_rasi: combinedString,
        status: "1",
      };

      //console.log("PartnerSettings:", postData);

      const response = await apiClient.post(
        `/auth/Partner_pref_registration/`,
        postData
      );
      //console.log("Registration response:", response.data);

      if (response.data.Status === 1) {
        NotifySuccess("Partner details updated successfully");

        // Get quick_reg value from sessionStorage
        const quickreg = sessionStorage.getItem("quick_reg") || "0"; // Default to "0" if not found
        const userplanid = sessionStorage.getItem("userplanid") || "0"; // Default to "0" if not found

        setTimeout(() => {
          if (quickreg === "1" || userplanid !== "0") {
            navigate("/ThankYouReg"); // Redirect to ThankYouReg page
          } else {
            navigate("/MembershipPlan"); // Redirect to MembershipPlan page
          }
        }, 2000);
      } else {
        setIsSubmitting(false);
        NotifyError("Registration unsuccessful");
        //console.log("Registration unsuccessful:", response.data);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting contact details:", error);
    }
  };

  // const profileId = sessionStorage.getItem('profile_id_new');

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileId = localStorage.getItem("profile_id_new");

      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 6,
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

          //console.log("API Response:", response.data);

          const profileData = response.data.data;

          // Parse and set form values
          const maritalStatusArray = profileData.pref_marital_status.split(",");
          const educationArray = profileData.pref_education.split(",");
          const fieldOfStudy = profileData.pref_fieldof_study.split(",");
          const annualIncomeArray = profileData.pref_anual_income.split(",");
          const annualIncomeArraymax = profileData.annualIncome_max.split(",");

          const poruthamStarIds = profileData.pref_porutham_star
            .split(",")
            .map((id: string) => id.trim());

          // Set form values
          setValue("age", profileData.pref_age_differences || "5");
          setValue("heightFrom", profileData.pref_height_from);
          setValue("heightTo", profileData.pref_height_to);
          setValue("maritalStatus", maritalStatusArray);
          setValue("profession", profileData.pref_profession.split(","));
          setValue("education", educationArray);
          setValue("annualIncome", annualIncomeArray);
          setValue("annualIncome_max", annualIncomeArraymax);


          setValue("chevvai", profileData.pref_chevvai);
          setValue("rehu", profileData.pref_ragukethu);
          setValue("foreignInterest", profileData.pref_foreign_intrest);

          // Set selected values for checkboxes and other states
          setSelectedMaritalStatuses(maritalStatusArray);
          setSelectedEducations(educationArray);
          setSelectedFieldOfStudy(fieldOfStudy)
          setSelectedAnnualIncomes(annualIncomeArray);
          // setSelectedStarIds(poruthamStarIds); // Set selected stars for checkbox selection
          setSelectedAnnualIncomesmax(annualIncomeArraymax);

          setSelectedStarIds(
            poruthamStarIds.map((id: any) => ({
              id,
              rasi: "",
              star: "",
              label: "",
            }))
          );
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };

    fetchProfileData();
  }, [setValue]);

  const handleMaritalStatusChange = (id: string, isChecked: boolean) => {
    setSelectedMaritalStatuses((prev) =>
      isChecked ? [...prev, id] : prev.filter((statusId) => statusId !== id)
    );
  };

  const handleEducationChange = (id: string, isChecked: boolean) => {
    setSelectedEducations((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id)
    );
  };
  const handleFieldOfStudyChange = (id: string, isChecked: boolean) => {
    setSelectedFieldOfStudy((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id)
    );
  };

  const handleProfessionChange = (id: string, isChecked: boolean) => {
    setSelectedProfession((prev) =>
      isChecked ? [...prev, id] : prev.filter((eduId) => eduId !== id)
    );
  };

  // const handleAnnualIncomeChange = (value: string) => {
  //   setSelectedAnnualIncomes((prev) =>
  //     isChecked ? [...prev, id] : prev.filter((incId) => incId !== id)
  //   );
  // };

  // const handleAnnualIncomeChange = (value: string) => {
  //   setSelectedAnnualIncomes((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((id) => id !== value)
  //       : [...prev, value]
  //   );
  // };

  const handleAnnualIncomeChange = (value: string) => {
    setSelectedAnnualIncomes([value]); // Ensure it's always a single value
  };

  const handleMaximumAnnualIncomeChange = (value: string) => {
    setSelectedMaxAnnualIncome([value]); // Ensure it's always a single value
  };

  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        // const response = await axios.post<{ [key: string]: MaritalStatus }>('/auth/Get_Marital_Status/');
        const response = await apiClient.post(`/auth/Get_Marital_Status/`);
        const options = Object.values(response.data) as MaritalStatus[];

        setMaritalStatuses(options);
      } catch (error) {
        console.error("Error fetching marital statuses:", error);
      }
    };

    fetchMaritalStatuses();
  }, []);

  useEffect(() => {
    const fetchEduPref = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Edu_Pref/`);
        const options = Object.values(response.data) as EduPref[];
        console.log(options);
        setEduPref(options);
      } catch (error) {
        console.error("Error fetching Edu Pref options:", error);
      }
    };
    fetchEduPref();
  }, []);

  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Field_ofstudy/`);
        const options = Object.values(response.data) as FieldOfStudy[];
        console.log(options);
        setFieldOfStudy(options);
      } catch (error) {
        console.error("Error fetching Edu Pref options:", error);
      }
    };
    fetchFieldOfStudy();
  }, []);
  useEffect(() => {
    const fetchProfession = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Profes_Pref/`);
        const options = Object.values(response.data) as Profession[];
        console.log(options);
        setProfPref(options);
      } catch (error) {
        console.error("Error fetching Prof Pref options:", error);
      }
    };
    fetchProfession();
  }, []);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await apiClient.post(`/auth/Get_Annual_Income/`);
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error("Error fetching Annual Income options:", error);
      }
    };
    fetchAnnualIncome();
  }, []);

  useEffect(() => {
    const storedMaritalStatus = localStorage.getItem("maritalStatus");
    if (storedMaritalStatus) {
      // Set the stored marital status in the state
      setSelectedMaritalStatuses([storedMaritalStatus]);
    }
  }, []);

  const storedBirthStar = sessionStorage.getItem("selectedstar");
  // const storedGender = sessionStorage.getItem("gender");
  const storedGender = localStorage.getItem("gender");
  // const storedMartialStatus = sessionStorage.getItem("maritalStatus");
  const storedHeight = sessionStorage.getItem("userHeight") || 0;
  // const quickreg = sessionStorage.getItem("quick_reg") || "0";
  const storedRasi = sessionStorage.getItem("selectedRasi");

  // console.log(storedMartialStatus);
  console.log(storedBirthStar);
  console.log(storedGender);
  console.log(storedRasi, "storedRasi");

  // const [uncheckDefaultSelectedIds, setUncheckDefaultSelectedIds] = useState([]); // State to store unchecked items
  // const [uncheckDefaultSelectedIds, setUncheckDefaultSelectedIds] = useState<MaritalStatus[]>([]);

  useEffect(() => {
    if (storedBirthStar && storedGender && storedRasi) {
      const fetchMatchingStars = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_Matchstr_Pref/`, {
            birth_star_id: storedBirthStar,
            gender: storedGender,
            birth_rasi_id: storedRasi,
          });

          const matchCountArrays: MatchingStar[][] = Object.values(
            response.data
          ).map((matchCount: any) => matchCount);
          setMatchStars(matchCountArrays);

          // //console.log("defaultSelectedIds",defaultSelectedIds)
          // Set default selected IDs based on fetched data, excluding count of 0
          const defaultSelectedIds = matchCountArrays
            .flat()

            .filter((item) => item.match_count !== 0)
            .map((item) => ({
              id: item.id.toString(),
              // rasi: item.dest_rasi_id,
              // star: item.dest_star_id,
              rasi: item.dest_rasi_id.toString(), // Convert to string
              star: item.dest_star_id.toString(), // Convert to string
              label: `${item.dest_star_id} - ${item.dest_rasi_id}`,
            }));

          // Retrieve previously selected star IDs from sessionStorage, if they exist
          const savedStarIds = sessionStorage.getItem("selectedStarIds");
          const savedSelections: SelectedStarIdItem[] = savedStarIds
            ? JSON.parse(savedStarIds)
            : [];

          // Merge default and saved selections, avoiding duplicates
          const mergedSelections = [
            ...defaultSelectedIds,
            ...savedSelections.filter(
              (saved) =>
                !defaultSelectedIds.some(
                  (defaultId) => defaultId.id === saved.id
                )
            ),
          ];
          console.log(mergedSelections, "mergedSelections");

          setSelectedStarIds(mergedSelections);
          sessionStorage.setItem(
            "selectedStarIds",
            JSON.stringify(mergedSelections)
          ); // Save merged selections

          // // Set unchecked items by comparing mergedSelections with defaultSelectedIds
          // const uncheckedItems = defaultSelectedIds.filter(
          //   (defaultItem) =>
          //     !mergedSelections.some((selected) => selected.id === defaultItem.id)
          // );
          // setUncheckDefaultSelectedIds(uncheckedItems);

          // //console.log("uncheckedItems:", uncheckedItems);

          // setSelectedStarIds(defaultSelectedIds);
          // //console.log("defaultSelectedIds",defaultSelectedIds)

          //console.log("Response from server:", matchCountArrays);
        } catch (error) {
          console.error("Error fetching matching star options:", error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender, storedRasi]);

  //console.log("storedHeight", storedHeight);

  useEffect(() => {
    if (storedHeight) {
      if (storedGender === "male") {
        // Set heightTo and restrict heightFrom input
        setValue("heightTo", storedHeight);
        setValue("heightFrom", ""); // Reset heightFrom to avoid invalid data
      } else if (storedGender === "female") {
        // Set heightFrom and restrict heightTo input
        setValue("heightFrom", storedHeight);
        setValue("heightTo", ""); // Reset heightTo to avoid invalid data
      }
    }
  }, [storedHeight, storedGender, setValue]);

  const heightFrom = watch("heightFrom"); // Watch the value of heightFrom
  const heightTo = watch("heightTo"); // Watch the value of heightTo

  // //console.log("sssssssssssssssssssss",heightTo);

  // Handle validation on change using useEffect
  useEffect(() => {
    // Ensure storedGender is female and heightTo is valid
    if (
      storedGender === "female" &&
      heightTo &&
      Number(heightTo) <= Number(storedHeight)
    ) {
      setError("heightTo", {
        type: "manual",
        message: `Height To must be Greater than ${storedHeight} cm.`,
      });
    } else {
      clearErrors("heightTo");
    }
  }, [heightTo, storedHeight, storedGender, setError, clearErrors]);

  useEffect(() => {
    // Ensure storedGender is male and heightFrom is valid
    if (
      storedGender === "male" &&
      heightFrom &&
      Number(heightFrom) >= Number(storedHeight)
    ) {
      setError("heightFrom", {
        type: "manual",
        message: `Height From must be less than ${storedHeight} cm.`,
      });
    } else {
      clearErrors("heightFrom");
    }
  }, [heightFrom, storedHeight, storedGender, setError, clearErrors]);

  // const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
  //   setSelectedStarIds(updatedIds);
  // };

  // const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
  //   setSelectedStarIds(updatedIds);
  //   sessionStorage.setItem("selectedStarIds", JSON.stringify(updatedIds)); // Save to sessionStorage
  // };

  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
    sessionStorage.setItem("selectedStarIds", JSON.stringify(updatedIds)); // Save updated state to session storage
  };

  // useEffect(() => {
  //   // Check sessionStorage for saved star IDs
  //   const savedStarIds = sessionStorage.getItem("selectedStarIds");

  //   //console.log("savedStarIds",savedStarIds)

  //   if (savedStarIds) {
  //     setSelectedStarIds(JSON.parse(savedStarIds));
  //   }
  // }, []);

  useEffect(() => {
    // Retrieve the selected checkboxes from session storage
    const savedStarIds = sessionStorage.getItem("selectedStarIds");

    if (savedStarIds) {
      setSelectedStarIds(JSON.parse(savedStarIds)); // Parse and set it to state
    }
  }, []);

  console.log(selectedStarIds);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNumericInput = (e: { target: { value: string } }) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Removes non-numeric characters
  };


  useEffect(() => {
    const isEmpty = selectedMaritalStatuses.length === 0;
    if (isEmpty) {
      const notMarriedStatus = maritalStatuses.find(
        (status) => status.marital_sts_name.toLowerCase() === "not married"
      );
      if (notMarriedStatus) {
        setSelectedMaritalStatuses([notMarriedStatus.marital_sts_id.toString()]);
      }
    }
  }, [maritalStatuses, selectedMaritalStatuses]);


  const handleSelectAllMaritalStatus = () => {
  // Check if all are already selected
  const allSelected = maritalStatuses.every(status => 
    selectedMaritalStatuses.includes(status.marital_sts_id.toString())
  );
  
  if (allSelected) {
    // Deselect all
    setSelectedMaritalStatuses([]);
  } else {
    // Select all
    const allIds = maritalStatuses.map(status => status.marital_sts_id.toString());
    setSelectedMaritalStatuses(allIds);
  }
};

const handleSelectAllProfessions = () => {
  // Check if all are already selected
  const allSelected = ProfPref.every(prof => 
    selectedProfession.includes(prof.Profes_Pref_id.toString())
  );
  
  if (allSelected) {
    // Deselect all
    setSelectedProfession([]);
  } else {
    // Select all
    const allIds = ProfPref.map(prof => prof.Profes_Pref_id.toString());
    setSelectedProfession(allIds);
  }
};

const handleSelectAllEducation = () => {
  // Check if all are already selected
  const allSelected = eduPref.every(edu => 
    selectedEducations.includes(edu.Edu_Pref_id.toString())
  );
  
  if (allSelected) {
    // Deselect all
    setSelectedEducations([]);
  } else {
    // Select all
    const allIds = eduPref.map(edu => edu.Edu_Pref_id.toString());
    setSelectedEducations(allIds);
  }
};


const handleSelectAllFieldOfStudy = () => {
  // Check if all are already selected
  const allSelected = fieldOfStudy.every(field => 
    selectedFieldOfStudy.includes(field.study_id.toString())
  );
  
  if (allSelected) {
    // Deselect all
    setSelectedFieldOfStudy([]);
  } else {
    // Select all
    const allIds = fieldOfStudy.map(field => field.study_id.toString());
    setSelectedFieldOfStudy(allIds);
  }
};

  return (
    <div className="mt-24 max-lg:mt-20">
      <ContentBlackCard
      link="/HoroDetails"
        heading={"Partner Preference"}
        desc="Please provide your partner Preference to show potential matches."
      />
      <div className="mx-auto w-[60%]  my-10  max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-full max-md:w-full max-md:my-5">
        <div className="container flex justify-between space-x-24  max-lg:flex-col max-lg:space-x-0 max-lg:gap-y-8 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-5 mb-5"
          >
            <div className="w-full space-y-5 grid grid-cols-1  items-baseline max-sm:block max-sm:gap-x-0">
              <div>
                {/* <h5 className="text-[18px] text-primary font-semibold">Age</h5> */}
                <div className="flex items-center space-x-5">
                  {/* <InputField label={""} name={""} placeholder="From" />
                <InputField label={""} name={""} placeholder="To" /> */}

                  <div className="w-full">
                    <label
                      htmlFor="nativeState"
                      className="text-[18px] text-primary font-semibold block mb-3"
                    >
                      Age Difference
                    </label>
                    <div className="relative">
                      <select
                        id="age"
                        className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                        {...register("age")}
                        defaultValue="5" // Set default value here
                      >
                        <option value="" selected disabled>
                          Select your Age
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <IoMdArrowDropdown />
                    </div>
                    {errors.age && (
                      <span className="text-red-500">{errors.age.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 
            <div>
              <h5 className="text-[18px] text-primary font-semibold">Age</h5>
              <div className="flex items-center space-x-5">
                <div>
                  <InputField label={""} placeholder="From" {...register("ageFrom")} />
                  {errors.ageFrom && <span className="text-red-500">{errors.ageFrom.message}</span>}
                </div>
                <div>
                  <InputField label={""} placeholder="To" {...register("ageTo")} />
                  {errors.ageTo && <span className="text-red-500">{errors.ageTo.message}</span>}
                </div>
              </div>
            </div> */}

              <div className="col-span-2">
                <h5 className="text-[18px] text-primary font-semibold mb-3">
                  Height
                </h5>
                <div className="flex items-center space-x-5">
                  <div className="w-full">
                    <InputField
                      label={""}
                      placeholder="From"
                      {...register("heightFrom", {
                        setValueAs: (value) => value.trim(),
                      })}
                      onChange={handleNumericInput} // Restrict input to numbers
                    />
                    {errors.heightFrom && (
                      <span className="text-red-500">
                        {errors.heightFrom.message}
                      </span>
                    )}
                  </div>

                  <div className="w-full">
                    <InputField
                      label={""}
                      placeholder="To"
                      {...register("heightTo", {
                        setValueAs: (value) => value.trim(),
                      })}
                      onChange={handleNumericInput} // Restrict input to numbers
                    />
                    {errors.heightTo && (
                      <span className="text-red-500">
                        {errors.heightTo.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Marital Status */}
            <div>
              <h5 className="text-[18px] text-primary font-semibold mb-5 block cursor-pointer"  onClick={handleSelectAllMaritalStatus}>
                Marital Status
              </h5>
              <div className="grid grid-cols-2 gap-4 justify-between items-center max-2xl:grid-cols-2 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {maritalStatuses.map((status) => (
                  <div key={status.marital_sts_id}>
                    <input
                      type="checkbox"
                      id={`maritalStatus-${status.marital_sts_id}`}
                      value={status.marital_sts_id.toString()}
                      // checked={selectedMaritalStatuses.includes(
                      //   status.marital_sts_id.toString()
                      // )}

                      checked={
                        selectedMaritalStatuses.includes(
                          status.marital_sts_id.toString()
                        ) ||
                        status.marital_sts_name.toLowerCase() === "not married" // Default selection for "Not Married"
                      }
                      disabled={false} // Enable editing (false means not disabled)
                      onChange={(e) =>
                        handleMaritalStatusChange(
                          status.marital_sts_id.toString(),
                          e.target.checked
                        )
                      }
                    />

                    <label
                      htmlFor={`maritalStatus-${status.marital_sts_id}`}
                      className="pl-2 text-primary"
                    >
                      {status.marital_sts_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Profession */}
            {/* Profession */}
            <div>
              <h5 className="text-[18px] text-primary font-semibold mb-5 block cursor-pointer"  onClick={handleSelectAllProfessions}>
                Profession
              </h5>
              <div className="grid grid-cols-3 gap-4  max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
                {ProfPref.map((option) => (
                  <div
                    key={option.Profes_Pref_id}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`profession-${option.Profes_Pref_id}`}
                      value={option.Profes_Pref_id.toString()}
                      checked={selectedProfession.includes(
                        option.Profes_Pref_id.toString()
                      )}
                      onChange={(e) =>
                        handleProfessionChange(
                          option.Profes_Pref_id.toString(),
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor={`profession-${option.Profes_Pref_id}`}
                      className="pl-2 text-primary"
                    >
                      {option.Profes_name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.profession && (
                <span className="text-red-500">
                  {errors.profession.message}
                </span>
              )}
            </div>

            {/* Education */}
            <div>
              <label className="text-[18px] text-primary font-semibold mb-3 block cursor-pointer"  onClick={handleSelectAllEducation}>
                Education
              </label>
              <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
                {eduPref.map((option) => (
                  <div
                    key={option.Edu_Pref_id}
                    className="flex items-center max-2xl:items-baseline"
                  >
                    <input
                      type="checkbox"
                      id={`education-${option.Edu_Pref_id}`}
                      value={option.Edu_Pref_id.toString()}
                      checked={selectedEducations.includes(
                        option.Edu_Pref_id.toString()
                      )}
                      onChange={(e) =>
                        handleEducationChange(
                          option.Edu_Pref_id.toString(),
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor={`education-${option.Edu_Pref_id}`}
                      className="pl-2 text-primary"
                    >
                      {option.Edu_name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* field of study */}
            <div>
              <label className="text-[18px] text-primary font-semibold mb-3 block cursor-pointer" onClick={handleSelectAllFieldOfStudy}>
                Field Of Study
              </label>
              <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
                {fieldOfStudy.map((option) => (
                  <div
                    key={option.study_id}
                    className="flex items-center max-2xl:items-baseline"
                  >
                    <input
                      type="checkbox"
                      id={`fieldOfStudy-${option.study_id}`}
                      value={option.study_id.toString()}
                      checked={selectedFieldOfStudy.includes(
                        option.study_id.toString()
                      )}
                      onChange={(e) =>
                        handleFieldOfStudyChange(
                          option.study_id.toString(),
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor={`fieldOfStudy-${option.study_id}`}
                      className="pl-2 text-primary"
                    >
                      {option.study_description}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual Income */}
            <div>
              <label className="text-[18px] text-primary font-semibold mb-5 block">
                Annual Income
              </label>
              <div className="flex  space-x-4">
                <div className="relative w-full ">
                  <select
                    id="annualIncome_min"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    value={selectedAnnualIncomes} // Bind the selected value
                    onChange={(e) => handleAnnualIncomeChange(e.target.value)} // Handle change
                  >
                    <option value="" disabled>
                      Select min Annual Income
                    </option>
                    {annualIncome.map((option) => (
                      <option key={option.income_id} value={option.income_id}>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown />
                </div>

                <div className="relative w-full ">
                  <select
                    id="annualIncome"
                    className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                    value={selectedMaxAnnualIncome} // Bind the selected value
                    onChange={(e) => handleMaximumAnnualIncomeChange(e.target.value)} // Handle change
                  >
                    <option>
                      Select max Annual Income
                    </option>
                    {annualIncome.map((option) => (
                      <option key={option.income_id} value={option.income_id}>
                        {option.income_description}
                      </option>
                    ))}
                  </select>
                  <IoMdArrowDropdown />
                </div>
              </div>
            </div>


            <div>
              <label
                htmlFor="chevvaiDhosam"
                className="text-[18px] text-primary font-semibold block mb-3"
              >
                Chevvai
              </label>
              <div className="relative">
                <select
                  id="chevvaiDhosam"
                  className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                  {...register("chevvai")}
                >
                  <option value="" selected disabled>
                    Select Chevvai
                  </option>
                  {["UnKnown", "Yes", "No"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <IoMdArrowDropdown />
              </div>
              {errors.chevvai && (
                <span className="text-red-500">{errors.chevvai.message}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="Rehu"
                className="text-[18px] text-primary font-semibold block mb-3"
              >
                {" "}
                Rehu / Ketu
              </label>
              <div className="relative">
                <select
                  id="Rehu"
                  className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                  {...register("rehu")}
                >
                  <option value="" selected disabled>
                    Select Rehu / Ketu
                  </option>
                  {["UnKnown", "Yes", "No"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <IoMdArrowDropdown />
              </div>
              {errors.rehu && (
                <span className="text-red-500">{errors.rehu.message}</span>
              )}
            </div>

            <div>
              <h5 className="text-[18px] text-primary font-semibold mb-3 block">
                Foreign Interest
              </h5>
              <div className="relative">
                <select
                  id="foreignInterest"
                  className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                  {...register("foreignInterest", {
                    required: "Foreign interest selection is required",
                  })}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="both">Both</option>
                </select>
                <IoMdArrowDropdown />
              </div>
              {errors.foreignInterest && (
                <span className="text-red-500">
                  {errors.foreignInterest.message}
                </span>
              )}
            </div>


            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Other input fields */}
                <div className="justify-start items-center gap-x-5">
                  {matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count)
                    .map((matchCountArray, index) => {
                      const starAndRasi = matchCountArray.map((star) => ({
                        id: star.id.toString(),
                        matching_starId: star.dest_star_id.toString(),
                        matching_starname: star.matching_starname,
                        matching_rasiId: star.dest_rasi_id.toString(),
                        matching_rasiname: star.matching_rasiname,
                      }));

                      const matchCountValue = matchCountArray[0].match_count;
                      const poruthasText =
                        matchCountValue === 0 ? (

                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                            className="relative group"
                          >
                            Unmatching stars
                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer ml-2" />
                            <div
                              // className="absolute hidden group-hover:flex flex-col bg-white border border-gray-300 rounded shadow-lg p-2 w-56 z-10 top-full left-1/2 transform -translate-x-1/2 mt-1">
                              className="absolute hidden group-hover:flex flex-col bg-white border border-gray-300 rounded shadow-lg p-2 w-56 z-10 top-1/2 left-full transform -translate-y-0 ml-2"
                            >
                              <p className="text-sm text-black">
                                No Rajju Porutham
                              </p>
                            </div>
                          </div>
                        ) : //   <span>
                          //   Unmatching stars{" "}
                          //   <AiOutlineInfoCircle
                          //     data-tip="No Rajju Poruthams"
                          //     style={{ marginLeft: "8px", verticalAlign: "middle" }}
                          //   />
                          //   <ReactTooltip place="top" type="dark" effect="solid" />
                          // </span>
                          matchCountValue === 15 ? (
                            "Yega Poruthams"
                          ) : (
                            `Matching stars (${matchCountValue} Poruthams)`
                          );

                      return (
                        <MatchingStars
                          key={index}
                          initialPoruthas={poruthasText}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                          onCheckboxChange={handleCheckboxChange}
                        />
                      );
                    })}
                </div>
              </form>
            </div>

            <div className="mt-7 flex justify-between">
              <div className="">
                {/* <Link to={"/"}>
                <button className="py-[10px] px-14 bg-white text-main font-semibold border-2 rounded-[6px] mt-2">
                  Back
                </button>
              </Link> */}
              </div>

              <div className="flex space-x-4">
                <button className="py-[10px] px-14 bg-white text-main font-semibold   mt-2 max-sm:px-4 ">
                  Cancel
                </button>

                {/* <button type="submit" className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">
                Find Match
                <span>
                  <img src={arrow} alt="next arrow" className="ml-2" />
                </span>
              </button> */}
                <button
                  type="submit"
                  className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] shadow-redboxshadow mt-2 max-sm:px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Find Match"}
                  {!isSubmitting && (
                    <span>
                      <img src={arrow} alt="next arrow" className="ml-2" />
                    </span>
                  )}
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

export default PartnerSettings;
