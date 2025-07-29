
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import apiClient from "../../../API";

// Define the interface for education and profession details
interface EducationProfessionDetails {
  personal_edu_id: number;
  personal_edu_name: string;
  personal_edu_details: string | null;
  personal_about_edu: string;
  personal_profession: number;
  personal_profession_name: string;
  personal_company_name: string;
  personal_designation: string;
  personal_profess_details: string;
  personal_business_name: string;
  personal_business_addresss: string;
  personal_nature_of_business: string;
  personal_ann_inc_id: number;
  personal_ann_inc_name: string;
  personal_gross_ann_inc: string;
  personal_work_coun_id: number;
  personal_work_coun_name: string;
  personal_work_sta_id: number;
  personal_work_sta_name: string;
  personal_work_pin: string;
  personal_career_plans: string;
  persoanl_field_ofstudy: string;
  persoanl_field_ofstudy_name:string;
  persoanl_degree: string;
  persoanl_degree_name:string;
  persoanl_edu_other: string;
}
interface EducationProfessionPayload {
  profile_id: string | null;
  education_level: string | number | undefined;
  education_details: string | null | undefined;
  about_edu: string | undefined;
  profession: string | number;
  annual_income: string | number;
  actual_income: string | undefined;
  work_country: string | number;
  work_state: string | number;
  work_pincode: string | undefined;
  career_plans: string | undefined;
  field_ofstudy: string;
  degree: string;
  other_degree: string;
  // Optional fields that might be added conditionally
  company_name?: string;
  designation?: string;
  profession_details?: string;
  business_name?: string;
  business_address?: string;
  nature_of_business?: string;
}
interface AnnualIncome {
  income_id: number;
  income_description: string;
}
interface Education {
  education_id: number;
  education_description: string;
}
interface FieldofStudy {
  study_id: number;
  study_description: string;
}
interface Degree {
  degeree_id: number;
  degeree_description: string;
}
interface Profession {
  Profes_Pref_id: number;
  Profes_name: string;
}
interface Country {
  country_id: number;
  country_name: string;
}
interface State {
  state_id: number;
  state_name: string;
}

export const EducationProfession = () => {
  const [educationProfessionDetails, setEducationProfessionDetails] =
    useState<EducationProfessionDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<EducationProfessionDetails>>({});
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  const [annualIncomes, setAnnualIncomes] = useState<AnnualIncome[]>([]);
  const [selectedIncomeId, setSelectedIncomeId] = useState<number | string>("");
  const [educations, setEducations] = useState<Education[]>([]);
  const [FieldofStudy, setFieldOfStudy] = useState<FieldofStudy[]>([]);
  const [Degree, setDegree] = useState<Degree[]>([]);
  const [selectedDegrees, setSelectedDegrees] = useState<number[]>([]);
  // //console.log("selectedDegrees", selectedDegrees)
  const [fieldOfStudyy, setFieldOfStudyy] = useState(""); // Example initial value
  // //console.log("fieldOfStudyy", fieldOfStudyy)
  const [selectedEducationId, setSelectedEducationId] = useState<number | string>();
  const [profession, setProfession] = useState<Profession[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<number | string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedWorkCountryId, setSelectedWorkCountryId] = useState<number | string>("");
  const [states, setStates] = useState<State[]>([]);
  const [selectedWorkStateId, setSelectedWorkStateId] = useState<number | string>("");
  const [refreshData, setRefreshData] = useState(false);
  const [workStateInput, setWorkStateInput] = useState(""); // For state textbox
  const [showStateTextbox, setShowStateTextbox] = useState(false); // For conditionally rendering
  const [customDegree, setCustomDegree] = useState("");
  /////console.log("customDegree", customDegree)
  const [isOthersSelected, setIsOthersSelected] = useState(false);
  ////console.log("isOthersSelected", isOthersSelected)
  const [errors, setErrors] = useState({
    // personal_about_edu: "",
    // personal_gross_ann_inc: "",
    // personal_work_pin: "",
    // personal_career_plans: "",
    selectedEducationId: "",
    selectedProfessionId: "",
    // personal_company_name: "",
    // personal_designation: "",
    // personal_profess_details: "",
    // personal_business_name: "",
    // personal_business_addresss: "",
    // personal_nature_of_business: "",
    // selectedIncomeId: "",
    // selectedWorkCountryId: "",
    // selectedWorkStateId: "",
    //persoanl_edu_other: "",
    // Add error states for other fields
  });

  useEffect(() => {
    const fetchEducationProfessionDetails = async () => {
      try {
        const response = await apiClient.post(
          "/auth/get_myprofile_education/",
          {
            profile_id: loginuser_profileId,
          }
        );
        const data = response.data.data;
        setEducationProfessionDetails(response.data.data);
        ////console.log("respponseeeeeee", response.data.data);
        const matchedIncome = annualIncomes.find((income) =>
          income.income_description.includes(data.personal_ann_inc_name)
        );
        if (matchedIncome) {
          setSelectedIncomeId(matchedIncome.income_id);
        }
        const matchedHighestEducation = educations.find((education) =>
          education.education_description.includes(data.personal_edu_name)
        );
        if (matchedHighestEducation) {
          setSelectedEducationId(
            matchedHighestEducation.education_id.toString()
          );
        }
        const matchedProfession = profession.find((profession) =>
          profession.Profes_name.includes(data.personal_profession_name)
        );
        if (matchedProfession) {
          setSelectedProfessionId(matchedProfession.Profes_Pref_id);
        }
        // Set field of study if available
        if (data.persoanl_field_ofstudy) {
          // Find the matching field of study in the FieldofStudy array
          const matchedField = FieldofStudy.find(
            (field) => field.study_id.toString() === data.persoanl_field_ofstudy.toString()
          );
          if (matchedField) {
            setFieldOfStudyy(matchedField.study_id.toString());
            setFormData(prev => ({
              ...prev,
              persoanl_field_ofstudy: matchedField.study_description
            }));
          }
        }
        // Set degrees if available
        if (data.persoanl_degree) {
          // Convert comma-separated string to array of numbers
          const degreeIds = data.persoanl_degree.split(',').map(Number);
          setSelectedDegrees(degreeIds);
          // Check if "Others" is selected (assuming ID 86 is "Others")
          if (degreeIds.includes(86)) {
            setIsOthersSelected(true);
            setCustomDegree(data.other_degree || "");
          }
        }
        // Set other education if available
        if (data.persoanl_edu_other) {
          setFormData(prev => ({
            ...prev,
            persoanl_edu_other: data.persoanl_edu_other
          }));
        }
        setSelectedWorkCountryId(data.personal_work_coun_id);
        setSelectedWorkStateId(data.personal_work_sta_id);
        setSelectedProfessionId(data.personal_profession);

      } catch (error) {
        console.error(
          "Error fetching education and profession details:",
          error
        );
      }
    };

    fetchEducationProfessionDetails();
  }, [loginuser_profileId, annualIncomes, educations, refreshData, profession]);

  useEffect(() => {
    const fetchAnnualIncomes = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Annual_Income/"
        );
        const incomeData = Object.values(response.data) as AnnualIncome[];
        setAnnualIncomes(incomeData);
      } catch (error) {
        console.error("Error fetching annual incomes:", error);
      }
    };

    const fetchEducations = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Highest_Education/"
        );
        const educationData = Object.values(response.data) as Education[];
        setEducations(educationData);
      } catch (error) {
        console.error("Error fetching education levels:", error);
      }
    };

    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Field_ofstudy/"
        );
        const FieldofStudyData = Object.values(response.data) as FieldofStudy[];
        setFieldOfStudy(FieldofStudyData);
      } catch (error) {
        console.error("Error fetching Field of study:", error);
      }
    };

    const fetchProfession = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Profes_Pref/"
        );
        const professionData = Object.values(response.data) as Profession[];
        setProfession(professionData);
      } catch (error) {
        console.error("Error fetching Profession:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Country/"
        );
        const countriesData = Object.values(response.data) as Country[];
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    //fetchDegree();
    fetchFieldOfStudy();
    fetchCountries();
    fetchEducations();
    fetchAnnualIncomes();
    fetchProfession();
  }, [loginuser_profileId]);

  useEffect(() => {
    const fetchDegrees = async () => {
      if (!selectedEducationId || !fieldOfStudyy) return; // Ensure both values are selected

      try {
        const response = await apiClient.post(
          "/auth/Get_Degree_list/",
          {
            edu_level: selectedEducationId,
            field_of_study: fieldOfStudyy,
          }
        );
        // //console.log("selectedEducationId", selectedEducationId);
        // //console.log("fieldOfStudyy", fieldOfStudyy);
        const degreeData = Object.values(response.data) as Degree[];
        setDegree(degreeData);
      } catch (error) {
        console.error("Error fetching degrees:", error);
      }
    };

    fetchDegrees();
  }, [selectedEducationId, fieldOfStudyy]);

  // Fetch states based on selected country
  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedWorkCountryId) return;

      try {
        const response = await apiClient.post(
          "/auth/Get_State/",
          {
            country_id: selectedWorkCountryId.toString(),
          }
        );
        const statesData = Object.values(response.data) as State[];
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    // Only fetch states if the selected country is India
    if (selectedWorkCountryId === "1") {
      fetchStates();
    }
  }, [selectedWorkCountryId]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncomeId(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      personal_ann_inc_name: e.target.value,
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEducationId = e.target.value;
    setSelectedEducationId(selectedEducationId);
    setFormData((prevState) => ({
      ...prevState,
      personal_edu_name: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, selectedEducationId: "" })); // Clear the error on change

    // Clear the Field of Study and Degree when Education changes
    setFieldOfStudyy("");
    setDegree([]);
    setFormData((prevState) => ({
      ...prevState,
      fieldOfStudy: "",
      Degree: "",
    }));
  };

  const handleFieldOfStudyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFieldId = e.target.value;
    setFieldOfStudyy(selectedFieldId);
    setFormData((prevState) => ({
      ...prevState,
      fieldOfStudy: selectedFieldId,
    }));
    setErrors((prev) => ({ ...prev, fieldOfStudy: "" })); // Clear the error on change
    // Clear Degree options when Field of Study changes
    setDegree([]);
    setFormData((prevState) => ({
      ...prevState,
      Degree: "",
    }));
  };
  // Handle country change
  const handleWorkCountryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setSelectedWorkCountryId(selectedId);
    setFormData((prevState) => ({
      ...prevState,
      personal_work_coun_name:
        event.target.options[event.target.selectedIndex].text,
    }));

    // Check if selected country is India
    if (selectedId === "1") {
      setShowStateTextbox(false); // Show dropdown for states
    } else {
      setShowStateTextbox(true); // Show textbox for state input
      setSelectedWorkStateId(""); // Clear selected state
    }
  };
  // Handle state change
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkStateId(e.target.value);
    setWorkStateInput(""); // Clear textbox when selecting a state
    setFormData((prevState) => ({
      ...prevState,
      personal_work_sta_name: e.target.options[e.target.selectedIndex].text,
    }));
  };



  const handleEditClick = () => {
    if (isEditing) {
      // Reset form data to an empty object if exiting edit mode
      setFormData({});
    } else {
      if (educationProfessionDetails) {
        setFormData(educationProfessionDetails);
      }
    }
    setIsEditing(!isEditing); // Toggle editing state
  };

  const navigate = useNavigate(); // Initialize navigate
  const handleEditClick1 = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      navigate(-1); // Navigate back to the previous page
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfessionId(e.target.value);
    setErrors((prev) => ({
      ...prev,
      selectedProfessionId: "",
    }));
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      // personal_about_edu: !formData.personal_about_edu
      //   ? "About Education is required."
      //   : "",
      // personal_gross_ann_inc: !formData.personal_gross_ann_inc
      //   ? "Gross Annual Income is required."
      //   : "",
      // personal_work_pin: !formData.personal_work_pin
      //   ? "Work Pincode is required."
      //   : "",
      // personal_career_plans: !formData.personal_career_plans
      //   ? "Career Plans are required."
      //   : "",
      selectedEducationId: !selectedEducationId ? "Education is required." : "",
      selectedProfessionId: !selectedProfessionId
        ? "Profession is required."
        : "",
      // personal_company_name: !formData.personal_company_name
      //   ? "Company Nmae is required."
      //   : "",
      // personal_designation: !formData.personal_designation
      //   ? "Designation is required."
      //   : "",
      // personal_profess_details: !formData.personal_profess_details
      //   ? "Profession details are required."
      //   : "",
      // personal_business_name: !formData.personal_business_name
      //   ? "Business Name are required."
      //   : "",
      // personal_business_addresss: !formData.personal_business_addresss
      //   ? "Business Address are required."
      //   : "",
      // personal_nature_of_business: !formData.personal_nature_of_business
      //   ? "Nature of Business are required."
      //   : "",
      // selectedIncomeId: !selectedIncomeId ? "Income source is required." : "",
      // selectedWorkCountryId: !selectedWorkCountryId
      //   ? "Work Country is required."
      //   : "",
      // selectedWorkStateId: !selectedWorkStateId
      //   ? "Work State is required."
      //   : "",
    };

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      setErrors(newErrors); // Update the error state
      toast.error("Please fill all fields correctly.");
      return;
    }

    // //console.log("Logging all values before submission:");
    // //console.log("profile_id:", loginuser_profileId);
    // //console.log("selectedEducationId:", selectedEducationId);
    // //console.log("education_details:", formData.personal_edu_details);
    // //console.log("about_edu:", formData.personal_about_edu);
    // //console.log("selectedProfessionId:", selectedProfessionId);
    // //console.log("company_name:", formData.personal_company_name);
    // //console.log("designation:", formData.personal_designation);
    // //console.log("profession_details:", formData.personal_profess_details);
    // //console.log("business_name:", formData.personal_business_name);
    // //console.log("business_address:", formData.personal_business_addresss);
    // //console.log("nature_of_business:", formData.personal_nature_of_business);
    // //console.log("selectedIncomeId:", selectedIncomeId);
    // //console.log("actual_income:", formData.personal_gross_ann_inc);
    // //console.log("selectedWorkCountryId:", selectedWorkCountryId);
    // //console.log("selectedWorkStateId:", selectedWorkStateId);
    // //console.log("work_pincode:", formData.personal_work_pin);
    // //console.log("career_plans:", formData.personal_career_plans);

    const payload: EducationProfessionPayload  = {
      profile_id: loginuser_profileId,
      education_level: selectedEducationId,
      education_details: formData.personal_edu_details, // Default to an empty string if undefined
      about_edu: formData.personal_about_edu,
      profession: selectedProfessionId,
      // company_name: formData.personal_company_name,
      // designation: formData.personal_designation,
      // profession_details: formData.personal_profess_details,
      // business_name: formData.personal_business_name,
      // business_address: formData.personal_business_addresss,
      // nature_of_business: formData.personal_nature_of_business,
      annual_income: selectedIncomeId,
      actual_income: formData.personal_gross_ann_inc,
      work_country: selectedWorkCountryId,
      work_state: selectedWorkStateId,
      work_pincode: formData.personal_work_pin,
      career_plans: formData.personal_career_plans,
      field_ofstudy: fieldOfStudyy, // Add field of study
      degree: selectedDegrees.join(','), // Convert array to comma-separated string
      //other_degree: customDegree, // Only include if "Others" is selected
      other_degree: formData.persoanl_edu_other || "",

    };
// Conditionally add fields based on profession ID
if (selectedProfessionId === "1" || selectedProfessionId === "7" || selectedProfessionId === "6") {
  // For profession ID 1, 6, or 7 - include employment fields
  payload.company_name = formData.personal_company_name || educationProfessionDetails?.personal_company_name || "";
  payload.designation = formData.personal_designation || educationProfessionDetails?.personal_designation || "";
  payload.profession_details = formData.personal_profess_details || educationProfessionDetails?.personal_profess_details || "";
  
  // Set business-related fields to empty strings
  payload.business_name = "";
  payload.business_address = "";
  payload.nature_of_business = "";
} else if (selectedProfessionId === "2" || selectedProfessionId === "6") {
  // For profession ID 2 or 6 - include business fields
  payload.business_name = formData.personal_business_name || educationProfessionDetails?.personal_business_name || "";
  payload.business_address = formData.personal_business_addresss || educationProfessionDetails?.personal_business_addresss || "";
  payload.nature_of_business = formData.personal_nature_of_business || educationProfessionDetails?.personal_nature_of_business || "";
  
  // Set employment-related fields to empty strings
  payload.company_name = "";
  payload.designation = "";
  payload.profession_details = "";
} else {
  // For other professions, set all optional fields to empty strings
  payload.company_name = "";
  payload.designation = "";
  payload.profession_details = "";
  payload.business_name = "";
  payload.business_address = "";
  payload.nature_of_business = "";
}
    //console.log("Logging payload values before submission:", payload);

    try {
      const response = await apiClient.post(
        "/auth/update_myprofile_education/",
        payload
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setRefreshData((prev) => !prev); // Trigger re-fetch of data

        setEducationProfessionDetails((prevState) => ({
          ...prevState!,
          ...formData,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating details:", error);

      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response.data);
      }
      toast.error(
        "Failed to update education and professional details. Please try again."
      );
    }
  };

  // Modify the handleDegreeChangeMultiSelect function
  const handleDegreeChangeMultiSelect = (selectedOptions: any) => {
    const degreeIds = selectedOptions.map((option: any) => option.value);
    setSelectedDegrees(degreeIds);
    // Check if "Others" (degeree_id: 86) is selected
    const othersSelected = selectedOptions.some(
      (option: any) => option.value === 86 // Assuming 86 is the ID for "Others"
    );
    setIsOthersSelected(othersSelected);
    // Clear other education if "Others" is deselected
    if (!othersSelected) {
      setFormData(prev => ({ ...prev, persoanl_edu_other: "" }));
    }
  };

  // // Define the handler function (outside the component or inside, depending on your preference)
  // const handleCustomDegreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setCustomDegree(value);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     other_degree: value,
  //   }));
  // };


  const handleCustomDegreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomDegree(value);
    setFormData(prevState => ({
      ...prevState,
      persoanl_edu_other: value,
    }));
  };


  if (!educationProfessionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5  max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2  ">
        Education & Profession Details
        <MdModeEdit
          className="text-2xl text-main ml-2 cursor-pointer max-sm:text-base"
          onClick={handleEditClick}
        />
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Education Level:
                <select
                  name="personal_edu_name"
                  value={selectedEducationId ?? ""}
                  onChange={handleEducationChange}
                  className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder
                                        ${errors.selectedEducationId
                      ? "border-red-500"
                      : "focus:outline-none"
                    }`} // Conditional styling for error
                >
                  <option value="" disabled selected>
                    Select Education Level
                  </option>
                  {educations.map((education) => (
                    <option
                      key={education.education_id}
                      value={education.education_id}
                    >
                      {education.education_description}
                    </option>
                  ))}
                </select>
                {errors.selectedEducationId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedEducationId}
                  </p>
                )}
              </label>

              {["1", "2", "3", "4"].includes(selectedEducationId as string) && (
                <>
                  <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                    Field of Study:
                    <select
                      name="fieldOfStudy"

                      value={fieldOfStudyy}
                      onChange={handleFieldOfStudyChange}
                      className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder`}
                    >
                      <option value="" disabled selected>
                        Select Field of Study
                      </option>
                      {FieldofStudy.map((study) => (
                        <option key={study.study_id} value={study.study_id}>
                          {study.study_description}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                    Specific Field:
                    {Degree.length > 0 ? (
                      <Select
                        isMulti
                        options={Degree.map((option) => ({
                          value: option.degeree_id,
                          label: option.degeree_description,
                        }))}
                        value={Degree
                          .filter(degree => selectedDegrees.includes(degree.degeree_id))
                          .map(degree => ({
                            value: degree.degeree_id,
                            label: degree.degeree_description
                          }))
                        }
                        onChange={handleDegreeChangeMultiSelect}
                      />
                    ) : (
                      <input
                        type="text"
                        className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
                        placeholder="Enter your degree"
                        value={customDegree}
                        onChange={(e) => setCustomDegree(e.target.value)}
                      />
                    )}
                    {isOthersSelected && (
                      <div className="mt-4">
                        <label htmlFor="customDegree" className="block text-gray-700 font-medium mb-2">
                          Other Education
                        </label>
                        <input
                          type="text"
                          id="persoanl_edu_other"
                          name="persoanl_edu_other"
                          className="outline-none w-full text-placeHolderColor px-4 py-[8.5px] border border-ashBorder rounded"
                          placeholder="Enter Specific field"
                          value={formData.persoanl_edu_other || ""}
                          // onChange={(e) => setCustomDegree(e.target.value)}
                          onChange={handleCustomDegreeChange} // Cleaner and reusable
                        />
                      </div>
                    )}
                  </label>
                </>
              )}
              {/* <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Education Details:
                <input
                  type="text"
                  name="personal_edu_details"
                  value={formData.personal_edu_details || ""}
                  onChange={handleInputChange}
                  className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                />
              </label> */}
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                About Education:
                <input
                  name="personal_about_edu"
                  value={formData.personal_about_edu || ""}
                  // onChange={handleInputChange}
                  // className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorderfocus:border-blue-500"
                  onChange={(e) => {
                    handleInputChange(e); // Handle input change
                    setErrors((prev) => ({ ...prev, personal_about_edu: "" })); // Clear the error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder`} // Conditional styling
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Profession:
                <select
                  name="personal_profession_name"
                  value={selectedProfessionId ?? ""}
                  onChange={(e) => {
                    handleProfessionChange(e); // Handle change event
                    setErrors((prev) => ({
                      ...prev,
                      selectedProfessionId: "",
                    })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder
                                        ${errors.selectedProfessionId
                      ? "border-red-500"
                      : "focus:outline-none"
                    }`} // Conditional styling
                >
                  <option value="">Select Profession </option>
                  {profession.map((profession) => (
                    <option
                      key={profession.Profes_Pref_id}
                      value={profession.Profes_Pref_id}
                    >
                      {profession.Profes_name}
                    </option>
                  ))}
                </select>
                {errors.selectedProfessionId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedProfessionId}
                  </p>
                )}
              </label>

              {/* Conditionally render the company name, designation, and profession details */}
              {(selectedProfessionId === "1" ||
                selectedProfessionId === "7" ||
                selectedProfessionId === "6") && (

                  <div className="mt-4">

                    <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Company Name
                      <input
                        name="personal_company_name"
                       // value={formData.personal_company_name || ""}
                       value={formData.personal_company_name || educationProfessionDetails?.personal_company_name || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_company_name: "",
                          })); // Clear the error on change
                        }}
                        // className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                        //                 ${errors.personal_company_name
                        //     ? "border-red-500"
                        //     : "focus:border-blue-500"
                        //   }`} // Conditional styling
                         className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                      />
                      {/* {errors.personal_company_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.personal_company_name}
                        </p>
                      )} */}
                    </label>


                    <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Designation
                      <input
                        name="personal_designation"
                        //value={formData.personal_designation || ""}
                        value={formData.personal_designation || educationProfessionDetails?.personal_designation || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_designation: "",
                          })); // Clear the error on change
                        }}
                        className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                      />
                    </label>

                    <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Profession Details
                      <input
                        name="personal_profess_details"
                       // value={formData.personal_profess_details || ""}
                       value={formData.personal_profess_details || educationProfessionDetails?.personal_profess_details || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_company_name: "",
                          })); // Clear the error on change
                        }}
                   className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                      />
                    </label>
                  </div>
                )}

              {(selectedProfessionId === "6" ||
                selectedProfessionId === "2") && (
                  <div className="mt-4">

                    {/* <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Business Name
                      <input
                        name="personal_business_name"
                        value={formData.personal_business_name || ""}
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_business_name: "",
                          })); // Clear the error on change
                        }}
                      />
                    </label> */}
                     <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Business Name
                      <input
                        name="personal_business_name"
                        //value={formData.personal_business_name || ""}
                        value={formData.personal_business_name || educationProfessionDetails?.personal_business_name || ""}
                        // onChange={handleInputChange}
                        // className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorderfocus:border-blue-500"
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_business_name: "",
                          })); // Clear the error on change
                        }}
                        className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                      />
                    </label>

                    <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Business Address
                      <input
                        name="personal_business_addresss"
                        //value={formData.personal_business_addresss || ""}
                        value={formData.personal_business_addresss || educationProfessionDetails?.personal_business_addresss || ""}
                        // onChange={handleInputChange}
                        // className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorderfocus:border-blue-500"
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_business_addresss: "",
                          })); // Clear the error on change
                        }}
                        className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                      />
                    </label>


                    <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                      Nature of Business
                      <input
                        name="personal_nature_of_business"
                        //value={formData.personal_nature_of_business || ""}
                        value={formData.personal_nature_of_business || educationProfessionDetails?.personal_nature_of_business || ""}
                        // onChange={handleInputChange}
                        // className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorderfocus:border-blue-500"
                        onChange={(e) => {
                          handleInputChange(e); // Handle input change
                          setErrors((prev) => ({
                            ...prev,
                            personal_nature_of_business: "",
                          })); // Clear the error on change
                        }}
                         className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder"
                      />
                    </label>
                  </div>
                )}

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Annual Income:
                <select
                  name="personal_ann_inc_name"
                  value={selectedIncomeId ?? ""}
                  onChange={(e) => {
                    handleIncomeChange(e); // Handle change event
                    setErrors((prev) => ({ ...prev, selectedIncomeId: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder`} // Conditional styling
                >
                  <option value="">Select Annual Income</option>
                  {annualIncomes.map((income) => (
                    <option key={income.income_id} value={income.income_id}>
                      {income.income_description}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Gross Annual Income:
                <input
                  type="text"
                  name="personal_gross_ann_inc"
                  value={formData.personal_gross_ann_inc || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numeric values
                    if (/^\d*$/.test(value)) {
                      handleInputChange(e); // Call your input change handler
                      setErrors((prev) => ({
                        ...prev,
                        personal_gross_ann_inc: "",
                      })); // Clear error on change
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder`} // Conditional styling
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Work Country:
                <select
                  name="workCountryId"
                  value={selectedWorkCountryId}
                  onChange={(e) => {
                    handleWorkCountryChange(e);
                    setErrors((prev) => ({
                      ...prev,
                      selectedWorkCountryId: "",
                    })); // Clear error on change3
                  }}
                  className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder`} // Conditional styling
                >
                  <option value="">Select Work Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
              </label>

              {showStateTextbox ? (
                <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                  Work State:
                  <input
                    type="text"
                    value={workStateInput}
                    onChange={(e) => {
                      setWorkStateInput(e.target.value);
                      setFormData((prevState) => ({
                        ...prevState,
                        personal_work_sta_name: e.target.value,
                      }));
                    }}
                    className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder`}
                    placeholder="Enter Work State"
                  />
                </label>
              ) : (
                <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                  Work State:
                  <select
                    name="workStateId"
                    value={selectedWorkStateId}
                    onChange={(e) => {
                      handleStateChange(e);
                      setErrors((prev) => ({
                        ...prev,
                        selectedWorkStateId: "",
                      })); // Clear error on change
                    }}
                    className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder`}
                  >
                    <option value="">Select Work State</option>
                    {states.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Work Pincode:
                <input
                  type="text"
                  name="personal_work_pin"
                  value={formData.personal_work_pin || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numeric values up to 6 digits
                    if (/^\d{0,6}$/.test(value)) {
                      handleInputChange(e); // Call your input change handler
                      setErrors((prev) => ({ ...prev, personal_work_pin: "" })); // Clear error on change
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder`} // Conditional styling
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Career Plans:
                <input
                  name="personal_career_plans"
                  value={formData.personal_career_plans || ""}
                  // onChange={handleInputChange}
                  // className="font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorderfocus:border-blue-500"
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({
                      ...prev,
                      personal_career_plans: "",
                    })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder`} // Conditional styling
                />
              </label>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end items-center space-x-5 max-sm:flex-col">
              <button
                type="button"
                onClick={handleEditClick1}
                className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
              >
                Update Changes
              </button>
            </div>
          )}
        </form>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Education Level:
                <span className="font-normal">
                  {educationProfessionDetails.personal_edu_name|| "N/A"}
                </span>
              </h5>
              {educationProfessionDetails.persoanl_field_ofstudy_name && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Field of Study:
                  <span className="font-normal">
                    {educationProfessionDetails.persoanl_field_ofstudy_name|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.persoanl_degree && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Specific Field:
                  <span className="font-normal">
                    {educationProfessionDetails.persoanl_degree_name|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.persoanl_edu_other && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Other Education:
                  <span className="font-normal">
                    {educationProfessionDetails.persoanl_edu_other|| "N/A"}
                  </span>
                </h5>
              )}
              {/* <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Education Details:
                <span className="font-normal">
                  {educationProfessionDetails.personal_edu_details}
                </span>
              </h5> */}
              {educationProfessionDetails.personal_about_edu && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  About Education:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_about_edu|| "N/A"}
                  </span>
                </h5>
              )}
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Profession:
                <span className="font-normal">
                  {educationProfessionDetails.personal_profession_name|| "N/A"}
                </span>
              </h5>
              {educationProfessionDetails.personal_company_name && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Company Name:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_company_name|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.personal_designation && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Designation:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_designation|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.personal_profess_details && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Profession Details:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_profess_details|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.personal_business_name && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Business Name:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_business_name|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.personal_business_addresss && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Business Address:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_business_addresss|| "N/A"}
                  </span>
                </h5>
              )}
              {educationProfessionDetails.personal_nature_of_business && (
                <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                  Nature of Buisness:
                  <span className="font-normal">
                    {educationProfessionDetails.personal_nature_of_business|| "N/A"}
                  </span>
                </h5>
              )}
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Annual Income:
                <span className="font-normal">
                  {educationProfessionDetails.personal_ann_inc_name|| "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Gross Annual Income:
                <span className="font-normal">
                  {educationProfessionDetails.personal_gross_ann_inc|| "N/A"}
                </span>
              </h5>
            </div>
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Work Country:
                <span className="font-normal">
                  {educationProfessionDetails.personal_work_coun_name|| "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Work State:
                <span className="font-normal">
                  {educationProfessionDetails.personal_work_sta_name|| "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Work Pincode:
                <span className="font-normal">
                  {educationProfessionDetails.personal_work_pin|| "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Career Plans:
                <span className="font-normal">
                  {educationProfessionDetails.personal_career_plans|| "N/A"}
                </span>
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
