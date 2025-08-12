/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import apiClient from "../../../API";

// ZOD Schema with updated regex validations
const schema = zod
  .object({
    mobile: zod
      .string()
      .length(10, { message: "Mobile number must be exactly 10 characters" })
      .regex(/^\d+$/, { message: "Mobile number must contain only numbers" }),
  })
  .required();

interface LoginPopUpProps {
  onNext: () => void;
  onClose: () => void;
  onProfileIdLogin: () => void;
}

interface FormInputs {
  mobile: string;
}

interface SendOtpResponse {
  status: number;
  response_data: {
    message: string;
  };
  message: string;
}

export const PhoneLoginPopup: React.FC<LoginPopUpProps> = ({
  onNext,
  onClose,
  onProfileIdLogin,
}) => {
  // React Hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // new state

  const clearApiError = () => {
    setApiError(null);
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setApiError(null);

     setLoading(true); // disable button immediately

    try {
      const response = await apiClient.post<SendOtpResponse>(
        "/auth/Login_with_mobileno/",
        {
          Mobile_no: data.mobile,
        }
      );

      if (response.data.status === 1) {
        console.log(response.data.response_data.message);
        sessionStorage.setItem("mobileNumber", data.mobile);
        onNext();
      } else {
        setApiError(response.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setApiError("Invalid mobile number");
      } else {
        console.error("Error sending OTP:", error);
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
     finally {
      setLoading(false); // re-enable button after request finishes
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p className="text-[16px] text-primary ">Welcome Back</p>
        <h5 className="text-[24px] text-primary font-semibold mb-5 max-md:text-[20px]">
          Login to your account
        </h5>
      </div>

      <div className="mb-5">
        <input
          type="text"
          id="profileID"
          className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
          placeholder="Enter your Mobile Number"
          inputMode="numeric"
          pattern="\d*"
          maxLength={10}
          // onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(
              /[^0-9]/g,
              ""
            );
            clearApiError();
          }}
          {...register("mobile", { required: true })}
        />
        {errors.mobile && (
          <span className="text-red-500 block mt-2">
            {errors.mobile.message}
          </span>
        )}
        {apiError && (
          <span className="text-red-500 block mt-2">{apiError}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading} // disable while loading
        className={`w-full bg-gradient flex justify-center items-center py-[10px] px-[24px] rounded-[6px] shadow-redboxshadow space-x-2 cursor-pointer ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="text-[16px] text-white font-semibold">
          {loading ? "Sending..." : "Send OTP"}
        </div>
        {!loading && <FaArrowRightLong className="text-white text-[22px]" />}
      </button>

      <p className="text-ash font-semibold text-center my-5 max-md:my-2">or</p>

      <button
        onClick={onProfileIdLogin}
        className="w-full py-[10px] px-[24px] bg-white text-main font-semibold border-2 rounded-[6px]  mt-2 "
      >
        Login with Profile ID
      </button>

      <p className="text-center text-[16px] text-ash mt-5">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onClose}
          className="text-secondary hover:underline"
        >
          Register Now
        </button>
      </p>

      <IoIosCloseCircle
        onClick={onClose}
        className="absolute top-[-15px] right-[-15px] text-[30px] text-black bg-white rounded-full flex items-center cursor-pointer hover:text-white hover:bg-black"
      />
    </form>
  );
};
