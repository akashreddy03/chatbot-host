import { Dispatch, SetStateAction } from "react";
import { signOut } from "next-auth/react";

type ModalInputType = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ setOpenModal }: ModalInputType) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-60 z-10"
        onClick={() => setOpenModal(false)}
      ></div>
      <div className="fixed rounded-lg bg-white dark:bg-gray-700 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-xs py-2 z-20">
        {/* <div className="flex items-center py-4 px-6 border-gray-600 border-b">
          <h1 className="flex-auto text-2xl"></h1>
          <button className="text-gray-400 bg-transparent rounded-lg p-1.5 hover:bg-gray-600 hover:text-white">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div> */}
        <div className="p-6">
          <p className="text-black dark:text-gray-400 text-center">Are you sure you want to logout ?</p>
        </div>
        <div className="flex justify-center space-x-2 px-4 pb-6 pt-px">
          <button className="px-4 py-2 rounded-lg bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-700 text-white" onClick={() => signOut()}>Logout</button>
          <button className="px-4 py-2 rounded-lg text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-300 dark:hover:bg-gray-600" onClick={() => setOpenModal(false)}>Go back</button>
        </div>
      </div>
    </>
  );
}
