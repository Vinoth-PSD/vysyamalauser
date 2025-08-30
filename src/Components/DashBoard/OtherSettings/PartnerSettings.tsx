import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NotifyError, NotifySuccess, ToastNotification } from "../../Toast/ToastNotification";
import MatchingStars from "../../PartnerPreference/MatchingStars";
import apiClient from "../../../API";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";

// Define Zod schema for validation
const schema = z.object({
  fromAge: z
    .string()
    .nonempty("Age is required"),
  // .min(1, { message: "Required field" })
  // .refine((value) => /^\d+$/.test(value), {
  //   message: "Must be a number",
  // })
  // .transform((value) => parseInt(value, 10)),
  fromHeight: z
    .string()
    .nonempty("Height From is required")
    .refine((value) => /^\d+$/.test(value), {
      message: "Height From must be a number",
    }),
  toHeight: z
    .string()
    .nonempty("Height To is required")
    .refine((value) => /^\d+$/.test(value), {
      message: "Height To must be a number",
    }),
  education: z
    .array(z.string()).
    optional(),
  profession: z.array(z.string()).optional(),
  maritalstatus: z.array(z.string()).optional(),
  income: z.string().optional(),
  // income: z
  //   .array(z.string())
  //   .nonempty("Please select at least one income option.")
  //   .refine(
  //     (items) => items.join(",").length <= 50,
  //     "Please select a maximum of 20 annual incomes."
  //   ),
  annualIncomemax: z.string().optional(),
  rahuKetuDhosam: z.string().optional(),
  chevvaiDhosam: z.string().optional(),
  foreignInterest: z.string().optional(),
});

// Define types for form data and options
type PartnerSettingsForm = z.infer<typeof schema>;

interface Option {
  id: string;
  name: string;
}

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

export interface SelectedStarIdItem {
  id: string;
  rasi: string;
  star: string;
  label: string;
}

export const PartnerSettings: React.FC = () => {
  const [educationOptions, setEducationOptions] = useState<Option[]>([]);
  const [professionOptions, setProfessionOptions] = useState<Option[]>([]);
  const [incomeOptions, setIncomeOptions] = useState<Option[]>([]);
  const [maritalOptions, setMaritalOptions] = useState<Option[]>([]);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);
  const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
  const [prefilledStarRasiArray, setPrefilledStarRasiArray] = useState<string[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>([]);
  const [selectedMaxAnnualIncome, setSelectedMaxAnnualIncome] = useState<string[]>([]);
  const [_formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PartnerSettingsForm>({
    resolver: zodResolver(schema),
  });

  // Watch the checkbox values
  const educationValues = watch("education") || [];
  const professionValues = watch("profession") || [];
  const maritalValues = watch("maritalstatus") || [];
  const storedHeight = localStorage.getItem("userHeight") || "";
  // const storedGender =
  //   localStorage.getItem("gender") || sessionStorage.getItem("gender");

  const storedBirthStar = localStorage.getItem("selectedstar") || sessionStorage.getItem("selectedstar");
  const storedGender = localStorage.getItem("gender") || sessionStorage.getItem("gender");
  const storedRasi = localStorage.getItem("selectedRasi") || sessionStorage.getItem("selectedRasi");

  // Fetch all options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch education options
        const educationRes = await apiClient.post("/auth/Get_Highest_Education/");
        setEducationOptions(
          Object.values(educationRes.data).map((item: any) => ({
            id: item.education_id.toString(),
            name: item.education_description,
          }))
        );

        // Fetch profession options
        const professionRes = await apiClient.post("/auth/Get_Profes_Pref/");
        setProfessionOptions(
          Object.values(professionRes.data).map((item: any) => ({
            id: item.Profes_Pref_id.toString(),
            name: item.Profes_name,
          }))
        );

        // Fetch income options
        const incomeRes = await apiClient.post("/auth/Get_Annual_Income/");
        setIncomeOptions(
          Object.values(incomeRes.data).map((item: any) => ({
            id: item.income_id.toString(),
            name: item.income_description,
          }))
        );

        // Fetch marital status options
        const maritalRes = await apiClient.post("/auth/Get_Marital_Status/");
        setMaritalOptions(
          Object.values(maritalRes.data).map((item: any) => ({
            id: item.marital_sts_id.toString(),
            name: item.marital_sts_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       // 1. Fetch profile data first
  //       const profile_id = localStorage.getItem("loginuser_profile_id");
  //       let hasExistingPreferences = false;
  //       let existingStarIds: string[] = [];
  //       let existingStarRasi: string[] = [];

  //       if (profile_id) {
  //         try {
  //           const profileResponse = await apiClient.post("/auth/Get_myprofile_partner/", { profile_id });
  //           const profileData = profileResponse.data.data;


  //           // Check if user has existing star preferences
  //           hasExistingPreferences =
  //             profileData.partner_porutham_ids &&
  //             profileData.partner_porutham_ids.trim() !== '';

  //           if (hasExistingPreferences) {
  //             existingStarIds = profileData.partner_porutham_ids
  //               .split(",")
  //               .map((id: string) => id.trim())
  //               .filter((id: string) => id !== "");

  //             existingStarRasi = profileData.partner_porutham_star_rasi
  //               ? profileData.partner_porutham_star_rasi.split(",").map((item: string) => item.trim())
  //               : [];
  //           }
  //         } catch (profileError) {
  //           console.error("Error fetching profile data:", profileError);
  //         }
  //       }

  //       // 2. If existing preferences found, use them
  //       if (hasExistingPreferences && existingStarIds.length > 0) {
  //         const selectedStarIdsFromApi = existingStarIds.map((id: string) => ({
  //           id,
  //           rasi: "",
  //           star: "",
  //           label: "",
  //         }));

  //         setSelectedStarIds(selectedStarIdsFromApi);
  //         setPrefilledStarRasiArray(existingStarRasi);
  //         sessionStorage.setItem("selectedStarIds", JSON.stringify(selectedStarIdsFromApi));

  //         console.log("Using API-provided star preferences:", selectedStarIdsFromApi);
  //         return;
  //       }

  //       // 3. If no existing preferences, fetch matching stars and set defaults
  //       if (storedBirthStar && storedGender && storedRasi) {
  //         const starsResponse = await apiClient.post(`/auth/Get_Matchstr_Pref/`, {
  //           birth_star_id: storedBirthStar,
  //           gender: storedGender,
  //           birth_rasi_id: storedRasi,
  //         });

  //         // const matchCountArrays: MatchingStar[][] = Object.values(starsResponse.data)
  //         //   .map((matchCount: any) => matchCount)
  //         //   .sort((a: MatchingStar[], b: MatchingStar[]) => b[0].match_count - a[0].match_count);

  //         // setMatchStars(matchCountArrays);

  //         // Inside the initializeStarSelection useEffect
  //         const matchCountArrays: MatchingStar[][] = Object.values(starsResponse.data)
  //           .map((matchCount: any) => matchCount)
  //           // This is the sorting line
  //           .sort((a: MatchingStar[], b: MatchingStar[]) => b[0].match_count - a[0].match_count);

  //         setMatchStars(matchCountArrays);

  //         // Default: Select all stars except those with porutham 0
  //         const defaultSelectedIds = matchCountArrays
  //           .flat()
  //           .filter((item) => item.match_count !== 0)
  //           .map((item) => ({
  //             id: item.id.toString(),
  //             rasi: item.dest_rasi_id.toString(),
  //             star: item.dest_star_id.toString(),
  //             label: `${item.matching_starname} - ${item.matching_rasiname}`,
  //           }));

  //         setSelectedStarIds(defaultSelectedIds);
  //         sessionStorage.setItem("selectedStarIds", JSON.stringify(defaultSelectedIds));

  //         console.log("Setting default star preferences (excluding porutham 0):", defaultSelectedIds);
  //       }
  //     } catch (error) {
  //       console.error("Error in star selection initialization:", error);
  //     }
  //   };

  //   fetchProfileData();
  // }, [storedBirthStar, storedGender, storedRasi]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile_id = localStorage.getItem("loginuser_profile_id");
        const response = await apiClient.post("/auth/Get_myprofile_partner/", { profile_id });
        const data = response.data.data;

        // Prefill star/rasi array (but not overriding selectedStarIds!)
        const prefilledStarRasiArray = data.partner_porutham_star_rasi
          ? data.partner_porutham_star_rasi.split(",").map((item: string) => item.trim())
          : [];
        setPrefilledStarRasiArray(prefilledStarRasiArray);

        // Prefill form values
        setValue("fromAge", data.partner_age || "5");

        if (data.partner_height_from) {
          setValue("fromHeight", data.partner_height_from);
        } else if (storedGender?.toLowerCase() === "female" && storedHeight) {
          setValue("fromHeight", storedHeight);
        }

        if (data.partner_height_to) {
          setValue("toHeight", data.partner_height_to);
        } else if (storedGender?.toLowerCase() === "male" && storedHeight) {
          setValue("toHeight", storedHeight);
        }

        setValue("education", data.partner_edu_id?.split(",").map((id: string) => id.trim()) || []);
        setValue("maritalstatus", data.partner_marital_status?.split(",").map((id: string) => id.trim()) || []);
        setValue("profession", data.partner_profe?.split(",").map((id: string) => id.trim()) || []);
        setValue("rahuKetuDhosam", data.partner_rahu_kethu || "");
        setValue("chevvaiDhosam", data.partner_chev_dho || "");
        setValue("foreignInterest", data.partner_forign_int || "");

        // Handle income values
        const annualIncomeArray = data.partner_ann_inc.split(",");
        const annualIncomeArraymax = data.partner_ann_inc_max.split(",");
        setSelectedAnnualIncomes(annualIncomeArray);
        setSelectedMaxAnnualIncome(annualIncomeArraymax);
        if (annualIncomeArraymax[0]) {
          setValue("annualIncomemax", annualIncomeArraymax[0]);
        }

        // ❌ Do NOT set stars here
        // let the first effect handle selectedStarIds

      } catch (error) {
        console.error("Error fetching partner profile:", error);
      }
    };

    fetchProfileData();
  }, [setValue, storedGender, storedHeight]);


  // Modified useEffect for fetching matching stars with default selection
  useEffect(() => {
    if (storedBirthStar && storedGender && storedRasi) {
      const fetchMatchingStars = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_Matchstr_Pref/`, {
            birth_star_id: storedBirthStar,
            gender: storedGender,
            birth_rasi_id: storedRasi,
          });

          // const matchCountArrays: MatchingStar[][] = Object.values(
          //   response.data
          // ).map((matchCount: any) => matchCount);
          // setMatchStars(matchCountArrays);
          // 2. This is the crucial line for sorting
          const matchCountArrays: MatchingStar[][] = Object.values(response.data)
            .map((matchCount: any) => matchCount)
            // 👇 This sort logic automatically moves the "Unmatching" (count: 0) group to the end
            .sort((a: MatchingStar[], b: MatchingStar[]) => b[0].match_count - a[0].match_count);

          // 3. Set the correctly sorted array to the state
          setMatchStars(matchCountArrays);


          // Filter stars: Only select those with match_count !== 0 (exclude porutham 0)
          const defaultSelectedIds = matchCountArrays
            .flat()
            .filter((item) => item.match_count !== 0) // Exclude stars with porutham 0
            .map((item) => ({
              id: item.id.toString(),
              rasi: item.dest_rasi_id.toString(),
              star: item.dest_star_id.toString(),
              label: `${item.matching_starname} - ${item.matching_rasiname}`,
            }));

          // Check if there are saved selections from sessionStorage
          const savedStarIds = sessionStorage.getItem("selectedStarIds");
          let finalSelections: SelectedStarIdItem[] = [];

          if (savedStarIds) {
            // If there are saved selections, use them
            const savedSelections: SelectedStarIdItem[] = JSON.parse(savedStarIds);
            finalSelections = savedSelections;
          } else {
            // If no saved selections, use the default selections (excluding porutham 0)
            finalSelections = defaultSelectedIds;
            // Save the default selections to sessionStorage
            sessionStorage.setItem("selectedStarIds", JSON.stringify(defaultSelectedIds));
          }

          setSelectedStarIds(finalSelections);

          console.log("Default selected stars (excluding porutham 0):", defaultSelectedIds);
          console.log("Final selected stars:", finalSelections);

        } catch (error) {
          console.error("Error fetching matching star options:", error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender, storedRasi]);

  // Alternative approach if you want to check for existing profile data first
  useEffect(() => {
    const fetchProfileAndStars = async () => {
      const profileId = localStorage.getItem("profile_id_new");
      let hasExistingData = false;

      // Check if user has existing partner preference data
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 6,
          };

          const response = await apiClient.post(
            `/auth/Get_save_details/`,
            requestData
          );

          const profileData = response.data.data;

          // Check if user has existing star preferences
          if (profileData.pref_porutham_star && profileData.pref_porutham_star.trim() !== '') {
            hasExistingData = true;

            // Parse existing data and set it
            const poruthamStarIds = profileData.pref_porutham_star
              .split(",")
              .map((id: string) => id.trim());

            setSelectedStarIds(
              poruthamStarIds.map((id: any) => ({
                id,
                rasi: "",
                star: "",
                label: "",
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }

      // Fetch matching stars and set defaults only if no existing data
      if (storedBirthStar && storedGender && storedRasi && !hasExistingData) {
        try {
          const response = await apiClient.post(`/auth/Get_Matchstr_Pref/`, {
            birth_star_id: storedBirthStar,
            gender: storedGender,
            birth_rasi_id: storedRasi,
          });
          // 2. This is the crucial line for sorting
          const matchCountArrays: MatchingStar[][] = Object.values(response.data)
            .map((matchCount: any) => matchCount)
            // 👇 This sort logic automatically moves the "Unmatching" (count: 0) group to the end
            .sort((a: MatchingStar[], b: MatchingStar[]) => b[0].match_count - a[0].match_count);

          // 3. Set the correctly sorted array to the state
          setMatchStars(matchCountArrays);


          // Set default selections (exclude porutham 0)
          const defaultSelectedIds = matchCountArrays
            .flat()
            .filter((item) => item.match_count !== 0)
            .map((item) => ({
              id: item.id.toString(),
              rasi: item.dest_rasi_id.toString(),
              star: item.dest_star_id.toString(),
              label: `${item.matching_starname} - ${item.matching_rasiname}`,
            }));

          setSelectedStarIds(defaultSelectedIds);
          sessionStorage.setItem("selectedStarIds", JSON.stringify(defaultSelectedIds));

        } catch (error) {
          console.error("Error fetching matching star options:", error);
        }
      }
    };

    fetchProfileAndStars();
  }, [storedBirthStar, storedGender, storedRasi]);

  // Enhanced version that combines both approaches
  useEffect(() => {
    const initializeStarSelection = async () => {
      if (!storedBirthStar || !storedGender || !storedRasi) return;

      try {
        // 1. First fetch matching stars data
        const response = await apiClient.post(`/auth/Get_Matchstr_Pref/`, {
          birth_star_id: storedBirthStar,
          gender: storedGender,
          birth_rasi_id: storedRasi,
        });

        // 2. This is the crucial line for sorting
        const matchCountArrays: MatchingStar[][] = Object.values(response.data)
          .map((matchCount: any) => matchCount)
          // 👇 This sort logic automatically moves the "Unmatching" (count: 0) group to the end
          .sort((a: MatchingStar[], b: MatchingStar[]) => b[0].match_count - a[0].match_count);

        // 3. Set the correctly sorted array to the state
        setMatchStars(matchCountArrays);


        // 2. Create default selections (exclude porutham 0)
        const defaultSelectedIds = matchCountArrays
          .flat()
          .filter((item) => item.match_count !== 0)
          .map((item) => ({
            id: item.id.toString(),
            rasi: item.dest_rasi_id.toString(),
            star: item.dest_star_id.toString(),
            label: `${item.matching_starname} - ${item.matching_rasiname}`,
          }));

        // 3. Check for existing profile data
        const profileId = localStorage.getItem("profile_id_new");
        let finalSelections = defaultSelectedIds; // Default to API defaults

        if (profileId) {
          try {
            const profileResponse = await apiClient.post(`/auth/Get_save_details/`, {
              profile_id: profileId,
              page_id: 6,
            });

            const profileData = profileResponse.data.data;

            if (profileData.pref_porutham_star && profileData.pref_porutham_star.trim() !== '') {
              // User has saved preferences, use them instead
              const savedStarIds = profileData.pref_porutham_star
                .split(",")
                .map((id: string) => id.trim());

              finalSelections = savedStarIds.map((id: string) => ({
                id,
                rasi: "",
                star: "",
                label: "",
              }));
            }
          } catch (profileError) {
            console.error("Error fetching profile data:", profileError);
            // Keep default selections on profile fetch error
          }
        }

        // 4. Check sessionStorage for any temporary selections
        const sessionStarIds = sessionStorage.getItem("selectedStarIds");
        if (sessionStarIds) {
          try {
            const sessionSelections: SelectedStarIdItem[] = JSON.parse(sessionStarIds);
            finalSelections = sessionSelections;
          } catch (sessionError) {
            console.error("Error parsing session storage:", sessionError);
          }
        }

        // 5. Set final selections and save to session
        setSelectedStarIds(finalSelections);
        sessionStorage.setItem("selectedStarIds", JSON.stringify(finalSelections));

        console.log("Stars with porutham 0 (excluded):",
          matchCountArrays.flat().filter(item => item.match_count === 0).length);
        console.log("Default selected stars:", finalSelections.length);

      } catch (error) {
        console.error("Error initializing star selection:", error);
      }
    };

    initializeStarSelection();
  }, [storedBirthStar, storedGender, storedRasi]);

  // Update income field when selectedAnnualIncomes changes
  useEffect(() => {
    if (selectedAnnualIncomes[0]) {
      setValue("income", selectedAnnualIncomes[0]);
    }
  }, [selectedAnnualIncomes, setValue]);

  // Toggle all checkboxes in a section
  const toggleAllCheckboxes = (
    field: "education" | "profession" | "maritalstatus",
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

  const handleAnnualIncomeChange = (value: string) => {
    setSelectedAnnualIncomes([value]);
  };

  const handleMaximumAnnualIncomeChange = (value: string) => {
    setSelectedMaxAnnualIncome([value]);
    setValue("annualIncomemax", value);
  };

  const handleCheckboxChange = (updatedIds: SelectedStarIdItem[]) => {
    setSelectedStarIds(updatedIds);
  };

  const onSubmit = async (data: PartnerSettingsForm) => {
    setIsSubmitting(true);
    try {
      console.log("Form submission data:", data);
      console.log("Form validation errors:", errors);

      // Prepare star data
      const starArray = selectedStarIds.map((item) => item.id);
      const starRasiArray = selectedStarIds.map((item) => `${item.star}-${item.rasi}`);

      // Combine pre-filled and new selections
      const combinedStarRasiArray = [...new Set([...prefilledStarRasiArray, ...starRasiArray])];

      // Detect removed items
      const removedStarRasiArray = prefilledStarRasiArray.filter(
        (prefilled) => !starRasiArray.includes(prefilled)
      );

      // Final array excluding removed items
      const finalStarRasiArray = combinedStarRasiArray.filter(
        (combined) => !removedStarRasiArray.includes(combined)
      );

      const IncomeValue = selectedAnnualIncomes[0];
      const IncomeValuemax = selectedMaxAnnualIncome[0];

      const updateData = {
        profile_id: localStorage.getItem("loginuser_profile_id"),
        pref_age_differences: `${data.fromAge}`,
        pref_height_from: data.fromHeight,
        pref_height_to: data.toHeight,
        pref_profession: (data.profession ?? []).join(","),
        pref_education: (data.education ?? []).join(","),
        pref_marital_status: (data.maritalstatus ?? []).join(","),
        pref_anual_income: IncomeValue,
        pref_anual_income_max: IncomeValuemax,
        pref_chevvai: data.chevvaiDhosam,
        pref_ragukethu: data.rahuKetuDhosam,
        pref_foreign_intrest: data.foreignInterest,
        pref_porutham_star: starArray.join(","),
        pref_porutham_star_rasi: finalStarRasiArray.join(","),
      };

      console.log("API payload:", updateData);

      const response = await apiClient.post("/auth/Update_myprofile_partner/", updateData);
      console.log("API response:", response.data);

      if (response.data.status === "success") {
        NotifySuccess("Partner Settings updated successfully");
        setPrefilledStarRasiArray([]);
      } else {
        NotifyError(response.data.message || "Failed to update partner settings");
      }
    } catch (error: any) {
      console.error("API error:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);

        if (error.response.data) {
          setFormErrors(error.response.data);
        }
      }

      NotifyError(error.response?.data?.message || "Error updating profile visibility");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllMaritalSelected = maritalOptions.length > 0 &&
    maritalOptions.every((opt) => maritalValues.includes(opt.id));

  const isAllEducationSelected = educationOptions.length > 0 &&
    educationOptions.every((opt) => educationValues.includes(opt.id));

  const isAllProfessionSelected = professionOptions.length > 0 &&
    professionOptions.every((opt) => professionValues.includes(opt.id));

  return (
    <div>
      <ToastNotification />
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2">
        Partner Settings
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Age and Height Section */}
        <div className="flex justify-between items-center gap-5 mb-5 max-lg:flex-col">
          {/* Age */}
          <div className="flex justify-center items-start space-x-5 w-full">
            <div className="w-full">
              <label htmlFor="fromAge" className="text-[20px] text-primary font-semibold">
                Age
              </label>
              <br />
              <select
                id="fromAge"
                {...register("fromAge")}
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              >
                <option value="" disabled>Select Age</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </select>
              {errors.fromAge && <span className="text-red-500">{errors.fromAge.message}</span>}
            </div>
          </div>

          {/* Height */}
          <div className="flex justify-center items-center space-x-5 max-lg:justify-start max-lg:w-full">
            <div className="max-lg-full">
              <label htmlFor="fromHeight" className="text-[20px] text-primary font-semibold">
                Height
              </label>
              <br />
              <input
                type="text"
                id="fromHeight"
                placeholder="From"
                {...register("fromHeight")}
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              />
              {errors.fromHeight && <span className="text-red-500 block mt-0">{errors.fromHeight.message}</span>}
            </div>

            <div className="max-lg-full">
              <label htmlFor="toHeight" className="text-[20px] text-primary font-semibold invisible">
                Height
              </label>
              <br />
              <input
                type="text"
                id="toHeight"
                placeholder="To"
                {...register("toHeight")}
                className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
              />
              {errors.toHeight && <span className="text-red-500 block mt-0">{errors.toHeight.message}</span>}
            </div>
          </div>
        </div>

        {/* Marital Status Section */}
        <div className="mb-5">
          <div
            className="flex items-center gap-2 mb-2 cursor-pointer"
            onClick={() => toggleAllCheckboxes("maritalstatus", maritalOptions)}
          >
            <input
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent div's onClick twice
                toggleAllCheckboxes("maritalstatus", maritalOptions);
              }}
              checked={isAllMaritalSelected}
              className="cursor-pointer"
            />
            <h4 className="text-[20px] cursor-pointer text-primary font-semibold max-md:text-[18px]">
              Marital Status
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 justify-between items-center max-2xl:grid-cols-2 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {maritalOptions.map((option) => (
              <div className="flex items-center mb-2 w-full" key={option.id}>
                <input
                  type="checkbox"
                  id={`maritalstatus-${option.id}`}
                  value={option.id}
                  // {...register("maritalstatus")}
                  checked={maritalValues.includes(option.id)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...maritalValues, option.id]
                      : maritalValues.filter((id) => id !== option.id);
                    setValue("maritalstatus", newValues as [string, ...string[]], { shouldValidate: true });

                  }}
                  className="mr-2"
                />
                <label htmlFor={`maritalstatus-${option.id}`} className="text-[18px] text-primary font-normal block">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors.maritalstatus?.message && (
            <span className="text-red-500">{errors.maritalstatus.message}</span>
          )}
        </div>

        {/* Education Section */}
        <div className="mb-5">
          <div
            className="flex items-center gap-2 mb-2 cursor-pointer"
            onClick={() => toggleAllCheckboxes("education", educationOptions)}
          >
            <input
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent div's onClick twice
                toggleAllCheckboxes("education", educationOptions);
              }}
              checked={isAllEducationSelected}
              /// readOnly
              className="cursor-pointer"
            />
            <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
              Education
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
            {educationOptions.map((option) => (
              <div className="flex items-center mb-2 w-full" key={option.id}>
                <input
                  type="checkbox"
                  id={`education-${option.id}`}
                  value={option.id}
                  {...register("education")}
                  checked={educationValues.includes(option.id)}
                  className="mr-2"
                />
                <label htmlFor={`education-${option.id}`} className="text-[18px] text-primary font-normal block">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors.education?.message && (
            <span className="text-red-500">{errors.education.message}</span>
          )}
        </div>

        {/* Profession Section */}
        <div className="mb-5">
          <div
            className="flex items-center gap-2 mb-2 cursor-pointer"
            onClick={() => toggleAllCheckboxes("profession", professionOptions)}
          >
            <input
              type="checkbox"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent div's onClick twice
                toggleAllCheckboxes("profession", professionOptions);
              }}
              checked={isAllProfessionSelected}
              // readOnly
              className="cursor-pointer"
            />
            <h4 className="text-[20px] text-primary font-semibold max-md:text-[18px]">
              Profession
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
            {professionOptions.map((option) => (
              <div className="flex items-center mb-2 w-full" key={option.id}>
                <input
                  type="checkbox"
                  id={`profession-${option.id}`}
                  value={option.id}
                  // {...register("profession")}
                  checked={professionValues.includes(option.id)}
                  className="mr-2"
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...professionValues, option.id]
                      : professionValues.filter((id) => id !== option.id);
                    setValue("profession", newValues as [string, ...string[]], { shouldValidate: true });

                  }}
                />
                <label htmlFor={`profession-${option.id}`} className="text-[18px] text-primary font-normal block">
                  {option.name}
                </label>
              </div>
            ))}
          </div>
          {errors.profession?.message && (
            <span className="text-red-500">{errors.profession.message}</span>
          )}
        </div>

        {/* Annual Income Section */}
        <div>
          <label className="text-[18px] text-primary font-semibold mb-5 block">
            Annual Income
          </label>
          <div className="flex space-x-4">
            <div className="relative w-full">
              <select
                {...register("income")}
                className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                value={selectedAnnualIncomes[0] || ""}
                onChange={(e) => handleAnnualIncomeChange(e.target.value)}
              >
                <option value="">Select min Annual Income</option>
                {incomeOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              {errors.income && <span className="text-red-500">{errors.income.message}</span>}
            </div>

            <div className="relative w-full">
              <select
                {...register("annualIncomemax")}
                className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                value={selectedMaxAnnualIncome[0] || ""}
                onChange={(e) => handleMaximumAnnualIncomeChange(e.target.value)}
              >
                <option value="">Select max Annual Income</option>
                {incomeOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <IoMdArrowDropdown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              {errors.annualIncomemax && (
                <span className="text-red-500">{errors.annualIncomemax.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Rahu/Ketu Dhosam Section */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
            Rahu/Ketu Dhosam
          </h4>
          <div>
            <label className="inline-flex items-center text-ash mr-4">
              <input type="radio" value="Yes" {...register("rahuKetuDhosam")} className="mr-2" />
              Yes
            </label>
            <label className="inline-flex items-center text-ash mr-4">
              <input type="radio" value="No" {...register("rahuKetuDhosam")} className="mr-2" />
              No
            </label>
            <label className="inline-flex items-center text-ash">
              <input type="radio" value="Both" {...register("rahuKetuDhosam")} className="mr-2" />
              Both
            </label>
            {errors.rahuKetuDhosam && (
              <span className="text-red-500">{errors.rahuKetuDhosam.message}</span>
            )}
          </div>
        </div>

        {/* Chevvai Dhosam Section */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
            Chevvai Dhosam
          </h4>
          <div>
            <label className="inline-flex items-center mr-4 text-ash">
              <input type="radio" value="Yes" {...register("chevvaiDhosam")} className="mr-2" />
              Yes
            </label>
            <label className="inline-flex items-center mr-4 text-ash">
              <input type="radio" value="No" {...register("chevvaiDhosam")} className="mr-2" />
              No
            </label>
            <label className="inline-flex items-center text-ash">
              <input type="radio" value="Both" {...register("chevvaiDhosam")} className="mr-2" />
              Both
            </label>
            {errors.chevvaiDhosam && (
              <span className="text-red-500">{errors.chevvaiDhosam.message}</span>
            )}
          </div>
        </div>

        {/* Foreign Interest Section */}
        <div className="mb-5">
          <h4 className="text-[20px] text-primary font-semibold mb-2 max-md:text-[18px]">
            Foreign Interest
          </h4>
          <div>
            <label className="inline-flex items-center mr-4 text-ash">
              <input type="radio" value="Yes" {...register("foreignInterest")} className="mr-2" />
              Yes
            </label>
            <label className="inline-flex items-center mr-4 text-ash">
              <input type="radio" value="No" {...register("foreignInterest")} className="mr-2" />
              No
            </label>
            <label className="inline-flex items-center text-ash">
              <input type="radio" value="Both" {...register("foreignInterest")} className="mr-2" />
              Both
            </label>
            {errors.foreignInterest && (
              <span className="text-red-500">{errors.foreignInterest.message}</span>
            )}
          </div>
        </div>

        {/* Matching Stars Section */}
        <div className="justify-start items-center gap-x-5 mb-5">
          {matchStars.length > 0 ? (
            matchStars.map((matchCountArray, index) => {
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
                  <div className="relative group inline-flex items-center">
                    Unmatching stars
                    <AiOutlineInfoCircle className="text-gray-500 cursor-pointer ml-2" />
                    <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-300 rounded shadow-lg p-2 w-56 z-10 top-1/2 left-full transform -translate-y-0 ml-2">
                      <p className="text-sm text-black">No Rajju Porutham</p>
                    </div>
                  </div>
                ) : matchCountValue === 15 ? (
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
            })
          ) : (
            <p>No match stars available</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center space-x-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Update Changes
          </button>
        </div>
      </form>
    </div>
  );
};
