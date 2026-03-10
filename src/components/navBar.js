import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NavLink } from "react-router-dom";

const NavBar = ({ layoutRef }) => {
  const [user] = useAuthState(auth);
  const [scrollY, setScrollY] = useState(0);
	// const [linksContainerWidth, setLinksContainerWidth] = useState(window.innerWidth * 0.4);

  const isCompact = () => scrollY > 36;

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      alert("Error during sign-in:", error);
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const element = layoutRef.current;
    if (!element) return;

    const handleScroll = () => {
			console.log("scroll");
      setScrollY(element.scrollTop);
    };

		console.log("window: ", window.innerWidth);

    element.addEventListener("scroll", handleScroll);

    return () => element.removeEventListener("scroll", handleScroll);
  }, [layoutRef]);

  // useEffect(() => {
	// 	console.log("layoutEffect");

	// 	const element = layoutRef.current;
	// 	if (!element) return;

	// 	const handleResize = () => {
	// 		console.log("resize");
	// 		setLinksContainerWidth(element.offsetWidth);
	// 	};

	// 	element.addEventListener("resize", handleResize);

  //   return () => element.removeEventListener("resize", handleResize);
  // }, [layoutRef]);


  return (
    <div className="sticky top-0 left-0 h-36 w-full grid grid-cols-10 place-items-center font-montserrat">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-3xl button col-span-3 border-b-4 ${isActive ? "border-blue-800" : "border-transparent"}`
        }
      >
        <b>HAIKUATRY</b>
      </NavLink>
      <div className="col-start-6 translate-x-0 col-span-4 w-full h-full grid place-items-center grid-cols-3">
        {[
          { title: "FEED", path: "/feed", isCompact: "translate-x-[400%]" },
          {
            title: "POST",
            path: "/post",
            isCompact: "translate-x-[200%] translate-y-10",
          },
        ].map((link) => (
          <NavLink
            to={link.path}
						key={link.path}
						// style={{ transform: isCompact() ? link.isCompact : "translateX(0) translateY(0)" }}
            className={({ isActive }) =>
              `text-lg px-4 text-center button border-b-4 ${isActive ? "border-blue-800" : "border-transparent"} ${
                isCompact() ? link.isCompact : "translate-x-0 translate-y-0"
              }`
            }
          >
            <b>{link.title}</b>
          </NavLink>
        ))}
        <button
          onClick={user ? signOut : googleSignIn}
          className={`text-lg px-4 text-center button border-b-4 border-transparent ${
            isCompact() ? "translate-y-20" : "translate-y-0"
          }`}
        >
          <b>{user ? "SIGN OUT" : "SIGN IN"}</b>
        </button>
      </div>
    </div>
  );
};
export default NavBar;
