


import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
//import axios from "axios";
import apiClient from "../../../API";


const forgetPasswordSchema = z.object({
    email: z.string().optional().or(z.literal('')),  // Make email optional
    userID: z.string().optional().or(z.literal('')), // Make userID optional
}).refine(
    (data) => data.email || data.userID,
    { message: 'Either Email or User ID is required', path: ['userID'] } // Error on both fields if neither is provided
).refine(
    (data) => !(data.email && data.userID), // Both fields cannot be filled at the same time
    { message: 'Please provide either Email or User ID, not both', path: ['userID'] }
);
// const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

// const passwordResetSchema = z.object({
//     newPassword: z.string()
//         .min(8, "Password must be at least 8 characters long")
//         .regex(passwordRegex, "Password must contain at least one uppercase letter, one number, and one special character"),
//     confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
// });
interface FormInputs {
    email: string;
    userID: string;
}

interface ForgetPasswordProps {
    onBackToLogin: () => void;
    onClose: () => void;
    onSubmit: (message: string) => void;
}
interface PasswordResetFormInputs {
    newPassword: string;
    confirmPassword: string;
}

type UserData = {
    profile_id?: string;
    email?: string;
};


export const ForgetPassword: React.FC<ForgetPasswordProps> = ({
    onBackToLogin,
    onClose,

}) => {
    const [step, setStep] = useState<"forgetPassword" | "otpVerification" | "resetPassword">("forgetPassword");
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    // const profileId = localStorage.getItem("loginuser_profile_id") || 'VY240002';
    const [userID, setUserID] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [canResend, setCanResend] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState<number>(60);


    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!canResend) {
            timer = setInterval(() => {
                setResendTimer(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setCanResend(true);
                        return 30; // reset timer to 30 seconds
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [canResend]);

    // React Hook form for Forget Password
    const {
        register: registerForgetPassword,
        handleSubmit: handleSubmitForgetPassword,
        formState: { errors: forgetPasswordErrors },
    } = useForm<FormInputs>({
        resolver: zodResolver(forgetPasswordSchema),
    });

    // React Hook form for Password Reset
    const {
        register: registerResetPassword,
        handleSubmit: handleSubmitResetPassword,
        formState: { errors: resetPasswordErrors },
    } = useForm<PasswordResetFormInputs>();
    

    const handleResendOtp = async () => {
        setLoading(true);
        setError(null); // Reset any previous errors
        setSuccessMessage(null); // Reset any previous success messages

        try {
            const userData = { profile_id: userID }; // Use the stored userID

            const response = await apiClient.post(
                "/auth/Forget_password/",
                userData
            );

            if (response.data?.message) {
                setCountdown(60); // Reset the countdown timer
                setOtpValues(['', '', '', '', '', '']); // Clear OTP input fields
                setSuccessMessage("OTP resent successfully."); // Set the success message
                setCanResend(false); // Disable the resend button until the timer completes
                console.log("OTP resent successfully");
            } else {
                setError("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            setError("An error occurred while resending the OTP.");
        } finally {
            setLoading(false);
        }
    };

    



    const handleForgetPasswordSubmit: SubmitHandler<FormInputs> = async (data) => {
        const userData: UserData = {};
    
        // Dynamically set data based on input
        if (data.email?.trim()) {
            userData.email = data.email.trim();
            setEmail(data.email.trim());
        }
    
        if (data.userID?.trim()) {
            userData.profile_id = data.userID.trim();
            setUserID(data.userID.trim());
        }
    
        try {
            console.log("Sending userData:", userData);
    
            const response = await apiClient.post(
                "/auth/Forget_password/",
                userData
            );
    
            console.log("Forget_password Response:", response);
    
            if (response.data?.message && response.data?.forget_profile_id) {
                // Store the forget_profile_id from the response
                setUserID(response.data.forget_profile_id);
                setStep("otpVerification");
            } else {
                setError("Error: Unable to proceed. Please check your input.");
            }
        } catch (error) {
            console.error("Error sending forget password request:", error);
            setError("An error occurred. Please try again.");
        }
    };
    
    
    



    

   



    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otp = otpValues.join(''); // Combine the OTP inputs
    
        if (otp.length === 6) {
            setLoading(true); // Show loading state
            setError(null); // Clear errors
            setSuccessMessage(null); // Clear previous success messages
    
            try {
                // Use stored `userID` (forget_profile_id) for OTP verification
                const response = await apiClient.post(
                    "/auth/Forget_password_otp_verify/",
                    {
                        profile_id: userID, // Use the forget_profile_id stored earlier
                        otp: otp,
                    }
                );

                console.log("Forget_password_otp_verify",userID)
    
                console.log("OTP Verification Response:", response);
    
                if (response.data?.status === 1) {
                    setSuccessMessage(response.data.message);
                    setStep("resetPassword");
                } else {
                    setError(response.data.message || "Invalid OTP. Please try again.");
                }
            } catch (error) {
                console.error("Error verifying OTP:", error);
                setError("An error occurred while verifying the OTP.");
            } finally {
                setLoading(false); // Hide loading state
            }
        } else {
            setError("Please enter all 6 digits of the OTP.");
        }
    };
    
    
    

    const handlePasswordResetSubmit: SubmitHandler<PasswordResetFormInputs> = async (data) => {
        try {
            const response = await apiClient.post(
                '/auth/Reset_password/',
                {
                    profile_id: userID, // Use the stored userID here
                    otp: otpValues.join(''),
                    new_password: data.newPassword,
                    confirm_password: data.confirmPassword,
                }
            );
            console.log("Reset_password",response)

            if (response.data.status === 'error') {
                setError(response.data.message);
                setSuccessMessage(null);
            } else {
                setSuccessMessage('Password changed successfully.');
                setError(null);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setError('An error occurred while changing the password.');
            setSuccessMessage(null);
        }
    };

    const handleChange = (index: number, value: string) => {
        // Clear error and success messages when user starts typing
        setError(null);
        setSuccessMessage(null);

        // Validate input: only allow single digits
        if (/^\d$/.test(value)) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            // Focus on the next input field if the current input is not empty and within bounds
            if (index < otpValues.length - 1 && value !== '') {
                inputRefs.current[index + 1].focus();
            }
        } else if (value === '') {
            // Handle the case where the input is cleared
            const newOtpValues = [...otpValues];
            newOtpValues[index] = '';
            setOtpValues(newOtpValues);

            // Focus on the previous input field if it's empty and within bounds
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otpValues[index] === '' && index > 0) {
            const newOtpValues = [...otpValues];
            newOtpValues[index - 1] = '';
            setOtpValues(newOtpValues);
            inputRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);



    // Rendering the appropriate step
    if (step === "forgetPassword") {
        return (
            <form onSubmit={handleSubmitForgetPassword(handleForgetPasswordSubmit)}>
                <div>
                    <h5 className="text-[24px] text-primary font-semibold">
                        Forget Password
                    </h5>
                    <p className="text-[16px] text-primary mb-5">
                        Please enter your registered email ID and Vysyamala User ID
                    </p>
                </div>

                <div className="mb-5">
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="Email"
                        {...registerForgetPassword("email", {
                            required: true,
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    {forgetPasswordErrors.email && (
                        <span className="text-red-500">{forgetPasswordErrors.email.message as string}</span>
                    )}
                </div>

                <div className="mb-5">
                    <input
                        type="text"
                        id="userID"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="User ID"
                        {...registerForgetPassword("userID", {
                            required: true,
                            setValueAs: (value) => value.trim(),
                        })}
                    />
                    {forgetPasswordErrors.userID && (
                        <span className="text-red-500">{forgetPasswordErrors.userID.message as string}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] shadow-redboxshadow mt-2"
                >
                    Submit
                </button>
                <IoIosCloseCircle
                    onClick={onClose}
                    className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
                />
            </form>
        );
    }

    if (step === "otpVerification") {
        return (
            <form onSubmit={handleOtpSubmit}>

                <div className="text-center mb-4">
                    <h2 className="text-primary text-[24px] font-semibold mb-2">
                        Enter OTP
                    </h2>
                    <p className="text-ash text-[16px] mb-2">
                        We have sent a 6-digit OTP to your registered email address: <strong>{email}</strong>
                    </p>
                </div>

                <div className="grid grid-cols-6 gap-2 mb-4">
                    {otpValues.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className={`outline-none px-2 text-primary w-10 h-10 border ${error && !otpValues[index] ? 'border-red-500' : 'border-footer-text-gray'} rounded-md text-center`}
                            value={otpValues[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleBackspace(index, e)}
                            ref={(el) => (inputRefs.current[index] = el!)}
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="text-center mb-4">
                    <p className="text-primary">
                        Didn&apos;t receive OTP?{" "}
                        <span
                            className={`text-main font-semibold ${!canResend ? 'cursor-not-allowed text-gray-400' : 'hover:cursor-pointer'}`}
                            onClick={canResend ? handleResendOtp : undefined}
                        >
                            {canResend ? 'Resend OTP' : `Resend OTP in ${resendTimer}s`}
                        </span>
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                    </p>
                </div>
                <button
                    type="submit"
                    className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] shadow-redboxshadow mt-2"
                    onClick={handleOtpSubmit}
                    disabled={loading}
                >
                    Verify
                </button>
                <IoIosCloseCircle
                    onClick={onClose}
                    className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
                />
            </form>
        );
    }


    if (step === "resetPassword") {
        return (



            <form onSubmit={handleSubmitResetPassword(handlePasswordResetSubmit)}>
                <h2 className="text-primary text-[24px] font-semibold mb-2">Reset Password</h2>

                <div className="mb-5 relative">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="New Password"
                        {...registerResetPassword("newPassword")}
                    />
                    {resetPasswordErrors.newPassword && (
                        <span className="text-red-500">
                            {resetPasswordErrors.newPassword.message as string}
                        </span>
                    )}
                    <div
                        className="absolute right-3 top-3 cursor-pointer text-black"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                </div>

                <div className="mb-5 relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                        placeholder="Confirm Password"
                        {...registerResetPassword("confirmPassword")}
                    />
                    {resetPasswordErrors.confirmPassword && (
                        <span className="text-red-500">
                            {resetPasswordErrors.confirmPassword.message as string}
                        </span>
                    )}
                    <div
                        className="absolute right-3 top-3 cursor-pointer text-black"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <button
                    type="submit"
                    className="w-full py-[10px] px-[24px] bg-gradient text-white rounded-[6px] shadow-redboxshadow mt-2"
                    disabled={loading}
                >
                    Reset Password
                </button>

                {successMessage && (
                    <p className="text-center text-[16px] text-ash mt-5">
                        <button
                            type="button"
                            className="text-secondary hover:underline"
                            onClick={onBackToLogin}
                        >
                            Back to Login
                        </button>
                    </p>
                )}

                <IoIosCloseCircle
                    onClick={onClose}
                    className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
                />
            </form>

        );
    }


    return null;
};