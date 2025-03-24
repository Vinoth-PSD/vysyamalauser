import InputField from "../../../../Components/RegistrationForm/InputField";
// import { HiOutlineSearch } from "react-icons/hi";
import { IoClose } from "react-icons/io5";


interface AdvancedSearchPopupProps {
    closePopup: () => void;
}

export const AdvancedSearchPopup: React.FC<AdvancedSearchPopupProps> = ({ closePopup }) => {

    const handleFindMatch = () => {
        // Perform the "Find Match" logic here
        closePopup(); // Close the popup
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="container mx-auto">
                <div className="w-8/12 mx-auto rounded-lg px-5 py-5 bg-white shadow-lg ">
                    <div>

                        {/* <div className="relative flex justify-center items-center rounded-lg p-1 border-2 border-footer-text-gray">
    <input type="text" name="" id="" placeholder="Search by Profile ID" className="w-full px-10 focus-visible:outline-none" />
    <HiOutlineSearch className="absolute left-3 top-4 text-[22px] text-ashSecondary" />

    <button className="w-fit bg-gradient text-white rounded-r-[6px] font-semibold px-8 py-3">Search</button>
</div> */}

                        {/* <hr className="text-footer-text-gray mt-10 mb-5" /> */}

                        <div className="flex justify-between items-center mb-5">
                            <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold">Advanced Search</h4>
                            <IoClose onClick={handleFindMatch} className="text-[22px] text-vysyamalaBlackSecondary cursor-pointer" />
                        </div>

                        <div className="pr-5 h-[40rem] overflow-y-scroll">
                            <form action="" method="post" className="space-y-5">
                                {/* Age & Height */}
                                <div className="flex justify-between items-center">
                                    {/* Age */}
                                    <div>
                                        <label htmlFor="age" className="text-secondary font-semibold">Age</label>
                                        <div className="flex justify-between items-center space-x-5 mt-2">
                                            <div>
                                                <input type="text" id="age" name="age" placeholder="From" className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
                                            </div>
                                            <div>
                                                <input type="text" placeholder="To" className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Height */}
                                    <div>
                                        <label htmlFor="height" className="text-secondary font-semibold">Height</label>
                                        <div className="flex justify-between items-center space-x-5 mt-2">
                                            <div>
                                                <input type="text" id="height" name="height" placeholder="From" className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
                                            </div>
                                            <div>
                                                <input type="text" placeholder="To" className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Marital Status */}
                                <div>
                                    <h5 className="text-[18px] text-secondary font-semibold mb-2">
                                        Marital Status
                                    </h5>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="neverMarried"
                                                value="neverMarried"
                                            // {...register("maritalStatus")}
                                            />
                                            <label htmlFor="neverMarried" className="pl-1">
                                                Never Married
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="married"
                                                value="married"
                                            // {...register("maritalStatus")}
                                            />
                                            <label htmlFor="married" className="pl-1">
                                                Married
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="divorced"
                                                value="divorced"
                                            // {...register("maritalStatus")}
                                            />
                                            <label htmlFor="divorced" className="pl-1">
                                                Divorced
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="seperated"
                                                value="seperated"
                                            // {...register("maritalStatus")}
                                            />
                                            <label htmlFor="seperated" className="pl-1">
                                                Seperated
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="widow"
                                                value="widow"
                                            // {...register("maritalStatus")}
                                            />
                                            <label htmlFor="widow" className="pl-1">
                                                Widow / Widower
                                            </label>
                                        </div>
                                    </div>
                                    {/* {errors.maritalStatus && (
<span className="text-red-500">{errors.maritalStatus.message}</span>
)} */}
                                </div>

                                {/* Profession */}
                                <div>
                                    <h5 className="text-[18px] text-secondary font-semibold mb-2">
                                        Profession
                                    </h5>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="employed"
                                                value="employed"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="employed" className="pl-1">
                                                Employed
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="business"
                                                value="business"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="business" className="pl-1">
                                                Business
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="student"
                                                value="student"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="student" className="pl-1">
                                                Student
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="notWorking"
                                                value="notWorking"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="notWorking" className="pl-1">
                                                Not Working
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="notMentioned"
                                                value="notMentioned"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="notMentioned" className="pl-1">
                                                Not Mentioned
                                            </label>
                                        </div>
                                    </div>
                                    {/* {errors.profession && (
<span className="text-red-500">{errors.profession.message}</span>
)} */}
                                </div>

                                {/* Education */}
                                <InputField label={"Education"} name={"education"} />

                                {/* Annual Income */}
                                <InputField label={"Income"} name={"income"} />

                                {/* Dhosam */}
                                <div>
                                    <h5 className="text-[18px] text-secondary font-semibold mb-2">
                                        Dhosam
                                    </h5>

                                    <div className="w-1/4 flex justify-between items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="chevvai"
                                                value="chevvai"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="chevvai" className="pl-1">
                                                Chevvai
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="rehu"
                                                value="rehu"
                                            // {...register("profession")}
                                            />
                                            <label htmlFor="rehu" className="pl-1">
                                                Rehu / Ketu
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Birth Star */}
                                <div>
                                    <label htmlFor="birthStar" className="block mb-1">
                                        Birth Star
                                    </label>
                                    <select
                                        id="birthStar"
                                        className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                                    // {...register("birthStar")}
                                    >
                                        <option value="" selected disabled>
                                            -- Select your Birth Star --
                                        </option>
                                        {/* {birthStar.map((option) => (
<option key={option.birth_id} value={option.birth_id}>
{option.birth_star}
</option>
))} */}
                                    </select>
                                </div>

                                {/* Native State */}
                                <div>
                                    <h5 className="text-[18px] text-primary font-semibold mb-2">
                                        Native State
                                    </h5>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="tamilNadu"
                                                name="tamilNadu"
                                                value="tamilNadu"
                                            />
                                            <label htmlFor="tamilNadu" className="pl-1">
                                                TamilNadu and Pondhicherry
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="karnataka"
                                                name="karnataka"
                                                value="karnataka"
                                            />
                                            <label htmlFor="karnataka" className="pl-1">
                                                Karnataka
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="andhraPradesh"
                                                name="andhraPradesh"
                                                value="andhraPradesh"
                                            />
                                            <label htmlFor="andhraPradesh" className="pl-1">
                                                Andhra Pradesh
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="telangana"
                                                name="telangana"
                                                value="telangana"
                                            />
                                            <label htmlFor="telangana" className="pl-1">
                                                Telangana
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="kerala"
                                                name="kerala"
                                                value="kerala" />
                                            <label htmlFor="kerala" className="pl-1">
                                                Kerala
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="checkbox"
                                                id="others"
                                                name="others"
                                                value="others" />
                                            <label htmlFor="others" className="pl-1">
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Work Location */}
                                <InputField label={"Work Location"} name={"workLocation"} />

                                {/* Profile Photo */}
                                <div>
                                    <h5 className="text-[18px] text-primary font-semibold mb-2">
                                        Profile Photo
                                    </h5>
                                    <input type="checkbox"
                                        id="profilePhoto"
                                        value="profilePhoto"
                                    // {...register("profilePhoto")} 
                                    />
                                    <label htmlFor="profilePhoto" className="pl-1">
                                        People only with photo
                                    </label>
                                </div>


                                {/* Buttons */}
                                <div className="flex justify-end space-x-4">
                                    <button onClick={handleFindMatch} className="py-[10px] px-14 bg-white text-main font-semibold  rounded-[6px] mt-2">Cancel</button>
                                    <button  type="submit" className="flex items-center py-[10px] px-14 bg-gradient text-white rounded-[6px] mt-2">Find Match</button>
                                </div>



                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
