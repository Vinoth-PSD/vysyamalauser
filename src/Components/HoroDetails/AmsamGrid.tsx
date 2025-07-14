import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { RiDraggable } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import apiClient from "../../API";


interface AmsamGridProps {
  centerLabel: string;
  rasiTemp: any

}

interface Label {
  id: number;
  name: string;
}

const AmsamGrid: React.FC<AmsamGridProps> = ({ centerLabel, rasiTemp }) => {
  const initialLabels: Label[] = useMemo(
    () => [
      // { id: 8, name: "Raghu/Rahu" },
      // { id: 3, name: "Mars/Chevai" },
      // { id: 5, name: "Jupiter/Guru" },
      // { id: 4, name: "Mercury/Budhan" },
      // { id: 7, name: "Saturn/Sani" },
      // { id: 10, name: "Lagnam" },
      // { id: 1, name: "Sun/Suriyan" },
      // { id: 6, name: "Venus/Sukran" },
      // { id: 2, name: "Moon/Chandran" },
      // { id: 9, name: "Kethu/Ketu" },

      { id: 1, name: "Sun/Suriyan" },
      { id: 2, name: "Moon/Chandran" },
      { id: 3, name: "Raghu/Rahu" },
      { id: 4, name: "Kethu/Ketu" },
      { id: 5, name: "Mars/Chevai" },
      { id: 6, name: "Venus/Sukran" },
      { id: 7, name: "Jupiter/Guru" },
      { id: 8, name: "Mercury/Budhan" },
      { id: 8, name: "Raghu/Rahu" },
      { id: 9, name: "Satum/Sani" },
      { id: 10, name: "Lagnam" },
    ],
    []
  );

  const [labels, setLabels] = useState<Label[]>(initialLabels);
  const [amsamContents, setAmsamContents] = useState<string[][]>(
    Array(12).fill([])
  );
  const location = useLocation();

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     const profileId =
  //       localStorage.getItem("profile_id_new") ||
  //       localStorage.getItem("loginuser_profile_id");
  //     if (profileId) {
  //       try {
  //         const requestData = {
  //           profile_id: profileId,
  //           page_id: 5,
  //         };

  //         const response = await apiClient.post(
  //           `/auth/Get_save_details/`,
  //           requestData,
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );

  //         //console.log("API Response Grid:", response.data); // Log the entire API response

  //         const profileData = response.data.data; // Access the 'data' object directly

  //         //console.log("Profile Data Grid:", profileData); // Log the profile data

  //         // //console.log("rasi:",profileData.rasi_kattam);
  //         // //console.log("amsam:",profileData.amsa_kattam);

  //         sessionStorage.setItem("formattedDatarasi", profileData.rasi_kattam);
  //         sessionStorage.setItem("formattedDatamsam", profileData.amsa_kattam);

  //         const formattedDatamsamval = sessionStorage.getItem("formattedDatamsam");
  //         if (formattedDatamsamval) {
  //           console.log(
  //             "Retrieved formattedDatamsam from sessionStorage:",
  //             formattedDatamsamval
  //           );

  //           // Parse the formatted data
  //           const data = formattedDatamsamval
  //             .slice(1, -1)
  //             .split(", ")
  //             .map((grid) => {
  //               const match = grid.match(/Grid \d+: (.+)/);
  //               return match ? match[1].split(",").map((id) => parseInt(id, 10)) : [];
  //             });

  //           // Map ids to labels and set the amsam contents
  //           const newAmsamContents = data.map((ids) => {
  //             return ids
  //               .map((id) => initialLabels.find((label) => label.id === id)?.name)
  //               .filter(Boolean) as string[];
  //           });

  //           setAmsamContents(newAmsamContents);
  //         } else {
  //           //console.log("No formattedDatamsam found in sessionStorage");
  //         }


  //       } catch (error) {
  //         console.error("Error fetching profile data:", error);
  //       }
  //     } else {
  //       console.warn("Profile ID not found in sessionStorage");
  //     }
  //   };

  //   fetchProfileData();
  // }, []);

  // useEffect(() => {
  //   const formattedDatamsamval = sessionStorage.getItem("formattedDatamsam");
  //   if (formattedDatamsamval) {
  //     console.log(
  //       "Retrieved formattedDatamsam from sessionStorage:",
  //       formattedDatamsamval
  //     );

  //     // Parse the formatted data
  //     const data = formattedDatamsamval
  //       .slice(1, -1)
  //       .split(", ")
  //       .map((grid) => {
  //         const match = grid.match(/Grid \d+: (.+)/);
  //         return match ? match[1].split(",").map((id) => parseInt(id, 10)) : [];
  //       });

  //     // Map ids to labels and set the amsam contents
  //     const newAmsamContents = data.map((ids) => {
  //       return ids
  //         .map((id) => initialLabels.find((label) => label.id === id)?.name)
  //         .filter(Boolean) as string[];
  //     });

  //     setAmsamContents(newAmsamContents);
  //   } else {
  //     //console.log("No formattedDatamsam found in sessionStorage");
  //   }
  // }, [location, initialLabels]);


  useEffect(() => {
    const fetchProfileData = async () => {
      const profileId = localStorage.getItem("profile_id_new") || localStorage.getItem("loginuser_profile_id");
      if (profileId) {
        try {
          const requestData = { profile_id: profileId, page_id: 5 };
          const response = await apiClient.post(`/auth/Get_save_details/`, requestData, { headers: { "Content-Type": "application/json" } });

          const profileData = response.data.data;
          //console.log("amsamgriddddd",profileData.amsa_kattam);
          sessionStorage.setItem("formattedDatamsam", profileData.amsa_kattam);

          const formattedDatamsamval = sessionStorage.getItem("formattedDatamsam");
          if (formattedDatamsamval) {
            const data = formattedDatamsamval
              .slice(1, -1)
              .split(", ")
              .map((grid) => {
                const match = grid.match(/Grid \d+: (.+)/);
                return match ? match[1].split(",").map((id) => parseInt(id, 10)) : [];
              });

            const newAmsamContents = data.map((ids) => ids.map((id) => initialLabels.find((label) => label.id === id)?.name).filter(Boolean) as string[]);
            setAmsamContents(newAmsamContents);

            const usedIds = data.flat();
            setLabels((prevLabels) => prevLabels.filter((label) => !usedIds.includes(label.id)));
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [location, initialLabels]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    label: Label
  ) => {
    e.dataTransfer.setData("labelId", label.id.toString());
    e.dataTransfer.setData("source", "amsam");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropRasiBox = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    const draggedLabelId = e.dataTransfer.getData("labelId");
    const source = e.dataTransfer.getData("source");

    if (source === "amsam" && draggedLabelId) {
      const draggedLabel = labels.find(
        (label) => label.id === parseInt(draggedLabelId, 10)
      );
      if (
        draggedLabel &&
        !amsamContents[index].includes(draggedLabel.name) &&
        amsamContents[index].length < 6
      ) {
        const newContents = [...amsamContents];
        newContents[index] = [...newContents[index], draggedLabel.name];
        setAmsamContents(newContents);

        setLabels((prevLabels) =>
          prevLabels.filter((label) => label.id !== draggedLabel.id)
        );
      }
    }
  };

  const handleRemoveLabel = (index: number, labelIndex: number) => {
    // Create a copy of the current amsamContents state
    const newContents = [...amsamContents];
    const removedLabel = newContents[index][labelIndex];

    // Remove the label from the copied state
    newContents[index].splice(labelIndex, 1);
    setAmsamContents(newContents);

    // Find the removed label object from the initialLabels
    const removedLabelObj = initialLabels.find(
      (label) => label.name === removedLabel
    );

    // If the removed label object is found
    if (removedLabelObj) {
      setLabels((prevLabels) => {
        // Check if the label already exists in the state
        if (prevLabels.some((label) => label.name === removedLabel)) {
          return prevLabels; // Return the current state if label is already present
        }
        // Add the label to the state if it's not already present
        return [...prevLabels, removedLabelObj];
      });
    }
  };


  const formatGridData = () => {
    const formattedData = amsamContents
      .map((contents, index) => {
        const boxNumber = index + 1;
        const ids = contents
          .map((label) => initialLabels.find((l) => l.name === label)?.id)
          .filter((id) => id !== undefined);
        return `Grid ${boxNumber}: ${ids.length > 0 ? ids.join(",") : "empty"}`;
      })
      .join(", ");
    return `{${formattedData}}`;
  };

  useEffect(() => {
    const formattedData = formatGridData();
    //console.log("Amsam Contents:");
    console.log(formattedData);

    // Store formattedData in sessionStorage
    sessionStorage.setItem("formattedData1", JSON.stringify(formattedData));
  }, [amsamContents]);

  return (
    <div className="flex  justify-start items-start bg-gray-200 space-x-2 max-lg:space-x-0  max-lg:space-x-10  max-md:hidden">
      {/* Labels */}
      <div className="flex flex-col gap-2   max-lg:justify-between max-lg:gap-2 max-lg:mb-6
      max-md:grid-cols-4 max-md:items-center max-md:justify-between max-md:gap-2 max-md:mb-6 max-sm:grid-cols-2">
        {rasiTemp !== "1" && labels.map((label, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, label)}
            className="flex items-center  bg-yellow-200 text-xs px-2 py-2 rounded text-center hover:cursor-grab 2xl:text-[12px] 2xl:px-1 max-2xl:text-[10px]"
          >
            <RiDraggable className="mr-2 2xl:mr-1" />
            {label.name}
          </div>
        ))}

      </div>

      {/* Amsam Grid */}
      <div className="">
        {/* Top Row */}
        <div className="col-span-3 grid grid-cols-4 gap-2">
          {/* Define positions for the grid in a clockwise manner */}
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
              className="relative w-28 h-28 rasi-box rounded  bg-yellow-100  border border-yellow-400 flex flex-col items-start justify-center space-y-2
              2xl:w-28 2xl:h-28
              max-2xl:w-[92px] max-2xl:h-[92px]
               max-xl:w-[100px] max-xl:h-[100px]
                max-lg:w-[120px] max-lg:h-[120px]
                 max-md:h-36 max-md:w-36
                 max-sm:h-16 max-sm:w-16
                 "
            >
              {amsamContents[index].map((label, labelIndex) => (
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
              {/* <div className="absolute top-0 left-0 m-1 text-xs font-bold text-gray-500">
                {index + 1}
              </div> */}
            </div>
          ))}

          <div className="row-start-2 amsam-center-box col-start-2 col-end-4 row-end-4 rounded font-semibold border border-white bg-white flex justify-center items-center">
            {centerLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmsamGrid;
