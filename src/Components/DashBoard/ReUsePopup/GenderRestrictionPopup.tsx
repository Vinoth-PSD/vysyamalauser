import { useNavigate } from "react-router-dom";

// Define the props for the new popup
interface GenderRestrictionPopupProps {
    text: string;
    // closePopup: () => void;
}

export const GenderRestrictionPopup: React.FC<GenderRestrictionPopupProps> = ({ text }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm m-4 transform transition-all">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-lg font-bold text-red-600">Access Restricted</h5>
                    {/* <button onClick={closePopup} className="text-gray-400 hover:text-gray-600">
                        <IoMdCloseCircle className="text-2xl" />
                    </button> */}
                </div>
                <p className="text-gray-700 mb-6">{text}</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => navigate("/LoginHome")}
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-150"
                    >
                        okay
                    </button>
                </div>
            </div>
        </div>
    );
};