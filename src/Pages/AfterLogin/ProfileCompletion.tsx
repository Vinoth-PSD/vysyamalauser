// import { useState, useEffect } from "react";
// import apiClient from "../../API";
// import { NotifyError, NotifySuccess } from "../../Components/Toast/ToastNotification";

// // type EmptyField = {
// //   field: string;
// // };

// const ProfileCompletionForm = () => {

//   const [formData, setFormData] = useState({
//     photo_upload: null,
//     Profile_idproof:null,
//     horoscope_file: null,
//     image:null,
//     EmailId: "",
//     anual_income:"",
//     property_worth: "",
//     about_self: "",
//     about_family: "",
//     career_plans: "",
//     Video_url: "",
//   });

//   const [emptyFields, setEmptyFields] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

//   useEffect(() => {
//     // Fetch the empty fields from the API
//     const fetchEmptyFields = async () => {
//       try {
//         const response = await apiClient.post(
//           "/auth/get_myprofile_personal/",
//           {
//             profile_id: loginuser_profileId,
//             // user_profile_id: loginuser_profileId,
//           }
//         );
//         const data = response.data;

//         if (data?.data?.empty_fields) {
//           // setEmptyFields(data.data.empty_fields);
//           setEmptyFields(
//             data.data.empty_fields.map(
//               (field: { field: string }) => field.field
//             )
//           );
//         } else {
//           setEmptyFields([]);
//         }
//       } catch (err) {
//         setError("Failed to fetch data from the API");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmptyFields();
//   }, []);

//   console.log(emptyFields);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { name, files } = e.target;
//   //   setFormData({ ...formData, [name]: files?.[0] || null });
//   // };

//   const convertToBase64 = (file: File): Promise<string | null> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };
  
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (!files || files.length === 0) return;
  
//     try {
//       const base64File = await convertToBase64(files[0]);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: base64File, // Store the base64 string in formData
//       }));
//     } catch (error) {
//       console.error("Error converting file to base64:", error);
//       alert("Failed to upload the file. Please try again.");
//     }
//   };
  
  

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   console.log("Form Data Submitted:", formData);
//   //   // Add logic to handle form submission, such as sending data to an API
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Combine all the fields into one payload object
//   const payload = {
//     profile_id: loginuser_profileId || "",
//     EmailId: formData.EmailId || "",
//     property_worth: formData.property_worth || "",
//     about_self: formData.about_self || "",
//     about_family: formData.about_family || "",
//     career_plans: formData.career_plans || "",
//     Video_url: formData.Video_url || "",
//     photo_upload: formData.photo_upload || null, // Send as base64 if needed
//     horoscope_file: formData.horoscope_file || null, // Send as base64 if needed
//     anual_income:formData.anual_income || null, 
//   };

//     // if (formData.Profile_idproof) {
//     //   payload.append("image", formData.Profile_idproof);
//     // }
//     // if (formData.horoscope_file) {
//     //   payload.append("horoscope_file", formData.horoscope_file);
//     // }

//     try {
//       const response = await apiClient.post(
//         "/auth/Profile_other_fields/",
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Response:", response.data);
//     //  alert("Form submitted successfully!");
//       NotifySuccess("Form submitted successfully");
//     } catch (err) {
//       console.error("Error submitting the form:", err);
//       //alert("Failed to submit the form. Please try again.");
//       NotifyError("Error submitting the form:")
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-4xl mx-4 p-6 bg-white rounded shadow-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Profile Completion
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {emptyFields.length > 0 ? (
//             emptyFields.map((field, index) => (
//               <div key={index} className="form-group mb-4">
//                 <label
//                   htmlFor={field}
//                   className="block mb-2 text-base text-primary font-medium"
//                 >
//                   {/* {field.field.replace(/_/g, " ")} */}
//                   {field === "photo_upload"
//                     ? "Upload Photo"
//                     : field === "horoscope_file"
//                     ? "Upload Horoscope Image"
//                     : field === "Profile_idproof"
//                     ? "Profile ID Proof"
//                     : field === "property_worth"
//                     ? "Property Worth"
//                     : field === "about_self"
//                     ? "About Self"
//                     : field === "about_family"
//                     ? "About Family"
//                     : field === "career_plans"
//                     ? "Career Plans"
//                     : field === "anual_income"
//                     ? "Annual Income"
//                     : field === "Video_url"
//                     ? "Video url"
//                      : field === "EmailId "
//                     ? "Email"
//                     : field.replace(/_/g, " ")}
//                 </label>
//                 {field === "photo_upload" ||
//                 field === "horoscope_file" ||
//                 field === "Profile_idproof" ? (
//                   <input
//                     type="file"
//                     id={field}
//                     name={field}
//                     accept={field === "photo_upload" ? "video/*" : ""}
//                     onChange={handleFileChange}
//                     className="outline-none px-3 py-2 w-full text-primary border border-ashBorder rounded"
//                   />
//                 ) : (
//                   <input
//                     type="text"
//                     id={field}
//                     name={field}
//                     onChange={handleInputChange}
//                     className="outline-none px-3 py-2 w-full text-primary border border-ashBorder rounded"
//                   />
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No fields to complete.</p>
//           )}

//           <div className="flex justify-end mt-2">
//             <button
//               type="submit"
//               // className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] shadow-redboxshadow max-sm:px-8"
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfileCompletionForm;



/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import apiClient from "../../API";
import { NotifyError, NotifySuccess } from "../../Components/Toast/ToastNotification";
 import { useNavigate } from "react-router-dom";


const ProfileCompletionForm = () => {

  const [formData, setFormData] = useState({
    photo_upload: "",
    Profile_idproof:"",
    horoscope_file: "",
    image:"",
    EmailId: "",
    anual_income:"",
    property_worth: "",
    about_self: "",
    about_family: "",
    career_plans: "",
    Video_url: "",
  });

  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loginuser_profileId = sessionStorage.getItem("loginuser_profile_id");

  const navigate = useNavigate();

  // const handleNavigation = () => {
  //   navigate("/MyProfile"); // Adjust the path to match your route for MyProfile
  // };

 

  useEffect(() => {
    // Fetch the empty fields from the API
    const fetchEmptyFields = async () => {
      try {
        const response = await apiClient.post(
          "/auth/get_myprofile_personal/",
          {
            profile_id: loginuser_profileId,
            // user_profile_id: loginuser_profileId,
          }
        );
        const data = response.data;

        if (data?.data?.empty_fields) {
          // setEmptyFields(data.data.empty_fields);
          setEmptyFields(
            data.data.empty_fields.map(
              (field: { field: string }) => field.field
            )
          );
        } else {
          setEmptyFields([]);
        }
      } catch (err) {
        setError("Failed to fetch data from the API");
      } finally {
        setLoading(false);
      }
    };

    fetchEmptyFields();
  }, []);

  console.log(emptyFields);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    const file = files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file, // Store the file object directly
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine all the fields into one payload object
  const payload :any = {
     profile_id: loginuser_profileId || "",
    // image:formData.image || "",
    // Profile_idproof:formData.Profile_idproof || "",
    // EmailId: formData.EmailId || "",
    // property_worth: formData.property_worth || "",
    // about_self: formData.about_self || "",
    // about_family: formData.about_family || "",
    // career_plans: formData.career_plans || "",
    // Video_url: formData.Video_url || "",
    // //photo_upload: formData.photo_upload || null, // Send as base64 if needed
    // horoscope_file: formData.horoscope_file || "", // Send as base64 if needed
    // anual_income:formData.anual_income || "", 
  };
   // Only add fields that are typed (non-empty) or not files
   if (formData.EmailId) payload.EmailId = formData.EmailId;
   if (formData.anual_income) payload.anual_income = formData.anual_income;
   if (formData.property_worth) payload.property_worth = formData.property_worth;
   if (formData.about_self) payload.about_self = formData.about_self;
   if (formData.about_family) payload.about_family = formData.about_family;
   if (formData.career_plans) payload.career_plans = formData.career_plans;
   if (formData.Video_url) payload.Video_url = formData.Video_url;
 
   // If the file fields have a value, add them as base64
   if (formData.image) payload.image = formData.image;
   if (formData.horoscope_file) payload.horoscope_file = formData.horoscope_file;
   if (formData.Profile_idproof) payload.Profile_idproof = formData.Profile_idproof;

    // Validate the payload before submitting
  const hasRequiredFields = Object.values(payload).some((value) => value);
  if (!hasRequiredFields) {
    NotifyError("At least one field must be filled to submit.");
    return;
  }

    try {
      const response = await apiClient.post(
        "/auth/Profile_other_fields/",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
    //  alert("Form submitted successfully!");
      NotifySuccess("Form submitted successfully");
       // Navigate to the MyProfile page
       navigate("/MyProfile");
    } catch (err) {
      console.error("Error submitting the form:", err);
      //alert("Failed to submit the form. Please try again.");
      NotifyError("Error submitting the form:")
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-grayBg">
    <div className="container mx-auto h-[90vh]  flex justify-center items-center py-20 max-md:py-10">
      <div className="w-full max-w-4xl p-10 bg-white rounded-2xl shadow-profileCardShadow max-sm:w-full max-sm:p-5">
        <h2 className="text-2xl font-semibold text-start mb-6 max-md:text-xl max-md:mb-4">
          Profile Completion
        </h2>
        <form onSubmit={handleSubmit}>
          {emptyFields.length > 0 ? (
            emptyFields.map((field, index) => (
              <div key={index} className="form-group mb-4">
                <label
                  htmlFor={field}
                  className="block mb-2 text-base text-primary font-medium"
                >
                  {/* {field.field.replace(/_/g, " ")} */}
                  {field === "image"
                    ? "Profile Images"
                    : field === "horoscope_file"
                    ? "Upload Horoscope Image"
                    : field === "Profile_idproof"
                    ? "Profile ID Proof"
                    : field === "property_worth"
                    ? "Property Worth"
                    : field === "about_self"
                    ? "About Self"
                    : field === "about_family"
                    ? "About Family"
                    : field === "career_plans"
                    ? "Career Plans"
                    : field === "anual_income"
                    ? "Annual Income"
                    : field === "Video_url"
                    ? "Video url"
                     : field === "EmailId "
                    ? "Email"
                    : field.replace(/_/g, " ")}
                </label>
                {field === "image" ||
                field === "horoscope_file" ||
                field === "Profile_idproof" ? (
                  <input
                    type="file"
                    id={field}
                    name={field}
                    accept={field === "image" ? "image/*" : ""}
                    onChange={handleFileChange}
                    className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                  />
                ) : (
                  <input
                    type="text"
                    id={field}
                    name={field}
                    onChange={handleInputChange}
                    className="outline-none w-full text-sm text-placeHolderColor px-3 py-[13px] border border-ashBorder rounded"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No fields to complete.</p>
          )}

          <div className="flex justify-end mt-2">
            <button
              type="submit"
            // onClick={handleNavigation}
              // className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] shadow-redboxshadow max-sm:px-8"
              className="flex items-center py-[10px] px-14 bg-gradient text-white shadow-redboxshadow rounded-[6px] mt-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ProfileCompletionForm;
