
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NotifyError, NotifySuccess } from "../../Toast/ToastNotification";
import apiClient from "../../../API";

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
  education: z
    .array(z.string())
    .nonempty("Please select at least one education option."),
  profession: z
    .array(z.string())
    .nonempty("Please select at least one profession option."),
  income: z
    .array(z.string())
    .nonempty("Please select at least one income option.")
    .refine(
      (items) => items.join(",").length <= 50,
      "Please select a maximum of 20 annual incomes."
    ),
  rahuKetuDhosam: z.string().nonempty("Please select Rahu/Ketu Dhosam option."),
  chevvaiDhosam: z.string().nonempty("Please select Chevvai Dhosam option."),
  foreignInterest: z
    .string()
    .nonempty("Please select Foreign Interest option."),
});

// Define types
interface Option {
  id: string;
  name: string;
}

type ProfileVisibilityForm = z.infer<typeof schema>;

export const ProfileVisibility: React.FC = () => {
  // State to hold options
  const [educationOptions, setEducationOptions] = useState<Option[]>([]);
  const [professionOptions, setProfessionOptions] = useState<Option[]>([]);
  const [incomeOptions, setIncomeOptions] = useState<Option[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
  const incomeValues = watch("income") || [];

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
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

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
        setValue("education", profileData.visibility_education?.split(",") || []);
        setValue("profession", profileData.visibility_profession?.split(",") || []);
        setValue("income", profileData.visibility_anual_income?.split(",") || []);
        setValue("rahuKetuDhosam", profileData.visibility_ragukethu || "");
        setValue("chevvaiDhosam", profileData.visibility_chevvai || "");
        setValue(
          "foreignInterest",
          profileData.visibility_foreign_interest || ""
        );
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [setValue]);

  // Toggle all checkboxes in a section
  const toggleAllCheckboxes = (
    field: "education" | "profession" | "income",
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
        visibility_anual_income: data.income.join(","),
        visibility_ragukethu: data.rahuKetuDhosam,
        visibility_chevvai: data.chevvaiDhosam,
        visibility_foreign_interest: data.foreignInterest,
        status: 1,
      };

      console.log("API payload:", payload);

      const response = await apiClient.post(
        "/auth/Update_profile_visibility/",
        payload
      );

      console.log("API response:", response.data);

      NotifySuccess(response.data.message || "Profile visibility updated successfully");
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

      const isAllAnnualIncomeSelected = incomeOptions.length > 0 &&
    incomeOptions.every((opt) => incomeValues.includes(opt.id));

  return (
    <div>
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
                    checked={professionValues.includes(option.id)}
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

          {/* Income */}
          <div className="mb-5">
            <div
              className="flex justify-between items-center mb-2 cursor-pointer"
              onClick={() => toggleAllCheckboxes("income", incomeOptions)}
            >
                <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent div's onClick twice
                    toggleAllCheckboxes("income", incomeOptions);
                  }}
                  checked={isAllAnnualIncomeSelected}
                  readOnly
                  className="cursor-pointer"
                />
              <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
                Annual Income
              </h4>
              </div>
              {/* <span className="text-sm text-blue-500">
                {incomeValues.length === incomeOptions.length 
                  ? "Unselect All" 
                  : "Select All"}
              </span> */}
            </div>
            <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
              {incomeOptions.map((option) => (
                <div key={option.id} className="flex items-center mb-2 w-full">
                  <input
                    type="checkbox"
                    id={`income-${option.id}`}
                    value={option.id}
                    {...register("income")}
                    checked={incomeValues.includes(option.id)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`income-${option.id}`}
                    className="text-[20px] text-ash cursor-pointer"
                  >
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.income && (
              <span className="text-red-500">{errors.income.message}</span>
            )}
            {formErrors.visibility_anual_income && (
              <span className="text-red-500">
                {formErrors.visibility_anual_income}
              </span>
            )}
          </div>

          {/* Rest of the form sections (radio buttons) remain the same */}
          {/* Rahu/Ketu Dhosam */}
          <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
              Rahu/Ketu Dhosam
            </h4>
            <div className="flex space-x-4">
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="YES"
                  {...register("rahuKetuDhosam")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="NO"
                  {...register("rahuKetuDhosam")}
                  className="mr-2"
                />
                No
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
                  value="YES"
                  {...register("chevvaiDhosam")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="NO"
                  {...register("chevvaiDhosam")}
                  className="mr-2"
                />
                No
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
                  value="YES"
                  {...register("foreignInterest")}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="NO"
                  {...register("foreignInterest")}
                  className="mr-2"
                />
                No
              </label>
              <label className="inline-flex items-center text-ash">
                <input
                  type="radio"
                  value="BOTH"
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