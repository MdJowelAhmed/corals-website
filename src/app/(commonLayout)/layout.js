"use client"

import Footer from "@/components/footer/Footer";
import Banner from "@/components/home/Banner";
import Ficilities from "@/components/home/Ficilities";
import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";
import React from "react";

const CommonLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col bg-[#000] text-white">
      {/* Header */}
      <Navbar className="" />
      {pathname === "/" && (
        <div className="60">
          <Banner />
          {/* <Ficilities /> */}
        </div>
      )}
      {/* Main content */}
      <div className="bg-[#000] flex flex-col flex-grow">
        <main className="lg:my-20 my-10 flex-1">
          <div className="">{children}</div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CommonLayout;
