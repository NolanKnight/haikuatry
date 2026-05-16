import React, { useRef, useState } from "react";
import NavBar from "./navBar";
import MobileNav from "./mobileNav";
import Background from "./background";

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

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
        <div className="w-full grid grid-cols-10 place-items-center">
          <div id="page" className="w-full col-start-4 col-span-4">
            {children}
          </div>
        </div>
      </div>
      <div
        ref={mobileRef}
        className={`w-full grid grid-cols-12 place-items-center ${showMenu ? "h-[55vh] mt-[45vh]" : "h-[87vh] mt-[13vh]"} overflow-y-auto sm:hidden block`}
      >
        <Background layoutRef={mobileRef} />
        <MobileNav showMenu={showMenu} setShowMenu={setShowMenu} />
        <div id="page" className="w-full mt-4 col-span-10 col-start-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
