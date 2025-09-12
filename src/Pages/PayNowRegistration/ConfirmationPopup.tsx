import React from "react";
import { IoClose } from "react-icons/io5";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  ///onConfirm: () => void;
  message: string;
  heading: string;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isOpen,
  onClose,
  //onConfirm,
  message,
  heading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:p-6 rounded-lg w-[90%] max-w-md h-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{heading}</h3>
          <IoClose 
            onClick={onClose} 
            className="text-2xl text-primary cursor-pointer" 
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="flex justify-end">
          <button
             onClick={onClose} 
            className="bg-gradient text-white font-semibold py-2 px-5 rounded-lg"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};