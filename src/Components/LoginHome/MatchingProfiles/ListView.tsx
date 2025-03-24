import React, { useState, useEffect, useContext } from "react";
import { fetchProfiles } from "../../../commonapicall"; // Adjust the path as needed
import { ListCard } from "./ProfileCard/ListCard"; // Adjust the path as needed
import { Profile, ProfileContext } from "../../../ProfileContext"; // Adjust the path as needed
import Spinner from "../../Spinner";
import { ProfileNotFound } from "./ProfileNotFound";

export interface SearchResultProps {
  profile_name: string;
  profile_id: any;
  profile_age: any;
  height: any;
  profile_img?: string;
  searchvalues: any;
  star:any;
  matching_score:any;
}



export const ListView: React.FC<SearchResultProps> = ({ searchvalues }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(setError, "error");


  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("MyComponent must be used within a ProfileProvider");
  }

  const {
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
    matchingProfileSearchId,
    advanceSearchData

  } = context;
  // const advanceSearchData = sessionStorage.getItem("advance_search_data")
  //   ? JSON.parse(sessionStorage.getItem("advance_search_data")!)
  //   : null;

  // useEffect(()=>{
  //   if(advanceSearchData){
  //    setProfiles(advanceSearchData)
  //   }
  //  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginuser_profileId = sessionStorage.getItem(
          "loginuser_profile_id"
        );

        if (!loginuser_profileId) {
          throw new Error("Profile ID is missing.");
        }

        const data = await fetchProfiles(
          loginuser_profileId,
          MatchingProfilepageNumber,
          MatchingProfileperPage,
          sortOrder,
        );
        setProfiles(data.profiles); // Adjust based on the actual response structure
      } catch (error) {
        console.error("Error fetching profiles:", error);
        // setError("Failed to fetch profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    MatchingProfilepageNumber,
    MatchingProfileperPage,
    sortOrder,
    matchingProfileSearchId,
  ]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );   if (error) return <div>{error}</div>;

  const searchvalue = sessionStorage.getItem("searchvalue") || " ";
  console.log(searchvalue);



  return (
    <div className="list-view max-md:flex max-md:flex-col max-md:items-center mt-5">
      {advanceSearchData && advanceSearchData.length > 0 ? (
        advanceSearchData.map((profile: Profile) => (
          <ListCard
            key={profile.profile_id}
            profile={profile}
            searchvalues={searchvalues}
          />
        ))
      ) : (profiles && profiles.length > 0 && searchvalue !== "1") ? (
        profiles.map((profile: Profile) => (
          <ListCard
            key={profile.profile_id}
            profile={profile}
            searchvalues={searchvalues}
          />
        ))
      ) : (searchvalue === "1" && searchvalues && searchvalues.length > 0) ? (
        searchvalues.map((profile: Profile) => (
          <ListCard
            key={profile.profile_id}
            profile={profile}
            searchvalues={searchvalues}
          />
        ))
      ) : (
        <div className="pt-10 pb-[122px] max-md:pt-10 max-md:pb-16">
            <ProfileNotFound />
          </div>
      )}

    </div>
  );
};

export default ListView;
