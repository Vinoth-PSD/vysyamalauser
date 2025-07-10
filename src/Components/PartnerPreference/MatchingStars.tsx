// import React, { useEffect, useState } from "react";
// import Checkbox from "./CheckBox";
// import { SelectedStarIdItem } from "../../Pages/PartnerSettings";

// interface MatchingStarsProps {
//   // initialPoruthas: string;
//   initialPoruthas: string | React.ReactNode;
//   starAndRasi: {
//     id: string;
//     matching_starname: string;
//     matching_rasiname: string;
//     matching_starId: string;
//     matching_rasiId: string;
//   }[];
//   selectedStarIds: SelectedStarIdItem[];
//   onCheckboxChange: (
//     updatedIds: SelectedStarIdItem[],
//     rasi: string,
//     star: string
//   ) => void;
// }

// const MatchingStars: React.FC<MatchingStarsProps> = ({
//   initialPoruthas,
//   starAndRasi,
//   selectedStarIds,
//   onCheckboxChange,
// }) => {
//   // State to track manually unchecked items
//   const [uncheckedDefaultIds, setUncheckedDefaultIds] = useState<string[]>(
//     JSON.parse(sessionStorage.getItem("uncheckedDefaultIds") || "[]")
//   );

//   // Save uncheckedDefaultIds to session storage whenever it changes
//   useEffect(() => {
//     sessionStorage.setItem("uncheckedDefaultIds", JSON.stringify(uncheckedDefaultIds));
//   }, [uncheckedDefaultIds]);

//   // Handle checkbox change and update states and session storage
//   const handleCheckboxChange = (
//     id: string,
//     rasi: string,
//     star: string,
//     checked: boolean
//   ) => {
//     let updatedIds;

//     if (checked) {
//       // Add to selectedStarIds and remove from uncheckedDefaultIds
//       updatedIds = [...selectedStarIds, { id, rasi, star, label: `${star} - ${rasi}` }];
//       setUncheckedDefaultIds((prev) => prev.filter((itemId) => itemId !== id));
//     } else {
//       // Remove from selectedStarIds and add to uncheckedDefaultIds if not already there
//       updatedIds = selectedStarIds.filter((item) => item.id !== id);
//       setUncheckedDefaultIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
//     }

//     // Update parent state and session storage
//     onCheckboxChange(updatedIds, rasi, star);
//     sessionStorage.setItem("selectedStarIds", JSON.stringify(updatedIds));
//   };

//   return (
//     <div>
//       <div className="my-5">
//         <h5 className="text-[18px] text-ash font-semibold mb-2 ">
//           {initialPoruthas}
//         </h5>
//         <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
//           {starAndRasi.map((item, index) => (
//             <div key={item.id}>
//               <Checkbox
//                 id={item.id}
//                 name={`star-${index}`}
//                 value={`${item.matching_starId} - ${item.matching_rasiId}`}
//                 label={`${item.matching_starname} - ${item.matching_rasiname}`}
//                 checked={
//                   !uncheckedDefaultIds.includes(item.id) &&
//                   selectedStarIds.some((selectedItem) => selectedItem.id === item.id)
//                 }
//                 onChange={(e) =>
//                   handleCheckboxChange(
//                     item.id,
//                     item.matching_rasiId,
//                     item.matching_starId,
//                     e.target.checked
//                   )
//                 }
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default MatchingStars;


import React, { useEffect, useState } from "react";
import Checkbox from "./CheckBox";
import { SelectedStarIdItem } from "../../Pages/PartnerSettings";

interface MatchingStarsProps {
  initialPoruthas: string | React.ReactNode;
  starAndRasi: {
    id: string;
    matching_starname: string;
    matching_rasiname: string;
    matching_starId: string;
    matching_rasiId: string;
  }[];
  selectedStarIds: SelectedStarIdItem[];
  onCheckboxChange: (
    updatedIds: SelectedStarIdItem[],
    rasi: string,
    star: string
  ) => void;
  
}

const MatchingStars: React.FC<MatchingStarsProps> = ({
  initialPoruthas,
  starAndRasi,
  selectedStarIds,
  onCheckboxChange,
}) => {
  const [uncheckedDefaultIds, setUncheckedDefaultIds] = useState<string[]>(
    JSON.parse(sessionStorage.getItem("uncheckedDefaultIds") || "[]")
  );

  // Save uncheckedDefaultIds to session storage
  useEffect(() => {
    sessionStorage.setItem("uncheckedDefaultIds", JSON.stringify(uncheckedDefaultIds));
  }, [uncheckedDefaultIds]);

  // Handle select all/deselect all
  const handleSelectAll = () => {
    // Check if all are already selected
    const allSelected = starAndRasi.every(item => 
      selectedStarIds.some(selected => selected.id === item.id) && 
      !uncheckedDefaultIds.includes(item.id)
    );
    
    if (allSelected) {
      // Deselect all
      const newUncheckedIds = starAndRasi.map(item => item.id);
      setUncheckedDefaultIds(newUncheckedIds);
      const updatedIds = selectedStarIds.filter(item => 
        !starAndRasi.some(star => star.id === item.id)
      );
      onCheckboxChange(updatedIds, '', '');
      sessionStorage.setItem("selectedStarIds", JSON.stringify(updatedIds));
    } else {
      // Select all
      setUncheckedDefaultIds([]);
      const newSelectedIds = [
        ...selectedStarIds,
        ...starAndRasi
          .filter(item => !selectedStarIds.some(selected => selected.id === item.id))
          .map(item => ({
            id: item.id,
            rasi: item.matching_rasiId,
            star: item.matching_starId,
            label: `${item.matching_starId} - ${item.matching_rasiId}`
          }))
      ];
      onCheckboxChange(newSelectedIds, '', '');
      sessionStorage.setItem("selectedStarIds", JSON.stringify(newSelectedIds));
    }
  };

  const handleCheckboxChange = (
    id: string,
    rasi: string,
    star: string,
    checked: boolean
  ) => {
    let updatedIds;

    if (checked) {
      updatedIds = [...selectedStarIds, { id, rasi, star, label: `${star} - ${rasi}` }];
      setUncheckedDefaultIds((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      updatedIds = selectedStarIds.filter((item) => item.id !== id);
      setUncheckedDefaultIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }

    onCheckboxChange(updatedIds, rasi, star);
    sessionStorage.setItem("selectedStarIds", JSON.stringify(updatedIds));
  };

  return (
    <div>
      <div className="my-5">
        <h5 
          className="text-[18px] text-ash font-semibold mb-2 cursor-pointer"
          onClick={handleSelectAll}
        >
          {initialPoruthas}
          <span className="text-sm ml-2">
            ({starAndRasi.every(item => 
              selectedStarIds.some(selected => selected.id === item.id) && 
              !uncheckedDefaultIds.includes(item.id)
            ) })
          </span>
        </h5>
        <div className="grid grid-cols-2 gap-4 items-star max-xl:grid-cols-2 max-sm:grid-cols-1">
          {starAndRasi.map((item, index) => (
            <div key={item.id}>
              <Checkbox
                id={item.id}
                name={`star-${index}`}
                value={`${item.matching_starId} - ${item.matching_rasiId}`}
                label={`${item.matching_starname} - ${item.matching_rasiname}`}
                checked={
                  !uncheckedDefaultIds.includes(item.id) &&
                  selectedStarIds.some((selectedItem) => selectedItem.id === item.id)
                }
                onChange={(e) =>
                  handleCheckboxChange(
                    item.id,
                    item.matching_rasiId,
                    item.matching_starId,
                    e.target.checked
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingStars;