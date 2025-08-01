// import { useState, useEffect, useRef, useContext, useCallback } from "react";
// import Slider from "react-slick";
// import "./ProfileSlickStyle.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MdModeEdit } from "react-icons/md";
// //import axios from "axios";
// import { NotifyError, NotifySuccess, ToastNotification } from "../../Toast/ToastNotification";
// import { FaPlus } from "react-icons/fa6";
// import { ProfileContext } from "../../../ProfileContext";
// import apiClient from "../../../API";

// export const ProfileSlick = () => {
//   const [nav1, setNav1] = useState<Slider | null>(null);
//   const [nav2, setNav2] = useState<Slider | null>(null);
//   const sliderRef1 = useRef<Slider | null>(null);
//   const sliderRef2 = useRef<Slider | null>(null);
//   const context = useContext(ProfileContext);

//   if (!context) {
//     throw new Error("ProfileContext must be used within a ProfileContextProvider");
//   }

//   const { images, setImages, zoomImage, handleMouseEnter, handleMouseLeave, fetchImages } = context;
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
//   const [showOptions, setShowOptions] = useState<boolean>(false);
//   const [removePhotoIndicator, setRemovePhotoIndicator] = useState<boolean>(false);

//   const debouncedFetchImages = useCallback(() => {
//     // Debounced fetch logic to prevent continuous calls
//     let timeout: NodeJS.Timeout;
//     return () => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         fetchImages();
//       }, 0.1); // Wait for 300ms before calling fetch
//     };
//   }, [fetchImages]);

//   useEffect(() => {
//     debouncedFetchImages();
//     setNav1(sliderRef1.current);
//     setNav2(sliderRef2.current);
//   }, [debouncedFetchImages, removePhotoIndicator]);

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   const files = event.target.files;
//   if (!files || files.length === 0) return;

//   const validFileTypes = ["image/jpeg", "image/png"];
//   const loginUserProfileId = localStorage.getItem("loginuser_profile_id");

//   if (!loginUserProfileId) {
//     console.error("Profile ID not found");
//     return;
//   }

//   for (const file of files) {
//     if (!validFileTypes.includes(file.type)) {
//       alert("Only JPG and PNG files are allowed");
//       continue;
//     }

//     // Add preview image immediately for better UX
//     const previewImage = { id: null, imageUrl: URL.createObjectURL(file), url: "", alt: "" };
//     setImages((prev) => [...prev, previewImage]);

//     try {
//       const formData = new FormData();
//       formData.append("profile_id", loginUserProfileId);

//       // Only include replace logic if we're in edit mode
//       if (currentEditIndex !== null && images[currentEditIndex]?.id) {
//         formData.append("replace_image_ids", images[currentEditIndex].id.toString());
//         formData.append("replace_image_files", file);
//       } else {
//         // Default case: just add new image
//         formData.append("new_image_files", file);
//       }

//       // const response = await apiClient.post("/auth/ImageSetEdit/", formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       NotifySuccess("Image uploaded successfully");
//     } catch (error: any) {
//       console.error("Error uploading image:", error);
//       // Remove the preview image if upload fails
//       setImages((prev) => prev.filter((img) => img.imageUrl !== previewImage.imageUrl));

//       if (error.response?.data?.error) {
//         NotifyError(error.response.data.error);
//       } else {
//         NotifyError("Error uploading image");
//       }
//     }
//   }

//   // Refresh the image list after upload
//   fetchImages();
//   setShowOptions(false);
//   setCurrentEditIndex(null); // Reset edit mode after upload
// };
//   const handleRemoveImage = async () => {
//     if (currentEditIndex !== null) {
//       try {
//         const loginUserProfileId = localStorage.getItem("loginuser_profile_id");
//         if (!loginUserProfileId) throw new Error("Profile ID not found");
//         const imageToRemove = images[currentEditIndex];
//         if (imageToRemove.id !== null) {
//           const formData = new FormData();
//           formData.append("profile_id", loginUserProfileId);
//           formData.append("image_id", imageToRemove.id.toString());

//           const response = await apiClient.post(
//             "/auth/Remove_profile_img/",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           if (response.data.success === 1) {
//             NotifySuccess("Image removed successfully");
//             setRemovePhotoIndicator(!removePhotoIndicator);
//             setShowOptions(false);
//           } else {
//             console.error("Failed to remove image:", response.data.message);
//           }
//         } else {
//           console.warn("Image does not have an ID, cannot be removed from server.");
//         }
//       } catch (error) {
//         console.error("Error removing image:", error);
//       } finally {
//         fetchImages();
//       }
//     } else {
//       console.warn("No image selected for removal.");
//     }
//   };

//   const handleEditClick = (index: number) => {
//     setCurrentEditIndex(index);
//     setShowOptions(true);
//   };

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1400,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: true,
//     cssEase: "linear",
//     pauseOnHover: true,
//     rtl: false,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1536,
//         settings: {
//           slidesToShow: 4,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 4,
//           autoplay: false,

//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 4,
//           autoplay: false,
//           arrows: false,
//         },
//       },
//       {
//         breakpoint: 639,
//         settings: {
//           slidesToShow: 3,
//           autoplay: false,
//           arrows: false,

//         },
//       },
//     ],
//   };

//   return (
//     <div>
//       <ToastNotification />
//       <div className="slider-container profileSliderStyle myProfileslider ">
//         <Slider
//           customPaging={(i: number) => (
//             <a>
//               <img
//                 src={images[i]?.imageUrl || ""}
//                 alt={`Thumbnail ${i + 1}`}
//                 className="rounded-lg"
//               />
//             </a>
//           )}
//           dots={false}
//           arrows={false}
//           dotsClass="slick-dots slick-thumb"
//           infinite={true}
//           speed={1400}
//           slidesToShow={1}
//           slidesToScroll={1}
//           asNavFor={nav2 as never}
//           ref={(slider) => setNav1(slider)}
//           className=" max-lg:w-full h-full px-2"
//         >
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative profile-slider-img-container h-full max-lg:w-2/4"
//               onMouseEnter={() => handleMouseEnter(image.imageUrl || "")}
//               onMouseLeave={handleMouseLeave}
//             >
//               <img
//                 src={image.imageUrl || ""}
//                 className="w-full h-[450px] rounded-lg profile-slider-img max-lg:w-full max-sm:w-full  max-sm:h-[300px] object-cover object-top "
//                 alt={`Slide ${index + 1}`}
//               />
//               {/* <div
//                 className="absolute bottom-0 right-10 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
//               >
//                 <FaPlus className="text-2xl text-main" onClick={() =>
//                   fileInputRef.current?.click()} />
//               </div> */}
//               <div
//   className="absolute bottom-0 right-10 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
//   onClick={() => {
//     setCurrentEditIndex(null); // Ensure we're in "add" mode
//     fileInputRef.current?.click();
//   }}
// >
//   <FaPlus className="text-2xl text-main" />
// </div>
//               <div
//                 className="absolute bottom-0 right-0 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
//                 onClick={() => handleEditClick(index)}
//               >
//                 <MdModeEdit className="text-2xl text-main" />
//               </div>
//               {showOptions && currentEditIndex === index && (
//                 <div className="absolute bottom-0 left-0 bg-white p-3 rounded-tr-lg z-30">
//                   {images[index].id !== null && (
//                     <button onClick={handleRemoveImage} className="block mb-2">
//                       Remove Current Image
//                     </button>
//                   )}
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="block"
//                   >
//                     Upload New Image
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </Slider>

//         <Slider
//           asNavFor={nav1 as never}
//           ref={(slider) => setNav2(slider)}
//           // slidesToShow={4}
//           swipeToSlide={true}
//           focusOnSelect={true}
//           // arrows={false}
//           {...settings}
//           className="connectingSlick"
//         >
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="profile-slider-img-container"
//               onMouseEnter={() => handleMouseEnter(image.imageUrl || "")}
//               onMouseLeave={handleMouseLeave}
//             >
//               {/* <div className="text-center mb-2 text-sm text-gray-600">
//         {` ${index === 0 ? "1ST" : index === 1 ? "2ND" : index === 2 ?"3RD" : `${index + 1}TH`} image`}
//       </div> */}
//               <img
//                 src={image.imageUrl || ""}
//                 className="w-[90px] h-[90px] mx-0 my-5 rounded-lg object-cover object-top"
//                 // className="w-full h-auto mx-auto rounded-lg object-cover"
//                 alt={`Slide ${index + 1}`}
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//       {zoomImage && (
//         <div className="zoomed-image-container zoomed-visible ">
//           <img src={zoomImage} className="zoomed-image object-top" alt="Zoomed" />
//         </div>
//       )}
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleImageUpload}
//       />
//     </div>
//   );
// };

// import { useState, useEffect, useRef, useContext, useCallback } from "react";
// import Slider from "react-slick";
// import "./ProfileSlickStyle.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MdModeEdit } from "react-icons/md";
// //import axios from "axios";
// import { NotifyError, NotifySuccess, ToastNotification } from "../../Toast/ToastNotification";
// import { FaPlus } from "react-icons/fa6";
// import { ProfileContext } from "../../../ProfileContext";
// import apiClient from "../../../API";

// export const ProfileSlick = () => {
//   const [nav1, setNav1] = useState<Slider | null>(null);
//   const [nav2, setNav2] = useState<Slider | null>(null);
//   const sliderRef1 = useRef<Slider | null>(null);
//   const sliderRef2 = useRef<Slider | null>(null);
//   const context = useContext(ProfileContext);

//   if (!context) {
//     throw new Error("ProfileContext must be used within a ProfileContextProvider");
//   }

//   const { images, setImages, zoomImage, handleMouseEnter, handleMouseLeave, fetchImages } = context;
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
//   const [showOptions, setShowOptions] = useState<boolean>(false);
//   const [removePhotoIndicator, setRemovePhotoIndicator] = useState<boolean>(false);

//   const debouncedFetchImages = useCallback(() => {
//     // Debounced fetch logic to prevent continuous calls
//     let timeout: NodeJS.Timeout;
//     return () => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         fetchImages();
//       }, 0.1); // Wait for 300ms before calling fetch
//     };
//   }, [fetchImages]);

//   useEffect(() => {
//     debouncedFetchImages();
//     setNav1(sliderRef1.current);
//     setNav2(sliderRef2.current);
//   }, [debouncedFetchImages, removePhotoIndicator]);

//   // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   const files = event.target.files;
//   //   if (!files || files.length === 0) return;
//   //   const validFileTypes = ["image/jpeg", "image/png"];
//   //   const uploadedImages = [];
//   //   for (const file of files) {
//   //     if (!validFileTypes.includes(file.type)) {
//   //       alert("Only JPG and PNG files are allowed");
//   //       continue;
//   //     }
//   //     // Add preview image
//   //     const previewImage = { id: null, imageUrl: URL.createObjectURL(file), url: "", alt: "" };
//   //     setImages((prev) => [...prev, previewImage]);
//   //     const loginUserProfileId = localStorage.getItem("loginuser_profile_id");
//   //     if (!loginUserProfileId) {
//   //       console.error("Profile ID not found");
//   //       continue;
//   //     }
//   //     try {
//   //       const formData = new FormData();
//   //       formData.append("profile_id", loginUserProfileId);
//   //       //console.log("currentEditIndex", currentEditIndex)
//   //       //  formData.append("new_image_files", file);
//   //       if (currentEditIndex !== null && images[currentEditIndex]?.id) {
//   //         // Replace image logic
//   //         formData.append("replace_image_ids", images[currentEditIndex].id.toString());
//   //         formData.append("replace_image_files", file);
//   //       } else {
//   //         // Add new image logic
//   //         formData.append("new_image_files", file);
//   //       }
//   //       const response = await apiClient.post("/auth/ImageSetEdit/", formData, {
//   //         headers: { "Content-Type": "multipart/form-data" },
//   //       });
//   //       uploadedImages.push(response.data); // Optional: Handle server response
//   //       NotifySuccess("Image uploaded successfully");
//   //     }
//   //     catch (error: any) {
//   //       console.error("Error uploading image:", error);
//   //       setImages((prev) => prev.filter((img) => img.imageUrl !== previewImage.imageUrl)); // Remove preview on failure
//   //       // Show specific error message from server
//   //       if (error.response?.data?.error) {
//   //         NotifyError(error.response.data.error); // This will show "Upload limit exceeded..." message
//   //       } else {
//   //         NotifyError("Error uploading image");
//   //       }
//   //     }
//   //   }
//   //   // Refresh image list after successful upload
//   //   fetchImages();
//   //   setShowOptions(false); // Close options menu
//   // };

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   const files = event.target.files;
//   if (!files || files.length === 0) return;

//   const validFileTypes = ["image/jpeg", "image/png"];
//   const loginUserProfileId = localStorage.getItem("loginuser_profile_id");

//   if (!loginUserProfileId) {
//     console.error("Profile ID not found");
//     return;
//   }

//   for (const file of files) {
//     if (!validFileTypes.includes(file.type)) {
//       alert("Only JPG and PNG files are allowed");
//       continue;
//     }

//     // Add preview image immediately for better UX
//     const previewImage = { id: null, imageUrl: URL.createObjectURL(file), url: "", alt: "" };
//     setImages((prev) => [...prev, previewImage]);

//     try {
//       const formData = new FormData();
//       formData.append("profile_id", loginUserProfileId);

//       // Only include replace logic if we're in edit mode
//       if (currentEditIndex !== null && images[currentEditIndex]?.id) {
//         formData.append("replace_image_ids", images[currentEditIndex].id.toString());
//         formData.append("replace_image_files", file);
//       } else {
//         // Default case: just add new image
//         formData.append("new_image_files", file);
//       }

//       // const response = await apiClient.post("/auth/ImageSetEdit/", formData, {
//       //   headers: { "Content-Type": "multipart/form-data" },
//       // });

//       NotifySuccess("Image uploaded successfully");
//     } catch (error: any) {
//       console.error("Error uploading image:", error);
//       // Remove the preview image if upload fails
//       setImages((prev) => prev.filter((img) => img.imageUrl !== previewImage.imageUrl));

//       if (error.response?.data?.error) {
//         NotifyError(error.response.data.error);
//       } else {
//         NotifyError("Error uploading image");
//       }
//     }
//   }

//   // Refresh the image list after upload
//   fetchImages();
//   setShowOptions(false);
//   setCurrentEditIndex(null); // Reset edit mode after upload
// };
//   const handleRemoveImage = async () => {
//     if (currentEditIndex !== null) {
//       try {
//         const loginUserProfileId = localStorage.getItem("loginuser_profile_id");
//         if (!loginUserProfileId) throw new Error("Profile ID not found");
//         const imageToRemove = images[currentEditIndex];
//         if (imageToRemove.id !== null) {
//           const formData = new FormData();
//           formData.append("profile_id", loginUserProfileId);
//           formData.append("image_id", imageToRemove.id.toString());

//           const response = await apiClient.post(
//             "/auth/Remove_profile_img/",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           if (response.data.success === 1) {
//             NotifySuccess("Image removed successfully");
//             setRemovePhotoIndicator(!removePhotoIndicator);
//             setShowOptions(false);
//           } else {
//             console.error("Failed to remove image:", response.data.message);
//           }
//         } else {
//           console.warn("Image does not have an ID, cannot be removed from server.");
//         }
//       } catch (error) {
//         console.error("Error removing image:", error);
//       } finally {
//         fetchImages();
//       }
//     } else {
//       console.warn("No image selected for removal.");
//     }
//   };

//   const handleEditClick = (index: number) => {
//     setCurrentEditIndex(index);
//     setShowOptions(true);
//   };

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1400,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     autoplay: true,
//     cssEase: "linear",
//     pauseOnHover: true,
//     rtl: false,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1536,
//         settings: {
//           slidesToShow: 4,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           infinite: true,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 1023,
//         settings: {
//           slidesToShow: 4,
//           autoplay: false,

//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 4,
//           autoplay: false,
//           arrows: false,
//         },
//       },
//       {
//         breakpoint: 639,
//         settings: {
//           slidesToShow: 3,
//           autoplay: false,
//           arrows: false,

//         },
//       },
//     ],
//   };

//   return (
//     <div>
//       <ToastNotification />
//       <div className="slider-container profileSliderStyle myProfileslider ">
//         <Slider
//           customPaging={(i: number) => (
//             <a>
//               <img
//                 src={images[i]?.imageUrl || ""}
//                 alt={`Thumbnail ${i + 1}`}
//                 className="rounded-lg"
//               />
//             </a>
//           )}
//           dots={false}
//           arrows={false}
//           dotsClass="slick-dots slick-thumb"
//           infinite={true}
//           speed={1400}
//           slidesToShow={1}
//           slidesToScroll={1}
//           asNavFor={nav2 as never}
//           ref={(slider) => setNav1(slider)}
//           className=" max-lg:w-full h-full px-2"
//         >
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative profile-slider-img-container h-full max-lg:w-2/4"
//               onMouseEnter={() => handleMouseEnter(image.imageUrl || "")}
//               onMouseLeave={handleMouseLeave}
//             >
//               <img
//                 src={image.imageUrl || ""}
//                 className="w-full h-[450px] rounded-lg profile-slider-img max-lg:w-full max-sm:w-full  max-sm:h-[300px] object-cover object-top "
//                 alt={`Slide ${index + 1}`}
//               />
//               {/* <div
//                 className="absolute bottom-0 right-10 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
//               >
//                 <FaPlus className="text-2xl text-main" onClick={() =>
//                   fileInputRef.current?.click()} />
//               </div> */}
//               <div
//   className="absolute bottom-0 right-10 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
//   onClick={() => {
//     setCurrentEditIndex(null); // Ensure we're in "add" mode
//     fileInputRef.current?.click();
//   }}
// >
//   <FaPlus className="text-2xl text-main" />
// </div>
//               <div
//                 className="absolute bottom-0 right-0 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
//                 onClick={() => handleEditClick(index)}
//               >
//                 <MdModeEdit className="text-2xl text-main" />
//               </div>
//               {showOptions && currentEditIndex === index && (
//                 <div className="absolute bottom-0 left-0 bg-white p-3 rounded-tr-lg z-30">
//                   {images[index].id !== null && (
//                     <button onClick={handleRemoveImage} className="block mb-2">
//                       Remove Current Image
//                     </button>
//                   )}
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="block"
//                   >
//                     Upload New Image
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </Slider>

//         <Slider
//           asNavFor={nav1 as never}
//           ref={(slider) => setNav2(slider)}
//           // slidesToShow={4}
//           swipeToSlide={true}
//           focusOnSelect={true}
//           // arrows={false}
//           {...settings}
//           className="connectingSlick"
//         >
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="profile-slider-img-container"
//               onMouseEnter={() => handleMouseEnter(image.imageUrl || "")}
//               onMouseLeave={handleMouseLeave}
//             >
//               {/* <div className="text-center mb-2 text-sm text-gray-600">
//         {` ${index === 0 ? "1ST" : index === 1 ? "2ND" : index === 2 ?"3RD" : `${index + 1}TH`} image`}
//       </div> */}
//               <img
//                 src={image.imageUrl || ""}
//                 className="w-[90px] h-[90px] mx-0 my-5 rounded-lg object-cover object-top"
//                 // className="w-full h-auto mx-auto rounded-lg object-cover"
//                 alt={`Slide ${index + 1}`}
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//       {zoomImage && (
//         <div className="zoomed-image-container zoomed-visible ">
//           <img src={zoomImage} className="zoomed-image object-top" alt="Zoomed" />
//         </div>
//       )}
//       <input
//         type="file"
//         accept="image/*"
//         multiple
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleImageUpload}
//       />
//     </div>
//   );
// };

import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Slider from "react-slick";
import "./ProfileSlickStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdModeEdit } from "react-icons/md";
//import axios from "axios";
import {
  NotifyError,
  NotifySuccess,
  ToastNotification,
} from "../../Toast/ToastNotification";
import { FaPlus } from "react-icons/fa6";
import { ProfileContext } from "../../../ProfileContext";
import apiClient from "../../../API";
//import { RotatingSquare } from "react-loader-spinner";

export const ProfileSlick = () => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const context = useContext(ProfileContext);
  // const [isLoading, setIsLoading] = useState(true);
   const [, setIsLoading] = useState(true);
  const [, setDisplayImages] = useState<Array<{ imageUrl: string, id: number | null }>>([]);
  if (!context) {
    throw new Error(
      "ProfileContext must be used within a ProfileContextProvider"
    );
  }

  const { images, setImages, fetchImages } = context;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [removePhotoIndicator, setRemovePhotoIndicator] =
    useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const gender = localStorage.getItem("gender");

  const defaultImgUrl =
    gender === "male"
      ? "https://vysyamaladev2025.blob.core.windows.net/vysyamala/default_groom.png"
      : "https://vysyamaladev2025.blob.core.windows.net/vysyamala/default_bride.png";




  useEffect(() => {
    // Initialize with default image immediately
    setDisplayImages([{ imageUrl: defaultImgUrl, id: null }]);

    const loadImages = async () => {
      try {
        await fetchImages();
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [fetchImages, defaultImgUrl]);

  useEffect(() => {
    if (images.length > 0) {
      setDisplayImages(images);
    } else {
      setDisplayImages([{ imageUrl: defaultImgUrl, id: null }]);
    }
  }, [images, defaultImgUrl]);

  const handleMouseEnter = useCallback((image: string) => {
    setTimeout(() => setZoomImage(image), 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => setZoomImage(null), 100);
  }, []);

  const ZoomedImage: React.FC<{ image: string | null }> = ({ image }) => {
    if (!image) return null;

    return (
      <div className="zoomed-image-container zoomed-visible">
        <img src={image} className="zoomed-image object-top object-contain" alt="Zoomed" />
      </div>
    );
  };

  const debouncedFetchImages = useCallback(() => {
    // Debounced fetch logic to prevent continuous calls
    let timeout: NodeJS.Timeout;
    return () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetchImages();
      }, 0.1); // Wait for 300ms before calling fetch
    };
  }, [fetchImages]);

  useEffect(() => {
    debouncedFetchImages();
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, [debouncedFetchImages, removePhotoIndicator]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const validFileTypes = ["image/jpeg", "image/png"];
    const loginUserProfileId = localStorage.getItem("loginuser_profile_id");

    if (!loginUserProfileId) {
      console.error("Profile ID not found");
      return;
    }

    for (const file of files) {
      if (!validFileTypes.includes(file.type)) {
        alert("Only JPG and PNG files are allowed");
        continue;
      }

      // Add preview image immediately for better UX
      const previewImage = {
        id: null,
        imageUrl: URL.createObjectURL(file),
        url: "",
        alt: "",
      };
      setImages((prev) => [...prev, previewImage]);

      try {
        const formData = new FormData();
        formData.append("profile_id", loginUserProfileId);

        // Only include replace logic if we're in edit mode
        if (currentEditIndex !== null && images[currentEditIndex]?.id) {
          formData.append(
            "replace_image_ids",
            images[currentEditIndex].id.toString()
          );
          formData.append("replace_image_files", file);
        } else {
          // Default case: just add new image
          formData.append("new_image_files", file);
        }

        const response = await apiClient.post("/auth/ImageSetEdit/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("response", response);
        NotifySuccess("Image uploaded successfully");
      } catch (error: any) {
        console.error("Error uploading image:", error);
        // Remove the preview image if upload fails
        setImages((prev) =>
          prev.filter((img) => img.imageUrl !== previewImage.imageUrl)
        );

        if (error.response?.data?.error) {
          NotifyError(error.response.data.error);
        } else {
          NotifyError("Error uploading image");
        }
      }
    }

    // Refresh the image list after upload
    fetchImages();
    setShowOptions(false);
    setCurrentEditIndex(null); // Reset edit mode after upload
  };
  const handleRemoveImage = async () => {
    if (currentEditIndex !== null) {
      try {
        const loginUserProfileId = localStorage.getItem("loginuser_profile_id");
        if (!loginUserProfileId) throw new Error("Profile ID not found");
        const imageToRemove = images[currentEditIndex];
        if (imageToRemove.id !== null) {
          const formData = new FormData();
          formData.append("profile_id", loginUserProfileId);
          formData.append("image_id", imageToRemove.id.toString());

          const response = await apiClient.post(
            "/auth/Remove_profile_img/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success === 1) {
            NotifySuccess("Image removed successfully");
            setRemovePhotoIndicator(!removePhotoIndicator);
            setShowOptions(false);
          } else {
            console.error("Failed to remove image:", response.data.message);
          }
        } else {
          console.warn(
            "Image does not have an ID, cannot be removed from server."
          );
        }
      } catch (error) {
        console.error("Error removing image:", error);
      } finally {
        fetchImages();
      }
    } else {
      console.warn("No image selected for removal.");
    }
  };

  const handleEditClick = (index: number) => {
    setCurrentEditIndex(index);
    setShowOptions(true);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1400,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    cssEase: "linear",
    pauseOnHover: true,
    rtl: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 4,
          autoplay: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          autoplay: true,
          arrows: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 3,
          autoplay: true,
          arrows: false,
        },
      },
    ],
  };

  // const LoadingSpinner: React.FC = () => (
  //   <div className="w-fit h-96 flex flex-col items-center justify-center mx-auto">
  //     <RotatingSquare
  //       visible={true}
  //       height="100"
  //       width="100"
  //       color="#FF6666"
  //       ariaLabel="rotating-square-loading"
  //     />
  //     <p className="text-sm mt-2">Loading images...</p>
  //   </div>
  // );


  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }


  return (
    <div>
      <ToastNotification />
      <div className="slider-container profileSliderStyle myProfileslider ">
        {images.length > 1 ? (
          <Slider
            dots={false}
            arrows={false}
            dotsClass="slick-dots slick-thumb"
            infinite={true}
            // autoplay={true}
            speed={1400}
            slidesToShow={1}
            slidesToScroll={1}
            asNavFor={nav2 as Slider}
            ref={(slider) => setNav1(slider)}
            className=" max-lg:w-full h-full px-2"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative profile-slider-img-container  max-lg:w-full h-full px-2"
              >
                <img
                  src={image.imageUrl || defaultImgUrl}
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    e.currentTarget.src = defaultImgUrl; // Set default image
                  }}
                  className="w-full h-[450px] rounded-lg object-cover object-top"
                  alt={`Profile ${index + 1}`}
                  onMouseEnter={() => handleMouseEnter(image.imageUrl)}
                  onMouseLeave={handleMouseLeave}
                />
                <div
                  className="absolute bottom-0 right-10 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
                  onClick={() => {
                    setCurrentEditIndex(null);
                    fileInputRef.current?.click();
                  }}
                >
                  <FaPlus className="text-2xl text-main" />
                </div>
                <div
                  className="absolute bottom-0 right-0 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
                  onClick={() => handleEditClick(0)}
                >
                  <MdModeEdit className="text-2xl text-main" />
                </div>
                {showOptions && currentEditIndex === 0 && (
                  <div className="absolute bottom-0 left-0 bg-white p-3 rounded-tr-lg z-30">
                    {images[0].id !== null && (
                      <button
                        onClick={handleRemoveImage}
                        className="block mb-2"
                      >
                        Remove Current Image
                      </button>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="block"
                    >
                      Upload New Image
                    </button>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          // If only one image, show it without using Slider
          <div className="relative profile-slider-img-container max-lg:w-full h-full px-2">
            <img
              src={images[0]?.imageUrl || defaultImgUrl}
              onError={(e) => {
                e.currentTarget.onerror = null; // Prevent infinite loop
                e.currentTarget.src = defaultImgUrl; // Set default image
              }}
              className="w-full h-[450px] rounded-lg profile-slider-img object-cover object-top"
              alt="Profile"
            />
            <div
              className="absolute bottom-0 right-10 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
              onClick={() => {
                setCurrentEditIndex(null);
                fileInputRef.current?.click();
              }}
            >
              <FaPlus className="text-2xl text-main" />
            </div>
            <div
              className="absolute bottom-0 right-0 bg-white px-3 py-3 rounded-tl-lg cursor-pointer z-20"
              onClick={() => handleEditClick(0)}
            >
              <MdModeEdit className="text-2xl text-main" />
            </div>
            {showOptions && currentEditIndex === 0 && (
              <div className="absolute bottom-0 left-0 bg-white p-3 rounded-tr-lg z-30">
                {images[0].id !== null && (
                  <button onClick={handleRemoveImage} className="block mb-2">
                    Remove Current Image
                  </button>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="block"
                >
                  Upload New Image
                </button>
              </div>
            )}
          </div>
        )}

        {images.length > 1 && (
          <Slider
            {...settings}
            asNavFor={nav1 as never}
            ref={(slider) => setNav2(slider)}
            swipeToSlide={true}
            focusOnSelect={true}
            className="connectingSlick"
          >
            {images.map((image, index) => (
              <div key={index} className="profile-slider-img-container">
                <img
                  src={image.imageUrl}
                  className="w-[90px] h-[90px] mx-0 my-5 rounded-lg object-cover object-top"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <ZoomedImage image={zoomImage} />
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};
