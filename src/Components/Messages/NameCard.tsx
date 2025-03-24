import React from "react";

interface NameCardProps {
  profile_image: string;
  profile_user_name: string;
  last_mesaage: string;
  profile_lastvist: string;
  room_name: string;
  last_message_seen: boolean; // Add this prop
  onClick: () => void; // Add onClick handler
}

export const NameCard: React.FC<NameCardProps> = ({
  profile_image,
  profile_user_name,
  last_mesaage,
  profile_lastvist,
  last_message_seen, // Destructure this prop
  onClick, // Destructure the onClick handler
}) => {
  return (
    <div
      className="flex items-center p-6 border-b border-footer-text-gray cursor-pointer"
      // className={`flex items-center p-3 border-b border-footer-text-gray cursor-pointer ${
      //   last_message_seen ? 'bg-yellow-100' : '' // Highlight if message not seen
      // }`}
      onClick={onClick} // Attach onClick handler
    >
      <img
        src={profile_image}
        alt="Profile"
        className="w-[54px] h-[54px] rounded-md object-cover"
      />
      <div className="ml-3">
        {/* <h6 className="text-lg font-bold text-vysyamalaBlack">{profile_user_name} 

        {!last_message_seen && (
            <span className="w-2 h-2 ml-2 bg-red-500 rounded-full"></span>
          )}
        </h6> */}
        {/* <h6 className="text-lg font-bold text-vysyamalaBlack flex items-center">
          {profile_user_name}
          {last_message_seen && (
            <span className="w-2 h-2 ml-2 bg-red-500 rounded-full"></span>
          )}
        </h6> */}
        <h6 className="text-[16px] font-semibold text-vysyamalaBlack mb-1">
          {profile_user_name}
        </h6>
        {/* <p className="">{last_mesaage}</p> */}
        {/* <ptext-sm text-ashSecondary
          className={`text-sm ${
             last_message_seen ? 'text-black font-semibold' : 'text-ashSecondary' // Highlight unseen messages
           // last_message_seen ? 'bg-yellow-100' : '' // Highlight if message not seen
          }`}
        >
          {last_mesaage}
          
        </p> */}
        <p
          className={`text-sm mb-1 ${
            last_message_seen ? "text-black font-noraml" : "text-ashSecondary"
          } flex justify-between items-center`}
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* {last_mesaage} */}
          {/* Display only the first 10 characters with ellipsis if longer */}
          {last_mesaage.length > 25
            ? `${last_mesaage.slice(0, 25)}...`
            : last_mesaage}
          {/* Apply the dot to the last message if not seen */}
        </p>

        <p className="text-[10px] font-medium text-primary mb-1">{profile_lastvist}</p>
      </div>

      {/* Dot at the far right */}
      {last_message_seen && (
        <span
          className="bg-red-500 rounded-full"
          style={{
            width: "0.75rem",
            height: "0.75rem",
            marginLeft: "auto", // Pushes the dot to the far right
          }}
        ></span>
      )}
    </div>
  );
};
