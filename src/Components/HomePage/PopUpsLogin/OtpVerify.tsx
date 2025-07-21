//import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import apiClient from "../../../API";

interface OtpVerifyProps {
    onNext: () => void;
    onClose: () => void;
}

export const OtpVerify: React.FC<OtpVerifyProps> = ({ onNext, onClose }) => {
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<boolean>(false);
    const totalInputs = 6;
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(totalInputs).fill(null));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const mobileno = sessionStorage.getItem("mobileNumber");

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (/^\d$/.test(value) || value === "") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);
            setError(false);

            if (index < totalInputs - 1 && value !== "") {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = "";
            setOtpValues(newOtpValues);

            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const isValid = otpValues.every((value) => value !== "");
        if (isValid) {
            const otp = otpValues.join("");
            try {
                const response = await apiClient.post('/auth/Login_verifyotp/', {
                    Mobile_no: mobileno,
                    Otp: otp
                });

                if (response.data.status === 1) {
                    sessionStorage.setItem(
                        "profile_completion",
                        response.data.profile_completion
                    );

                    //console.log("Login Response:", response.data);
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("user_profile_image", response.data.profile_image);
                    sessionStorage.setItem("selectedstar", response.data.birth_star_id);
                    sessionStorage.setItem("selectedRasi", response.data.birth_rasi_id);
                    localStorage.setItem("selectedstar", response.data.birth_star_id);
                    localStorage.setItem("selectedRasi", response.data.birth_rasi_id);

                    sessionStorage.setItem("gender", response.data.gender);
                    localStorage.setItem("gender", response.data.gender);

                    sessionStorage.setItem("ProfileId", response.data.profile_id);
                    sessionStorage.setItem("profile_id", response.data.profile_id);
                    sessionStorage.setItem("loginuser_profile_id", response.data.profile_id);
                    sessionStorage.setItem("plan_id", response.data.cur_plan_id);
                    sessionStorage.setItem("profile_owner", response.data.profile_owner);
                    sessionStorage.setItem("quick_reg", response.data.quick_reg);
                    sessionStorage.setItem("custom_message", response.data.custom_message);

                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user_profile_image", response.data.profile_image);
                    localStorage.setItem("selectedstar", response.data.birth_star_id);
                    localStorage.setItem("selectedRasi", response.data.birth_rasi_id);
                    localStorage.setItem("gender", response.data.gender);
                    localStorage.setItem("ProfileId", response.data.profile_id);
                    localStorage.setItem("profile_id", response.data.profile_id);
                    localStorage.setItem("loginuser_profile_id", response.data.profile_id);
                    localStorage.setItem("plan_id", response.data.cur_plan_id);
                    localStorage.setItem("profile_owner", response.data.profile_owner);
                    localStorage.setItem("quick_reg", response.data.quick_reg);
                    localStorage.setItem("custom_message", response.data.custom_message);

                    onNext();
                } else {
                    setApiError(response.data.message || 'Verification failed');
                }
            } catch (error) {
                setApiError('An error occurred. Please try again.');
            }
        } else {
            setError(true);
        }
        setIsSubmitting(false);
    };

    const handleResendOtp = async () => {
        if (canResend) {
            try {
                const response = await apiClient.post('/auth/Login_with_mobileno/', {
                    Mobile_no: mobileno
                });

                if (response.data.status === 1) {
                    setApiError(response.data.message || 'OTP sent successfully.');
                    setCanResend(false);
                    setResendTimer(60);
                    const timer = setInterval(() => {
                        setResendTimer((prevTimer) => {
                            if (prevTimer > 0) {
                                return prevTimer - 1;
                            } else {
                                clearInterval(timer);
                                setCanResend(true);
                                return 0;
                            }
                        });
                    }, 1000);
                } else {
                    setApiError('Failed to resend OTP. Please try again.');
                }
            } catch (error) {
                setApiError('Failed to resend OTP. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <h2 className="text-primary text-[24px] font-semibold mb-2 max-md:text-[20px]">Mobile Verification</h2>
                <p className="text-ash text-[16px]">
                    Please verify your mobile number to proceed.
                </p>
            </div>

            <div className="text-center mb-4">
                <h2 className="text-ash text-[23px] font-semibold">OTP Verification</h2>
                <p className="text-primary">
                    We have sent a verification code to {mobileno}
                </p>
            </div>

            <div className="flex justify-center items-center gap-x-2 mb-8">
                {Array.from({ length: totalInputs }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className={`outline-none px-2 text-primary w-10 h-10 border max-md:w-8 max-md:h-8 ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
                        value={otpValues[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleBackspace(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>

            {apiError && (
                <div className="text-center text-red-500 mb-4">
                    {apiError}
                </div>
            )}

            <div className="text-center mb-4">
                <p className="text-primary">
                    Didn&apos;t receive OTP?{" "}
                    <span
                        className={`text-main font-semibold ${!canResend ? 'cursor-not-allowed text-gray-400' : 'hover:cursor-pointer'}`}
                        onClick={handleResendOtp}
                    >
                        {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
                    </span>
                </p>
            </div>

            <button
                type="submit"
                className="w-full py-[10px] px-[24px] bg-gradient text-white shadow-redboxshadow rounded-[6px] mt-2"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>

            <IoIosCloseCircle
                onClick={onClose}
                className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
            />
        </form>
    );
};
