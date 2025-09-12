/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../RegistrationForm/InputField";
import { AiOutlineInfoCircle } from "react-icons/ai";
import apiClient from "../../../API";

interface ContactDetails {
  personal_prof_addr: string;

  personal_prof_city_id: number;
  personal_prof_city_name?: string;
  personal_prof_district_id: number;
  personal_prof_district_name: string;
  personal_prof_stat_id: number;
  personal_prof_stat_name?: string;
  personal_prof_count_id: number;
  personal_prof_count_name: string;
  personal_prof_pin: number;
  personal_prof_phone: number;
  personal_prof_mob_no: number;
  personal_prof_whats: number;
  personal_email: string;
  admin_use_email: string;
}

interface Country {
  country_id: number;
  country_name: string;
}

interface State {
  state_id: number;
  state_name: string;
}

interface District {
  disctict_id: number;
  disctict_name: string;
}

interface City {
  city_id: number;
  city_name: string;
}

export const Contact = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ContactDetails>>({});
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number | string>(
    ""
  );
  const [states, setStates] = useState<State[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<number | string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<
    number | string
  >("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | string>("");
  const [refreshData, setRefreshData] = useState(false);
  const [emailError, setEmailError] = useState("");
  //const [isCityDropdown, ] = useState(true);
  // State definitions for selected values
  // const [selectedCountry, setSelectedCountry] = useState<LocationSelection | null>(null);
  // const [selectedState, setSelectedState] = useState<LocationSelection | null>(null);
  // const [selectedDistrict, setSelectedDistrict] = useState<LocationSelection | null>(null);
  // const [selectedCity, setSelectedCity] = useState<LocationSelection | null>(null);
  const [errors, setErrors] = useState({
    // personal_prof_addr: "",
    selectedCountryId: "",
    // selectedStateId: "",
    // selectedDistrictId: "",
    // selectedCityId: "",

    // personal_prof_pin: "",
    // personal_prof_phone: "",
    // personal_prof_mob_no: "",
    // personal_prof_whats: "",
    personal_email: "",
    admin_use_email: "",
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await apiClient.post("/auth/get_myprofile_contact/", {
          profile_id: loginuser_profileId,
        });
        const data = response.data.data;
        setContactDetails(data);
        setSelectedCountryId(data.personal_prof_count_id);
        setSelectedStateId(data.personal_prof_stat_id);
        // setSelectedCityId(data.personal_prof_city);
        setSelectedDistrictId(data.personal_prof_district_id);
        setSelectedCityId(data.personal_prof_city_id);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, [loginuser_profileId, refreshData]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.post("/auth/Get_Country/");
        setCountries(Object.values(response.data) as Country[]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [refreshData]);

  useEffect(() => {
    if (!selectedCountryId) return;

    const fetchStates = async () => {
      try {
        const response = await apiClient.post("/auth/Get_State/", {
          country_id: selectedCountryId.toString(),
        });
        setStates(Object.values(response.data) as State[]);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [selectedCountryId, refreshData]);

  useEffect(() => {
    if (!selectedStateId) return;

    const fetchDistrict = async () => {
      try {
        const response = await apiClient.post("/auth/Get_District/", {
          state_id: selectedStateId.toString(),
        });
        setDistricts(Object.values(response.data) as District[]);
        // setSelectedStateId(""); // Reset state selection
        // setSelectedCityId(""); // Reset city selection
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchDistrict();
  }, [selectedStateId, refreshData]);

  useEffect(() => {
    if (!selectedDistrictId) return;

    const fetchCities = async () => {
      try {
        const response = await apiClient.post("/auth/Get_City/", {
          district_id: selectedDistrictId.toString(),
        });
        setCities(Object.values(response.data) as City[]);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedDistrictId, refreshData]);

  // /********** MODIFIED CODE START **********/
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    setSelectedCountryId(selectedId);

    // If the selected country is NOT India (assuming India's ID is "1")
    if (selectedId !== "1") {
      // Clear all dependent dropdowns and their form data
      setSelectedStateId("");
      setSelectedDistrictId("");
      setSelectedCityId("");
      setFormData((prevState) => ({
        ...prevState,
        personal_prof_count_name: selectedName, // Keep the selected country name
        personal_prof_stat_name: "", // Clear state name
        personal_prof_district_name: "", // Clear district name
        personal_prof_city_name: "", // Clear city name
      }));
    } else {
      // If India is selected, just update the country name
      setFormData((prevState) => ({
        ...prevState,
        personal_prof_count_name: selectedName,
      }));
    }
  };
  // /********** MODIFIED CODE END **********/

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStateId(selectedId);
    setFormData((prevState) => ({
      ...prevState,
      personal_prof_stat_name:
        event.target.options[event.target.selectedIndex].text,
    }));
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setSelectedDistrictId(selectedId);
    setFormData((prevState) => ({
      ...prevState,
      personal_prof_district_name:
        event.target.options[event.target.selectedIndex].text,
    }));
  };

  const [isCityDropdown, setIsCityDropdown] = useState(true);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedCityId(selectedId);

    if (selectedId === "others") {
      setIsCityDropdown(false); // Switch to textbox if "Others" is selected
      setFormData((prevState) => ({
        ...prevState,
        personal_prof_city_name: "", // Clear the city name when switching
      }));
    } else {
      setIsCityDropdown(true); // Retain dropdown for other selections
      setFormData((prevState) => ({
        ...prevState,
        personal_prof_city_name:
          event.target.options[event.target.selectedIndex].text,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      selectedCityId: "", // Clear error on change
    }));
  };

  const handleEditClick = () => {
    if (isEditing) {
      setFormData({});
      setIsCityDropdown(true);
    } else {
      if (contactDetails) {
        setFormData(contactDetails);
      }
    }
    setIsEditing(!isEditing);
  };

  const navigate = useNavigate();
  const handleEditClick1 = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validate email
    if (name === "personal_email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailPattern.test(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmailField = (_fieldName: string, value: string): string => {
    if (!value) return ""; // No error if empty (optional field)

    // Check for @ symbol first
    if (!value.includes("@")) {
      return "Please include an '@' in the email address.";
    }

    // Then check full email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the email and set error
    setErrors((prev) => ({
      ...prev,
      [name]: validateEmailField(name, value),
    }));
  };

  // Helper function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate each field and store errors
    const newErrors = {
      selectedCountryId: !selectedCountryId ? "Country is required." : "",

      personal_email: !formData.personal_email
        ? "Email is required."
        : emailError
          ? "Invalid email format."
          : "",
      admin_use_email: validateEmailField(
        "admin_use_email",
        formData.admin_use_email || ""
      ),
    };

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      setErrors(newErrors); // Update the error state
      toast.error("Please fill all fields correctly.");
      return;
    }

    try {
      const response = await apiClient.post(
        "/auth/update_myprofile_contact/",
        {
          profile_id: loginuser_profileId,
          Profile_address: formData.personal_prof_addr,
          Profile_city: selectedCityId || formData.personal_prof_city_name,
          Profile_district:
            selectedDistrictId || formData.personal_prof_district_name,
          Profile_state: selectedStateId || formData.personal_prof_stat_name,
          Profile_country: selectedCountryId,
          Profile_pincode: formData.personal_prof_pin,
          Profile_alternate_mobile: formData.personal_prof_phone,
          Profile_mobile_no: formData.personal_prof_mob_no,
          Profile_whatsapp: formData.personal_prof_whats,
          EmailId: formData.personal_email,
          Profile_emailid: formData.admin_use_email,
        }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setRefreshData((prev) => !prev); // Trigger re-fetch of data

        const getResponse = await apiClient.post(
          "/auth/get_myprofile_contact/",
          {
            profile_id: loginuser_profileId,
          }
        );

        const updatedDetails = getResponse.data.data;
        setContactDetails(updatedDetails);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating contact details:", error);
      toast.error("Failed to update contact details. Please try again.");
    }
  };
  useEffect(() => {
    if (isEditing && cities.length > 0 && contactDetails) {
      const savedCityId = contactDetails.personal_prof_city_id;

      // Check if the saved city ID exists in the current list of cities.
      const cityExistsInList = cities.some(city => city.city_id === savedCityId);

      if (cityExistsInList) {
        // If it exists, show the dropdown and select the correct city.
        setIsCityDropdown(true);
        setSelectedCityId(savedCityId);
      } else {
        // If it doesn't exist, it was a custom entry. Show the text input field.
        setIsCityDropdown(false);
      }
    }
  }, [isEditing, cities, contactDetails]);

  if (!contactDetails) {
    return <div>Loading...</div>;
  }


  return (
    // Your JSX remains unchanged
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
        Contact Details
        <MdModeEdit
          className="text-2xl text-main ml-2 cursor-pointer  max-sm:text-base"
          onClick={handleEditClick}
        />
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-rows-1 grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Address:
                <input
                  type="text"
                  name="personal_prof_addr"
                  value={formData.personal_prof_addr || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({ ...prev, personal_prof_addr: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                    `}
                />
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Country:
                <select
                  name="personal_prof_count_name"
                  value={selectedCountryId}
                  onChange={(e) => {
                    handleCountryChange(e);
                    setErrors((prev) => ({ ...prev, selectedCountryId: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder
                    ${errors.selectedCountryId
                      ? "border-red-500"
                      : "focus:outline-none"
                    }`}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
                {errors.selectedCountryId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedCountryId}
                  </p>
                )}
              </label>

              {selectedCountryId === "1" && (
                <>
                  <div>
                    <label
                      htmlFor="state"
                      className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium"
                    >
                      State

                      <div className="relative">
                        <select
                          id="state"
                          className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder`}
                          value={selectedStateId}
                          onChange={(e) => {
                            handleStateChange(e);
                            setErrors((prev) => ({
                              ...prev,
                              selectedStateId: "",
                            })); // Clear error on change
                          }}
                        >
                          <option value="" selected disabled>
                            Select State
                          </option>
                          {states.map((state) => (
                            <option key={state.state_id} value={state.state_id}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>

                  {["1", "2", "3", "4", "5", "6", "7"].includes(
                    String(selectedStateId)
                  ) ? (
                    <div>
                      <label
                        htmlFor="district"
                        className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium"
                      >
                        District

                        <div className="relative">
                          <select
                            id="district"
                            className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder
                          `}
                            value={selectedDistrictId}
                            onChange={(e) => {
                              handleDistrictChange(e);
                              setErrors((prev) => ({
                                ...prev,
                                selectedDistrictId: "",
                              })); // Clear error on change
                            }}
                          >
                            <option value="" selected disabled>
                              Select District
                            </option>
                            {districts.map((option: any) => (
                              <option
                                key={option.disctict_id}
                                value={option.disctict_id}
                              >
                                {option.disctict_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="district"
                        className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium"
                      >District</label>
                      <InputField
                        id="district"
                        label=""
                        value={formData.personal_prof_district_name || ""}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            personal_prof_district_name: e.target.value,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            selectedDistrictId: "",
                          })); // Clear error on change
                        }}
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                {selectedCountryId !== "1" ? (
                  <>
                    <label
                      htmlFor="district"
                      className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium"
                    > City</label>
                    <InputField
                      id="city"
                      label=""
                      value={formData.personal_prof_city_name || ""}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          personal_prof_city_name: e.target.value,
                        }));
                        setErrors((prev) => ({
                          ...prev,
                          personal_prof_city_name: "",
                        })); // Clear error on change
                      }}
                    />
                  </>
                ) : (
                  <>
                    {isCityDropdown ? (
                      <>
                        <label
                          htmlFor="city"
                          className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium"
                        >
                          City
                          <div className="relative inline-block ml-2 group">
                            <AiOutlineInfoCircle className="text-gray-500 cursor-pointer ml-2" />
                            <div className="absolute hidden group-hover:flex flex-col bg-white border border-ashSecondary rounded shadow-md p-2 w-48 z-10">
                              <p className="text-sm text-black">
                                Select your city from the list. If your city is
                                not listed, select Others.
                              </p>
                            </div>
                          </div>

                          <div className="relative">
                            <select
                              id="city"
                              className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder
                          `}
                              value={selectedCityId}
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
                          </div>
                        </label>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="city"
                          className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium"
                        >
                          City</label>
                        <InputField
                          id="city"
                          label=""
                          value={formData.personal_prof_city_name || ""}
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              personal_prof_city_name: e.target.value,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              selectedCityId: "",
                            })); // Clear error on change
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Pincode:
                <input
                  type="text"
                  name="personal_prof_pin"
                  value={formData.personal_prof_pin || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      handleInputChange(e);
                      setErrors((prev) => ({ ...prev, personal_prof_pin: "" }));
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                    `}
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Alternate Mobile:
                <input
                  type="text"
                  name="personal_prof_phone"
                  value={formData.personal_prof_phone || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleInputChange(e);
                      setErrors((prev) => ({
                        ...prev,
                        personal_prof_phone: "",
                      }));
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                    `}
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                WhatsApp:
                <input
                  type="text"
                  name="personal_prof_whats"
                  value={formData.personal_prof_whats || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleInputChange(e);
                      setErrors((prev) => ({
                        ...prev,
                        personal_prof_whats: "",
                      }));
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                    `}
                />
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Email:
                <input
                  type="email"
                  name="personal_email"
                  value={formData.personal_email || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange(e);
                    const errorMessage = validateEmail(value)
                      ? ""
                      : "Invalid email format.";
                    setErrors((prev) => ({
                      ...prev,
                      personal_email: errorMessage,
                    }));
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                    ${errors.personal_email
                      ? "border-red-500"
                      : "focus:border-blue-500"
                    }`}
                />
                {errors.personal_email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_email}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Profile Email ID:
                <input
                  type="email"
                  name="admin_use_email"
                  value={formData.admin_use_email || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleEmailInputChange(e);
                    const errorMessage = validateEmail(value)
                      ? ""
                      : "Invalid email format.";
                    setErrors((prev) => ({
                      ...prev,
                      admin_use_email: errorMessage,
                    }));
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none border-ashBorder ${errors.admin_use_email
                    ? "border-red-500"
                    : "focus:outline-none"
                    }`}
                />
                {errors.admin_use_email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.admin_use_email}
                  </p>
                )}
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Profile Mobile No:
                <input
                  type="text"
                  name="personal_prof_mob_no"
                  value={formData.personal_prof_mob_no || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleInputChange(e);
                      setErrors((prev) => ({
                        ...prev,
                        personal_prof_mob_no: "",
                      }));
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                    `}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end items-center space-x-5 max-sm:flex-wrap-reverse max-sm:justify-center">
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
        </form>
      ) : (
        <div>
          <div className="grid grid-rows-1 grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Address:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_addr || "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Country:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_count_name || "N/A"}
                </span>
              </h5>
              {selectedCountryId === "1" && (
                <>
                  <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                    State:
                    <span className="font-normal">
                      {" "}
                      {contactDetails.personal_prof_stat_name || "N/A"}
                    </span>
                  </h5>

                  <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                    District:
                    <span className="font-normal">
                      {" "}
                      {contactDetails.personal_prof_district_name || "N/A"}
                    </span>
                  </h5>
                </>
              )}
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                City:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_city_name || "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Pincode:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_pin || "N/A"}
                </span>
              </h5>
            </div>

            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Alternate Mobile:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_phone || "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                WhatsApp:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_whats || "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Email:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_email || "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Profile Email ID:
                <span className="font-normal">
                  {" "}
                  {contactDetails.admin_use_email || "N/A"}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Profile Mobile No:
                <span className="font-normal">
                  {" "}
                  {contactDetails.personal_prof_mob_no || "N/A"}
                </span>
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};