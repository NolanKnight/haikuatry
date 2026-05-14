import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NavLink } from "react-router-dom";

const NavBar = ({ layoutRef }) => {
  const [user] = useAuthState(auth);
  const [scrollY, setScrollY] = useState(0);

  const linksContainerWidthToNavWidth = 0.5;
  const [linksContainerWidth, setLinksContainerWidth] = useState(
    layoutRef.current
      ? layoutRef.current.clientWidth * linksContainerWidthToNavWidth
      : (window.innerWidth - 15) * linksContainerWidthToNavWidth,
  );

  const isCompact = scrollY > 36;

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
      setScrollY(element.scrollTop);
    };

    element.addEventListener("scroll", handleScroll);

    return () => element.removeEventListener("scroll", handleScroll);
  }, [layoutRef, isCompact]);

  useEffect(() => {
    const element = layoutRef.current;
    if (!element) return;

    const handleResize = () => {
      setLinksContainerWidth(
        element.clientWidth * linksContainerWidthToNavWidth,
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [layoutRef]);

  return (
    <div className="sticky whitespace-nowrap top-0 left-0 h-36 w-full grid grid-cols-10 place-items-center font-montserrat">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-3xl button col-span-3 border-b-4 ${isActive ? "border-blue-800" : "border-transparent"}`
        }
      >
        <b>HAIKUATRY</b>
      </NavLink>
      <div className="col-start-6 translate-x-0 col-span-5 w-full h-full grid place-items-center grid-cols-3">
        {[
          {
            title: "FEED",
            path: "/feed",
            style: {
              transform: isCompact
                ? `translateX(${linksContainerWidth * (2 / 3)}px)`
                : "translateX(0) translateY(0)",
            },
          },
          {
            title: "POST",
            path: "/post",
            style: {
              transform: isCompact
                ? `translateX(${linksContainerWidth * (1 / 3)}px) translateY(40px)`
                : "translateX(0) translateY(0)",
            },
          },
        ].map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            style={link.style}
            className={({ isActive }) =>
              `text-lg px-1 text-center button border-b-4 ${isActive ? "border-blue-800" : "border-transparent"} `
            }
          >
            <b>{link.title}</b>
          </NavLink>
        ))}
        <button
          onClick={user ? signOut : googleSignIn}
          className={`text-lg px-1 text-center button border-b-4 border-transparent ${
            isCompact ? "translate-y-[80px]" : "translate-y-0"
          }`}
        >
          <b>{user ? "SIGN OUT" : "SIGN IN"}</b>
        </button>
      </div>
    </div>
  );
};
export default NavBar;
