import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { BasicDetails } from "./PopUpsReg/BasicDetails"; // Adjust import path as per your file structure
import apiClient from "../../API";

interface PopupModalProps {
  mobileNumber: string;
  onClose: () => void;
  onEditNumber?: () => void; // Add new prop for edit number functionality
}



interface ResendOtpResponse {
  Status: number;
  response_data: {
    message: string;
    "Send Message Response": string;
    "Delivery Report Status": string;
    "Available Credit": string;
  };
  profile_id: string;
  message: string;
}

export const PopupModal: React.FC<PopupModalProps> = ({ onClose, mobileNumber, onEditNumber }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<boolean>(false); // State to track validation error
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to store error message
  const totalInputs = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
  const [profileId, setProfileId] = useState<string>(''); // State to store profile ID
  const [openNextPopup, setOpenNextPopup] = useState<boolean>(false); // State to control opening next popup
  const [countdown, setCountdown] = useState<number>(60); // State for countdown timer
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  // const [mobileNumberr,setMobileNumber]=useState<string>('')y



  // useEffect(()=>{
  //   const storedMobileNumber =sessionStorage.getItem("mobile")

  //   if(storedMobileNumber){
  //     setMobileNumber(storedMobileNumber)
  //   }

  // },[])

  useEffect(() => {
    // Retrieve profile_id from session storage
    const storedProfileId = sessionStorage.getItem('profile_id');
    if (storedProfileId) {
      setProfileId(storedProfileId);
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setError(false); // Reset error state when user starts typing

      // Only move focus if the current input is not the last one and the value is not empty
      if (index < totalInputs - 1 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Backspace") {
  //     const newOtpValues = [...otpValues];
  //     newOtpValues[index] = "";
  //     setOtpValues(newOtpValues);

  //     if (index > 0) {
  //       inputRefs.current[index - 1]?.focus();
  //     }
  //   }
  // };



  const handleBackspace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      // Only clear the current box's value, don't clear the previous one
      if (otpValues[index] !== "") {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      } else if (index > 0) {
        // Move focus to the previous box without clearing its value
        inputRefs.current[index - 1]?.focus();
      }
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = otpValues.every((value) => value !== "");
    if (isValid) {
      try {
        const otp = otpValues.join(''); // Concatenate OTP values
        const payload = {
          Otp: otp,
          ProfileId: profileId
        };
        // console.log('Payload to be sent:', payload);

        const response = await apiClient.post(`/auth/Otp_verify/`, payload);

        //console.log('OTP Verification Response:', response.data);

        // Check the response for success or failure
        if (response.data.message === "OTP verified successfully.") {
          // Proceed to the next step upon successful OTP verification
          setOpenNextPopup(true); // Show the next popup for basic details
        } else {
          setError(true);
          setErrorMessage("Invalid OTP. Please try again.");
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        // Handle error (show error message, etc.)
        setError(true);
        setErrorMessage("Error verifying OTP. Please try again later.");
      }
    } else {
      setError(true);
      setErrorMessage("Please enter OTP.");
    }
  };

  const handleNext = () => {
    // Handle the action to proceed to the next step
    //console.log('Proceeding to the next step...');
    setOpenNextPopup(false); // Close the basic details popup
    // You can add more logic here to navigate to the next step
  };

  // const maskMobileNumber = (number: string) => {
  //   if (number.length < 5) return number; // Return the number as-is if it's too short
  //   //  const visiblePartt = number.slice(0, 2); 
  //   const visiblePart = number.slice(0, 5); // Keep the first 5 digits visible
  //   const maskedPart = 'x'.repeat(number.length - 5); // Mask the rest
  //   return `${visiblePart}${maskedPart}`; // Return the masked number
  // };

  //   const maskMobileNumber = (number: string) => {
  //   if (number.length < 5) return number;

  //   const firstPart = number.slice(0, 7); // First 5 digits
  //   const maskedPart = "x".repeat(number.length - 5);

  //   return `+${firstPart}${maskedPart}`;
  // };
  const [isIndia, setIsIndia] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

 // Update your useEffect in PopupModal:
useEffect(() => {
  const storedEmail = sessionStorage.getItem("email");
  //const storedMobile = sessionStorage.getItem("mobile");
  const indiaFlag = sessionStorage.getItem("isIndia") === "true";

  setIsIndia(indiaFlag);
  setEmail(storedEmail || "");
  // No need to set mobileNumber here as it's passed as a prop
}, []);

  const maskMobileNumber = (number: string) => {
    if (number.length < 5) return number; // Return the number as-is if it's too short
    const visiblePartt = number.slice(0, 2);
    const visiblePart = number.slice(2, 7); // Keep the first 5 digits visible
    const maskedPart = 'x'.repeat(number.length - 7); // Mask the rest
    return `${"+"}${visiblePartt}${" "}${visiblePart}${maskedPart}`; // Return the masked number
  };


  const resendOtp = async (profileId: string): Promise<ResendOtpResponse> => {
    try {
      console.log(profileId);
      const response = await apiClient.post<ResendOtpResponse>(
        "/auth/Get_resend_otp/",
        {
          ProfileId: profileId,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error resending OTP:", error);
      throw new Error("Failed to resend OTP");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const profileId = localStorage.getItem("profile_id");
      if (profileId) {
        const result = await resendOtp(profileId);
        setMessage(result.response_data.message);
        setCountdown(60); // Reset countdown timer after resending OTP
        setOtpValues(Array(totalInputs).fill("")); // Clear the OTP input boxes
        inputRefs.current[0]?.focus(); // Set focus to the first input box
      } else {
        setMessage("Profile ID not found");
      }
    } catch (error) {
      setMessage("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative max-sm:w-[90%] max-sm:p-6">
        <div className="mb-5">
          <h2 className="text-primary text-[24px] font-semibold mb-2  max-md:text-[20px] ">
            Mobile Verification
          </h2>
          <p className="text-ash text-[16px]">
            Please enter the one time password sent to
            your mobile number.
          </p>
        </div>
        {!openNextPopup ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-primary text-2xl font-semibold mb-4 text-center max-md:text-[20px]">OTP Verification</h2>
            <p className="text-primary text-lg mb-2 text-center">We have sent a verification code to<br />

              {/* {mobileNumber ? maskMobileNumber(mobileNumber) : "your registered mobile number"} */}
              {isIndia ? (
                ` ${maskMobileNumber(mobileNumber)}`
              ) : (
                email
              )}
            </p>
            <p className="text-primary text-sm text-center mb-4">
              <span
                className="text-main font-semibold hover:cursor-pointer hover:underline"
                onClick={onEditNumber}
              >
                Edit Number
              </span>
            </p>

            <div className="flex justify-center items-center gap-x-2 mb-8">
              {Array.from({ length: totalInputs }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className={`outline-none px-2 text-primary w-10 h-10 border  max-md:w-8 max-md:h-8 ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
                  value={otpValues[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
            )}

            {/* <div className="text-center mb-4">
              <p className="text-primary text-lg">
                Didn&apos;t receive OTP?{" "}
                <span className="text-main font-semibold cursor-pointer">Resend OTP</span>
              </p>
            </div> */}

            <div className="text-center mb-4">
              <p className="text-primary max-md:text-base">
                Didn't receive OTP?{" "}
                <span
                  className={`text-main font-semibold ${countdown > 0
                    ? "cursor-not-allowed text-gray-400"
                    : "hover:cursor-pointer"
                    }`}
                  onClick={countdown === 0 ? handleResendOtp : undefined}
                >
                  {loading
                    ? "Resending..."
                    : countdown > 0
                      ? `Resend OTP in ${countdown}s`
                      : "Resend OTP"}
                </span>
              </p>
              {message && <p className="text-red-500">{message}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-[10px] px-[24px] bg-gradient shadow-redboxshadow text-white rounded-[6px] mt-2"
            >
              Verify OTP
            </button>
            <IoIosCloseCircle
              onClick={onClose}
              className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
            />
          </form>
        ) : (
          <BasicDetails onClose={onClose} onNext={handleNext} />
        )}
      </div>
    </div>
  );
};

export default PopupModal;

