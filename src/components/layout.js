import React, { useRef } from "react";
import NavBar from "./navBar";
import MobileNav from "./mobileNav";

const Layout = ({ children }) => {
  const ref = useRef(null);

  return (
    <>
      <div
        ref={ref}
        className="w-full h-screen overflow-y-auto scrollbar-gutter bg-yellow-100 sm:block hidden"
      >
        <NavBar layoutRef={ref} />
        <div className="w-full grid grid-cols-10 place-items-center">
          <div id="page" className="w-full col-start-4 col-span-4">
            {children}
          </div>
        </div>
      </div>
      <div className="w-full h-screen overflow-y-auto bg-yellow-100 sm:hidden block">
        <MobileNav />
        <div id="page" className="w-full mt-16">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
