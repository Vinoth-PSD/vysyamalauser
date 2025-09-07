import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import GalleryCard from "./Gallery/GalleryCard";
import { getGallerylists } from "../../commonapicall";
// import Spinner from "../Spinner";
import Pagination from "../Pagination";
import { ProfileNotFound } from "../LoginHome/MatchingProfiles/ProfileNotFound";
import { Hearts } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";

interface GalleryProps {
  dashBoardAgain: () => void;
}

export type GalleryItem = {
  profile_id: string;
  img_url: string;
};

export const Gallery: React.FC<GalleryProps> = ({ }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totlaRecords, setTotalRecords] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  // const [pageNumber, setPageNumber] = useState<number>(1);
  const [noProfiles, setNoProfiles] = useState<boolean>(false); // for empty profiles

  const navigate = useNavigate();
  const location = useLocation();

  // Get page number from URL query parameter or default to 1
  const getInitialPageNumber = () => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = searchParams.get('page');
    return pageFromUrl ? parseInt(pageFromUrl) : 1;
  };

  const [pageNumber, setPageNumber] = useState<number>(getInitialPageNumber());

  const handleBackToDashboard = () => {
    navigate('/Dashboard');
  };

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
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError("Failed to load gallery items.");
        ////console.log("Failed to load gallery items.", err);
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, [pageNumber]);

  const totalPages = Number(Math.ceil(totlaRecords / perPage));

  useEffect(() => {
    // Update URL when page changes
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());

    // Replace current URL without causing navigation
    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [pageNumber, location.search, navigate]);
  //console.log(perPage, ",,");
  return (
    <div className="bg-grayBg pt-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline
            onClick={handleBackToDashboard}
            className="text-[24px] mr-2 cursor-pointer"
          />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-md:text-[18px]">
            Gallery
            <span className="text-sm text-primary"> ({totlaRecords})</span>
          </h4>
        </div>

        {/* {loading && <Spinner />}
        {noProfiles ? <ProfileNotFound /> : ( */}
        {loading ? (
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
        ) : noProfiles ? (
          <div className="pt-10 pb-[122px] max-md:pt-10 max-md:pb-16">
            <ProfileNotFound />
          </div>
        ) : (
          <>
            {error && <p className="text-red-500">{error}</p>}
            <GalleryCard
              profiles={galleryItems}
              pageNumber={pageNumber} // Add this line
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
