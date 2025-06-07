import React, { useState, useEffect, useContext } from "react";

import { GridListCard } from "./ProfileCard/GridListCard"; // Named import
import { fetchProfiles } from "../../../commonapicall"; // Import the API function
import { Profile, ProfileContext } from "../../../ProfileContext";
import { ProfileNotFound } from "./ProfileNotFound";
import { Hearts } from "react-loader-spinner";
// import Spinner from "../../Spinner";

// Define the Profile type if not defined
// interface Profile {
//   profile_id: string;
//   profile_name?: string;
//   profile_image?: string;
//   age?: number;
//   height?: string;
//   degree?: string;
//   profession?: string;
//   location?: string;
//   // Add other profile fields as necessary
// }

export interface SearchResultProps {
  profile_name: string;
  profile_id: any;
  profile_age: any;
  height: any;
  profile_img?: string;
  searchResult: any; // Replace 'any' with the appropriate type if you know the structure
  searchvalues: any;
}



export const GridListView: React.FC<SearchResultProps> = ({ searchvalues }) => {
  const context = useContext(ProfileContext);
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
    advanceSearchData,
    setGridListCardData,
  } = context;

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(setError, "error");



  // const advanceSearchData = sessionStorage.getItem("advance_search_data")
  //   ? JSON.parse(sessionStorage.getItem("advance_search_data")!)
  //   : null;

  // useEffect(()=>{
  //   if(advanceSearchData){
  //    setProfiles(advanceSearchData)
  //   }

  //  },[advanceSearchData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loginuser_profileId) {
          throw new Error("Profile ID is missing.");
        }
        //const startTime = performance.now(); // Start timer
        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder
        );
        // const endTime = performance.now(); // End timer
        // const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2);
  
        // console.log(`Grid List Api: ${durationInSeconds} seconds`);
  
        setGridListCardData(data.profiles)
        setProfiles(data.profiles); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error fetching profiles:", error);
        // setError("Failed to fetch profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loginuser_profileId, MatchingProfilepageNumber, MatchingProfileperPage, sortOrder, setGridListCardData]);


  console.log("searchvalues", searchvalues);


  if (loading)
    return (
      <div className="w-fit mx-auto py-40">
        <Hearts
          height="100"
          width="100"
          color="#FF6666"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <p className="text-sm">Please wait...</p>
      </div>
    ); 

  if (error) return <p>{error}</p>;

  const searchvalue = sessionStorage.getItem("searchvalue") || " ";
  console.log(advanceSearchData, "v");
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", searchvalues);
  

  const noResults =
    (!advanceSearchData?.length && !profiles?.length && searchvalue !== "1") ||
    (searchvalue === "1" && !searchvalues?.length);

  const gridClasses = noResults
    ? "grid-cols-1"
    : "grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-1";



  return (
    <div>
      <div className={`grid grid-rows-1 gap-5 my-5 ${gridClasses}`}>
        {/* <div className="grid grid-rows-1 md:grid-cols-3 gap-5 my-5"> */}
        {(advanceSearchData && advanceSearchData.length > 0) ? (
          advanceSearchData.map((profile: Profile) => (
            <GridListCard
              key={profile.profile_id}
              profileId={profile.profile_id}

              profile={profile}
              searchvalues={searchvalues}
            />
          ))
        ) : (profiles && profiles.length > 0 && searchvalue !== "1") ? (
          profiles.map((profile: Profile) => (
            <GridListCard
              key={profile.profile_id}
              profileId={profile.profile_id}

              profile={profile}
              searchvalues={searchvalues}
            />
          ))
        ) : (searchvalue === "1" && searchvalues && searchvalues.length > 0) ? (
          searchvalues.map((profile: Profile) => (
            <GridListCard
              key={profile.profile_id}
              profileId={profile.profile_id}
              profile={profile}

              searchvalues={searchvalues}
            />
          ))
        ) : (
          <div className="pt-10 pb-[122px] max-md:pt-10 max-md:pb-16">
            <ProfileNotFound />
          </div>
        )}


        {/* </div> */}
      </div>
    </div>
  );
};

export default GridListView;
