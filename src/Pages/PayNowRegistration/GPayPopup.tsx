import React from "react";
import { IoClose } from "react-icons/io5";
import QRCodeImage from "../../assets/images/GPayQRcode.jpeg";

interface GPayPopupProps {
  isOpen: boolean;
  onClose: () => void;
 // onConfirm: () => void;
}

export const GPayPopup: React.FC<GPayPopupProps> = ({
  isOpen,
  onClose,
 // onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 md:p-6 rounded-lg w-[90%] max-w-[460px] h-auto relative">
        <div className="flex justify-between">
        <h3 className="text-xl font-semibold mb-4"> GPay Payment</h3>
        <IoClose onClick={onClose} className="text-[18px] mr- text-primary cursor-pointer " />
            </div>

       {/* QR Code */}
       <div className="flex justify-center mb-4">
          <img
            src={QRCodeImage}
            alt="GPay QR Code"
            className="w-full h-90 "
          />
        </div>
        {/* <p className="mb-6">You will be redirected to GPay to complete your payment of ₹{100}</p>
         */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gradient text-white flex items-center rounded-lg font-semibold border-2 px-5 py-2 cursor-pointer"
          >
            Cancel
          </button>
          {/* <button88
           // onClick={onConfirm}
            className="px-4 py-2 bg-main text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button> */}
        </div>
      </div>
    </div>
  );
};