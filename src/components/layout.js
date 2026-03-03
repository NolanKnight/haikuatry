import React, { useRef } from "react";
import NavBar from "./navBar";

const Layout = ({ children }) => {
	const ref = useRef(null);

  return (
		<div ref={ref} className="w-full h-screen overflow-y-auto scrollbar-gutter bg-yellow-100">
			<NavBar layoutRef={ref} />
			<div id="page" className="w-full mt-36">
				{children}
			</div>
		</div>
  );
};

export default Layout;