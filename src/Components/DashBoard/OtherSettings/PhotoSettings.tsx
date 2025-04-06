import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadFile from "../../UploadImages/UploadFile"; // Assuming the UploadFile component is reusable
//import closebtn from "../../../assets/icons/closebtn.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
//import axios from "axios";
import { NotifyError, NotifySuccess, ToastNotification } from "../../Toast/ToastNotification";
import apiClient from "../../../API";

// Validation schema using zod
const schema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

type FormData = z.infer<typeof schema>;

export const PhotoSettings = () => {
  // const [selectedProfileImages, setSelectedProfileImages] = useState<File[]>(
  //   []
  // );
  const [selectedHoroscopeImage, setSelectedHoroscopeImage] =
    useState<File | null>(null);
  const [selectedIDProof, setSelectedIDProof] = useState<File | null>(null);
  const [selectedDivorceProof, setSelectedDivorceProof] = useState<File | null>(
    null
  );
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const loginuser_profile_id = localStorage.getItem("loginuser_profile_id");
 // const [uploadedProfileImages, setUploadedProfileImages] = useState([]);
  const [uploadedHoroscopeFile, setUploadedHoroscopeFile] = useState("");
  const [uploadedIDProof, setUploadedIDProof] = useState("");
  const [uploadedDivorceProof, setUploadedDivorceProof] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadingImages, ] = useState<string[]>([]);


  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async () => {
    if (!loginuser_profile_id) {
      alert("User not logged in.");
      return;
    }

    const formData = new FormData();

    formData.append("profile_id", loginuser_profile_id);
    if (selectedHoroscopeImage)
      formData.append("horoscope_file", selectedHoroscopeImage);
    if (selectedIDProof) formData.append("idproof_file", selectedIDProof);
    if (selectedDivorceProof)
      formData.append("divorcepf_file", selectedDivorceProof);
    formData.append(
      "photo_password",
      isChecked ? getValues("password") || "" : ""
    );
    formData.append("photo_protection", isChecked ? "1" : "0");
    formData.append("Video_url", videoUrl); // Replace with actual static value
  //  const filePreview = URL.createObjectURL(file);
  //   setUploadingImages((prev) => [...prev, filePreview]);



    try {
      const response = await fetch(
         "https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/Photo_Id_Settings/",
        //"http://103.214.132.20:8000/auth/Photo_Id_Settings/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to upload. Please try again.");
        return;
      }
     // setUploadingImages((prev) => prev.filter((img) => img !== filePreview));
      const result = await response.json();
      console.log("Success:", result);
     // alert("Data uploaded successfully.");
      NotifySuccess('Photo Settings updated successfully');
      reset(); // Reset form fields
       // Re-fetch the uploaded images after successful upload
    fetchUploadedImages();
    } catch (error) {
      console.error("Error:", error);
      NotifyError("An error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedHoroscopeImage(null);
    setSelectedIDProof(null);
    setSelectedDivorceProof(null);
    setIsChecked(false);
    setVideoUrl('');
    // Reset other states if necessary
  };
  
  const renderFileUploadSection = (
    title: string,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    file: File | null,
    description: string
  ) => (
    <div className="mb-6">
      <h2 className="font-semibold text-xl mb-4">{title}</h2>
      <UploadFile
        heading="Select a file or drag and drop here"
        desc={description}
        name={title.toLowerCase().replace(/ /g, "_")}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setSelectedFile(files[0]);
          }
        }}
        multiple={false}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
       {file && (
    <div className="flex items-center justify-between mt-4 border-b border-gray-200 py-2">
      <div className="flex items-center space-x-4">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="h-16 w-16"
        />
        {uploadingImages.includes(URL.createObjectURL(file)) ? (
          <span className="text-blue-500">Uploading...</span>
        ) : (
          <span className="text-lg font-semibold">{file.name}</span>
        )}
      </div>
      {/* {!uploadingImages.includes(URL.createObjectURL(file)) && (
        <button onClick={() => setSelectedFile(null)} className="text-red-500">
          <img src={closebtn} alt="remove" className="h-4 w-4" />
        </button>
      )} */}
    </div>
  )}
    </div>
  );

  

  const profileId = loginuser_profile_id; // Replace with dynamic profile ID from session storage
  const pageId = "2";

  // Fetch uploaded images and files
  const fetchUploadedImages = async () => {
    try {
      const response = await apiClient.post(
        "/auth/Get_save_details/",
        {
          profile_id: profileId,
          page_id: pageId,
        }
      );

      if (response.data.Status === 1) {
        const data = response.data.data;
       // setUploadedProfileImages(data.images || []);
        setUploadedHoroscopeFile(data.horoscope_file || "");
        setUploadedIDProof(data.Profile_idproof || "");
        setUploadedDivorceProof(data.Profile_divorceproof || "");
        setVideoUrl(data.Video_url || ""); // Set video URL from API response
      }
    } catch (error) {
      console.error("Error fetching uploaded images:", error);
    }
  };

  useEffect(() => {
    fetchUploadedImages();
  }, []);


  const renderSingleFile = (
    fileUrl: string | undefined,
    title:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined
  ) =>
    fileUrl ? (
      <div className="mb-4">
        <h1 className="text-primary text-xl font-semibold">{title} Uploaded</h1>
        <div className="flex items-center justify-between border-b border-gray-200 py-2">
          <div className="flex items-center space-x-4">
            <img src={fileUrl}             
            alt={typeof title === 'string' ? title : undefined} // Convert title to a string or undefined
           className="h-16 w-16" />
            <h1 className="text-lg font-semibold">
              {fileUrl.split("/").pop()}
            </h1>
          </div>
        </div>
      </div>
    ) : null;

    

  return (
    <div className="p-6">
       <ToastNotification/>
       <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5 max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">Photo Settings</h2>


      {renderFileUploadSection(
        "Upload Horoscope Image",
        setSelectedHoroscopeImage,
        selectedHoroscopeImage,
        "JPG, PNG, PDF file size no more than 10MB"
      )}
      {renderSingleFile(uploadedHoroscopeFile, "Horoscope File")}

      {renderFileUploadSection(
        "Upload ID Proof",
        setSelectedIDProof,
        selectedIDProof,
        "Any Govt ID Proof is must. This will not be displayed on the portal. For admin purposes only."
      )}
      {renderSingleFile(uploadedIDProof, "ID Proof")}

      {renderFileUploadSection(
        "Upload Divorce Proof",
        setSelectedDivorceProof,
        selectedDivorceProof,
        "Applicable for divorced individuals. JPG, PNG, PDF file size no more than 10MB."
      )}
      {renderSingleFile(uploadedDivorceProof, "Divorce Proof")}

      {/* Password Protection Section */}
      <div className="my-5">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-left">
          To Lock Your Profile Pictures
        </h1>
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="passwordCheckbox"
            className="w-4 h-4 mr-2"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="passwordCheckbox">
            Protect my images with password (only people you share the password
            with can view the images)
          </label>
        </div>
      </div>

      {isChecked && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <label htmlFor="password" className="block mb-2 text-lg">
            Enter Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              id="password"
              className="w-full px-4 py-2 border rounded"
            />
            <div
              onClick={handleShowPassword}
              className="absolute right-4 top-2.5 cursor-pointer text-gray-600"
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </form>
      )}

      <br />

      <div className="">
        <h1 className="font-semibold text-primary text-xl mb-4 flex items-center">
          Upload Videos, if any
          <div className="relative inline-block ml-2 group">
            <AiOutlineInfoCircle className="text-primary align-middle" />
            {/* Tooltip */}
            <div className="absolute hidden group-hover:flex flex-col bg-white border border-ashSecondary rounded shadow-md p-2 w-48 z-10">
              <p className="text-sm text-black mb-1">Portfolio videos</p>
              <p className="text-sm text-black mb-1">Business videos</p>
              <p className="text-sm text-black">Family videos</p>
              <p className="text-sm text-black">Self-intro videos</p>
            </div>
          </div>
        </h1>

        <div>
          <label
            htmlFor="youtubeurl"
            className="block mb-2 text-base text-primary font-medium"
          >
            Upload Video Link
          </label>

          <input
            type="text"
            onChange={(e) => setVideoUrl(e.target.value)} // Update state on input change
            name="youtubeurl"
            id="youtubeurl"
            value={videoUrl} // Bind state to input value
            placeholder="URL"
            className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
          />
        </div>
        <p className="mt-3 text-ash text-xs ">
          Note: If video URL is not available, you can share the videos to
          Vysyamala's admin WhatsApp No.9043085524
        </p>
      </div>
      <button
     //   onClick={onSubmit}
     onClick={() => {
      onSubmit();
      resetForm();
    }}
        className="flex items-center py-[10px] px-14 bg-gradient text-white shadow-redboxshadow rounded-[6px] mt-2 max-sm:px-8"
      >
        Submit
      </button>
    </div>
  );
};
