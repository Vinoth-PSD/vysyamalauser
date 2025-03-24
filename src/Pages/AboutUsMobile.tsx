// import { FooterContent } from '../Components/FooterPages/FooterContent'
import { useLocation } from "react-router-dom";
// import parseHtml from "html-react-parser"
import vysyamalaLogo from "../assets/icons/VysyamalaLogo.png";

export const AboutUsMobile = () => {
    const location = useLocation();
    // Log location.state to see the structure of the received data
    console.log("Location State:", location.state);


    // Access the FAQ data properly using dot notation if necessary
    const faqData = location.state?.faqData?.data.content || [];  // Adjust the path based on your data structure
    console.log(faqData, "received data");


    // Parse the HTML content safely
    // const parsedContent = parseHtml(faqData);


    // Access the data passed via state from VysyamalaAbout
    const section = location.state?.section || "";


    return (
        <div className='container mx-auto mt-28 mb-20 max-md:mb-10 max-md:mt-20'>

            {section === "about-us" && (
                <div>
                    <h1 className="text-3xl font-semibold">About Us</h1>
                    <p>
                        Detailed information about Vysyamala, our mission, our values, and the services we offer. <br />
                        [Extended description about Vysyamala goes here...]
                    </p>
                </div>
            )}
            <ul>
                {/* <FooterContent
                    // key={index}
                    content={parsedContent}
                // title=""  // Pass the question as the title prop
                // description={faqData}  // Pass the answer as the description prop
                /> */}
                {/* {faqData} */}

            </ul>
            {/* <p>No FAQ data available.</p> */}


            {/* about us  */}

            <div >
                {/* <div className="mb-8 max-md:mb-4">
                    <h5 className="text-4xl font-bold text-primary-700 pb-2 max-md:text-xl">About Us</h5>
                    <div className="w-[70px] h-1 bg-[#D9D9D9] max-md:w-9"></div>
                </div> */}

                <div className="space-y-10 max-md:space-y-5">
                    <div>
                        <div className="mb-5 border-b-2 border-b-gray">
                            <img src={vysyamalaLogo} alt="logo-image" className="w-40 h-16 object-contain" />
                        </div>
                        <h6 className="text-2xl text-primary-700 font-bold mb-2 max-md:text-xl">Vision
                        </h6>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
                            To become the most trusted and culturally aligned matrimonial platform for the Arya Vysya community, fostering enduring relationships rooted in tradition, values, and mutual respect.
                        </p>


                    </div>
                    <div>
                        <h6 className="text-2xl text-primary-700 font-bold mb-2 max-md:text-xl">Mission
                        </h6>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
                            1.To connect Arya Vysya families and individuals through a platform that celebrates their rich traditions and cultural heritage.
                        </p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
                            2. Our built-in proprietary algorithm perfectly analyzes all the parameters and aims to provide the best match. One of our specialities is that we provide free service for people over 36 years, underprivileged, or divorced/separated.
                            Are we any good? Yes, our 30,000+ happy customers are the proof that we keep divinity above everything and that makes our job a pure one.
                        </p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
                            3.To ensure quality matches by combining technology with a personalized touch that respects the values and aspirations of our community.
                        </p>
                    </div>
                    <div>
                        <h6 className="text-2xl text-primary-700 font-bold mb-2 max-md:text-xl">Core Values
                        </h6>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
                            <b>1.Cultural Preservation</b>
                        </p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
                            We deeply value and honor the rich traditions and customs of the Arya Vysya community, ensuring they are respected and celebrated throughout our platform. Every aspect of Vysyamala is designed to align with the cultural ethos that binds us together.
                        </p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"><b>2. Integrity and Trust
                        </b></p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">Transparency, honesty, and reliability are the cornerstones of our service. We are committed to fostering an environment where users can trust the platform and the profiles they connect with, ensuring a secure and respectful experience.</p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"><b>Quality-Driven Matches</b></p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">Our platform prioritizes meaningful connections using well-curated profiles, advanced algorithms, and personalized recommendations. We aim to simplify the search for a life partner by focusing on compatibility and shared values.</p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"><b>4.Empathy and Accessibility</b></p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">Everyone deserves a chance at finding happiness. Vysyamala offers special support to differently abled individuals, divorced individuals, and aged members (36+), ensuring inclusivity and compassion for those facing additional challenges in traditional matchmaking.</p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"><b>5.Commitment to Service Excellence</b></p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">From user support to platform reliability, our team is dedicated to providing a seamless experience. We listen, adapt, and innovate to meet the evolving needs of our users while maintaining a personal and respectful touch.</p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"><b>6.Social Responsibility</b></p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base">Vysyamala is committed to the holistic growth of the Arya Vysya community. We organize community-related activities and contests to identify and reward talents, encouraging the celebration and growth of individual and collective achievements within the community.</p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"><b></b></p>
                        <p className="text-xl text-primary font-normal leading-9 max-md:text-base"></p>
                    </div>
                    <div>


                        {/* <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
              To create a seamless, secure, and trustworthy experience for individuals seeking meaningful partnerships.
            </p> */}
                    </div>
                    {/* <div>
            <h6 className="text-2xl text-primary-700 font-bold mb-2 max-md:text-xl">Programs Conducted</h6>
            <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
              Online matrimonial awareness programme in Chennai, Tirupattur, Kallakurichi, and Kanchipuram.
            </p>
          </div>
          <div>
            <h6 className="text-2xl text-primary-700 font-bold mb-2 max-md:text-xl">Founder Details</h6>
            <div className="bg-[#D9D9D9] w-[150px] h-[150px] rounded-md mb-2">
              <img src="" alt="" />
            </div>
            <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
              Founder: Lavanya YK, Entrepreneur passionate about quality
            </p>
            <p className="text-xl text-primary font-normal leading-9 max-md:text-base">
              community services (Msc IT, M.Phil)
            </p>
          </div> */}
                </div>
            </div>

        </div>
    )
}
