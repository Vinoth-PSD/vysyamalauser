/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchFooterContent } from "../commonapicall";
//import axios from "axios";
import apiClient from "../API";

interface FooterData {
  site_name: string;
  meta_title: string;
  meta_description: string;
  contact_number: string;
  whatsapp_number: string;
  email_address: string;
  location_address: string;
  support_phone: string;
  support_whatsapp: string;
  support_email: string;
  copyrights: string;
}



export const Footer = () => {

  const [showFooterContent, setShowFooterContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  // const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [, setFooterData] = useState<FooterData | null>(null);





  const handleFooterContent = async (pageId?: string) => {
    try {
      setLoading(true); // Start loading
      const data = await fetchFooterContent(pageId); // Call the API to fetch FAQ data
      if (data) {
        setLoading(false);
      }

      setShowFooterContent(!showFooterContent);

      //console.log(data);
      window.scrollTo({ top: 0, behavior: "smooth" });


      navigate("/FooterPages", { state: { faqData: data } }); // Navigate to the FAQ page and pass the fetched data

    } catch (error: any) {
      setError(error.message || "Failed to fetch footer content");
    } finally {
      setLoading(false); // End loading
    }
  };


  // Fetch footer data from API
  const fetchFooterData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await apiClient.get("/auth/Get_footer/");
      
      if (response.data.status === "success") {
        setFooterData(response.data.data); // Map API response to state
        setLoading(false);
      } else {
        throw new Error(response.data.message || "Failed to fetch footer content");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFooterData();
  }, []);
  


  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }



  return (
    <div>
      <footer className="bg-footer-gray text-zinc-400 py-[70px] max-lg:py-[50px] max-md:py-[30px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-5">
                {/* Arya Vysya Community */}
                Vysyamala
              </h3>
              <ul className="text-footer-text-gray">
              <li className="mb-2">
                  <p onClick={() => { handleFooterContent("11") }} className="font-normal hover:underline cursor-pointer">
                    About us
                  </p>
                </li>
                <li className="mb-2">
                <Link to="/FoundersDesk" className="text-normal hover:underline">
                   Founder Desk
                  </Link>
                </li>
                <li className="mb-2">
                <a href="#" className="text-normal hover:underline">
                   Success Stories
                  </a>
                </li>
                <li className="mb-2">
                <a href="#" className="text-normal hover:underline">
                    Awards
                </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5">Arya Vysya Community</h3>
              {/* <ul className="text-footer-text-gray">
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("11") }} className="text-normal hover:underline cursor-pointer">
                    About
                  </p>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    Jobs
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    Press
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    Partners
                  </a>
                </li>
              </ul> */}

              <ul className="text-footer-text-gray">
              <li className="mb-2">
                  <a onClick={() => navigate("/FeaturedGroomCard")} className="text-normal hover:underline cursor-pointer">
                    Arya Vysya Grooms
                  </a>
                </li>
                <li className="mb-2">
                  <p onClick={() => navigate("/FeaturedBrideCard")} className="text-normal hover:underline cursor-pointer">
                    Arya Vysya Brides
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("4") }} className="text-normal hover:underline cursor-pointer">
                    History of Arya Vysya
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("6") }} className="text-normal hover:underline cursor-pointer">
                    Arya Vysya Gothras
                  </p>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                   Vasavi Temples
                  </a>
                </li>
              </ul>
            </div>

            {/* <div>
              <h3 className="text-white font-semibold mb-5">
                Vinayagar Decoration
              </h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    2013 | 2014 | 2015
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    2016 | 2017 | 2018
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    2019 | 2020 | 2021
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h3 className="text-white font-semibold mb-5">
                Quick Links
              </h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                   Member Login
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                   Register Free
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    Partner Search
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-normal hover:underline">
                    Membership Plans
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5">Support</h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2">
                  {/* {/ Trigger API call and navigation when clicked /} */}
                  <p onClick={() => { handleFooterContent("1") }} className="text-normal hover:underline cursor-pointer">
                    FAQs
                  </p>
                </li>
                <li className="mb-2">
                  <p className="text-normal hover:underline cursor-pointer">
                    Feedback
                  </p>
                </li>
                <li className="mb-2">
                  <p className="text-normal hover:underline cursor-pointer">
                    Contact Us
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("3") }} className="text-normal hover:underline cursor-pointer">
                    Privacy Policy
                  </p>
                </li>
                <li className="mb-2">
                  <p onClick={() => { handleFooterContent("2") }} className="text-normal hover:underline cursor-pointer">
                    Terms & Conditions
                  </p>
                </li> 
              </ul>
            </div>

            <div>
              {/* <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="text-footer-text-gray">
                <li className="mb-2 flex items-center">
                  <span className="mr-2">📞</span> {footerData?.support_phone}
                </li>
                <li className="mb-2 flex items-center">
                  <span className="mr-2">📧</span>{footerData?.support_whatsapp}
                </li>
                <li className="mb-2 flex items-center">
                  <span className="mr-2">📧</span>{footerData?.support_email}
                </li>
              </ul> */}
              {/* <h3 className="text-white mb-4">Downloads</h3> */}
              <div className="flex flex-wrap gap-4">
                <img src="https://placehold.co/100x40" alt="App Store" />
                <img src="https://placehold.co/100x40" alt="Google Play" />
              </div>
            </div>
          </div>

          <div className="text-footer-text-gray mt-10 text-center border-t border-footer-line pt-10 max-md:pt-5 max-md:mt-5">
            <p>Copyright &copy; Vysyamala.com 2024. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};