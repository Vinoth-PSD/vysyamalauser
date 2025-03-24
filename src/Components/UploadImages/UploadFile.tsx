import React from "react";
import uploadImg from "../../assets/icons/upload.png";
// import { RefObject } from "react";

interface UploadFileProps {
  heading: string;
  desc: string;
  name: string;
  size?:number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  multiple?: boolean; // Make sure multiple is optional
}

const UploadFile: React.FC<UploadFileProps> = ({
  heading,
  desc,
  name,
  onChange,
  // onClick,
  multiple, // Include multiple in props
}) => {
  // Function to trigger file input click
  const handleButtonClick = () => {
    const input = document.getElementById(name) as HTMLInputElement | null;
    if (input) {
      input.click(); // Programmatically click the input element
    }
  };


 
  
  

  return (
    <div className="mb-10">
      <label htmlFor={name} className="hover:cursor-pointer">
        <div className="bg-gray p-8 flex justify-between items-center space-x-5 border border-dashed border-primary rounded-lg max-sm:flex-col max-sm:items-start max-sm:space-x-0 max-sm:px-4 max-sm:py-6 max-sm:gap-y-4">
          <div>
            <img src={uploadImg} alt="Upload Images" className="w-12" />
          </div>
          <div className="flex-1">
            <h1 className="text-ash text-lg font-semibold pb-1">{heading}</h1>
            <p className="text-ashSecondary text-xs font-normal">{desc}</p>
            
          </div>

          <div>
            <input
              type="file"
              name={name}
              id={name}
              className="hidden"
              onChange={onChange}
              multiple={multiple} // Pass multiple to input element if defined
            />
          </div>
          <button
            onClick={handleButtonClick} // Call function to trigger file input click
            className="px-4 py-2.5 text-ash text-sm font-normal rounded-md border border-ash"
          >
            Select a file
          </button>
        </div>
      </label>
    </div>
  );
};

export default UploadFile;
