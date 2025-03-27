import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export const ThankYouReg = () => {
  const Save_plan_package_message = sessionStorage.getItem(
    "Save_plan_package_message"
  );
  const profileid = localStorage.getItem("profile_id_new") || "0"; // Default to "0" if not found

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/LoginHome");
    }, 3000);
  }, []);
  sessionStorage.removeItem("quick_reg");
  sessionStorage.removeItem("userplanid");
  sessionStorage.removeItem("profile_completion");

  return (
    <div>
      <div className="container mx-auto mt-40 px-10 max-sm:px-5 max-sm:mt-30">
        <div className="w-full rounded-3xl shadow-profileCardShadow mx-auto text-center p-24 my-20 max-lg:p-16 max-md:p-12 max-sm:p-8 max-lg:my-20">
          <div className="w-1/2 mx-auto flex flex-col justify-between items-center max-xl:w-[80%] max-md:w-[100%]">
            <h1 className="text-6xl text-vysyamalaBlack uppercase font-bold tracking-wide mb-5 max-lg:text-5xl max-md:text-4xl max-sm:text-xl">
              Thank You!
            </h1>

            <FaCheck className="w-full text-8xl text-[#00c96a] mb-5 max-sm:text-6xl" />
            <p className="text-vysyamalaBlack">{Save_plan_package_message}</p>

            <p className="text-vysyamalaBlack">Thank you for Registering your profile in Vysyamala. Your Profile ID is <span className="text-main font-semibold">{profileid}</span>. Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you. </p>
          </div>

          <div>
            <p className="text-vysyamalaBlack font-semibold mt-20 max-xl:mt-16 max-lg:mt-12 max-md:mt-6">
              Copyright &copy; 2025 | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
