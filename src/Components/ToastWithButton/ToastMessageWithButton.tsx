
import { toast } from "react-toastify";

export const ButtonErrorToast = (
  navigate: (path: string) => void,
  message: string,
  buttonText: string,
  buttonLink: string
) => {
  toast.error(
    <div>
      {message}
      <button
        onClick={() => navigate(buttonLink)}
        style={{
          marginLeft: "8px",
         // color: "#007bff",
         color: "#FF6666",
          background: "none",
          border:"none",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};
