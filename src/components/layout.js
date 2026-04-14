import React, { useRef } from "react";
import NavBar from "./navBar";
import MobileNav from "./mobileNav";
import Background from "./background";

const Layout = ({ children }) => {
  const ref = useRef(null);
	const mobileRef = useRef(null);

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
      <div ref={mobileRef} className="w-full h-[87vh] mt-[13vh] overflow-y-auto sm:hidden block">
				<Background layoutRef={mobileRef} />
				<MobileNav />
        <div id="page" className="w-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
