
import { useNavigate } from "react-router-dom";

interface ReUseUpGradePopupProbs{
  closePopup: () => void;
  text:string
}


export const ReUseUpGradePopup: React.FC<ReUseUpGradePopupProbs> = ({ closePopup ,text}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 w-3/4 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upgrade Required</h3>
          
        </div>
        <p className="mb-4">
         {text}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closePopup}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/UpgradePlan")} // Ensure correct path
            className="bg-gradient text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};