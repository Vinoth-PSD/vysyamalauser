import { useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";


export const ChangePassword = () => {

    // Toggle to show password
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <h2 className="text-[30px] text-vysyamalaBlack font-bold mb-5">Change Password</h2>

            <div>
                <div className="grid grid-rows-1 grid-cols-2">
                    <div>
                        {/* Old Password */}
                        <div className="mb-5">
                            <div className="relative">
                                <label htmlFor="oldPassword" className="font-semibold">Enter Old Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="oldPassword"
                                    name="oldPassword"
                                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                                    placeholder="Enter Old Password"
                                // {...register("password", { required: true })}
                                />
                                <div onClick={handleShowPassword} className="absolute top-9 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </div>
                            </div>
                            {/* {errors.password && <span className="text-red-500">{errors.password.message}</span>} */}
                        </div>

                        {/* New Password */}
                        <div className="mb-5">
                            <div className="relative">
                                <label htmlFor="newPassword" className="font-semibold">Enter New Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                                    placeholder="Enter New Password"
                                // {...register("password", { required: true })}
                                />
                                <div onClick={handleShowPassword} className="absolute top-9 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </div>
                            </div>
                            {/* {errors.password && <span className="text-red-500">{errors.password.message}</span>} */}
                        </div>

                        {/* Confirm New Password */}
                        <div className="mb-5">
                            <div className="relative">
                                <label htmlFor="newPassword" className="font-semibold">Confirm New Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    className="w-full px-3 py-2 text-ash border-[1px] border-footer-text-gray rounded-[4px] focus-visible:outline-none"
                                    placeholder="Confirm New Password"
                                // {...register("password", { required: true })}
                                />
                                <div onClick={handleShowPassword} className="absolute top-9 right-0 pr-3 flex items-center text-ash text-[18px] cursor-pointer">
                                    {showPassword ? <IoEyeOff /> : <IoEye />}
                                </div>
                            </div>
                            {/* {errors.password && <span className="text-red-500">{errors.password.message}</span>} */}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end items-center space-x-5">
                            <button className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer">
                                Cancel
                            </button>
                            <button className="bg-white text-main flex items-center rounded-lg font-semibold border-2 px-5 py-2.5 cursor-pointer">
                                Change Password </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
