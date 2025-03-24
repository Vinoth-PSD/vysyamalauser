import { useLocation } from "react-router-dom";
import { LoginPopupModal } from "../HomePage/PopUpsLogin/LoginPopupModal";
import { useState } from "react";

type Profile = {
  profile_id: string;
  profile_name: string;
  profile_img: string;
  profession: string;
  location: string;
  profile_age: number;
  profile_height: string;
};

export const FindSomeOneSpecial = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState<boolean>(false); // State for login popup

  const handleViewProfileClick = (profileId: string) => {
    setIsLoginPopupOpen(true);
    // Store the profileId in sessionStorage
    sessionStorage.setItem("selectedProfileId", profileId);
    console.log(`Stored profileId: ${profileId} in session storage`);
    // You can navigate or perform other actions here
  };
  
  const handleCloseLoginPopup = () => {
    setIsLoginPopupOpen(false); // Close login popup
  };

  const location = useLocation();
  const { profiles } = location.state as { profiles: Profile[] } || {}; // Access the passed profiles data and specify its type

  return (
    <div className="container mx-auto">
    <div className="mt-28 mb-20 max-md:mb-10">
      {profiles && profiles.length > 0 ? (
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1">
          {profiles.map((profile: Profile) => (
            <div
              key={profile.profile_id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={profile.profile_img}
                alt={profile.profile_name}
                className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
              />
              <h3 className="text-xl font-bold mt-4 text-secondary">
                {profile.profile_name}
              </h3>
              <p className="text-gray-600 mt-1">{profile.profession}</p>
              <p className="text-gray-600 mt-1">{profile.location}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600">
                  Age: {profile.profile_age}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600">
                  Height: {profile.profile_height}
                </span>
              </div>
              <button
                className="bg-secondary mt-4 px-4 py-2 text-white rounded-full hover:bg-primary-dark"
                onClick={() => handleViewProfileClick(profile.profile_id)} // Pass profileId on click
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-600">
          No profiles found
        </p>
      )}

      {isLoginPopupOpen && (
        <LoginPopupModal
          isopen={isLoginPopupOpen}
          onClose={handleCloseLoginPopup}
          onForgetPassword={() => { throw new Error("Function not implemented."); }}
        />
      )}
    </div>
    </div>
  );
};
