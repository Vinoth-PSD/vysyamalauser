import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NotifyError, NotifySuccess, ToastNotification } from "../../Toast/ToastNotification";
import apiClient from "../../../API";
import { IoMdArrowDropdown } from "react-icons/io";
import Select from 'react-select';

// Define Zod schema for validation
// Define Zod schema for validation
const schema = z.object({
  ageFrom: z
    .string()
    .optional()
    .refine((value) => !value || /^\d+$/.test(value), {
      message: "Age From must be a number",
    }),
  ageTo: z
    .string()
    .optional()
    .refine((value) => !value || /^\d+$/.test(value), {
      message: "Age To must be a number",
    }),
  heightFrom: z.string().optional(),
  heightTo: z.string().optional(),
  education: z.array(z.string()).optional().default([]),
  profession: z.array(z.string()).optional().default([]),
  incomeMin: z.string().optional(),
  incomeMax: z.string().optional(),
  familyStatus: z.array(z.string()).optional().default([]),
  rahuKetuDhosam: z.string().optional(),
  chevvaiDhosam: z.string().optional(),
  foreignInterest: z.string().optional(),
  fieldOfStudy: z.array(z.string()).optional().default([]),
  degree: z.array(z.string()).optional().default([]),
});


// Define types
interface Option {
  id: string;
  name: string;
}
interface FieldOfStudy {
  study_id: number;
  study_description: string;
}

interface Degree {
  degeree_id: number;
  degeree_description: string;
}

interface FamilyStatus {
  family_status_id: number;
  family_status_name: string;
}

type ProfileVisibilityForm = z.infer<typeof schema>;

export const ProfileVisibility: React.FC = () => {
  // State to hold options
  const [educationOptions, setEducationOptions] = useState<Option[]>([]);
  const [professionOptions, setProfessionOptions] = useState<Option[]>([]);
  const [incomeOptions, setIncomeOptions] = useState<Option[]>([]);
  // const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [, setFormErrors] = useState<Record<string, string>>({});
  const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
  const [selectedMinIncome, setSelectedMinIncome] = useState<string>("");
  const [selectedMaxIncome, setSelectedMaxIncome] = useState<string>("");
  const [degreeOptions, setDegreeOptions] = useState<Degree[]>([]);
  const [familyStatusOptions, setFamilyStatusOptions] = useState<FamilyStatus[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileVisibilityForm>({
    resolver: zodResolver(schema),
  });

  // Watch the checkbox values
  const educationValues = watch("education") || [];
  const professionValues = watch("profession") || [];
  const fieldOfStudyValues = watch("fieldOfStudy") || [];
  const degreeValues = watch("degree") || [];
  const familyStatusValues = watch("familyStatus") || [];

  const fetchOptions = async () => {
    try {
      const educationRes = await apiClient.post("/auth/Get_Highest_Education/");
      setEducationOptions(
        Object.values(educationRes.data).map((item: any) => ({
          id: item.education_id.toString(),
          name: item.education_description,
        }))
      );

      const professionRes = await apiClient.post("/auth/Get_Profes_Pref/");
      setProfessionOptions(
        Object.values(professionRes.data).map((item: any) => ({
          id: item.Profes_Pref_id.toString(),
          name: item.Profes_name,
        }))
      );

      const incomeRes = await apiClient.post("/auth/Get_Annual_Income/");
      setIncomeOptions(
        Object.values(incomeRes.data).map((item: any) => ({
          id: item.income_id.toString(),
          name: item.income_description,
        }))
      );

      // const familyStatusRes = await apiClient.post("/auth/Get_Family_Status/");
      // setFamilyStatusOptions(
      //   Object.values(familyStatusRes.data).map((item: any) => ({
      //     family_status_id: item.family_status_id,
      //     family_status_name: item.family_status_name,
      //   }))
      // );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      try {
        const response = await apiClient.post("/auth/Get_Field_ofstudy/");
        const options = Object.values(response.data) as FieldOfStudy[];
        setFieldOfStudyOptions(options);
      } catch (error) {
        console.error("Error fetching Field of Study options:", error);
      }
    };
    const fetchDegrees = async () => {
      try {
        const response = await apiClient.get("/auth/pref_degree_list/");
        // Check the actual response structure
        console.log('Degree API response:', response.data);

        // Adjust based on actual API response structure
        const options = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data) as Degree[];

        setDegreeOptions(options);
      } catch (error) {
        console.error("Error fetching Degree options:", error);
      }
    };

    const fetchfamilystatus = async () => {
      try {
        const response = await apiClient.post("/auth/Get_FamilyStatus/");
        // Check the actual response structure
        console.log('Degree API response:', response.data);

        // Adjust based on actual API response structure
        const options = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data) as FamilyStatus[];

        setFamilyStatusOptions(options);
      } catch (error) {
        console.error("Error fetching Degree options:", error);
      }
    };

    fetchfamilystatus();
    fetchDegrees();
    fetchFieldOfStudy();
  }, []);


  useEffect(() => {
    fetchOptions();

    // Fetch profile data to prefill the form
    const fetchProfileData = async () => {
      try {
        const profileRes = await apiClient.post(
          "/auth/Get_profile_visibility/",
          {
            profile_id: localStorage.getItem("loginuser_profile_id"),
          }
        );
        const profileData = profileRes.data.data[0];

        // Prefill form values
        setValue("ageFrom", profileData.visibility_age_from || "");
        setValue("ageTo", profileData.visibility_age_to || "");
        setValue("heightFrom", profileData.visibility_height_from || "");
        setValue("heightTo", profileData.visibility_height_to || "");
        setValue("profession", profileData.visibility_profession?.split(",") || []);
        setValue("education", profileData.visibility_education?.split(",") || []);
        setValue("fieldOfStudy", profileData.visibility_field_of_study?.split(",") || []);
        setValue("degree", profileData.degree?.split(",") || []);
        // setValue("income", profileData.visibility_anual_income?.split(",") || []);
        setValue("familyStatus", profileData.visibility_family_status?.split(",") || []);
        setValue("rahuKetuDhosam", profileData.visibility_ragukethu || "");
        setValue("chevvaiDhosam", profileData.visibility_chevvai || "");
        setValue(
          "foreignInterest",
          profileData.visibility_foreign_interest || ""
        );
        // Handle income values - split into min and max
        const incomeValues = profileData.visibility_anual_income || "";
        const incomeMaxValue = profileData.visibility_anual_income_max || "";

        if (incomeValues.length > 0) {
          setSelectedMinIncome(incomeValues[0]);
          setValue("incomeMin", incomeValues[0]);
        }

        if (incomeMaxValue) {
          setSelectedMaxIncome(incomeMaxValue);
          setValue("incomeMax", incomeMaxValue);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [setValue]);

  // Toggle all checkboxes in a section
  const toggleAllCheckboxes = (
    field: "education" | "profession" | "fieldOfStudy" | "familyStatus",
    options: Option[]
  ) => {
    const currentValues = watch(field) || [];
    const allValues = options.map((opt) => opt.id);

    if (currentValues.length === allValues.length) {
      setValue(field, [] as unknown as [string, ...string[]]);
    } else {
      setValue(field, allValues as [string, ...string[]]);
    }
  };

  const handleMinIncomeChange = (value: string) => {
    setSelectedMinIncome(value);
    setValue("incomeMin", value);
  };

  const handleMaxIncomeChange = (value: string) => {
    setSelectedMaxIncome(value);
    setValue("incomeMax", value);
  };

  const handleDegreeChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setValue("degree", selectedIds);
  };

  const getSelectedDegreeOptions = () => {
    return degreeOptions
      .filter(degree => degreeValues.includes(degree.degeree_id.toString()))
      .map(degree => ({
        value: degree.degeree_id.toString(),
        label: degree.degeree_description
      }));
  };
  const onSubmit = async (data: ProfileVisibilityForm) => {
    try {
      // Log form data and errors to console
      console.log("Form submission data:", data);
      console.log("Form errors:", errors);

      const payload = {
        profile_id: localStorage.getItem("loginuser_profile_id"),
        visibility_age_from: data.ageFrom,
        visibility_age_to: data.ageTo,
        visibility_height_from: data.heightFrom,
        visibility_height_to: data.heightTo,
        visibility_education: data.education.join(","),
        visibility_profession: data.profession.join(","),
        // visibility_anual_income: data.income.join(","),
        visibility_anual_income: data.incomeMin || "", // Use min income
        visibility_anual_income_max: data.incomeMax || "", // Use max income
        visibility_family_status: data.familyStatus.join(","),
        visibility_ragukethu: data.rahuKetuDhosam,
        visibility_chevvai: data.chevvaiDhosam,
        visibility_foreign_interest: data.foreignInterest,
        visibility_field_of_study: data.fieldOfStudy.join(","), // new field
        degree: data.degree.join(","),
        status: 1,
      };

      console.log("API payload:", payload);

      const response = await apiClient.post(
        "/auth/Update_profile_visibility/",
        payload
      );

      console.log("API response:", response.data);

      if (response.status === 200 && response.data?.Status === 1) {
        NotifySuccess(response.data.message || "Profile visibility updated successfully");
      } else {
        NotifyError(response.data?.message || "Something went wrong");
      }

    } catch (error: any) {
      console.error("API error:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);

        if (error.response.data) {
          setFormErrors(error.response.data);
        }
      }

      NotifyError(error.response?.data?.message || "Error updating profile visibility");
    }
  };

  const isAllEducationSelected = educationOptions.length > 0 &&
    educationOptions.every((opt) => educationValues.includes(opt.id));

  const isAllProfessionSelected = professionOptions.length > 0 &&
    professionOptions.every((opt) => professionValues.includes(opt.id));

  const isAllFamilyStatusSelected = familyStatusOptions.length > 0 &&
    familyStatusOptions.every((opt) => familyStatusValues.includes(opt.family_status_id.toString()));

  return (
    <div>
      <ToastNotification />
      <div>
        <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2">
          Profile Visibility
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Age and Height sections remain the same as before */}
          <div className="flex justify-between items-center mb-5 max-2xl:flex-col max-2xl:items-start">
            {/* Age */}
            <div className="flex justify-center items-end gap-2 max-sm:flex-col">
              <div className="w-full">
                <label
                  htmlFor="ageFrom"
                  className="text-[20px] text-primary font-semibold block mb-2"
                >
                  Age
                </label>{" "}

                <input
                  type="text"
                  {...register("ageFrom")}
                  id="ageFrom"
                  placeholder="From"
                  className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
                />
                {errors.ageFrom && (
                  <span className="text-red-500">{errors.ageFrom.message}</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="ageTo"
                  className="text-[20px] text-primary font-semibold  mb-5  hidden"
                >
                  Age
                </label>{" "}

                <input
                  type="text"
                  id="ageTo"
                  {...register("ageTo")}
                  placeholder="To"
                  className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
                />
                {errors.ageTo && (
                  <span className="text-red-500">{errors.ageTo.message}</span>
                )}
              </div>
            </div>

            {/* Height */}
            <div className="flex justify-center items-end gap-2 max-sm:flex-col">
              <div>
                <label
                  htmlFor="fromHeight"
                  className="text-[20px] text-primary font-semibold block mb-3 "
                >
                  Height
                </label>{" "}

                <input
                  type="text"
                  id="fromHeight"
                  {...register("heightFrom")}
                  placeholder="From"
                  className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
                />
                {errors.heightFrom && (
                  <span className="text-red-500 block mt-0">
                    {errors.heightFrom.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="toHeight"
                  className="text-[20px] text-primary font-semibold invisible hidden"
                >
                  Height
                </label>{" "}
                <input
                  type="text"
                  // name="toHeight"
                  id="toHeight"
                  placeholder="To"
                  {...register("heightTo")}
                  className="outline-none w-fit px-4 py-1.5 border border-ashSecondary rounded"
                />
                {errors.heightTo && (
                  <span className="text-red-500 block mt-0">
                    {errors.heightTo.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profession */}
          <div className="mb-5">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleAllCheckboxes("profession", professionOptions)}
            >
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent div's onClick twice
                    toggleAllCheckboxes("profession", professionOptions);
                  }}
                  checked={isAllProfessionSelected}
                  readOnly
                  className="cursor-pointer"
                />
                <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
                  Profession
                </h4>
                {/* <span className="text-sm text-blue-500">
                {professionValues.length === professionOptions.length 
                  ? "Unselect All" 
                  : "Select All"}
              </span> */}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
              {professionOptions.map((option) => (
                <div key={option.id} className="flex items-center mb-2 w-full">
                  <input
                    type="checkbox"
                    id={`profession-${option.id}`}
                    value={option.id}
                    {...register("profession")}
                    //checked={professionValues.includes(option.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`profession-${option.id}`}
                    className="text-[20px] text-ash cursor-pointer"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.profession && (
              <span className="text-red-500">{errors.profession.message}</span>
            )}
          </div>

          {/* Education */}
          <div className="mb-5">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleAllCheckboxes("education", educationOptions)}
            >
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent div's onClick twice
                    toggleAllCheckboxes("education", educationOptions);
                  }}
                  checked={isAllEducationSelected}
                  readOnly
                  className="cursor-pointer"
                />
                <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
                  Education
                </h4>
              </div>
              {/* <span className="text-sm text-blue-500">
                {educationValues.length === educationOptions.length 
                  ? "Unselect All" 
                  : "Select All"}
              </span> */}
            </div>
            <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
              {educationOptions.map((option) => (
                <div key={option.id} className="flex items-center mb-2 w-full">
                  <input
                    type="checkbox"
                    id={`education-${option.id}`}
                    value={option.id}
                    {...register("education")}
                    checked={educationValues.includes(option.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`education-${option.id}`}
                    className="text-[20px] text-ash cursor-pointer"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.education && (
              <span className="text-red-500">{errors.education.message}</span>
            )}
          </div>

          {/* Field of Study */}
          <div className="mb-5">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleAllCheckboxes("fieldOfStudy", fieldOfStudyOptions.map(o => ({ id: o.study_id.toString(), name: o.study_description })))}
            >
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAllCheckboxes(
                      "fieldOfStudy",
                      fieldOfStudyOptions.map(o => ({ id: o.study_id.toString(), name: o.study_description }))
                    );
                  }}
                  checked={
                    fieldOfStudyOptions.length > 0 &&
                    fieldOfStudyOptions.every((opt) =>
                      fieldOfStudyValues.includes(opt.study_id.toString())
                    )
                  }
                  readOnly
                  className="cursor-pointer"
                />
                <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
                  Field of Study
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              {fieldOfStudyOptions.map((option) => (
                <div key={option.study_id} className="flex items-center mb-2 w-full">
                  <input
                    type="checkbox"
                    id={`fieldOfStudy-${option.study_id}`}
                    value={option.study_id}
                    {...register("fieldOfStudy")}
                    checked={fieldOfStudyValues.includes(option.study_id.toString())}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`fieldOfStudy-${option.study_id}`}
                    className="text-[20px] text-ash cursor-pointer"
                  >
                    {option.study_description}
                  </label>
                </div>
              ))}
            </div>
            {errors.fieldOfStudy && (
              <span className="text-red-500">{errors.fieldOfStudy.message}</span>
            )}
          </div>

          <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
              Degree
            </h4>
            <Select
              isMulti
              options={degreeOptions.map(degree => ({
                value: degree.degeree_id.toString(),
                label: degree.degeree_description,
              }))}
              value={getSelectedDegreeOptions()}
              onChange={handleDegreeChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Degrees"
            />
            {errors.degree && (
              <span className="text-red-500">{errors.degree.message}</span>
            )}
          </div>

          {/* Income */}
          <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-3 block">
              Annual Income
            </h4>
            <div className="flex space-x-4 mb-4">
              <div className="relative w-full">
                <select
                  {...register("incomeMin")}
                  className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                  value={selectedMinIncome}
                  onChange={(e) => handleMinIncomeChange(e.target.value)}
                >
                  <option value="">Select min Annual Income</option>
                  {incomeOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
                <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                {errors.incomeMin && <span className="text-red-500">{errors.incomeMin.message}</span>}
              </div>

              <div className="relative w-full">
                <select
                  {...register("incomeMax")}
                  className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                  value={selectedMaxIncome}
                  onChange={(e) => handleMaxIncomeChange(e.target.value)}
                >
                  <option value="">Select max Annual Income</option>
                  {incomeOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
                <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                {errors.incomeMax && (
                  <span className="text-red-500">{errors.incomeMax.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() =>
                toggleAllCheckboxes(
                  "familyStatus",
                  familyStatusOptions.map((f) => ({
                    id: f.family_status_id.toString(),
                    name: f.family_status_name,
                  }))
                )
              }

            >
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onClick={() =>
                    toggleAllCheckboxes(
                      "familyStatus",
                      familyStatusOptions.map((f) => ({
                        id: f.family_status_id.toString(),
                        name: f.family_status_name,
                      }))
                    )
                  }
                  checked={isAllFamilyStatusSelected}
                  readOnly
                  className="cursor-pointer"
                />
                <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
                  Family Status
                </h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              {familyStatusOptions.map((option) => (
                <div key={option.family_status_id} className="flex items-center mb-2 w-full">
                  <input
                    type="checkbox"
                    id={`familyStatus-${option.family_status_id}`}
                    value={option.family_status_id.toString()}
                    {...register("familyStatus")}
                    checked={familyStatusValues.includes(option.family_status_id.toString())}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`familyStatus-${option.family_status_id}`}
                    className="text-[20px] text-ash cursor-pointer"
                  >
                    {option.family_status_name}
                  </label>
                </div>
              ))}
            </div>
            {errors.familyStatus && (
              <span className="text-red-500">{errors.familyStatus.message}</span>
            )}
          </div>

          {/* Rahu/Ketu Dhosam */}
          <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
              Rahu/Ketu Dhosam
            </h4>
            <div className="flex space-x-4">
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="Yes"
                  {...register("rahuKetuDhosam")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="No"
                  {...register("rahuKetuDhosam")}
                  className="mr-2"
                />
                No
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="Both"
                  {...register("rahuKetuDhosam")}
                  className="mr-2"
                />
                Both
              </label>
            </div>
            {errors.rahuKetuDhosam && (
              <span className="text-red-500">
                {errors.rahuKetuDhosam.message}
              </span>
            )}
          </div>

          {/* Chevvai Dhosam */}
          <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
              Chevvai Dhosam
            </h4>
            <div className="flex space-x-4">
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="Yes"
                  {...register("chevvaiDhosam")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="No"
                  {...register("chevvaiDhosam")}
                  className="mr-2"
                />
                No
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="Both"
                  {...register("chevvaiDhosam")}
                  className="mr-2"
                />
                Both
              </label>
            </div>
            {errors.chevvaiDhosam && (
              <span className="text-red-500">
                {errors.chevvaiDhosam.message}
              </span>
            )}
          </div>

          {/* Foreign Interest */}
          <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
              Foreign Interest
            </h4>
            <div className="flex space-x-4">
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="Yes"
                  {...register("foreignInterest")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="No"
                  {...register("foreignInterest")}
                  className="mr-2"
                />
                No
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="Both"
                  {...register("foreignInterest")}
                  className="mr-2"
                />
                Both
              </label>
            </div>
            {errors.foreignInterest && (
              <span className="text-red-500">
                {errors.foreignInterest.message}
              </span>
            )}
          </div>
          <div className="flex justify-end items-center space-x-5">
            <button
              type="submit"
              className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer"
            >
              Update Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};