import React, { useState, useEffect } from "react";

interface ProfileViewPassWordInputProps {
  GetPhotoByPassword: (Password: string) => void;
  PasswordModal: boolean;
  setPassWordModal: (value: boolean) => void;
}

const ProfileViewPassWordInput: React.FC<ProfileViewPassWordInputProps> = ({
  GetPhotoByPassword,
  PasswordModal,
  setPassWordModal,
}) => {
  const [Password, setPassWord] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setPassWord("");
    setPassWordModal(false);
  };

  const handleSubmit = () => {
    GetPhotoByPassword(Password);
    handleCloseModal();
    setPassWordModal(false);
  };
  useEffect(() => {
    if (PasswordModal) {
      handleShowModal();
    }
  }, [PasswordModal]);
  return (
    <>
      {showModal && (
        <div
          className="absolute left-[0px] top-[0px] w-full"
          aria-labelledby="modal-headline"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center">
            <div
              className="bg-white rounded-lg"
              role="dialog"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white">
                <div className="sm:flex sm:items-start">
                  <div className="">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Enter Password to View Photo
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                          required
                          onChange={(e) => setPassWord(e.target.value)}
                          type="text"
                          placeholder="Enter The Password"
                          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                  disabled={!Password}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileViewPassWordInput;
