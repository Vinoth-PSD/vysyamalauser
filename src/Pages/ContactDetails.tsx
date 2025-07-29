import React, { useState, useEffect } from "react";
import ContentBlackCard from "../Components/RegistrationForm/ContentBlackCard";
import InputField from "../Components/RegistrationForm/InputField";
import SideContent from "../Components/RegistrationForm/SideContent";
import arrow from "../assets/icons/arrow.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../API";
import { ToastNotification, NotifyError, NotifySuccess } from "../Components/Toast/ToastNotification";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
// ZOD Schema
const schema = zod.object({
  address: zod.string().optional(),
  country: zod.string().min(1, "Country is required"),
  state: zod.string().optional(), // State is optional
  city: zod.string().optional(),
  district: zod.string().optional(),
  pincode: zod.string().optional(),
  daughterMobileNumber: zod.string().optional(),
  daughterEmail: zod.string().optional(),
});
interface FormInputs {
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  alternatemobileNumber?: string;
  whatsappNumber?: string;
  daughterMobileNumber?: string;
  daughterEmail?: string;
  district?: string;
}
interface ContactDetailsProps {
  heading?: string;
  desc?: string;
}
interface CountryOption {
  country_id: number;
  country_name: string;
}
interface StateOption {
  state_id: number;
  state_name: string;
}
const ContactDetails: React.FC<ContactDetailsProps> = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormInputs>({ resolver: zodResolver(schema) });
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileowner, setProfileOwner] = useState<string | null>(null);
  const [cities, setCities] = useState<any>([]);
  const [district, getDistrict] = useState<any>([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");
  const [alterNativeNumber, setAlterNativeNumber] = useState<string>("");
  const selectedStateId = watch("state");
  const selectedDistrictId = watch("district");
  const [, setSelectedCity] = React.useState("");
  const [isCityDropdown, setIsCityDropdown] = useState(true);
  const [districtValue, setDistrictValue] = useState(""); // Add state for the district value

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "others") {
      setDistrictValue(""); // Clear district value
      setIsCityDropdown(false); // Show the free textbox
      setValue("district", ""); // Clear the district value in the form
    } else {
      setDistrictValue(value);
      setIsCityDropdown(true); // Use dropdown
      setValue("district", value); // Update the form value for district
    }
  };

  useEffect(() => {
    setDistrictValue(""); // Clear district value when state changes
    setValue("district", ""); // Reset form value
    setIsCityDropdown(true); // Reset to dropdown
  }, [selectedStateId, setValue]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);

    // Switch to free text input if "Others" is selected
    if (value === "others") {
      setIsCityDropdown(false);
      setValue("city", ""); // Clear city value
    } else {
      setValue("city", value); // Update the form value for city
    }
  };

  const fetchDistrict = async () => {
    try {
      const response = await apiClient.post("/auth/Get_District/",
        {
          state_id: selectedStateId,
        }
      );
      getDistrict(Object.values(response.data));
    } catch (error) {
      console.error("distric:", error);
    }
  };
  console.log(district, "district");

  useEffect(() => {
    if (selectedStateId) {
      fetchDistrict();
    }
  }, [selectedStateId]);

  useState(() => { });

  const fetchCities = async () => {
    try {
      const response = await apiClient.post("/auth/Get_City/",
        {
          district_id: selectedDistrictId?.toString(),
        }
      );
      const cityData = Object.values(response.data);
      setCities(cityData);
      // Toggle dropdown only if cities are available
      if (cityData.length > 0) {
        setIsCityDropdown(true);
      } else {
        setIsCityDropdown(false);
        setValue("city", ""); // Clear city value if dropdown is hidden
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (selectedDistrictId) {
      fetchCities();
    }
  }, [selectedDistrictId]);

  const profileId = localStorage.getItem("profile_id_new") || localStorage.getItem("loginuser_profile_id");
  console.log(profileId);
  console.log(stateOptions, "stateOptions");
  useEffect(() => {
    const fetchCountryData = async () => {
      if (profileId) {
        try {
          const requestData = {
            profile_id: profileId,
            page_id: 1,
          };
          const response = await apiClient.post(`/auth/Get_save_details/`, requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          //console.log("API Response:", response.data); // Log the entire API response
          const profileData = response.data.data; // Access the 'data' object directly
          //console.log("Profile Data:", profileData); // Log the profile data
          setValue("address", profileData.Profile_address);
          setValue("country", profileData.Profile_country);
          setValue("state", profileData.Profile_state);
          setValue("city", profileData.Profile_city);
          setValue("pincode", profileData.Profile_pincode);
          setValue("district", profileData.Profile_district);
          setAlterNativeNumber(profileData.Profile_alternate_mobile);
          setWhatsAppNumber(profileData.Profile_whatsapp);
          setValue("daughterMobileNumber", profileData.Profile_mobile_no);
          setValue("daughterEmail", profileData.Profile_emailid);
        } catch (error) {
          console.error("Error fetching country data:", error);
        }
      } else {
        console.warn("Profile ID not found in sessionStorage");
      }
    };
    fetchCountryData();
  }, [profileId, setValue]);

  useEffect(() => {
    const profileowner = sessionStorage.getItem("profile_owner");
    setProfileOwner(profileowner);
  }, []);
  const profileName = profileowner === "Ownself" ? "Your" : profileowner;
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

  const selectedCountryId = watch("country");
  useEffect(() => {
    if (selectedCountryId === "1") { // Country ID for India
      setIsCityDropdown(false); // Default to textbox for India
      setSelectedCity(""); // Reset city value
    }
  }, [selectedCountryId]);
  useEffect(() => {
    if (selectedCountryId) {
      const fetchStateStatus = async () => {
        try {
          const response = await apiClient.post(`/auth/Get_State/`, {
            country_id: selectedCountryId,
          });
          const options = Object.values(response.data) as StateOption[];
          setStateOptions(options);
        } catch (error) {
          console.error("Error fetching state options:", error);
        }
      };
      fetchStateStatus();
    }
  }, [selectedCountryId, countryOptions]);

  const validateDaughterMobileNumber = (value: string) => {
    if (!value) {
      clearErrors("daughterMobileNumber");
      return;
    }

    // Validate the actual input value length
    if (value.length < 12) {
      clearErrors("daughterMobileNumber"); // no error while typing
    } else if (value.length === 12) {
      const regex = /^\d{12}$/;
      if (!regex.test(value)) {
        setError("daughterMobileNumber", {
          type: "manual",
          message: "Mobile number must be exactly 10 digits",
        });
      } else {
        clearErrors("daughterMobileNumber");
      }
    } else {
      setError("daughterMobileNumber", {
        type: "manual",
        message: "Mobile number must be exactly 10 digits",
      });
    }
  };

  const validateDaughterEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !regex.test(value)) {
      setError("daughterEmail", {
        type: "manual",
        message: "Invalid email format",
      });
    } else {
      clearErrors("daughterEmail");
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const profileId = localStorage.getItem("profile_id_new");
      if (!profileId) {
        throw new Error("ProfileId not found in sessionStorage");
      }
      const postData = {
        ProfileId: profileId,
        Profile_address: data.address,
        Profile_country: data.country,
        Profile_state: data.state,
        Profile_city: data.city,
        Profile_pincode: data.pincode,
        Profile_alternate_mobile: alterNativeNumber,
        Profile_whatsapp: whatsAppNumber,
        Profile_mobile_no: data.daughterMobileNumber,
        Profile_district: data.district,
        Profile_emailid: data.daughterEmail, // Add this line to include the email
      };
      //console.log(" postData:", postData);
      const response = await apiClient.post(`/auth/Contact_registration/`, postData);
      if (response.data.Status === 1) {
        NotifySuccess("Contact details saved successfully");
        // Get quick_reg value from sessionStorage
        const quickreg = sessionStorage.getItem("quick_reg") || "0"; // Default to "0" if not found
        setTimeout(() => {
          if (quickreg === "1") {
            navigate("/FamilyDetails"); // Redirect to ThankYouReg pageppe
          } else {
            navigate("/UploadImages"); // Redirect to UploadImages page
          }
        }, 2000);
      } else {
        //console.log("Registration unsuccessful:", response.data);
      }
    } catch (error: any) {
      if (error.response?.data?.Profile_alternate_mobile) {
        // Specific backend error for alternate mobile
        setError("alternatemobileNumber", {
          type: "manual",
          message: error.response.data.Profile_alternate_mobile[0],
        });
      } else {
        if (whatsAppNumber === "") {
          setError("whatsappNumber", {
            type: "manual",
            message: "WhatsApp number is required",
          });
        } else if (whatsAppNumber.length < 10) {
          setError("whatsappNumber", {
            type: "manual",
            message: "WhatsApp number must be at least 10 digits",
          });
        }
        if (alterNativeNumber === "") {
          setError("alternatemobileNumber", {
            type: "manual",
            message: "Alternate mobile number is required",
          });
        } else if (alterNativeNumber.length < 10) {
          setError("alternatemobileNumber", {
            type: "manual",
            message: "Alternate mobile number must be at least 10 digits",
          });
        }
      }
      NotifyError("Error submitting contact details");
      console.error("Error submitting contact details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const token = sessionStorage.getItem("token");
  const isIncognito =
    navigator.userAgent.includes("Incognito") ||
    navigator.userAgent.includes("Private");
  console.log("Token:", token); // Debugging line
  console.log("Is Incognito:", isIncognito); // Debugging line

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

  return (
    <div className="mt-24 max-lg:mt-20">
      <ContentBlackCard
        link="/ThankYou"
        heading={"Contact Information"}
        desc="Please provide accurate contact details to ensure smooth communication with potential matches."
      />
      <div className="mx-auto w-[60%]  my-10  max-2xl:w-[60%] max-xl:w-[80%] max-lg:w-full max-md:w-full max-md:my-5">
        <div className="container flex justify-between space-x-24  max-lg:flex-col max-lg:space-x-0 max-lg:gap-y-8 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4  max-sm:gap-x-0 "
          >
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-base text-primary font-medium"
              >
                Country <span className="text-main">*</span>
              </label>
              <div className="relative">
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
                <IoMdArrowDropdown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={20}
                />
              </div>
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </div>

            <div>
              <InputField
                label="Address"
                {...register("address", {
                  setValueAs: (value) => value.trim(),
                })}
              />
              {errors.address && (
                <span className="text-red-500">{errors.address.message}</span>
              )}
            </div>

            {selectedCountryId === "1" && (
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
                      className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                      {...register("state")}
                    // onChange={handleStateChange}
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                      {stateOptions.map((option) => (
                        <option key={option.state_id} value={option.state_id}>
                          {option.state_name}
                        </option>
                      ))}
                    </select>
                    <IoMdArrowDropdown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                      size={20}
                    />
                  </div>
                  {errors.state && (
                    <span className="text-red-500">{errors.state.message}</span>
                  )}
                </div>

                {["1", "2", "3", "4", "5", "6", "7"].includes(
                  selectedStateId
                ) ? (
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
                        className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                        {...register("district")}
                        onChange={handleDistrictChange}
                      //value={districtValue} // Controlled value
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
                    {errors.district && (
                      <span className="text-red-500">
                        {errors.district.message}
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="district"
                      className="block mb-2 text-base text-primary font-medium"
                    ></label>
                    <InputField
                      id="district"
                      label="District"
                      {...register("district", {
                        setValueAs: (value) => value.trim(),
                      })}
                      value={districtValue} // Bind to districtValue state
                      onChange={(e) => {
                        const value = e.target.value;
                        setDistrictValue(value); // Update district value state
                        setValue("district", value); // Update react-hook-form value
                      }}
                    />
                    {errors.district && (
                      <span className="text-red-500">
                        {errors.district.message}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}

            <div>
              {selectedCountryId !== "1" ? (
                // Show city as a textbox if selectedCountryId is 1
                <>
                  <InputField
                    id="city"
                    label="City"
                    {...register("city", {
                      setValueAs: (value) => value.trim(),
                    })}
                  />
                </>
              ) : (
                // Retain dropdown behavior for other countries
                <>
                  {isCityDropdown ? (
                    <>
                      <label
                        htmlFor="city"
                        className="block mb-2 text-base text-primary font-medium"
                      >
                        City
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
                      <div className="relative">
                        <select
                          id="city"
                          className="outline-none w-full text-placeHolderColor px-3 py-[13px] text-sm border border-ashBorder rounded appearance-none"
                          {...register("city")}
                          onChange={handleCityChange}
                        >
                          <option value="" disabled selected>
                            Select city
                          </option>
                          {cities?.map((city: any) => (
                            <option key={city.city_id} value={city.city_id}>
                              {city.city_name}
                            </option>
                          ))}
                          <option value="others">Others</option>
                        </select>
                        <IoMdArrowDropdown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                          size={20}
                        />
                      </div>
                      {errors.city && (
                        <span className="text-red-500">
                          {errors.city.message}
                        </span>
                      )}
                    </>
                  ) : (
                    <>

                      <InputField
                        id="city"
                        label="City"
                        {...register("city", {
                          setValueAs: (value) => value.trim(),
                        })}
                      />
                    </>
                  )}
                </>
              )}
            </div>

            <div>
              <InputField
                label="Pincode"
                onKeyDown={handleKeyDown}
                {...register("pincode", {
                  setValueAs: (value) => value.trim(),
                })}
              />
              {errors.pincode && (
                <span className="text-red-500">{errors.pincode.message}</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-base text-primary font-medium">
                Alternate Mobile Number
              </label>
              <PhoneInput
                value={alterNativeNumber}
                country="in" // Default selected country
                preferredCountries={["in", "sg", "my", "ae", "us", "gb"]} // Ensure "in" is first
                onChange={(value: string) => setAlterNativeNumber(value)}
                inputProps={{
                  autoFocus: true,
                  autoFormat: true,
                  className: "input-style",
                }}
              />
              {errors.alternatemobileNumber && (
                <span className="text-red-500">
                  {errors.alternatemobileNumber.message}
                </span>
              )}

              {errors.alternatemobileNumber && (
                <span className="text-red-500">
                  {errors.alternatemobileNumber.message}
                </span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-base text-primary font-medium">
                Whatsapp Number
              </label>
              <PhoneInput
                value={whatsAppNumber}
                onChange={(value: string) => setWhatsAppNumber(value)}
                inputProps={{
                  autoFocus: true,
                  autoFormat: true,
                  className: "input-style",
                }}
                country={"in"}
                // preferredCountries={["us", "in", "gb"]}
                // preferredCountries={["in", "sg", "my", "ae", "us", "gb", "ca"]} // Your preferred country order
                preferredCountries={["in", "sg", "my", "ae", "us", "gb"]} // order of preferred countries
              />
              {errors.whatsappNumber && (
                <span className="text-red-500">
                  {errors.whatsappNumber.message}
                </span>
              )}
            </div>

            <div className="!mt-12 col-span-2 ">
              <h1 className="font-bold text-xl text-primary mb-4">
                For admin purpose only <span className="text-sm font-normal">(This information will not be displayed online)</span>
              </h1>

              <div className="mb-5">
                <label className="block mb-2 text-base text-primary font-medium">
                  {profileName} Mobile Number
                </label>

                <PhoneInput
                  country={"in"} // Default country code
                  value={watch("daughterMobileNumber")} // Bind value to react-hook-form
                  preferredCountries={["in", "sg", "my", "ae", "us", "gb"]} // Your preferred country order
                  inputStyle={{
                    width: "100%",
                    borderColor: errors.daughterMobileNumber ? "red" : "#85878C91",
                  }}

                  onChange={(value) => {
                    // Update the form field with the trimmed value
                    setValue("daughterMobileNumber", value.trim());
                    validateDaughterMobileNumber(value); // Your custom validation function
                  }}
                  // preferredCountries={["us", "in", "gb"]}

                  inputProps={{
                    name: "daughterMobileNumber",
                    required: true,
                    className: "input-style",
                  }}
                />
                {errors.daughterMobileNumber && (
                  <span className="text-red-500">
                    {errors.daughterMobileNumber.message}
                  </span>
                )}
              </div>

              <div>
                <InputField
                  label={`${profileName} Email`}
                  type="email"
                  {...register("daughterEmail", {
                    setValueAs: (value) => value.trim(),
                  })}
                  onChange={(e) => {
                    validateDaughterEmail(e.target.value);
                  }}
                />
                {errors.daughterEmail && (
                  <span className="text-red-500">
                    {errors.daughterEmail.message}
                  </span>
                )}
              </div>

              <div className="mt-10 flex justify-end space-x-4 max-lg:justify-start max-sm:justify-center">
                {/* Skip Button */}
                <Link to="/UploadImages">
                  <button className="py-[10px] px-14 bg-white text-main font-semibold rounded-[6px] mt-2">
                    Skip
                  </button>
                </Link>
                <button
                  className="flex items-center py-[10px] px-14 bg-gradient text-white shadow-redboxshadow rounded-[6px] mt-2"
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

export default ContactDetails;