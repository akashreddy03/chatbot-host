import Script from "next/script";
import { useState } from "react";
import Footer from "./footer";
import Modal from "./modal";
import NavBar from "./navbar";

type ChildComponent = {
  children: JSX.Element;
};

export default function Layout({ children }: ChildComponent) {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex justify-center min-w-[350px] bg-gradient-to-r from-slate-50 to-slate-300 dark:bg-gradient-to-r dark:from-gray-600 dark:via-grey-800 dark:to-slate-900 dark:text-white">
        <div className="flex-auto px-6 min-w-[350px] md:px-12 py-6 max-w-[1320px] space-y-8 flex flex-col min-h-screen">
          <NavBar setOpenModal={setOpenModal} />
          {children}
          <Footer />
        </div>
        {isOpenModal && <Modal setOpenModal={setOpenModal} />}
      </div>
    </>
  );
}
