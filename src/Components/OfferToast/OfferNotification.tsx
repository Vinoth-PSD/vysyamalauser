import React from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Default options for toast notifications
const defaultOptions: ToastOptions = {
  position: "bottom-left",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  icon: false, // Icon can be enabled by setting it to `true` or using a custom icon
  closeButton: false,
};

// Function to trigger a success toast notification
export const NotifySuccess = (
  content: JSX.Element | string,
  options?: ToastOptions
) => {
  toast.success(content, { ...defaultOptions, ...options });
};

// Component to render the toast container
export const OfferNotification: React.FC = () => {
  return <ToastContainer />;
};
