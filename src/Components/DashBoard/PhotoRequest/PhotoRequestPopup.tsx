import React, { useState } from 'react';
//import axios from 'axios';
import apiClient from '../../../API';
// import { IoClose } from 'react-icons/io5';

interface PhotoRequestPopupProps {
  closePopup: () => void;
  profileId: string; // Profile ID of the current user
  profileTo: string; // Profile ID of the profile to view/edit
  onDeclineSubmit: (notes: string) => void; // Callback to hide the Decline button, now expects a parameter
}

export const PhotoRequestPopup: React.FC<PhotoRequestPopupProps> = ({ closePopup, profileId, profileTo, onDeclineSubmit }) => {
  const [photoRequest, setPhotoRequest] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await apiClient.post('/auth/Update_photo_request/', {
        profile_id: profileTo,
        profile_from: profileId,
        status: '3', // You can change this value as needed
        response_message: photoRequest, // Adding the personal notes to the payload
      });

    // console.log('response_message:', photoRequest); // Log the API response
    //   console.log('Submit Response:', response.data); // Log the API response
  
      if (response.data.Status === 1) {
       // alert('Photo request updated successfully');
        onDeclineSubmit(photoRequest); // Pass the personal notes to update the parent component state
      } else {
       // alert('Failed to update photo request');
      }
  
      closePopup(); // Close the popup after submission
    } catch (error) {
      console.error('Error updating photo request:', error);
      alert('An error occurred while updating the photo request');
    }
  };
  

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white w-1/3 rounded-lg container mx-auto">
          <div className="rounded-lg">
            <div className="bg-secondary rounded-t-lg flex justify-between items-center px-3 py-2 mb-2">
              <h4 className="text-[24px] text-white font-semibold">PhotoRequest Message</h4>
              <svg onClick={closePopup} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="text-[22px] text-white cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
              </svg>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="px-3 py-3">
                  <textarea
                    name="photoRequest"
                    rows={5}
                    className="w-full bg-gray rounded-lg px-3 py-3 focus:outline-none"
                    placeholder="Enter your photorequest notes here"
                    value={photoRequest}
                    onChange={(e) => setPhotoRequest(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-end items-center space-x-5 mx-3 mb-4">
                  <button onClick={closePopup} type="button" className="text-main flex items-center rounded-lg font-semibold px-5 py-2.5 cursor-pointer">Cancel</button>
                  <button type="submit" className="bg-gradient text-white flex items-center rounded-lg font-semibold border-2 px-5 py-2 cursor-pointer">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}