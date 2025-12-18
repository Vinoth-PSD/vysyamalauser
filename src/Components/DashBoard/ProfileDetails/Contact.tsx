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

  // useEffect(() => {
  //   // Clear cities and reset to dropdown if no district is selected
  //   if (!selectedDistrictId) {
  //     setCities([]);
  //     setIsCityDropdown(true); // Default to dropdown
  //     return;
  //   }

  //   const fetchCities = async () => {
  //     try {
  //       const response = await apiClient.post("/auth/Get_City/", {
  //         district_id: selectedDistrictId.toString(),
  //       });

  //       const cityData = Object.values(response.data) as City[];
  //       setCities(cityData);

  //       // --- THIS IS THE NEW LOGIC ---
  //       if (cityData.length > 0) {
  //         // If we have cities, show the dropdown
  //         setIsCityDropdown(true);
  //       } else {
  //         // If API returns no cities, force the text input
  //         setIsCityDropdown(false);
  //       }
  //       // --- END OF NEW LOGIC ---

  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //       setCities([]);
  //       setIsCityDropdown(false); // Also force text input on error
  //     }
  //   };

  //   fetchCities();
  // }, [selectedDistrictId, refreshData]); // Dependencies are correct

  useEffect(() => {
    // Clear cities if no district is selected
    if (!selectedDistrictId) {
      setCities([]);
      setIsCityDropdown(true); // Always default to dropdown when no district
      setSelectedCityId("");
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await apiClient.post("/auth/Get_City/", {
          district_id: selectedDistrictId.toString(),
        });

        const cityData = Object.values(response.data) as City[];
        setCities(cityData);

        // IMPORTANT: After fetching cities, check if current city exists in new list
        if (formData.personal_prof_city_name && cityData.length > 0) {
          const matchingCity = cityData.find(city =>
            city.city_name === formData.personal_prof_city_name
          );

          if (matchingCity) {
            // City exists in new list - use dropdown with matching city
            setIsCityDropdown(true);
            setSelectedCityId(matchingCity.city_id.toString());
          } else if (cityData.length > 0) {
            // City doesn't exist but we have cities - show dropdown (empty)
            setIsCityDropdown(true);
            setSelectedCityId("");
            setFormData(prev => ({
              ...prev,
              personal_prof_city_name: ""
            }));
          } else {
            // No cities available - show text input
            setIsCityDropdown(false);
            setSelectedCityId("");
          }
        } else if (cityData.length > 0) {
          // We have cities but no current selection - show dropdown
          setIsCityDropdown(true);
          setSelectedCityId("");
        } else {
          // No cities available - show text input
          setIsCityDropdown(false);
          setSelectedCityId("");
        }

      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
        setIsCityDropdown(false); // On error, use text input
        setSelectedCityId("");
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

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    // Set the new state
    setSelectedStateId(selectedId);

    // --- NEW: Clear all child data ---
    setSelectedDistrictId("");
    setSelectedCityId("");
    setDistricts([]); // Clear district options
    setCities([]); // Clear city options
    setIsCityDropdown(true); // Reset city to dropdown

    // Update form data: set new state name, clear all child names
    setFormData((prevState) => ({
      ...prevState,
      personal_prof_stat_name: selectedName,
      personal_prof_district_name: "", // Clear district name
      personal_prof_city_name: "", // Clear city name
    }));

    // Clear any potential errors related to children
    setErrors((prev) => ({
      ...prev,
      selectedDistrictId: "", // Clear any potential stale errors
      selectedCityId: "", // Clear any potential stale errors
    }));
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    console.log('District changed to:', selectedId, selectedName); // Debug

    // Clear ALL city-related state
    setSelectedDistrictId(selectedId);
    setSelectedCityId(""); // Clear city selection
    setCities([]); // Clear cities list

    // Force dropdown mode initially (will adjust after API call)
    setIsCityDropdown(true);

    // Clear the city name in form data
    setFormData((prevState) => ({
      ...prevState,
      personal_prof_district_name: selectedName,
      personal_prof_city_name: "", // CLEAR the city name
    }));

    // Clear any potential errors
    setErrors((prev) => ({
      ...prev,
      selectedCityId: "",
    }));
  };


  const [isCityDropdown, setIsCityDropdown] = useState(true);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    console.log('City selected:', selectedId, selectedName); // Debug log

    setSelectedCityId(selectedId);

    if (selectedId === "others") {
      // Switch to text input for custom city
      setIsCityDropdown(false);
      setFormData((prevState) => ({
        ...prevState,
        personal_prof_city_name: "", // Clear to allow typing
      }));
    } else if (selectedId) {
      // A valid city is selected
      setIsCityDropdown(true);
      setFormData((prevState) => ({
        ...prevState,
        personal_prof_city_name: selectedName,
      }));
    }
  };

  // const handleEditClick = () => {
  //   if (isEditing) {
  //     setFormData({});
  //     setIsCityDropdown(true);
  //   } else {
  //     if (contactDetails) {
  //       setFormData(contactDetails);
  //     }
  //   }
  //   setIsEditing(!isEditing);
  // };


  const handleEditClick = () => {
    if (isEditing) {
      // Cancel editing - reset everything to original values
      setFormData({});
      setIsEditing(false);

      if (contactDetails) {
        // Reset all selections to original values
        setSelectedCountryId(contactDetails.personal_prof_count_id);
        setSelectedStateId(contactDetails.personal_prof_stat_id);
        setSelectedDistrictId(contactDetails.personal_prof_district_id);
        setSelectedCityId(contactDetails.personal_prof_city_id);

        // IMPORTANT: After resetting, fetch cities for the district
        const fetchCityForEdit = async () => {
          try {
            const response = await apiClient.post("/auth/Get_City/", {
              district_id: contactDetails.personal_prof_district_id.toString(),
            });

            const cityData = Object.values(response.data) as City[];
            setCities(cityData);

            if (cityData.length > 0) {
              const matchingCity = cityData.find(city =>
                city.city_id === contactDetails.personal_prof_city_id
              );

              if (matchingCity) {
                setIsCityDropdown(true);
              } else {
                setIsCityDropdown(false);
              }
            } else {
              setIsCityDropdown(false);
            }
          } catch (error) {
            console.error("Error fetching cities on cancel:", error);
            setIsCityDropdown(false);
          }
        };

        if (contactDetails.personal_prof_district_id) {
          fetchCityForEdit();
        }
      }
    } else {
      // Start editing
      setIsEditing(true);

      // Don't set formData here - let the useEffect handle it
      // This ensures cities are loaded first
    }
  };

  // Add this helper function
  // const findCityByName = (cityName: string, cityList: City[]): City | undefined => {
  //   if (!cityName || !cityList.length) return undefined;

  //   // Try exact match first
  //   let city = cityList.find(c => c.city_name.toLowerCase() === cityName.toLowerCase());

  //   // If not found, try partial match
  //   if (!city) {
  //     city = cityList.find(c =>
  //       cityName.toLowerCase().includes(c.city_name.toLowerCase()) ||
  //       c.city_name.toLowerCase().includes(cityName.toLowerCase())
  //     );
  //   }

  //   return city;
  // }; 
  
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


    let cityToSubmit = "";

    if (isCityDropdown && selectedCityId && selectedCityId !== "others") {
      // Get city name from dropdown selection
      const selectedCity = cities.find(city => city.city_id.toString() === selectedCityId);
      cityToSubmit = selectedCity?.city_name || "";
      // cityIdToSubmit = selectedCityId;
    } else {
      // Use text input value
      cityToSubmit = formData.personal_prof_city_name || "";
    }

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
          //Profile_city: selectedCityId || formData.personal_prof_city_name,
          Profile_city: cityToSubmit, // Use the determined city
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
    if (isEditing && contactDetails) {
      console.log('Entering edit mode with contact details:', contactDetails); // Debug

      // First, set the form data
      setFormData({
        ...contactDetails,
        personal_prof_city_name: contactDetails.personal_prof_city_name || ""
      });

      // Then, check if we have cities loaded and find matching city
      if (cities.length > 0 && contactDetails.personal_prof_city_name) {
        const matchingCity = cities.find(city =>
          city.city_name === contactDetails.personal_prof_city_name
        );

        if (matchingCity) {
          console.log('Found matching city in dropdown:', matchingCity); // Debug
          // City exists in dropdown - use dropdown
          setIsCityDropdown(true);
          setSelectedCityId(matchingCity.city_id.toString());
        } else {
          console.log('City not found in dropdown, using text input'); // Debug
          // City doesn't exist in dropdown - use text input
          setIsCityDropdown(false);
          setSelectedCityId("");
        }
      } else if (cities.length === 0 && contactDetails.personal_prof_city_name) {
        // No cities loaded but we have a city name - use text input
        console.log('No cities loaded, using text input'); // Debug
        setIsCityDropdown(false);
        setSelectedCityId("");
      } else if (cities.length > 0) {
        // Cities loaded but no city name - use dropdown
        console.log('Cities loaded but no city name, using dropdown'); // Debug
        setIsCityDropdown(true);
        setSelectedCityId("");
      }
    }
  }, [isEditing, cities, contactDetails]);


  // Add this useEffect for debugging
  useEffect(() => {
    console.log('Current state:', {
      isCityDropdown,
      selectedDistrictId,
      selectedCityId,
      citiesCount: cities.length,
      cities: cities,
      formDataCity: formData.personal_prof_city_name
    });
  }, [isCityDropdown, selectedDistrictId, selectedCityId, cities, formData.personal_prof_city_name]);

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
                          const newDistrictName = e.target.value;

                          // --- NEW: Update form data and clear city ---
                          setFormData((prev) => ({
                            ...prev,
                            personal_prof_district_name: newDistrictName,
                            personal_prof_city_name: "", // Clear city name
                          }));

                          // --- NEW: Clear child state ---
                          setSelectedCityId("");
                          setCities([]);
                          setIsCityDropdown(true);

                          setErrors((prev) => ({
                            ...prev,
                            selectedDistrictId: "",
                            selectedCityId: "",
                          })); // Clear error on change
                        }}
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                  City:
                  {selectedCountryId === "1" && isCityDropdown && cities.length > 0 ? (
                    <>
                      <div className="relative inline-block ml-2 group">
                        <AiOutlineInfoCircle className="text-gray-500 cursor-pointer" />
                        <div className="absolute hidden group-hover:flex flex-col bg-white border border-ashSecondary rounded shadow-md p-2 w-48 z-10">
                          <p className="text-sm text-black">
                            Select your city from the list. If your city is not listed, select Others.
                          </p>
                        </div>
                      </div>
                      <select
                        name="personal_prof_city_name"
                        value={selectedCityId}
                        onChange={handleCityChange}
                        className="font-normal border rounded px-3 py-2 w-full mt-1 focus:outline-none border-ashBorder"
                      >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                          <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </option>
                        ))}
                        <option value="others">Others</option>
                      </select>
                    </>
                  ) : (
                    <input
                      type="text"
                      name="personal_prof_city_name"
                      value={formData.personal_prof_city_name || ""}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          personal_prof_city_name: e.target.value,
                        }));
                      }}
                      className="font-normal border rounded px-3 py-2 w-full mt-1 focus:outline-none border-ashBorder"
                      placeholder="Enter city name"
                    />
                  )}
                </label>
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