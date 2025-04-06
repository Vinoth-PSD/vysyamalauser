import React from 'react';
import { WhatsappShareButton } from 'react-share';
import { MdImage, MdImageNotSupported } from 'react-icons/md';

interface ShareProps {
  closePopup: () => void;
  profileId?: string | number | null;
  profileName?: string;
  age?: number | string;
  starName?: string;
  profileImage?: string | null; // Public image URL
  profileImagess?: string; // Public image URL
}

export const MyProfileShare: React.FC<ShareProps> = ({
  closePopup,
  //profileImagess,
  profileId,
  profileName,
  age,
  starName,
}) => {
  // Encode the data to be shared
  // const encodedData = btoa(
  //   JSON.stringify({
  //     profileId,
  //     profileName,
  //     age,
  //     starName,
  //     profileImagess,
  //   })
  // );

  // Dynamic URL to the profile share page
 // const shareUrl = `http://matrimonyapp.rainyseasun.com/ProfileImage?data=${encodedData}`;

 const shareUrl = `https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/profile/${profileId}/`;
 const shareUrlWithoutImage=`https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/auth/profile_view/${profileId}/`
  const title = 'Check out this profile!';
const registrationLink = 'https://vysyamaladev-afcbe2fdb9c7ckdv.westus2-01.azurewebsites.net/'

// const shareUrl = `http://103.214.132.20:8000/auth/profile/${profileId}/`;
// const shareUrlWithoutImage=`http://103.214.132.20:8000/auth/profile_view/${profileId}/`
//  const title = 'Check out this profile!';
// const registrationLink = 'http://103.214.132.20:8000/'
  


const prepareShareText = () => {
    return (
      `${title}\n\n` +
       `🌟 *Profile  Link:* ${shareUrl}\n` +
      `🆔 *Profile ID:* ${profileId || 'Not available'}\n` +
      `👤 *Profile Name:* ${profileName || 'Not available'}\n` +
      `🎂 *Age:* ${age || 'Not available'} years\n` +
      `✨ *Star Name:* ${starName || 'Not available'}\n\n` +
      `------------------------------------------- \n` +
      `click here to visit your matrimony profile on Vysyamala -\n` +
      `Vysyamala matrimony website :\n\n`
      // +
      // `${registrationLink}\n\n`
     

    );
  };
  
  // Prepare WhatsApp share text without the image
  const prepareDetailsOnlyText = () => {
    return (
      `${title}\n\n` +
       `🌟 *Profile  Link:* ${shareUrlWithoutImage}\n` +
      `🆔 *Profile ID:* ${profileId || 'Not available'}\n` +
      `👤 *Profile Name:* ${profileName || 'Not available'}\n` +
      `🎂 *Age:* ${age || 'Not available'} years\n` +
      `✨ *Star Name:* ${starName || 'Not available'}\n` +
    //  `🔗 *Link:* ${shareUrl}\n\n`+

      `------------------------------------------- \n`+
      `click here to visit your matrimony profile on Vysyamala -\n`+
      `Vysyamala matrimony website :\n\n`
      // +
      // `${registrationLink}\n\n`
    );
  };

  return (
    <>
       {/* <Helmet>
        <title>Profile of {profileName || 'User'}</title>
        <meta property="og:title" content={`Profile of ${profileName || 'User'}`} />
        <meta
          property="og:description"
          content={`Profile ID: ${profileId || 'N/A'}, Age: ${age || 'N/A'}, Star: ${starName || 'N/A'}`}
        />
        <meta
          property="og:image"
          content={profileImagess || 'https://matrimonyapi.rainyseasun.com/media/default_groom.png'} // Use placeholder if no image
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={shareUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Profile of ${profileName || 'User'}`} />
        <meta
          name="twitter:description"
          content={`Profile ID: ${profileId || 'N/A'}, Age: ${age || 'N/A'}, Star: ${starName || 'N/A'}`}
        />
        <meta name="twitter:image" content={profileImagess || 'https://matrimonyapi.rainyseasun.com/media/default_groom.png'} />
      </Helmet> 
       */}
      

      <div className="absolute top-5 right-0 mt-2 w-[220px] p-4 z-10 bg-white rounded-md shadow-lg max-sm:left-auto max-sm:right-[-200px]">
      
        
          {/* <div className="flex justify-end">
            <IoClose
              onClick={closePopup}
              className="absolute top-3 right-3 text-[22px] text-black cursor-pointer"
              aria-label="Close popup"
            />
          </div> */}
          <div className="flex flex-col items-center ">
            {/* {profileImagess && (
              <img
                src={profileImagess}
                alt="Profile"
                className="w-full h-auto mb-4 rounded-md"
              />
            )} */}
          </div>
          <div className="flex flex-col items-center gap-4">
            <WhatsappShareButton
              url={registrationLink} // Dynamic URL with proper OG tags
              title={prepareShareText()}
              className="flex gap-2 items-center justify-start bg-green-500 text-white px-5 py rounded-lg w-full "
              aria-label="Share on WhatsApp"
              onClick={closePopup}
            >
              {/* <WhatsappIcon size={48} round /> */}
              <MdImage className="text-2xl " />
              Share with Image
            </WhatsappShareButton>

            <WhatsappShareButton
              url={registrationLink}
              title={prepareDetailsOnlyText()}
              className="flex gap-2 items-center justify-start bg-green-500 text-white px-5 py rounded-lg w-full "
              aria-label="Share on WhatsApp"
              onClick={closePopup}
            >
              {/* <WhatsappIcon size={48} round /> */}

              <MdImageNotSupported className='text-2xl' />
              Share without Image
            </WhatsappShareButton>
          </div>
        
      </div>
    </>
  );
};

