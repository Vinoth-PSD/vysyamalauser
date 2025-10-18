import React, { useState, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface PaginationProps {
  toptalPages: number;
  dataPerPage: number;
  totalRecords: number;
  setPageNumber: (value: number | ((prev: number) => number)) => void;
  pageNumber: number;
}

const Pagination: React.FC<PaginationProps> = ({
  toptalPages,
  dataPerPage,
  totalRecords = 0,
  setPageNumber,
  pageNumber,
}) => {
  // const [inputValue, setInputValue] = useState(pageNumber);
  const [inputValue, setInputValue] = useState<string | number>("");

  // Sync the input field with the current page number
  useEffect(() => {
    setInputValue(pageNumber);
  }, [pageNumber]);

  if (!toptalPages || !dataPerPage || !totalRecords || !pageNumber) {
    return <div></div>;
  }

  const startResult = (pageNumber - 1) * dataPerPage + 1;
  const endResult = Math.min(pageNumber * dataPerPage, totalRecords);

  // // Handle input change and set page number immediately if valid
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newPageNumber = Number(e.target.value);
  //   setInputValue(newPageNumber);

  //   // If the new page number is valid, set it immediately
  //   if (newPageNumber >= 1 && newPageNumber <= toptalPages) {
  //     setPageNumber(newPageNumber);
  //   }
  // };


  // Handle input change and set page number immediately if valid
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  
  //   // Check if the value is a valid number
  //   if (value === "" || /^[0-9]+$/.test(value)) {
  //     const newPageNumber = Number(value);
  
  //     // Ensure the input is within the valid range of 1 to `toptalPages`
  //     if (newPageNumber >= 1 && newPageNumber <= toptalPages) {
  //       setInputValue(newPageNumber);
  //       setPageNumber(newPageNumber);
  //     } else if (newPageNumber > toptalPages) {
  //       setInputValue(toptalPages);
  //       setPageNumber(toptalPages);
  //     } else {
  //       setInputValue(value); // Keep the input value for further typing
  //     }
  //   }
  // };


  // A place to store the timer ID outside of the function, so it can be cleared
let debounceTimer: NodeJS.Timeout;

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear any existing timer
    clearTimeout(debounceTimer);

    // Check if the value is a valid number
    if (value === "" || /^[0-9]+$/.test(value)) {
        const newPageNumber = Number(value);

        // Update the input value immediately for a responsive UI
        setInputValue(value);

        // Set a new timer
        debounceTimer = setTimeout(() => {
            // Check if the new page number is valid before setting it
            if (newPageNumber >= 1 && newPageNumber <= toptalPages) {
                setPageNumber(newPageNumber);
            } else if (newPageNumber > toptalPages) {
                setPageNumber(toptalPages);
                setInputValue(toptalPages); // Also update input to reflect the change
            } else if (newPageNumber < 1) {
                // You can decide how to handle invalid numbers like 0 or negative
                setPageNumber(1);
                setInputValue(1);
            }
        }, 2000); // 2000 ms = 2 seconds
    }
};

  const handleNextClick = () => {
    if (pageNumber < toptalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 sm:px-6 mt-10 max-lg:mt-10">
      <div className="flex flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-primary max-sm:hidden">
            Showing <span className="font-medium">{startResult}</span> to{" "}
            <span className="font-medium">{endResult}</span> of{" "}
            <span className="font-medium">{totalRecords}</span> results
          </p>
        </div>
        <div className="flex items-center">
          {/* Previous Button */}
          <button
            disabled={pageNumber === 1}
            onClick={handlePreviousClick}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only ">Previous</span>
            <IoChevronBackOutline className="h-5 w-5 text-primary" aria-hidden="true" />
          </button>

          {/* Page number input field */}
          <div className="flex items-center mx-2">
            <input
              type="number"
              min="1"
              max={toptalPages}
              value={inputValue}
              onChange={handleInputChange}
               className="w-12 text-primary text-center border-b-[1px] border-gray-300"
                  // className="w-12 text-center border border-gray-300 rounded-md underline"
                  // className="w-120 text-center underline rounded-md"


            />
            <span className="ml-2 text-primary">of {toptalPages}</span>
          </div>

          {/* Next Button */}
          <button
            disabled={pageNumber === toptalPages}
            onClick={handleNextClick}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <IoChevronForwardOutline className="h-5 w-5 text-primary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

// import React, { useState, useEffect, useRef } from "react";
// import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

// interface PaginationProps {
//   toptalPages: number;
//   dataPerPage: number;
//   totalRecords: number;
//   setPageNumber: (value: number | ((prev: number) => number)) => void;
//   pageNumber: number;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   toptalPages,
//   dataPerPage,
//   totalRecords = 0,
//   setPageNumber,
//   pageNumber,
// }) => {
//   const [inputValue, setInputValue] = useState<string | number>(pageNumber);
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

//   // Sync the input field with the current page number when it changes externally
//   useEffect(() => {
//     setInputValue(pageNumber);
//   }, [pageNumber]);

//   if (!toptalPages || !dataPerPage || !totalRecords || !pageNumber) {
//     return <div></div>;
//   }

//   const startResult = (pageNumber - 1) * dataPerPage + 1;
//   const endResult = Math.min(pageNumber * dataPerPage, totalRecords);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;

//     // Clear any existing timer
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current);
//     }

//     // Allow empty input or valid numbers only
//     if (value === "" || /^[0-9]+$/.test(value)) {
//       // Update input immediately for responsive UI
//       setInputValue(value);

//       // Only set a timer if there's a value
//       if (value !== "") {
//         debounceTimerRef.current = setTimeout(() => {
//           const newPageNumber = Number(value);

//           // Validate and set page number
//           if (newPageNumber >= 1 && newPageNumber <= toptalPages) {
//             setPageNumber(newPageNumber);
//           } else if (newPageNumber > toptalPages) {
//             setPageNumber(toptalPages);
//             setInputValue(toptalPages);
//           } else if (newPageNumber < 1) {
//             setPageNumber(1);
//             setInputValue(1);
//           }
//         }, 1000); // Wait 1 second after user stops typing
//       }
//     }
//   };

//   // Handle blur event to immediately validate if user clicks away
//   const handleInputBlur = () => {
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current);
//     }

//     const value = String(inputValue);
//     if (value === "" || value === "0") {
//       setInputValue(pageNumber); // Reset to current page
//       return;
//     }

//     const newPageNumber = Number(value);
//     if (newPageNumber >= 1 && newPageNumber <= toptalPages) {
//       setPageNumber(newPageNumber);
//     } else if (newPageNumber > toptalPages) {
//       setPageNumber(toptalPages);
//       setInputValue(toptalPages);
//     } else if (newPageNumber < 1) {
//       setPageNumber(1);
//       setInputValue(1);
//     }
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current);
//       }
//       handleInputBlur(); // Trigger validation immediately
//     }
//   };

//   const handleNextClick = () => {
//     if (pageNumber < toptalPages) {
//       setPageNumber((prev) => prev + 1);
//     }
//   };

//   const handlePreviousClick = () => {
//     if (pageNumber > 1) {
//       setPageNumber((prev) => prev - 1);
//     }
//   };

//   // Cleanup timer on unmount
//   useEffect(() => {
//     return () => {
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="flex items-center justify-between rounded-md bg-white px-4 py-3 sm:px-6 mt-10 max-lg:mt-10">
//       <div className="flex flex-1 items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-700 max-sm:hidden">
//             Showing <span className="font-medium">{startResult}</span> to{" "}
//             <span className="font-medium">{endResult}</span> of{" "}
//             <span className="font-medium">{totalRecords}</span> results
//           </p>
//         </div>
//         <div className="flex items-center">
//           {/* Previous Button */}
//           <button
//             disabled={pageNumber === 1}
//             onClick={handlePreviousClick}
//             className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <span className="sr-only">Previous</span>
//             <IoChevronBackOutline className="h-5 w-5" aria-hidden="true" />
//           </button>

//           {/* Page number input field */}
//           <div className="flex items-center mx-2">
//             <input
//               type="text"
//               inputMode="numeric"
//               value={inputValue}
//               onChange={handleInputChange}
//               onBlur={handleInputBlur}
//               onKeyPress={handleKeyPress}
//               className="w-12 text-center border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-700"
//             />
//             <span className="ml-2 text-gray-700">of {toptalPages}</span>
//           </div>

//           {/* Next Button */}
//           <button
//             disabled={pageNumber === toptalPages}
//             onClick={handleNextClick}
//             className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <span className="sr-only">Next</span>
//             <IoChevronForwardOutline className="h-5 w-5" aria-hidden="true" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
