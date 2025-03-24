import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import GalleryCard from "./Gallery/GalleryCard";
import { getGallerylists } from "../../commonapicall";
import Spinner from "../Spinner";
import Pagination from "../Pagination";
import { ProfileNotFound } from "../LoginHome/MatchingProfiles/ProfileNotFound";

interface GalleryProps {
  dashBoardAgain: () => void;
}

export type GalleryItem = {
  profile_id: string;
  img_url: string;
};

const Gallery: React.FC<GalleryProps> = ({ dashBoardAgain }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totlaRecords, setTotalRecords] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [noProfiles, setNoProfiles] = useState<boolean>(false); // for empty profiles


  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await getGallerylists(pageNumber);

        if (response?.data?.Status === 0) {
          setError(response?.data?.message);
          setGalleryItems([]); // Ensure empty state
          setLoading(false);
          setNoProfiles(true); // Set flag to show ProfileNotFound
          return;
        }
  
        // Ensure response structure matches your API response
        setGalleryItems(response?.data?.data?.image_data || []);
        setLoading(false);
        setTotalRecords(response?.data?.data.total_records);
        setPerPage(response?.data?.data.per_page);
        setError(null);
        setNoProfiles(false); // Reset flag if data exists
      } catch (err) {
        setError("Failed to load gallery items.");
        console.log("Failed to load gallery items.",err);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [pageNumber]);


  


  const totalPages = Number(Math.ceil(totlaRecords / perPage));
  console.log(perPage, ",,");
  return (
    <div className="bg-grayBg pt-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline
            onClick={dashBoardAgain}
            className="text-[24px] mr-2 cursor-pointer"
          />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-md:text-[18px]">
            Gallery
            <span className="text-sm text-primary"> ({totlaRecords})</span>
          </h4>
        </div>
    
      


        {loading && <Spinner />}
        {noProfiles ? <ProfileNotFound /> : (
          <>
            {error && <p className="text-red-500">{error}</p>}
        <GalleryCard
          profiles={galleryItems} // Pass the entire profile object
        />
        <div className="pb-10">
        <Pagination
          toptalPages={totalPages}
          dataPerPage={perPage}
          totalRecords={totlaRecords}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
        </div>
        </>
        )}
      </div>
      <SuggestedProfiles />
    </div>
  );
};

export default Gallery;
