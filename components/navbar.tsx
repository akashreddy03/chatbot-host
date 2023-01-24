import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ThemeContext } from "./themecontext";

type ModalInputType = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function NavBar({ setOpenModal }: ModalInputType) {
  const { data: session } = useSession();
  const [hide, sethideState] = useState(true);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const router = useRouter();

  const paths = [["Home", "/"]];

  if (!session) {
    paths.push(["Register", "/register"], ["Login", "/login"]);
  } 

  return (
    <>
      <header className="md:flex md:justify-between">
        <div className="flex justify-between items-center">
          <Link href="/">Logo</Link>
          <button className="md:hidden" onClick={() => sethideState(!hide)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <ul
          className={`${
            hide ? "hidden" : "flex flex-col"
          } space-y-4 md:space-y-0 md:space-x-2 py-9 md:flex md:flex-row md:py-0`}
        >
          <li>
            <button className="mx-2 px-2 py-2 rounded-full hover:bg-neutral-400 dark:hover:bg-slate-700" onClick={() => toggleTheme()}>
              {theme === 'light' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fill="currentColor"
                    d="M12 11.807C10.7418 10.5483 9.88488 8.94484 9.53762 7.1993C9.19037 5.45375 9.36832 3.64444 10.049 2C8.10826 2.38205 6.3256 3.33431 4.92899 4.735C1.02399 8.64 1.02399 14.972 4.92899 18.877C8.83499 22.783 15.166 22.782 19.072 18.877C20.4723 17.4805 21.4245 15.6983 21.807 13.758C20.1625 14.4385 18.3533 14.6164 16.6077 14.2692C14.8622 13.9219 13.2588 13.0651 12 11.807V11.807Z"
                  ></path>
                </svg>
              )} 
              {theme === 'dark' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M6.995 12C6.995 14.761 9.241 17.007 12.002 17.007C14.763 17.007 17.009 14.761 17.009 12C17.009 9.239 14.763 6.993 12.002 6.993C9.241 6.993 6.995 9.239 6.995 12ZM11 19H13V22H11V19ZM11 2H13V5H11V2ZM2 11H5V13H2V11ZM19 11H22V13H19V11Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M5.63702 19.778L4.22302 18.364L6.34402 16.243L7.75802 17.657L5.63702 19.778Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M16.242 6.34405L18.364 4.22205L19.778 5.63605L17.656 7.75805L16.242 6.34405Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.34402 7.75902L4.22302 5.63702L5.63802 4.22302L7.75802 6.34502L6.34402 7.75902Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.778 18.3639L18.364 19.7779L16.242 17.6559L17.656 16.2419L19.778 18.3639Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
            </button>
          </li>
          {paths.map(([t, u]) => {
            return (
              <Link
                href={u}
                key={t}
                onClick={() => {
                  sethideState(!hide);
                }}
              >
                <li
                  className={`px-4 py-2 rounded-lg ${
                    router.pathname === u
                      ? "bg-cyan-500 text-black md:bg-neutral-400 dark:md:bg-slate-700 md:text-white"
                      : "hover:text-cyan-500"
                  } md:hover:bg-neutral-400 md:hover:text-white dark:md:hover:bg-slate-700 dark:md:hover:text-cyan-400`}
                >
                  {t}
                </li>
              </Link>
            );
          })}
          {session && (
            <li
              className={`cursor-pointer px-4 py-2 rounded-lg hover:text-cyan-500 md:hover:text-white md:hover:bg-neutral-400 dark:md:hover:bg-slate-700 dark:md:hover:text-cyan-400`}
              onClick={() => setOpenModal(true)}
            >
              Logout
            </li>
          )}
        </ul>
      </header>
    </>
  );
}
