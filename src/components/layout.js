import React, { useRef } from "react";
import NavBar from "./navBar";
import MobileNav from "./mobileNav";
import Background from "./background";

const Layout = ({ children }) => {
  const ref = useRef(null);

  return (
    <>
      <div
        ref={ref}
				className="w-full h-screen overflow-y-auto scrollbar-gutter sm:block hidden bg-center bg-cover"
      >
				<Background layoutRef={ref} />
        <NavBar layoutRef={ref} />
        <div className="w-full grid grid-cols-3 place-items-center">
          <div id="page" className="w-full mt-36 col-start-2">
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
