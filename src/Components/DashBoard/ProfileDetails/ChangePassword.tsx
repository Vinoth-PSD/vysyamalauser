import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { z } from 'zod';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import apiClient from '../../../API';

// Define the schema
const schema = z.object({
  oldPassword: z.string().min(6, 'Old password is required'),
  newPassword: z.string().min(6, 'New password is required'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New password and confirmation must match",
  path: ["confirmPassword"],
});

export const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const loginuser_profileId = sessionStorage.getItem('loginuser_profile_id');

  const onSubmit = async (data: any) => {
    try {
      const response = await apiClient.post('/auth/User_change_password/', {
        ProfileId: loginuser_profileId,
        old_password: data.oldPassword,
        new_password: data.newPassword,
        Re_enter_new_password: data.confirmPassword,
      });

      if (response.data.status === 'error') {
        setErrorMessage(response.data.message);
        setSuccessMessage(null); // Clear success message if any
      } else {
        // Handle successful password change
        console.log('Password changed successfully');
        setSuccessMessage('Password changed successfully.');
        setErrorMessage(null); // Clear error message if any
      }
    } catch (error) {
      // Handle API errors
      console.error('Error changing password:', error);
      setErrorMessage('An error occurred while changing the password.');
      setSuccessMessage(null); // Clear success message if any
    }
  };

  return (
    <div>
      <h2 className="flex items-center text-[30px] text-vysyamalaBlack font-bold mb-5  max-xl:text-[26px] max-md:text-[24px] max-sm:text-[18px] max-sm:justify-between max-sm:mb-2 ">
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Old Password */}
          <div className="mb-5">
            <div className="w-[400px]  max-sm:w-full">
              <label htmlFor="oldPassword" className="font-semibold mb-2 block max-sm:font-normal ">Enter Old Password</label>
              <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                {...register("oldPassword")}
                className="w-full px-3 py-2 text-black placeholder:text-placeHolderColor border-[1px] bg-footer-text-gray border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                placeholder="Enter Old Password"
              />
              <div onClick={() => setShowOldPassword(!showOldPassword)} className="absolute top-3 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                {showOldPassword ? <IoEyeOff /> : <IoEye />}
              </div>
              </div>
              {errors.oldPassword && <span className="text-red-500">{String(errors.oldPassword.message)}</span>}

            </div>
          </div>

          {/* New Password */}
          <div className="mb-5">
            <div className="w-[400px]  max-sm:w-full">
              <label htmlFor="newPassword" className="font-semibold mb-2 block max-sm:font-normal ">Enter New Password</label>
              <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword")}
                className="w-full px-3 py-2 text-black placeholder:text-placeHolderColor bg-footer-text-gray border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                placeholder="Enter New Password"
              />
              <div onClick={() => setShowNewPassword(!showNewPassword)} className="absolute top-3 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                {showNewPassword ? <IoEyeOff /> : <IoEye />}
              </div>
              </div>
              {errors.newPassword && <span className="text-red-500">{String(errors.newPassword.message)}</span>}

            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-5">
            <div className="w-[400px]  max-sm:w-full">
              <label htmlFor="confirmPassword" className="font-semibold mb-2 block max-sm:font-normal ">Confirm New Password</label>
              <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword")}
                className="w-full px-3 py-2 text-black placeholder:text-placeHolderColor bg-footer-text-gray border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                placeholder="Confirm New Password"
              />
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-3 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
              </div>
              </div>
              {errors.confirmPassword && <span className="text-red-500">{String(errors.confirmPassword.message)}</span>}

            </div>
          </div>

          {/* Success Message */}
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

          {/* Error Message */}
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

          {/* Buttons */}
          <div className="flex justify-end items-center space-x-5 max-sm:flex-wrap-reverse max-sm:justify-center">
            <button type="button" className="text-main flex items-center rounded-lg font-semibold mb-2 px-5 py-2.5 cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="bg-white text-main flex items-center rounded-lg font-semibold mb-2 border-2 px-5 py-2.5 cursor-pointer">
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
