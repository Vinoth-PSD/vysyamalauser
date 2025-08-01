// import React, { useState, useEffect, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { RiDraggable } from "react-icons/ri";
// import { AiOutlineClose } from "react-icons/ai";
// import apiClient from "../../API";


// interface RasiGridProps {
//   centerLabel: string;
//   rasiTemp: any
// }

// interface Label {
//   id: number;
//   name: string;
// }

// const RasiGrid: React.FC<RasiGridProps> = ({ centerLabel, rasiTemp }) => {
//   const initialLabels: Label[] = useMemo(
//     () => [
//       // { id: 8, name: "Raghu/Rahu" },
//       // { id: 3, name: "Mars/Chevai" },
//       // { id: 5, name: "Jupiter/Guru" },
//       // { id: 4, name: "Mercury/Budhan" },
//       // { id: 7, name: "Saturn/Sani" },
//       // { id: 10, name: "Lagnam" },
//       // { id: 1, name: "Sun/Suriyan" },
//       // { id: 6, name: "Venus/Sukran" },
//       // { id: 2, name: "Moon/Chandran" },
//       // { id: 9, name: "Kethu/Ketu" },
//       { id: 1, name: "Sun/Suriyan" },
//       { id: 2, name: "Moon/Chandran" },
//       { id: 3, name: "Raghu/Rahu" },
//       { id: 4, name: "Kethu/Ketu" },
//       { id: 5, name: "Mars/Chevai" },
//       { id: 6, name: "Venus/Sukran" },
//       { id: 7, name: "Jupiter/Guru" },
//       { id: 8, name: "Mercury/Budhan" },
//       { id: 8, name: "Raghu/Rahu" },
//       { id: 9, name: "Saturn/Sani" },
//       { id: 10, name: "Lagnam" },
//     ],
//     []
//   );

//   const [labels, setLabels] = useState<Label[]>(initialLabels);
//   const [rasiContents, setRasiContents] = useState<string[][]>(
//     Array(12).fill([])
//   );
//   const location = useLocation();




//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const profileId = localStorage.getItem("profile_id_new") || localStorage.getItem("loginuser_profile_id");
//       if (profileId) {
//         try {
//           const requestData = { profile_id: profileId, page_id: 5 };
//           const response = await apiClient.post(`/auth/Get_save_details/`, requestData, { headers: { "Content-Type": "application/json" } });

//           const profileData = response.data.data;
//           sessionStorage.setItem("formattedDatarasi", profileData.rasi_kattam);

//           const formattedDatarasival = sessionStorage.getItem("formattedDatarasi");
//           if (formattedDatarasival) {
//             const data = formattedDatarasival
//               .slice(1, -1)
//               .split(", ")
//               .map((grid) => {
//                 const match = grid.match(/Grid \d+: (.+)/);
//                 return match ? match[1].split(",").map((id) => parseInt(id, 10)) : [];
//               });

//             const newRasiContents = data.map((ids) => ids.map((id) => initialLabels.find((label) => label.id === id)?.name).filter(Boolean) as string[]);
//             setRasiContents(newRasiContents);

//             const usedIds = data.flat();
//             setLabels((prevLabels) => prevLabels.filter((label) => !usedIds.includes(label.id)));
//           }
//         } catch (error) {
//           console.error("Error fetching profile data:", error);
//         }
//       }
//     };

//     fetchProfileData();
//   }, [location, initialLabels]);

//   const handleDragStart = (
//     e: React.DragEvent<HTMLDivElement>,
//     label: Label
//   ) => {
//     e.dataTransfer.setData("labelId", label.id.toString());
//     e.dataTransfer.setData("source", "rasi");
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDropRasiBox = (
//     e: React.DragEvent<HTMLDivElement>,
//     index: number
//   ) => {
//     e.preventDefault();
//     const draggedLabelId = e.dataTransfer.getData("labelId");
//     const source = e.dataTransfer.getData("source");

//     if (source === "rasi" && draggedLabelId) {
//       const draggedLabel = labels.find(
//         (label) => label.id === parseInt(draggedLabelId, 10)
//       );
//       if (
//         draggedLabel &&
//         !rasiContents[index].includes(draggedLabel.name) &&
//         rasiContents[index].length < 6
//       ) {
//         const newContents = [...rasiContents];
//         newContents[index] = [...newContents[index], draggedLabel.name];
//         setRasiContents(newContents);

//         setLabels((prevLabels) =>
//           prevLabels.filter((label) => label.id !== draggedLabel.id)
//         );
//       }
//     }
//   };

//   const handleRemoveLabel = (index: number, labelIndex: number) => {
//     // Create a copy of the current rasiContents state
//     const newContents = [...rasiContents];
//     const removedLabel = newContents[index][labelIndex];

//     // Remove the label from the copied state
//     newContents[index].splice(labelIndex, 1);
//     setRasiContents(newContents);

//     // Find the removed label object from the initialLabels
//     const removedLabelObj = initialLabels.find(
//       (label) => label.name === removedLabel
//     );

//     // If the removed label object is found
//     if (removedLabelObj) {
//       setLabels((prevLabels) => {
//         // Check if the label already exists in the state
//         if (prevLabels.some((label) => label.name === removedLabel)) {
//           return prevLabels; // Return the current state if label is already present
//         }
//         // Add the label to the state if it's not already present
//         return [...prevLabels, removedLabelObj];
//       });
//     }

//     // Clear the session variable 'formattedDatarasi'
//     // sessionStorage.removeItem('formattedDatarasi');
//   };


//   const formatGridData = () => {
//     const formattedData = rasiContents
//       .map((contents, index) => {
//         const boxNumber = index + 1;
//         const ids = contents
//           .map((label) => initialLabels.find((l) => l.name === label)?.id)
//           .filter((id) => id !== undefined);
//         return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
//       })
//       .join(", ");
//     console.log(formattedData, "llllllllllllll")
//     return `{${formattedData}}`;
//   };

//   useEffect(() => {
//     const formattedData = formatGridData();
//     //console.log("Rasi Contents:");
//     console.log(formattedData);

//     // Store formattedData in sessionStorage
//     sessionStorage.setItem("formattedData", JSON.stringify(formattedData));
//   }, [rasiContents]);

//   return (
//     <div className="flex  justify-start items-start bg-gray-200 space-x-2 my-10  max-lg:space-x-10  max-md:hidden">
//       <div className="flex flex-col gap-2   max-lg:justify-between max-lg:gap-2 max-lg:mb-6
//       max-md:grid-cols-4 max-md:items-center max-md:justify-between max-md:gap-2 max-md:mb-6 max-sm:grid-cols-2">
//         {rasiTemp !== "1" && labels.map((label, index) => (
//           <div
//             key={index}
//             draggable
//             onDragStart={(e) => handleDragStart(e, label)}
//             className="flex items-center  bg-yellow-200 text-xs px-2 py-2 rounded text-center hover:cursor-grab 2xl:text-[12px] 2xl:px-1 max-2xl:text-[10px]"
//           >
//             <RiDraggable className="mr-2 2xl:mr-1" />
//             {label.name}
//           </div>
//         ))}

//       </div>

//       <div className="">
//         <div className="grid grid-cols-4 gap-2">
//           {[
//             { row: 1, col: 1 },
//             { row: 1, col: 2 },
//             { row: 1, col: 3 },
//             { row: 1, col: 4 },
//             { row: 2, col: 4 },
//             { row: 3, col: 4 },
//             { row: 4, col: 4 },
//             { row: 4, col: 3 },
//             { row: 4, col: 2 },
//             { row: 4, col: 1 },
//             { row: 3, col: 1 },
//             { row: 2, col: 1 },
//           ].map((pos, index) => (
//             <div
//               key={index}
//               style={{ gridRow: pos.row, gridColumn: pos.col }}
//               onDrop={(e) => handleDropRasiBox(e, index)}
//               onDragOver={handleDragOver}
//               className="relative w-28 h-28 rasi-box message-box rounded bg-yellow-100  border border-yellow-400 flex flex-col items-start justify-center space-y-2
//               2xl:w-28 2xl:h-28
//               max-2xl:w-[92px] max-2xl:h-[92px]
//                max-xl:w-[100px] max-xl:h-[100px]
//                 max-lg:w-[120px] max-lg:h-[120px]
//                  max-md:h-36 max-md:w-36
//                  max-sm:h-16 max-sm:w-16
//                  "
//             >
//               {rasiContents[index].map((label: string, labelIndex: number) => (
//                 <div
//                   key={labelIndex}
//                   className="w-24 h-auto mx-auto relative bg-white text-[9px] px-1 py-1 my-1  text-center flex items-center justify-between max-2xl:w-[80px]"
//                 >
//                   <span className="truncate w-[70px] block leading-tight">{label}</span>
//                   <AiOutlineClose
//                     className="cursor-pointer"
//                     onClick={() => handleRemoveLabel(index, labelIndex)}
//                   />
//                 </div>
//               ))}
//               {/* <div className="absolute top-0 left-0 m-1 text-xs font-bold text-gray-500">
//                 {index + 1}
//               </div> */}
//             </div>
//           ))}

//           <div className="row-start-2  col-start-2 col-end-4 row-end-4 rounded font-semibold border border-white bg-white flex justify-center items-center">
//             {centerLabel}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RasiGrid;

import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import apiClient from "../../API";

interface RasiGridProps {
  centerLabel: string;
  rasiTemp: any;
}

interface Label {
  id: number;
  name: string;
}

const RasiGrid: React.FC<RasiGridProps> = ({ centerLabel, rasiTemp }) => {
  const initialLabels: Label[] = useMemo(
    () => [
      { id: 1, name: "Sun/Suriyan" },
      { id: 2, name: "Moon/Chandran" },
      { id: 3, name: "Raghu/Rahu" },
      { id: 4, name: "Kethu/Ketu" },
      { id: 5, name: "Mars/Chevai" },
      { id: 6, name: "Venus/Sukran" },
      { id: 7, name: "Jupiter/Guru" },
      { id: 8, name: "Mercury/Budhan" },
      { id: 9, name: "Saturn/Sani" },
      { id: 10, name: "Lagnam" },
    ],
    []
  );

  // Initialize rasiContents with 12 empty arrays
  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [rasiContents, setRasiContents] = useState<string[][]>(
    Array.from({ length: 12 }, () => [])
  );
  const location = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileId = localStorage.getItem("profile_id_new") || 
                        localStorage.getItem("loginuser_profile_id");
      if (profileId) {
        try {
          const requestData = { 
            profile_id: profileId, 
            page_id: 5 
          };
          const response = await apiClient.post(
            `/auth/Get_save_details/`, 
            requestData, 
            { 
              headers: { 
                "Content-Type": "application/json" 
              } 
            }
          );

          const profileData = response.data.data;
          if (profileData?.rasi_kattam) {
            sessionStorage.setItem("formattedDatarasi", profileData.rasi_kattam);
            const formattedDatarasival = sessionStorage.getItem("formattedDatarasi");
            
            if (formattedDatarasival) {
              try {
                const data = formattedDatarasival
                  .slice(1, -1)
                  .split(", ")
                  .map((grid) => {
                    const match = grid.match(/Grid \d+: (.+)/);
                    return match ? 
                      match[1].split(",")
                        .map((id) => parseInt(id, 10))
                        .filter(id => !isNaN(id)) : 
                      [];
                  });

                const newRasiContents = data.map((ids) => 
                  ids.map((id) => 
                    initialLabels.find((label) => label.id === id)?.name
                  ).filter(Boolean) as string[]
                );
                
                // Ensure we have exactly 12 grids
                while (newRasiContents.length < 12) {
                  newRasiContents.push([]);
                }
                
                setRasiContents(newRasiContents.slice(0, 12));

                const usedIds = data.flat();
                setLabels(prevLabels => 
                  prevLabels.filter((label) => !usedIds.includes(label.id))
                );
              } catch (error) {
                console.error("Error parsing rasi data:", error);
                // Fallback to empty state if parsing fails
                setRasiContents(Array.from({ length: 12 }, () => []));
                setLabels(initialLabels);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          // Fallback to empty state if API call fails
          setRasiContents(Array.from({ length: 12 }, () => []));
          setLabels(initialLabels);
        }
      }
    };

    fetchProfileData();
  }, [location, initialLabels]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, label: Label) => {
    e.dataTransfer.setData("labelId", label.id.toString());
    e.dataTransfer.setData("source", "rasi");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropRasiBox = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData("labelId");
    const source = e.dataTransfer.getData("source");

    if (source === "rasi" && draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId, 10)
      );
      
      if (draggedLabel && 
          !rasiContents[index].includes(draggedLabel.name) && 
          rasiContents[index].length < 6) {
        const newContents = [...rasiContents];
        newContents[index] = [...newContents[index], draggedLabel.name];
        setRasiContents(newContents);

        setLabels(prevLabels =>
          prevLabels.filter((label) => label.id !== draggedLabel.id)
        );
      }
    }
  };

  const handleRemoveLabel = (index: number, labelIndex: number) => {
    const newContents = [...rasiContents];
    const [removedLabel] = newContents[index].splice(labelIndex, 1);
    setRasiContents(newContents);

    const removedLabelObj = initialLabels.find(
      (label) => label.name === removedLabel
    );

    if (removedLabelObj && 
        !newContents.flat().includes(removedLabel) && 
        !labels.some(label => label.id === removedLabelObj.id)) {
      setLabels(prevLabels => [...prevLabels, removedLabelObj]);
    }
  };

  const formatGridData = () => {
    const formattedData = rasiContents
      .map((contents, index) => {
        const boxNumber = index + 1;
        const ids = contents
          .map((label) => initialLabels.find((l) => l.name === label)?.id)
          .filter((id): id is number => id !== undefined);
        return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
      })
      .join(", ");
    return `{${formattedData}}`;
  };

  useEffect(() => {
    const formattedData = formatGridData();
    sessionStorage.setItem("formattedData", JSON.stringify(formattedData));
  }, [rasiContents]);

  return (
    <div className="flex justify-start items-start bg-gray-200 space-x-2 my-10 max-lg:space-x-10 max-md:hidden">
      <div className="flex flex-col gap-2 max-lg:justify-between max-lg:gap-2 max-lg:mb-6 max-md:grid-cols-4 max-md:items-center max-md:justify-between max-md:gap-2 max-md:mb-6 max-sm:grid-cols-2">
        {rasiTemp !== "1" && labels.map((label, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, label)}
            className="flex items-center bg-yellow-200 text-xs px-2 py-2 rounded text-center hover:cursor-grab 2xl:text-[12px] 2xl:px-1 max-2xl:text-[10px]"
          >
            <RiDraggable className="mr-2 2xl:mr-1" />
            {label.name}
          </div>
        ))}
      </div>

      <div className="">
        <div className="grid grid-cols-4 gap-2">
          {[
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 2, col: 4 },
            { row: 3, col: 4 },
            { row: 4, col: 4 },
            { row: 4, col: 3 },
            { row: 4, col: 2 },
            { row: 4, col: 1 },
            { row: 3, col: 1 },
            { row: 2, col: 1 },
          ].map((pos, index) => (
            <div
              key={index}
              style={{ gridRow: pos.row, gridColumn: pos.col }}
              onDrop={(e) => handleDropRasiBox(e, index)}
              onDragOver={handleDragOver}
              className="relative w-28 h-28 rasi-box message-box rounded bg-yellow-100 border border-yellow-400 flex flex-col items-start justify-center space-y-2 2xl:w-28 2xl:h-28 max-2xl:w-[92px] max-2xl:h-[92px] max-xl:w-[100px] max-xl:h-[100px] max-lg:w-[120px] max-lg:h-[120px] max-md:h-36 max-md:w-36 max-sm:h-16 max-sm:w-16"
            >
              {rasiContents[index]?.map((label: string, labelIndex: number) => (
                <div
                  key={labelIndex}
                  className="w-24 h-auto mx-auto relative bg-white text-[9px] px-1 py-1 my-1 text-center flex items-center justify-between max-2xl:w-[80px]"
                >
                  <span className="truncate w-[70px] block leading-tight">{label}</span>
                  <AiOutlineClose
                    className="cursor-pointer"
                    onClick={() => handleRemoveLabel(index, labelIndex)}
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="row-start-2 col-start-2 col-end-4 row-end-4 rounded font-semibold border border-white bg-white flex justify-center items-center">
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RasiGrid;
