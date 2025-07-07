import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface CustomMessagePopupProps {
  setOpenCustomMsgShow: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCustomMsg: (value: string) => void;
  setSelect: (value: string) => void;
  custom_message: string | null;
}

const CustomMessagePopup: React.FC<CustomMessagePopupProps> = ({
  setOpenCustomMsgShow,
  setOpenCustomMsg,
  setSelect,
  custom_message,
}) => {
  const [message, setMessage] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  const handleSend = () => {
    setOpenCustomMsg(message);
    ////console.log("Message sent:", message);
    setOpenCustomMsgShow(false);
    setSelect(selectValue);
  };

  const handleCancel = () => {
    setOpenCustomMsgShow(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };
  // const clearSelectValue = () => {
  //   setSelectValue("");
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-1/3 rounded-lg container mx-auto">
        <div className="rounded-lg">
          <div className="bg-secondary rounded-t-lg flex justify-between items-center px-3 py-2 mb-2">
            <h4 className="text-[24px] text-white font-semibold">
              Enter your Interest Message
            </h4>
            <IoClose
              onClick={handleCancel}
              className="text-[22px] text-white cursor-pointer"
            />
          </div>

          <div>
            {/* Input Field */}
            <form>
              <div className="px-3 py-3">
                {!selectValue && custom_message !== "0" && (
                  <div>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full bg-gray rounded-lg px-3 py-3 focus:outline-none"
                      placeholder="Enter your interest message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                )}

                <div className="">
                  {message.length <= 0 && (
                    <div>
                      <select
                        onChange={handleChange}
                        name=""
                        id=""
                        className="w-full px-2 py-2 border-[1px] border-primary rounded-md focus-within:outline-none"
                      >
                        <option value="" selected disabled>
                          Select a category
                        </option>
                        <option value="Horscope matched and I would love to know more about you.">
                          Horscope matched and I would love to know more about
                          you.
                        </option>
                        <option value="I am interested in knowing more about you">
                          I am interested in knowing more about you
                        </option>
                        <option value="It seems our stars align. I'm eager to get to know you better">
                          {" "}
                          It seems our stars align. I'm eager to get to know you
                          better
                        </option>
                      </select>
                    </div>
                  )}

                  {/* {selectValue && (
                                        <button
                                            type="button"
                                            onClick={clearSelectValue}
                                            className="text-[22px] text-vysyamalaBlack cursor-pointer"
                                        >
                                            <IoClose />
                                        </button>
                                    )} */}
                </div>
              </div>
            </form>

            <div className="flex justify-end items-center space-x-5 mx-3 mb-4">
              <button
                type="button"
                onClick={handleCancel}
                className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSend}
                className="bg-gradient text-white flex items-center rounded-lg font-semibold border-2 px-5 py-2 cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMessagePopup;
