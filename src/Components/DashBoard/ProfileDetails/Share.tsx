import { useState } from "react";
import { IoClose } from "react-icons/io5";
//import { useNavigate } from "react-router-dom";
import {
    // EmailShareButton,
    // FacebookShareButton,
    // GabShareButton,
    // HatenaShareButton,
    // InstapaperShareButton,
    // LineShareButton,
    // LinkedinShareButton,
    // LivejournalShareButton,
    // MailruShareButton,
    // OKShareButton,
    // PocketShareButton,
    // RedditShareButton,
    TelegramShareButton,
    // TumblrShareButton,
    // TwitterShareButton,
    // ViberShareButton,
    // VKShareButton,
    WhatsappShareButton,
    // WorkplaceShareButton,
    // WeiboShareButton,
} from "react-share";

import {
    // EmailIcon,
    // FacebookIcon,
    // GabIcon,
    // HatenaIcon,
    // InstapaperIcon,
    // LineIcon,
    // LinkedinIcon,
    // LivejournalIcon,
    // MailruIcon,
    // OKIcon,
    // PocketIcon,
    // RedditIcon,
    TelegramIcon,
    // TumblrIcon,
    // TwitterIcon,
    // ViberIcon,
    // VKIcon,
    // WeiboIcon,
    WhatsappIcon,
    // WorkplaceIcon,
} from "react-share";

interface ShareProps {
    closePopup: () => void;
    profileId?: string;        // Add optional props for profile details
    profileName?: string;
    age?: number;
    starName?: string;
}

export const Share: React.FC<ShareProps> = ({ closePopup, profileId,
    profileName,
    age,
    starName, }) => {

    const shareUrl = window.location.href;
    const title = "*Check out this profile!*";

    const [buttonText, setButtonText] = useState("Copy Link");

    const copyLinkToClipboard = () => {
        navigator.clipboard
            .writeText(shareMessage)  // Copy the full shareMessage instead of just the URL
            .then(() => {
                ////console.log("Link copied to clipboard!");
                setButtonText("Copied");
                setTimeout(() => setButtonText("Copy Link"), 2000); // Reset the button text after 2 seconds
            })
            .catch((err) => {
                console.error("Failed to copy the link: ", err);
            });
    };

    //const navigate = useNavigate(); // Initialize navigate

    // const handleReadMoreClick = () => {
    //   // When clicked, navigate to the profile details page with the dynamic profile ID
    //   navigate(`/ProfileDetails?id=${profileId}&rasi=1`);
    // };

    // Build the dynamic share message with profile details
    //   const shareMessage = `
    //   Profile ID: ${profileId}
    //   Profile Name: ${profileName}
    //   Age: ${age} years
    //   Star Name: ${starName}
    //  view more at: ${shareUrl}
    // `;

    const shareMessage = `
  ${title}
  *Profile ID* ${profileId}
  *Profile Name* ${profileName}
  *Age* ${age} years
  *Star Name* ${starName}
  *Link* ${shareUrl}
`; {/* Add the "View More" link */ }
    {/* <div className="w-full flex justify-center mt-4">
    <span
        onClick={handleViewMoreClick}
        className="text-main cursor-pointer"
    >
        View More
    </span>
</div> */}





    return (
        <div>
            {/* Icons */}
            {/* <div
                // onClick={closeModal}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"

            >
                <div className="relative w-6/12 bg-white rounded-lg px-2 pt-10 pb-5">

                    <div className="flex justify-end"> */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative  max-md:w-[300px] w-full max-w-md bg-white rounded-lg px-4 pt-6 pb-5 shadow-lg">
                    <div className="flex justify-end">
                    {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative w-full max-w-lg bg-white rounded-lg px-8 pt-8 pb-6 shadow-lg">  {/* Increased padding and container size */}
          {/* <div className="flex justify-end"> */} 

                        {/* <div className="w-fit"> */}
                        <IoClose
                            onClick={closePopup}
                            className="absolute top-3 right-3 text-[22px] text-vysyamalaBlack cursor-pointer" />
                        {/* </div> */}
                    </div>



                    {/* <div className="w-auto flex flex-wrap justify-center gap-4"> */}
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {/* <FacebookShareButton
                            url={shareMessage}
                           
                        >
                            <FacebookIcon size={48} round />
                        </FacebookShareButton>

                        <TwitterShareButton
                            url={shareMessage}
                          
                        >
                            <TwitterIcon size={48} round />
                        </TwitterShareButton> */}

                        <WhatsappShareButton
                            url={shareMessage}

                        >
                            <WhatsappIcon size={48} round />
                        </WhatsappShareButton>

                        {/* <EmailShareButton
                            url={shareMessage}
                          
                        >
                            <EmailIcon size={48} round />
                        </EmailShareButton>

                        <GabShareButton url={shareMessage} >
                            <GabIcon size={48} round />
                        </GabShareButton>

                        <HatenaShareButton url={shareMessage}>
                            <HatenaIcon size={48} round />
                        </HatenaShareButton>

                        <InstapaperShareButton url={shareMessage}>
                            <InstapaperIcon size={48} round />
                        </InstapaperShareButton>

                        <LineShareButton url={shareMessage}>
                            <LineIcon size={48} round />
                        </LineShareButton>

                        <LinkedinShareButton url={shareMessage}>
                            <LinkedinIcon size={48} round />
                        </LinkedinShareButton>

                        <LivejournalShareButton
                            url={shareMessage}
                          
                        >
                            <LivejournalIcon size={48} round />
                        </LivejournalShareButton>

                        <MailruShareButton url={shareMessage} >
                            <MailruIcon size={48} round />
                        </MailruShareButton>

                        <OKShareButton url={shareMessage}>
                            <OKIcon size={48} round />
                        </OKShareButton> */}

                        {/* <PinterestShareButton url={shareUrl} title={title}>
                                    < PinterestIcon size={32} round />
                                </ PinterestShareButton> */}
                        {/* 
                        <PocketShareButton url={shareMessage}>
                            <PocketIcon size={48} round />
                        </PocketShareButton>

                        <RedditShareButton url={shareMessage} >
                            <RedditIcon size={48} round />
                        </RedditShareButton> */}

                        <TelegramShareButton url={shareMessage}>
                            <TelegramIcon size={48} round />
                        </TelegramShareButton>
                        {/* 
                        <TumblrShareButton url={shareMessage} >
                            <TumblrIcon size={48} round />
                        </TumblrShareButton>

                        <ViberShareButton url={shareMessage} >
                            <ViberIcon size={48} round />
                        </ViberShareButton>

                        <VKShareButton url={shareMessage} >
                            <VKIcon size={48} round />
                        </VKShareButton>

                        <WorkplaceShareButton url={shareMessage} >
                            <WorkplaceIcon size={48} round />
                        </WorkplaceShareButton> */}

                        {/* <FacebookMessengerShareButton url={shareUrl} title={title}>
                                    <FacebookMessengerIcon size={32} round />
                                </FacebookMessengerShareButton> */}
                        {/* 
                        <WeiboShareButton url={shareMessage} >
                            <WeiboIcon size={48} round />
                        </WeiboShareButton> */}

                        {/* <  XShareButton url={shareUrl} title={title}>
                                    < XIcon size={32} round />
                                </ XShareButton> */}

                        {/* <div className="w-full flex flex-col items-center"> */}
                        <div className="w-full flex flex-col items-center mt-4">
                            {/* <p className="text-lg text-vysyamalaBlack mb-2"> */}
                            {/* <p className="text-lg text-black mb-2 whitespace-nowrap overflow-auto">
                                {window.location.href}
                            </p> */}
                            <button
                                className={`px-4 py-2 text-white rounded ${buttonText === "Copied" ? "bg-[#53c840]" : "bg-secondary"}`}
                                onClick={copyLinkToClipboard} >
                                {buttonText}
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
