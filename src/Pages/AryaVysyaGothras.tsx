import { FooterContent } from '../Components/FooterPages/FooterContent'
import parseHtml from "html-react-parser"
import { useEffect, useState } from "react";
//import axios from "axios";
import apiClient from '../API';
import { Hearts } from 'react-loader-spinner';

export const AryaVysyaGothras = () => {
  const [faq, setFaq] = useState<string | null>(null); // Explicitly typing `faq` as string | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.post("/auth/Get_page_details/", {
          page_id: "6", // Include the page_id in the request body
        });

        if (response.data && response.data.data && response.data.data.content) {
          setFaq(response.data.data.content); // Set the content of the page directly to faq
        } else {
          console.error("No content found in the API response.");
        }
      } catch (error) {
        console.error("Error fetching page details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs once when component mounts

  // Only parse the content if `faq` is a valid string
  const parsedContent = faq && typeof faq === 'string' && faq.trim() !== '' ? parseHtml(faq) : null;

  return (
    <div className='mt-28'>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Hearts
            height="100"
            width="100"
            color="#FF6666"
            ariaLabel="hearts-loading"
            visible={true}
          />
          <p className="text-sm">Please wait...</p>
        </div>
      ) : (
        <ul>
          {parsedContent ? (
            <FooterContent content={parsedContent} />
          ) : (
            <p>No content available.</p>
          )}
        </ul>
      )}
    </div>
  );
};
