/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";
import apiClient from "../../../API";

// Define the interface for family details
interface FamilyDetails {
  personal_about_fam: string;
  personal_father_name: string;
  personal_father_occu_id: number;
  personal_father_occu_name: string;
  personal_mother_name: string;
  personal_mother_occu_name: string;
  persoanl_fam_sta_id: string;
  personal_fam_sta_name: string;
  personal_sis: string;
  personal_sis_married: string;
  personal_bro: string;
  personal_bro_married: string;
  personal_prope_det: string;
  personal_property_worth:string;
}

interface FamilyStatus {
  family_status_id: number;
  family_status_name: string;
}

interface Occupation {
  occupation_id: number;
  occupation_description: string;
}

interface Occupation1 {
  occupation_id: number;
  occupation_description: string;
}

export const Family = () => {
  const [familyDetails, setFamilyDetails] = useState<FamilyDetails | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<FamilyDetails>>({});
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
  const [selectedFamilyStatusId, setSelectedFamilyStatusId] = useState<
    number | string
  >("");
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  // const [selectedOccupationId, setSelectedOccupationId] = useState<
  //   number | string
  // >("");
  const [, setSelectedOccupationId] = useState<number | string>("");
  const [occupations1, setOccupations1] = useState<Occupation1[]>([]);
  const [, setSelectedOccupationId1] = useState<number | string>("");
  const [refreshData, setRefreshData] = useState(false);
  const [errors, setErrors] = useState({
    personal_father_name: "",
    personal_father_occu_name: "",
    personal_mother_name: "",
    personal_mother_occu_name: "",
    selectedFamilyStatusId: "",
    personal_sis: "",
    personal_sis_married: "",
    personal_bro: "",
    personal_bro_married: "",
    personal_prope_det: "",
    personal_property_worth:"",
    personal_about_fam: "",
  });

  useEffect(() => {
    const fetchFamilyDetails = async () => {
      try {
        const response = await apiClient.post(
          "/auth/get_myprofile_family/",
          {
            profile_id: loginuser_profileId , // replace with the actual profile_id if needed
          }
        );
        const data = response.data.data;
        setFamilyDetails(response.data.data);

        const matchedFamilyStatus = familyStatuses.find((status) =>
          status.family_status_name.includes(data.personal_fam_sta_name)
        );
        if (matchedFamilyStatus) {
          setSelectedFamilyStatusId(matchedFamilyStatus.family_status_id);
        }

        const matchedFatherOcc = occupations.find((occupation) =>
          occupation.occupation_description.includes(
            data.personal_father_occu_name
          )
        );
        if (matchedFatherOcc) {
          setSelectedOccupationId(matchedFatherOcc.occupation_id);
        }

        const matchedMotherOcc = occupations1.find((occupation) =>
          occupation.occupation_description.includes(data.occupation_id)
        );
        if (matchedMotherOcc) {
          setSelectedOccupationId1(matchedMotherOcc.occupation_id);
        }
      } catch (error) {
        console.error("Error fetching family details:", error);
      }
    };

    fetchFamilyDetails();
  }, [familyStatuses, refreshData]);

  useEffect(() => {
    const fetchFamilyStatuses = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_FamilyStatus/"
        );
        const familyStatusData = Object.values(response.data) as FamilyStatus[];
        setFamilyStatuses(familyStatusData);
      } catch (error) {
        console.error("Error fetching family statuses:", error);
      }
    };
    const fetchOccupations = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Parent_Occupation/"
        );
        const occupationData = Object.values(response.data) as Occupation[];
        setOccupations(occupationData);
      } catch (error) {
        console.error("Error fetching occupations:", error);
      }
    };
    const fetchOccupations1 = async () => {
      try {
        const response = await apiClient.post(
          "/auth/Get_Parent_Occupation/"
        );
        const occupationData = Object.values(response.data) as Occupation[];
        setOccupations1(occupationData);
      } catch (error) {
        console.error("Error fetching occupations:", error);
      }
    };
    fetchOccupations1();
    fetchOccupations();
    fetchFamilyStatuses();
  }, []);

  const handleFamilyStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFamilyStatusId(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      persoanl_fam_sta_name: e.target.value,
    }));
  };
  
  const handleEditClick = () => {
    if (isEditing) {
      // Reset form data to an empty object if exiting edit mode
      setFormData({});
    } else {
      if (familyDetails) {
        setFormData(familyDetails);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate each field and store errors
    const newErrors = {
      personal_father_name: !formData.personal_father_name
        ? "Father's name is required."
        : "",
        personal_father_occu_name: !formData.personal_father_occu_name
        ? "Father's occupation is required."
        : "",
      personal_mother_name: !formData.personal_mother_name
        ? "Mother's name is required."
        : "",
        personal_mother_occu_name: !formData.personal_mother_occu_name
        ? "Mother's occupation is required."
        : "",
      selectedFamilyStatusId: !selectedFamilyStatusId
        ? "Family status is required."
        : "",
      personal_sis: !formData.personal_sis ? "Sister's name is required." : "",
      personal_sis_married: !formData.personal_sis_married
        ? "Sister's marital status is required."
        : "",
      personal_bro: !formData.personal_bro ? "Brother's name is required." : "",
      personal_bro_married: !formData.personal_bro_married
        ? "Brother's marital status is required."
        : "",
      personal_prope_det: !formData.personal_prope_det
        ? "Property details are required."
        : "",
        personal_property_worth:!formData.personal_property_worth
        ?"property worth is required."
        :"",
      personal_about_fam: !formData.personal_about_fam
        ? "About family is required."
        : "",
    };

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      setErrors(newErrors); // Update the error state
      toast.error("Please fill all fields correctly.");
      return;
    }

    //console.log(selectedOccupationId, "mothocc");
    try {
      const response = await apiClient.post(
        "/auth/update_myprofile_family/",
        {
          profile_id: loginuser_profileId,
          father_name: formData.personal_father_name,
          father_occupation: formData.personal_father_occu_name,
          mother_name: formData.personal_mother_name,
          mother_occupation:formData.personal_mother_occu_name,
          family_status: selectedFamilyStatusId,
          no_of_sister: formData.personal_sis,
          no_of_sis_married: formData.personal_sis_married,
          no_of_brother: formData.personal_bro,
          no_of_bro_married: formData.personal_bro_married,
          property_details: formData.personal_prope_det,
          property_worth:formData.personal_property_worth,
          about_family: formData.personal_about_fam,
        }
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setRefreshData((prev) => !prev); // Trigger re-fetch of data
        setFamilyDetails((prevState) => ({
          ...prevState!,
          ...formData,
        }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating family details:", error);
      toast.error("Failed to update family details. Please try again.");
    }
  };

  if (!familyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5  max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2">
        Family Details
        <MdModeEdit
          className="text-2xl text-main ml-2 cursor-pointer max-sm:text-base"
          onClick={handleEditClick}
        />
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-rows-1 grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                About My Family:
                <input
                  name="personal_about_fam"
                  value={formData.personal_about_fam || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({ ...prev, personal_about_fam: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_about_fam
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_about_fam && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_about_fam}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Father Name:
                <input
                  type="text"
                  name="personal_father_name"
                  value={formData.personal_father_name || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabetic characters and spaces
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      handleInputChange(e); // Call your input change handler
                      setErrors((prev) => ({
                        ...prev,
                        personal_father_name: "",
                      })); // Clear error on valid input
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_father_name
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_father_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_father_name}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Father Occupation:
                <input
                  type="text"
                  name="personal_father_occu_name"
                  value={formData.personal_father_occu_name || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabetic characters and spaces (if needed)
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      handleInputChange(e);
                      setErrors((prev) => ({
                        ...prev,
                        personal_father_occu_name: "",
                      })); // Clear error on valid input
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
      ${
        errors.personal_father_occu_name
          ? "border-red-500"
          : "focus:border-blue-500"
      }`}
                />
                {errors.personal_father_occu_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_father_occu_name}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Mother Name:
                <input
                  type="text"
                  name="personal_mother_name"
                  value={formData.personal_mother_name || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabetic characters and spaces
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      handleInputChange(e); // Call your input change handler
                      setErrors((prev) => ({
                        ...prev,
                        personal_mother_name: "",
                      })); // Clear error on valid input
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_mother_name
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_mother_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_mother_name}
                  </p>
                )}
              </label>

             
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Mother Occupation:
                <input
                  type="text"
                  name="personal_mother_occu_name"
                  value={formData.personal_mother_occu_name || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only alphabetic characters and spaces (if needed)
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      handleInputChange(e);
                      setErrors((prev) => ({
                        ...prev,
                        personal_mother_occu_name: "",
                      })); // Clear error on valid input
                    }
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
      ${
        errors.personal_mother_occu_name
          ? "border-red-500"
          : "focus:border-blue-500"
      }`}
                />
                {errors.personal_mother_occu_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_mother_occu_name}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Family Status:
                <select
                  name="persoanl_fam_sta_id"
                  value={selectedFamilyStatusId}
                  onChange={(e) => {
                    handleFamilyStatusChange(e);
                    setErrors((prev) => ({
                      ...prev,
                      selectedFamilyStatusId: "",
                    })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-[10px] w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.selectedFamilyStatusId
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                >
                  <option value="">Select Family Status</option>
                  {familyStatuses.map((status) => (
                    <option
                      key={status.family_status_id}
                      value={status.family_status_id}
                    >
                      {status.family_status_name}
                    </option>
                  ))}
                </select>
                {errors.selectedFamilyStatusId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedFamilyStatusId}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Sisters:
                <input
                  type="text"
                  name="personal_sis"
                  value={formData.personal_sis || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({ ...prev, personal_sis: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_sis
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_sis && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_sis}
                  </p>
                )}
              </label>
            </div>
            <div>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Sisters Married:
                <input
                  type="text"
                  name="personal_sis_married"
                  value={formData.personal_sis_married || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({
                      ...prev,
                      personal_sis_married: "",
                    })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_sis_married
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_sis_married && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_sis_married}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Brothers:
                <input
                  type="text"
                  name="personal_bro"
                  value={formData.personal_bro || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({ ...prev, personal_bro: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_bro
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_bro && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_bro}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Brothers Married:
                <input
                  type="text"
                  name="personal_bro_married"
                  value={formData.personal_bro_married || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({
                      ...prev,
                      personal_bro_married: "",
                    })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_bro_married
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_bro_married && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_bro_married}
                  </p>
                )}
              </label>

              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Property Details:
                <div className="relative inline-block ml-2 group">
                  <AiOutlineInfoCircle className="text-primary align-middle" />
                  {/* Tooltip */}
                  <div className="absolute hidden group-hover:flex flex-col bg-white border border-ashSecondary rounded shadow-md p-2 w-48 z-10">
                    <p className="text-sm text-black">Residential,</p>
                    <p className="text-sm text-black">Commercial,</p>
                    <p className="text-sm text-black">Shopping Complex,</p>
                    <p className="text-sm text-black">Farm house,,</p>
                    <p className="text-sm text-black">Shop,</p>
                    <p className="text-sm text-black">Agriculture land,</p>
                    <p className="text-sm text-black">
                      Multistorage building etc.,
                    </p>
                  </div>
                </div>

                <input
                  name="personal_prope_det"
                  value={formData.personal_prope_det || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({ ...prev, personal_prope_det: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_prope_det
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_prope_det && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_prope_det}
                  </p>
                )}
              </label>
              <label className="block mb-2 text-[20px] text-ash font-semibold max-xl:text-[18px] max-lg:text-[16px] max-lg:font-medium">
                Property Worth:
                <input
                  name="personal_property_worth"
                  value={formData.personal_property_worth || ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    setErrors((prev) => ({ ...prev, personal_property_worth: "" })); // Clear error on change
                  }}
                  className={`font-normal border rounded px-3 py-2 w-full focus:outline-none  border-ashBorder
                                        ${
                                          errors.personal_property_worth
                                            ? "border-red-500"
                                            : "focus:border-blue-500"
                                        }`}
                />
                {errors.personal_property_worth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personal_property_worth}
                  </p>
                )}
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
          <div className="grid grid-rows-1 grid-cols-2 gap-4 max-sm:grid-cols-1 max-sm:gap-0">
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                About My Family:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_about_fam}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Father Name:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_father_name}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Father Occupation:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_father_occu_name}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Mother Name:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_mother_name}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Mother Occupation:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_mother_occu_name}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Family Status:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_fam_sta_name}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Sisters:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_sis}
                </span>
              </h5>
            </div>
            <div>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Sisters Married:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_sis_married}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Brothers:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_bro}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Brothers Married:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_bro_married}
                </span>
              </h5>

              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Property Details:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_prope_det}
                </span>
              </h5>
              <h5 className="text-[20px] text-ash font-semibold mb-4 max-lg:text-[16px]">
                Property Worth:
                <span className="font-normal">
                  {" "}
                  {familyDetails.personal_property_worth}
                </span>
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
