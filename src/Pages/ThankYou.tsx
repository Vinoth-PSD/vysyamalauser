import Thankyou from "../assets/images/Thankyou.png";
import DetailedReg from "../assets/images/DetailedReg.png";
import QuickReg from "../assets/images/QuickReg.png";
import { Link, useNavigate } from "react-router-dom";

export const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray py-20 mt-20 px-10 max-xl:px-8 max-lg:mt-16 max-xl:py-14 max-sm:px-0 max-sm:py-0">
      <div className="container bg-white mx-auto rounded-[12px] shadow-md py-24 px-32 max-xl:px-24 max-lg:px-12 max-lg:py-16 max-md:p-14 max-sm:py-14 max-sm:px-5 ">
        <div>
          <img src={Thankyou} alt="Thankyou image" className="mx-auto h-32 object-cover" />
        </div>

        <div>
          <h5 className="text-[20px] text-ash font-bold text-center mb-2 max-sm:text-[16px]">
            We appreciate your interest in registering your <br className="max-sm:hidden" /> profile in
            Vysyamala!
          </h5>
          <p className="font-normal text-center text-ashSecondary">
            We provide two options for registering your profile
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 justify-center items-center max-lg:grid-cols-1 max-lg:gap-y-6 ">
          <div className="px-8 py-10 border-2 border-gray rounded-xl h-full max-xl:px-4 max-xl:py-8 max-sm:px-2 max-sm:py-4">
            <div className="flex justify-between space-x-3 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-2">
              <div>
                <img src={DetailedReg} alt="DetailedReg image" className="max-sm:w-16" />
              </div>

              <div className="flex-1 max-sm:space-y-2">
                <h5 className="text-[20px] text-ash font-semibold">
                  Detailed registration
                </h5>
                <p className="text-ashSecondary">
                  Usually takes 5-8 mins. If you have enough time to upload
                  detailed information.
                </p>

                <div className="mt-5">
                  <Link to="/ContactDetails">
                    <button className="bg-main text-white px-5 py-2.5 rounded-md font-semibold">
                      Register Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-10 border-2 border-gray rounded-xl h-full  max-xl:px-4 max-xl:py-8 max-sm:py-4">
            <div className="flex justify-between space-x-3 max-sm:flex-col max-sm:space-x-0  max-sm:space-y-2">
              <div>
                <img src={QuickReg} alt="DetailedReg image" className="max-sm:w-16"  />
              </div>
              <div className="flex-1 max-sm:space-y-2">
                <h5 className="text-[20px] text-ash font-semibold">
                  Quick Registration
                </h5>
                <p className="text-ashSecondary">
                  Usually takes 2-3 mins. I am busy, I need Vysyamala Team to
                  update the detailed horoscope.
                </p>

                <div className="mt-5">
                  <button
                    onClick={() => navigate("/UploadImages?quick=1")}
                    className="text-main px-5 py-2.5 border-2 border-main rounded-md font-semibold  max-xl:px-2"
                  >
                    Upload Horoscope and Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
