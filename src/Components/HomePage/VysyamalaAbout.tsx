//import axios from "axios";
import VysyamalaLogo from "../../assets/icons/VysyamalaLogo.png";
import { useNavigate } from "react-router-dom";
import apiClient from "../../API";

// export const VysyamalaAbout = () => {
//   const navigate = useNavigate();

//   const handleReadMoreClick = () => {
//     // Navigate to the FooterPages and pass data via state
//     navigate("/FooterPages", { state: { section: "about-us" } });
//   };


export const VysyamalaAbout = () => {
  const navigate = useNavigate();

  const handleReadMoreClick = async () => {
    try {
      // Make an API request when the "Read More" link is clicked
      const response = await apiClient.post("/auth/Get_page_details/", {
        page_id: "11", // Include the page_id in the request body
      });

      // Check if the response is successful and has data
      if (response.data) {
        // Navigate to FooterPages and pass the response data via state
        navigate("/FooterPages", { state: { faqData: response.data } });
        console.log('aboutus',response.data)
      } else {
        console.error("No data found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching page details:", error);
    }
  };

  return (
    <div>
      <section  className="pt-[70px] pb-[54px] max-lg:my-5 max-md:my-3 max-sm:my-2 max-md:pt-[40px] max-md:py-10">
        <div className="container mx-auto  space-y-6 max-sm:space-y-3">
          <div>
            <a href="">
              <img src={VysyamalaLogo} alt="" className="w-[246px] h-[56px]"  />
            </a>
          </div>

          <hr className="text-gray" />

          <div>
            <p className="text-ash ">
              Home for the Arya Vysya community: Uniting souls time and again!.
              Started in 2008, Vysyamala is the first matrimonial portal
              exclusive for the Arya Vysya community. Having a women-led
              organization, we believe in empowerment and quality progress in
              the matrimonial space. Our built-in proprietary algorithm
              perfectly analyzes all the parameters and aims to provide the best
              match. One of our specialities is that we provide free service for
              people over 36 years, underprivileged, or divorced/separated. Are
              we any good? Yes, our 30,000+ happy customers are the proof that
              we keep divinity above everything and that makes our job a pure
              one.{" "}
              <span
                onClick={handleReadMoreClick}
                className="text-main  cursor-pointer"
              >
                Read More
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
