import { useNavigate } from "react-router-dom";
import { GalleryItem } from "../Gallary"; // Ensure this path is correct


interface GalleryCardProps {
  profiles: GalleryItem[];
}


const GalleryCard: React.FC<GalleryCardProps> = ({ profiles }) => {

  const navigate=useNavigate()

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
              <button onClick={()=> navigate(`/ProfileDetails?id=${profile.profile_id}`)} className="bg-white  text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
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
