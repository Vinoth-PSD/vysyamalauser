import React, { useEffect, useState } from "react";
//import axios from "axios";
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
    .nonempty("Please select at least one income option."),
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileVisibilityForm>({
    resolver: zodResolver(schema),
  });

  const fetchOptions = async () => {
    try {
      const educationRes = await apiClient.post(
        "/auth/Get_Highest_Education/"
      );
      /////console.log("Education Response:", educationRes.data); // Log to check structure

      // Convert object to array using Object.values()
      setEducationOptions(
        Object.values(educationRes.data).map((item: any) => ({
          id: item.education_id,
          name: item.education_description,
        }))
      );

      const professionRes = await apiClient.post(
        "/auth/Get_Profes_Pref/"
      );
      ////console.log("Profession Response:", professionRes.data);

      setProfessionOptions(
        Object.values(professionRes.data).map((item: any) => ({
          id: item.Profes_Pref_id,
          name: item.Profes_name,
        }))
      );

      const incomeRes = await apiClient.post(
        "/auth/Get_Annual_Income/"
      );
      ////console.log("Income Response:", incomeRes.data);

      setIncomeOptions(
        Object.values(incomeRes.data).map((item: any) => ({
          id: item.income_id,
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
        ////console.log("Get_profile_visibility",profileRes)

        // Prefill form values
        setValue("ageFrom", profileData.visibility_age_from || "");
        setValue("ageTo", profileData.visibility_age_to || "");
        setValue("heightFrom", profileData.visibility_height_from || "");
        setValue("heightTo", profileData.visibility_height_to || "");
        setValue("education", profileData.visibility_education.split(","));
        setValue("profession", profileData.visibility_profession.split(","));
        setValue("income", profileData.visibility_anual_income.split(","));
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

  const onSubmit = async (data: ProfileVisibilityForm) => {
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
//console.log(payload,"Update_profile_visibility")
    try {
      const response = await apiClient.post(
        "/auth/Update_profile_visibility/",
        payload
      );
      alert(response.data.message || "Profile visibility updated successfully");
      NotifySuccess( "Profile visibility updated successfully");
    } catch (error) {
      console.error("Error updating profile visibility:", error);
      NotifyError("Error updating profile visibility");
    }
  };

  const [selectAllEducation, setSelectAllEducation] = useState(false);
const [selectAllProfession, setSelectAllProfession] = useState(false);
const [selectAllIncome, setSelectAllIncome] = useState(false);

const watchedEducation = watch("education");
const watchedProfession = watch("profession");
const watchedIncome = watch("income");
  
useEffect(() => {
  setSelectAllEducation(watchedEducation?.length === educationOptions.length && educationOptions.length > 0);
}, [watchedEducation, educationOptions]);

useEffect(() => {
  setSelectAllProfession(watchedProfession?.length === professionOptions.length && professionOptions.length > 0);
}, [watchedProfession, professionOptions]);

useEffect(() => {
  setSelectAllIncome(watchedIncome?.length === incomeOptions.length && incomeOptions.length > 0);
}, [watchedIncome, incomeOptions]);




useEffect(() => {
  setSelectAllEducation(watchedEducation?.length === educationOptions.length && educationOptions.length > 0);
}, [watchedEducation, educationOptions]);

useEffect(() => {
  setSelectAllProfession(watchedProfession?.length === professionOptions.length && professionOptions.length > 0);
}, [watchedProfession, professionOptions]);

useEffect(() => {
  setSelectAllIncome(watchedIncome?.length === incomeOptions.length && incomeOptions.length > 0);
}, [watchedIncome, incomeOptions]);


const handleSelectAllEducation = () => {
  const newSelectAll = !selectAllEducation;
  setSelectAllEducation(newSelectAll);
  
  if (newSelectAll) {
    const allEducationIds = educationOptions.map(option => option.id);
    if (allEducationIds.length > 0) {
      setValue("education", allEducationIds as [string, ...string[]]);
    }
  } else {
    setValue("education", [] as unknown as [string, ...string[]]);
  }
};

const handleSelectAllProfession = () => {
  const newSelectAll = !selectAllProfession;
  setSelectAllProfession(newSelectAll);
  
  if (newSelectAll) {
    const allProfessionIds = professionOptions.map(option => option.id);
    if (allProfessionIds.length > 0) {
      setValue("profession", allProfessionIds as [string, ...string[]]);
    }
  } else {
    setValue("profession", [] as unknown as [string, ...string[]]);
  }
};

const handleSelectAllIncome = () => {
  const newSelectAll = !selectAllIncome;
  setSelectAllIncome(newSelectAll);
  
  if (newSelectAll) {
    const allIncomeIds = incomeOptions.map(option => option.id);
    if (allIncomeIds.length > 0) {
      setValue("income", allIncomeIds as [string, ...string[]]);
    }
  } else {
    setValue("income", [] as unknown as [string, ...string[]]);
  }
};
  return (
    <div>
      <div>
        <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2">
          Profile Visibility
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
         
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
          {/* <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px] cursor-pointer"   onClick={handleSelectAllEducation}>
              Education
            </h4>
            <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
              {educationOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center mb-2 w-full"
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    {...register("education")}
                    className="mr-2"
                  />
                  <label className="text-[20px] text-ash">{option.name}</label>
                </div>
              ))}
            </div>
            {errors.education && (
              <span className="text-red-500">{errors.education.message}</span>
            )}
          </div> */}


          <div className="mb-5">
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      checked={selectAllEducation}
      onChange={handleSelectAllEducation}
      className="mr-2"
    />
    <h4 
      className="text-[20px] text-primary font-semibold max-md:text-[18px] cursor-pointer"
      onClick={handleSelectAllEducation}
    >
      Education
    </h4>
  </div>
  <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
    {educationOptions.map((option) => (
      <div key={option.id} className="flex items-center mb-2 w-full">
        <input
          type="checkbox"
          id={`education-${option.id}`}
          value={option.id}
          checked={watchedEducation?.includes(option.id) || false}
          onChange={(e) => {
            const currentValues = watchedEducation || [];
            const newValue = e.target.checked
              ? [...currentValues, option.id]
              : currentValues.filter(id => id !== option.id);
            
            setValue("education", newValue as [string, ...string[]]);
          }}
          className="mr-2"
        />
        <label htmlFor={`education-${option.id}`} className="text-[20px] text-ash">
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
          {/* <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px] cursor-pointer"   onClick={handleSelectAllProfession}>
              Profession
            </h4>
            <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
              {professionOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center mb-2 w-full"
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    {...register("profession")}
                    className="mr-2"
                  />
                  <label className="text-[20px] text-ash">{option.name}</label>
                </div>
              ))}
            </div>
            {errors.profession && (
              <span className="text-red-500">{errors.profession.message}</span>
            )}
          </div> */}
<div className="mb-5">
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      checked={selectAllProfession}
      onChange={handleSelectAllProfession}
      className="mr-2"
    />
    <h4 
      className="text-[20px] text-primary font-semibold max-md:text-[18px] cursor-pointer"
      onClick={handleSelectAllProfession}
    >
      Profession
    </h4>
  </div>
  <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
    {professionOptions.map((option) => (
      <div key={option.id} className="flex items-center mb-2 w-full">
        <input
          type="checkbox"
          id={`profession-${option.id}`}
          value={option.id}
          checked={watchedProfession?.includes(option.id) || false}
          onChange={(e) => {
            const currentValues = watchedProfession || [];
            const newValue = e.target.checked
              ? [...currentValues, option.id]
              : currentValues.filter(id => id !== option.id);
            
            setValue("profession", newValue as [string, ...string[]]);
          }}
          className="mr-2"
        />
        <label htmlFor={`profession-${option.id}`} className="text-[20px] text-ash">
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
          {/* <div className="mb-5">
            <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px] cursor-pointer" onClick={handleSelectAllIncome}>
              Annual Income
            </h4>
            <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
              {incomeOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center mb-2 w-full"
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    {...register("income")}
                    className="mr-2"
                  />
                  <label className="text-[20px] text-ash">{option.name}</label>
                </div>
              ))}
            </div>
            {errors.income && (
              <span className="text-red-500">{errors.income.message}</span>
            )}
          </div> */}

          <div className="mb-5">
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      checked={selectAllIncome}
      onChange={handleSelectAllIncome}
      className="mr-2"
    />
    <h4 
      className="text-[20px] text-primary font-semibold max-md:text-[18px] cursor-pointer"
      onClick={handleSelectAllIncome}
    >
      Annual Income
    </h4>
  </div>
  <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
    {incomeOptions.map((option) => (
      <div key={option.id} className="flex items-center mb-2 w-full">
        <input
          type="checkbox"
          id={`income-${option.id}`}
          value={option.id}
          checked={watchedIncome?.includes(option.id) || false}
          onChange={(e) => {
            const currentValues = watchedIncome || [];
            const newValue = e.target.checked
              ? [...currentValues, option.id]
              : currentValues.filter(id => id !== option.id);
            
            setValue("income", newValue as [string, ...string[]]);
          }}
          className="mr-2"
        />
        <label htmlFor={`income-${option.id}`} className="text-[20px] text-ash">
          {option.name}
        </label>
      </div>
    ))}
  </div>
  {errors.income && (
    <span className="text-red-500">{errors.income.message}</span>
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
