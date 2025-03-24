import React from 'react';
import emailImg from "../../../assets/icons/email.png";
import { IoIosCloseCircle } from "react-icons/io";

interface EmailSentProps {
    onBackToLogin: () => void;
    onClose: () => void;
    onNext: () => void;
}

export const EmailSent: React.FC<EmailSentProps> = ({ onBackToLogin, onClose }) => {
    return (
        <div>
            <div>
                <h5 className="text-[24px] text-primary font-semibold max-sm:text-[20px]">Email Sent</h5>
            </div>

            <div className="mb-5">
                <img src={emailImg} alt="Email" />
            </div>

            <div className="mb-5">
                <p className="text-[16px] text-primary mb-5">
                    An email with a new password has been sent to someone@gmail.com.
                </p>
                <p className="text-[16px] text-primary mb-5">
                    If you’re still facing issues, contact admin through mail at vysyamala@gmail.com or call us at 9944851550 / 9043085524.
                </p>
            </div>

            <button
                type="button"
                className="text-secondary hover:underline"
                onClick={onBackToLogin}
            >
                Back to Login
            </button>

            <IoIosCloseCircle onClick={onClose} className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black" />
        </div>
    );
};
