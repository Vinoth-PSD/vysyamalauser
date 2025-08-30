import { useState, useEffect } from "react";
import PhotoRequestCard from "./PhotoRequest/PhotoRequestCard";
import { IoArrowBackOutline } from "react-icons/io5";
import { SuggestedProfiles } from "../LoginHome/SuggestedProfiles";
import Pagination from "../Pagination";
import apiClient from "../../API";
import { ProfileNotFound } from "../LoginHome/MatchingProfiles/ProfileNotFound";

interface DashBoardMyProfileProps {
  dashBoardAgain: () => void;
}

const PhotoRequest: React.FC<DashBoardMyProfileProps> = ({
  dashBoardAgain,
}) => {
  // const [perPage,setPerPage]=useState<number>(0)
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const dataPerPage = 10;
  const toptalPages = totalRecords > 0 && dataPerPage > 0 ? Math.ceil(totalRecords / dataPerPage) : 0;
  // const [totalPages,setTotalPages]=useState<number>(0)

  const [photoRequestData, setPhotoRequestData] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [NewUpdatedData, setNewUPDatedData] = useState<boolean>(false);
  const loginuser_profileId = localStorage.getItem("loginuser_profile_id");

  const getPhotoRequest = async () => {
    try {
      const response = await apiClient.post(
        "/auth/Get_photo_request_list/",
        {
          profile_id: loginuser_profileId,
          page_number: pageNumber,
          per_page: dataPerPage,
        }
      );
      // setPerPage(response.data.per_page)
      // setTotalPages(response.data.total_pages)
      setTotalRecords(response.data.photoreq_count);

      setPhotoRequestData(response.data.data.profiles);
    } catch (error) {
      console.error("Error fetching photo requests:", error);
    }
  };

  // Optionally, you can call `getPhotoRequest` inside `useEffect` if you want to fetch data when the component mounts
  useEffect(() => {
    getPhotoRequest();
  }, [NewUpdatedData, pageNumber]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNumber]);

  return (
    <div className="bg-grayBg pt-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          <IoArrowBackOutline
            onClick={dashBoardAgain}
            className="text-[24px] mr-2 cursor-pointer"
          />
          <h4 className="text-[24px] text-vysyamalaBlackSecondary font-bold max-md:text-[18px]">
            Photo Requests{" "}
            <span className="text-sm text-primary"> ({totalRecords})</span>
          </h4>
        </div>

        {/* Personal Notes Card */}
        <div>
          {photoRequestData.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-lg font-semibold">
              <ProfileNotFound />
            </div>
          ) : (
            photoRequestData.map((requests) => (
              <PhotoRequestCard
                toptalPages={toptalPages}
                totalRecords={totalRecords}
                NewUpdatedData={NewUpdatedData}
                setNewUPDatedData={setNewUPDatedData}
                data={requests}
              />
            ))
          )}
        </div>
        <div className="mb-10 max-md:mb-5">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalRecords={totalRecords}
            dataPerPage={dataPerPage}
            toptalPages={toptalPages}
          />
        </div>

      </div>
      <SuggestedProfiles />
    </div>
  );
};

export default PhotoRequest;
