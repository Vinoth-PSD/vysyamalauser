import { useNavigate } from "react-router-dom";
import { GalleryItem } from "../Gallary"; // Ensure this path is correct
import apiClient from "../../../API";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface GalleryCardProps {
  profiles: GalleryItem[];
}


const GalleryCard: React.FC<GalleryCardProps> = ({ profiles }) => {

  const navigate=useNavigate()

  
  const [isLoading, setIsLoading] = useState(false);
  //const location = useLocation();

  const handleProfileClick = async (profileId: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

    let page_id = "1"; // Default
    // if (location.pathname === "/LoginHome" || location.pathname === "/Search") {
    //   page_id = "1";
    // }

    try {
      const checkResponse = await apiClient.post(
        "/auth/Get_profile_det_match/",
        {
          profile_id: loginuser_profileId,
          user_profile_id: profileId,
          page_id: page_id,
        }
      );

      // Check for failure response
      if (checkResponse.data.status === "failure") {
        toast.error(checkResponse.data.message || "Limit reached to view profile");
        return;
      }

      // If successful, create profile visit and navigate
      navigate(`/ProfileDetails?id=${profileId}&rasi=1`);

      await apiClient.post(
        "/auth/Create_profile_visit/",
        {
          profile_id: loginuser_profileId,
          viewed_profile: profileId,
        }
      );
    } catch (error) {
      toast.error("Error accessing profile.");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {profiles.map((profile) => (
          <div className="group cursor-pointer relative">
            <img
              src={profile.img_url}
              alt={`Gallery image ${profile.profile_id}`}
              className="w-full h-[350px] object-cover rounded-lg transition-transform transform duration-500 scale-100 group-hover:scale-105 object-top"
            />
             <p className="mt-2 text-center">{profile.profile_id}</p>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
              //onClick={()=> navigate(`/ProfileDetails?id=${profile.profile_id}`)} 
              onClick={() => handleProfileClick(profile.profile_id)}
              className="bg-white  text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                View
              </button>
             
            </div>
          </div>
          // <div key={profile.profile_id} classNameName="p-4">

          //   <img
          //     classNameName="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          //     src={profile.img_url}
          //     alt={`Gallery image ${profile.profile_id}`}
          //   />
          //   <p classNameName="mt-2 text-center">{profile.profile_id}</p>
          // </div>
        ))}
      </div>
    </>
  );
};

export default GalleryCard;
