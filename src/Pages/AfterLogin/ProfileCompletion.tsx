/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import apiClient from "../../API";
import { NotifyError, NotifySuccess } from "../../Components/Toast/ToastNotification";
import { useNavigate } from "react-router-dom";
import { Hearts } from "react-loader-spinner";

const ProfileCompletionForm = () => {

  const [formData, setFormData] = useState({
    photo_upload: "",
    Profile_idproof: "",
    horoscope_file: "",
    image: "",
    EmailId: "",
    anual_income: "",
    property_worth: "",
    about_self: "",
    about_family: "",
    career_plans: "",
    Video_url: "",
  });

  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
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
    const payload: any = {
      profile_id: loginuser_profileId || "",
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
    return (
      <div className="w-fit mx-auto py-40">
        <Hearts
          height="100"
          width="100"
          color="#FF6666"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-sm text-center mt-2">Please wait...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto h-full  flex justify-center items-center py-20 max-md:py-10">
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
