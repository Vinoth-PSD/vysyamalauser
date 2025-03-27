/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import VysyamalaLogo from "../assets/icons/VysyamalaLogo.png";
import ProfileImg from "../assets/icons/profileRound.png";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
// import NotificationsImg from "../assets/images/NotificationsImg.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import OfferHeaderBg from "../assets/images/OfferHeader.png"
//import axios from "axios";
import apiClient from "../API";

export interface Notification {
  notify_img: string | undefined;
  id: number;
  from_profile_id: string;
  is_read: boolean;
  message_titile: string;
  notification_type: string;
  profile_image: string;
  notify_profile_name: string;
  time_ago: string;
  to_message: string;
  created_at: string;
}

export const LoginHeader: React.FC = () => {
  // Retrieve token from sessionStorage
  // const token = sessionStorage.getItem("token");
  const userId = localStorage.getItem("loginuser_profile_id");

  // const handleClick = () => {
  //   navigate('/MyProfile/#ProfileDetailsSettings');
  // };
  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    // Clear token from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("profile_completion");
    sessionStorage.removeItem("userImages");
    window.location.href = "/";
  };
  const navigate = useNavigate();
  // Notification Dropdown State Declaration
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [NotificationData, setNotificationData] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const userProfileImage = localStorage.getItem("user_profile_image");
  console.log(userProfileImage, "userProfileImage ");
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");
  const [roomId, setRoomId] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [userName] = useState("");
  const [, setSelectedFromProfileId] = useState<string | null>(null);
  const [refreshNotifications, setRefreshNotifications] = useState(false); // Trigger for refresh


  console.log("setSelectedFromProfileId", setSelectedFromProfileId);
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);

  const getUnreadMessageCount = async () => {
    try {
      if (!userId) {
        console.error("User ID is null or undefined.");
        return;
      }

      const formData = new FormData();
      // formData.append("profile_id", userId);

      formData.append("profile_id", String(userId));

      console.log("unread_message_count...", formData);
      const response = await apiClient.post(
        "/auth/unread_message_count/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("unread_message_count", response);
      if (response.status === 200) {
        setUnreadMessageCount(response.data.unread_count);
      }
    } catch (error) {
      console.error("Error fetching unread message count:", error);
    }
  };

  useEffect(() => {
    getUnreadMessageCount();
  }, []);

  const handleNotificationClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation(); // Prevent the click event from propagating to the document
    setIsNotificationVisible((prev) => !prev);
  };

  // On Click outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsNotificationVisible(false);
    }
  };

  useEffect(() => {
    if (isNotificationVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationVisible]);

  // Profile Image Dropdown State Declaration
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getNotification = () => {
    apiClient
      .post("/auth/Get_notification_list/", {
        profile_id: userId ,
      })
      .then((response) => {
        setNotificationData(response.data.data);
        setNotificationCount(response.data.notifiy_count);
        console.log(notificationCount, "notificationCount");
      })
      .catch((error) => {
        console.error(
          "Error fetching notifications:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Fetch notifications when component mounts or refreshNotifications changes
  useEffect(() => {
    getNotification();
  }, [refreshNotifications]);

  // Function to manually trigger refresh
  const refresh = () => {
    setRefreshNotifications(!refreshNotifications); // Toggle state to trigger refresh
  };

  const readNotification = async () => {
    const response = await apiClient.post(
      `/auth/Read_notifications/`,
      {
        profile_id: userId ,
      }
    );
    try {
      console.log(response.data);
      if (response.status === 200) {
        navigate("/Notifications");
        getNotification();
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsMenuOpen(!isMenuOpen);

  };

  useEffect(() => {
    getNotification();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMessage = async (fromProfileId: string) => {
    try {
      // First API call to Create_or_retrievechat
      const response = await apiClient.post("/auth/Create_or_retrievechat/", {
        profile_id: loginuser_profileId,
        profile_to: fromProfileId, // Use the passed fromProfileId
      });

      if (response.data.statue === 1) {
        const { room_id_name } = response.data;

        // Second API call to Get_user_chatlist
        const chatListResponse = await apiClient.post(
          "/auth/Get_user_chatlist/",
          {
            profile_id: loginuser_profileId,
          }
        );

        if (chatListResponse.data.status === 1) {
          // Extract relevant profile data
          const profileData = chatListResponse.data.data.find(
            (item: { room_name_id: any }) => item.room_name_id === room_id_name
          );

          // Structure profileData with actual details from chatListResponse
          const selectedProfileData = {
            room_name_id: profileData.room_name_id,
            profile_image: profileData.profile_image,
            profile_user_name: profileData.profile_user_name,
            profile_lastvist: profileData.profile_lastvist,
          };

          // Save profile data with room ID to sessionStorage
          sessionStorage.setItem(
            "selectedProfile",
            JSON.stringify(selectedProfileData)
          );
          console.log(selectedProfileData, "selectedProfileData");

          // Set state and navigate to messages page
          setRoomId(room_id_name);
          setIsRedirect(true);
          navigate("/Messages");
        } else {
          console.error(
            "Failed to fetch chat list:",
            chatListResponse.data.mesaage
          );
        }
      } else {
        console.error("Failed to create chat room:", response.data.Message);
      }
    } catch (error) {
      console.error("Error creating or fetching chat room:", error);
    }
  };

  useEffect(() => {
    if (isRedirect) {
      window.location.href = `/Messages`;
    }
  }, [isRedirect, roomId, userName]);

  const handleUpdatePhoto = () => {
    // Perform any necessary actions here, such as updating the photo
    navigate("/MyProfile"); // Navigates to the MyProfile page
  };

  const handleUpdateSettings = () => {
    console.log("testing bbb");
    // Perform any necessary actions here, such as updating the photo
    navigate("/DashBoard?key=1");
    setIsMenuOpen(!isMenuOpen);

  };

  return (
    <div className="sticky bg-white top-0 z-50 w-full">
      <div>
        {/* <h2>LoginHome</h2> */}
        {/* <p>Token: {token}</p> */}
        {/* <button>Logout</button> */}
      </div>
      {/* new offer top bar */}
      <div className="py-3" style={{
        backgroundImage: `url(${OfferHeaderBg}), linear-gradient(92.08deg, #BD1225 0.6%, #FF4050 103.08%)`,
        backgroundPosition:"left right",
        backgroundRepeat: "2",
      }}>
        <p className="text-white text-base font-normal text-center max-sm:text-[14px]"> 🎁 We’ve launched a new offer. <span className=" border-b-[1px]"> Check now</span></p>
      </div>


      <header className="transition-all duration-300 z-[1] sticky top-0">
        <div className="container mx-auto flex justify-between items-center py-2 bg-transparent  max-lg:py-4">
          <div>
            <Link to="/LoginHome">
              <img
                src={VysyamalaLogo}
                alt="Vysyamala-Logo"
                className="w-36 max-xl:w-32 max-lg:w-28"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (Visible on small screens) */}
          <button
            className="block lg:hidden text-gray-800"
            onClick={handleMenuToggle}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          <nav className="flex items-center space-x-10 max-lg:space-x-5 max-lg:hidden">
            <ul className="flex justify-center items-center text-ash gap-x-8  max-lg:gap-x-6 max-md:gap-x-2">
              <NavLink
                to="/LoginHome"
                className="active-nav"
                aria-current="page"
              >
                <li className="text-[16px] cursor-pointer font-normal px-2 py-4 max-lg:text-[14px]">
                  Home
                </li>
              </NavLink>

              <NavLink to="/Search" aria-current="page" className="active-nav">
                <li className="text-[16px] cursor-pointer font-normal  px-2 py-4  max-lg:text-[14px]">
                  Search
                </li>
              </NavLink>

              <NavLink
                to="/Dashboard"
                aria-current="page"
                className="active-nav"
              >
                <li className="text-[16px] cursor-pointer font-normal px-2 py-4   max-lg:text-[14px]">
                  Dashboard
                </li>
              </NavLink>

              <NavLink
                to={"/Wishlist"}
                aria-current="page"
                className="active-nav"
              >
                <li className="text-[16px] cursor-pointer font-normal px-2 py-4 max-lg:text-[14px]">
                  Wishlist
                </li>
              </NavLink>

              {/* <NavLink
                to={"/Messages"}
                aria-current="page"
                className="active-nav"
              >
                <li className="text-[16px] cursor-pointer font-normal px-3">
                  <MdMessage className="text-[22px]" />
                </li>
              </NavLink> */}

              <NavLink
                to={"/Messages"}
                aria-current="page"
                className="active-nav before:!content-none"
              >
                <li className="text-[16px] cursor-pointer font-normal px-3 relative">
                  <MdMessage className="text-[22px]" />
                  {unreadMessageCount > 0 && (
                    <span className="absolute top-[-10px] right-[-1px] bg-red-500 text-white rounded-full text-[12px] w-5 h-5 flex items-center justify-center">
                      {unreadMessageCount}
                    </span>
                  )}
                </li>
              </NavLink>

              {/* Notifications */}
              <li
                // onClick={handleNotificationClick}
                onClick={(e) => {
                  handleNotificationClick(e);
                  refresh();
                }}
                // onClick={refresh}
                className={`text-[16px] rounded-md transition-all cursor-pointer 
                ${isNotificationVisible ? "bg-light-pink" : ""
                  } font-normal px-3 py-3 relative`}
              >
                <FaBell
                  className={`text-[22px] ${isNotificationVisible ? "text-main" : ""
                    } `}
                />
                {notificationCount > 0 && (
                  <span className="absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-[12px] w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
                {isNotificationVisible && (
                  <div
                    ref={dropdownRef}
                    className="notification-dropdown absolute top-16 right-0 translate-x-2/4 w-[30rem] bg-white rounded-md shadow-lg py-1 z-20"
                  >
                    <h4 className="text-vysyamalaBlack text-[20px] font-bold px-3 py-3">
                      Notifications
                    </h4>

                    <div className="h-96 overflow-y-auto message-box">
                      {/* Express Interest */}

                      {NotificationData.length > 5
                        ? NotificationData.slice(0, 5).map((notification) => (
                          <div
                            className="bg-lightFade-pink flex items-start gap-2 border-b-[1px] border-gray p-4 space-x-5"
                            key={notification.id}
                          >
                            <div>
                              <img
                                // src={notification.notify_img}
                                src={notification.profile_image}
                                alt={notification.notify_profile_name}
                                className="!w-8 h-8 rounded-full size-20"
                              />
                            </div>

                            <div>
                              <h5 className="text-vysyamalaBlack font-semibold">
                                {notification.notify_profile_name}{" "}
                                {notification.message_titile}
                              </h5>
                              <p className="text-ashSecondary text-sm font-normal mb-3">
                                {notification.to_message}
                              </p>

                              {notification.notification_type ===
                                "express_interests" ? (
                                // <button className="text-main rounded-md border-[2px] border-main px-2 py-1">
                                //   Messages
                                // </button>
                                <button
                                  className="text-main rounded-md border-[2px] border-main px-2 py-1"
                                  onClick={() => {
                                    setSelectedFromProfileId(
                                      notification.from_profile_id
                                    ); // Set the selected profile ID
                                    handleMessage(
                                      notification.from_profile_id
                                    ); // Pass the ID to the handler
                                  }}
                                >
                                  Message
                                </button>
                              ) : (
                                // <button className="text-main rounded-md border-[2px] border-main px-2 py-1">
                                //   Update my photo
                                // </button>
                                <button
                                  className="text-main rounded-md border-[2px] border-main px-2 py-1"
                                  onClick={handleUpdatePhoto}
                                >
                                  Update my photo
                                </button>
                              )}

                              <p className="text-sm text-ashSecondary font-semibold mt-3">
                                {notification.time_ago}
                              </p>
                            </div>
                          </div>
                        ))
                        : NotificationData.map((notification) => (
                          <div
                            className="bg-lightFade-pink flex items-start border-b-[1px] border-gray px-3 py-3 space-x-5"
                            key={notification.id}
                          >
                            <div>
                              <img
                                src={notification.profile_image}
                                alt={notification.notify_profile_name}
                                className="!w-8 h-8 rounded-full"
                              />
                            </div>

                            <div>
                              <h5 className="text-[14px] font-semibold text-vysyamalaBlack ">
                                {notification.notify_profile_name}{" "}
                                {notification.message_titile}
                              </h5>
                              <p className="text-ashSecondary text-sm font-normal mb-3">
                                {notification.to_message}
                              </p>

                              {notification.notification_type ===
                                "express_interests" ? (
                                <button className="text-main text-[14px]  rounded-md border-[2px] border-main px-2 py-1">
                                  Message
                                </button>
                              ) : (
                                // <button className="text-main text-[14px]  rounded-md border-[2px] border-main px-2 py-1">
                                //   Update my photo
                                // </button>
                                <button
                                  className="text-main text-[14px]  rounded-md border-[2px] border-main px-2 py-1"
                                  onClick={() => navigate("/MyProfile")} // Use navigate instead of window.location
                                >
                                  Update my photo
                                </button>
                              )}

                              <p className="text-[12px] font-semibold text-ashSecondary mt-3">
                                {notification.time_ago}
                              </p>
                            </div>
                          </div>
                        ))}

                      {/* Photo Request */}

                      {/* Change in Photo */}

                      {/* Change in Photo */}
                    </div>

                    <div className="text-center ">
                      <button
                        onClick={() => readNotification()}
                        className="w-full rounded-md text-sm text-main py-3 font-semibold hover:bg-gradient hover:text-white"
                      >
                        Load more
                      </button>
                    </div>
                  </div>
                )}
              </li>

              {/* Upgrade Button */}
              <Link
                to={"/UpgradePlan"}
              // aria-current="page"
              // className="active-nav"
              >
                <li className="bg-gradient rounded-[6px] py-[6px] px-[24px] text-white text-sm font-semibold cursor-pointer max-lg:text-[14px]">
                  Upgrade
                </li>
              </Link>
            </ul>

            {/* Profile Image on hover */}
            <div
              className="border-l-2 border-l-[#d9d9d9] pl-6 relative inline-block leading-[30px] max-lg:pl-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={userProfileImage ? userProfileImage : ProfileImg}
                alt="Profile-image"
                className="w-11 h-11 rounded-full cursor-pointer object-cover"
              />

              {isHovered && (
                <div className="absolute top-9 right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 max-lg:hidden">
                  <Link to="/MyProfile">
                    <div className="block px-4 py-2 text-gray-800 hover:bg-gray">
                      <FaCircleUser className="text-[18px] inline mr-2" />{" "}
                      Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleUpdateSettings}
                    className="block px-4 py-2 text-gray-800 w-full text-start hover:bg-gray"
                  >
                    <MdManageAccounts className="text-[18px] inline mr-2" />{" "}
                    Settings
                  </button>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray"
                  >
                    <FiLogOut className="text-[18px] inline mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>
        {/* Sidebar for small screens */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-10">
            <div
              className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg py-8 px-2 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
              <button
                onClick={handleMenuToggle}
                className="absolute top-4 right-4 text-gray-800"
              >
                {/* Close button */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Profile Image on hover */}
              <div
                className="pl-8 relative inline-block max-lg:pl-4"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={userProfileImage ? userProfileImage : ProfileImg}
                  alt="Profile-image"
                  className="w-11 h-11 rounded-full cursor-pointer object-cover"
                />

              </div>

              {/* Navigation Links */}
              <nav className="lg:flex items-center space-x-10 max-lg:space-x-5">
                <ul className="flex flex-col gap-5 justify-center items-start px-4 text-ash">
                  {/* Navigation Links */}
                  <NavLink
                    to="/LoginHome"
                    className="active-nav"
                    aria-current="page"
                    onClick={handleMenuToggle}
                  >
                    <li className="text-[16px] cursor-pointer font-normal">
                      Home
                    </li>
                  </NavLink>
                  <Link to="/MyProfile"
                  onClick={handleMenuToggle}
                  >
                    <div className="active-nav text-[16px] text-primary cursor-pointer !font-normal">

                      Profile
                    </div>
                  </Link>
                  <NavLink
                    to="/Search"
                    aria-current="page"
                    className="active-nav"
                    onClick={handleMenuToggle}
                  >
                    <li className="text-[16px] text-primary cursor-pointer font-normal">
                      Search
                    </li>
                  </NavLink>
                  <NavLink
                    to="/Dashboard"
                    aria-current="page"
                    className="active-nav"
                    onClick={handleMenuToggle}
                  >
                    <li className="text-[16px] text-primary cursor-pointer font-normal">
                      Dashboard
                    </li>
                  </NavLink>
                  <NavLink
                    to="/Wishlist"
                    aria-current="page"
                    className="active-nav"
                    onClick={handleMenuToggle}
                  >
                    <li className="text-[16px] text-primary cursor-pointer font-normal">
                      Wishlist
                    </li>
                  </NavLink>
                  <NavLink
                    to="/Messages"
                    aria-current="page"
                    className="active-nav"
                    onClick={handleMenuToggle}
                  >
                    <li className="text-[16px] text-primary cursor-pointer font-normal">
                      Message
                    </li>
                  </NavLink>

                  {/* Notifications */}
                  <li
                    // onClick={handleNotificationClick}
                    onClick={() => readNotification()}
                    
                    className={`active-nav text-[16px] text-primary rounded-md transition-all cursor-pointer !font-normal relative`}
                  >
                    Notification

                  </li>


                  <button
                    onClick={handleUpdateSettings}
                    className="active-nav text-[16px] text-primary cursor-pointer !font-normal"
                  >

                    Settings
                  </button>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="block text-primary"
                  >
                    Logout
                  </a>

                  {/* Upgrade Button */}
                  <Link to="/UpgradePlan"
                    onClick={handleMenuToggle}
                  
                  >
                    <li className="bg-gradient rounded-[6px] py-[8px] px-[24px] text-white text-[16px] font-semibold cursor-pointer">
                      Upgrade
                    </li>
                  </Link>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
