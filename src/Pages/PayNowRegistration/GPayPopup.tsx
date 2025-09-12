import React from "react";
import { IoClose } from "react-icons/io5";
import QRCodeImage from "../../assets/images/GPayQRcode.jpeg";

interface GPayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const GPayPopup: React.FC<GPayPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  // const [showMessage, setShowMessage] = useState(false);


  if (!isOpen) return null;

  // useEffect(() => {
  //   if (!isOpen) {
  //     setShowMessage(false); // Reset when popup is closed
  //   }
  // }, [isOpen]);

  // const handleSubmit = () => {
  //   setShowMessage(true);
  //   toast.success("Payment paided successfully")
  // };

  const handleSubmit = async () => {

    try {
      // setShowMessage(true);
      console.log("Payment Paided successfully");
      await onConfirm(); // Call the save function
    } catch (error) {
      console.error("Confirmation failed:", error);
    }
  };

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
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-gradient text-white flex items-center rounded-lg font-semibold border-2 px-5 py-2 cursor-pointer"
          >
            Submit
          </button>

          {/* {showMessage && (
            <p className="text-sm font-semibold mt-2 text-right">
              Send the payment screenshot to the mentioned WhatsApp number.
              We will verify your profile and share it with you.
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};