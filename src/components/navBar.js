import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { NavLink } from "react-router-dom";

const NavBar = ({ layoutRef }) => {
  const [user] = useAuthState(auth);
  const [scrollY, setScrollY] = useState(0);

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
      setScrollY(element.scrollTop);
    };

    element.addEventListener("scroll", handleScroll);

    return () => element.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed h-36 w-full grid grid-cols-10 place-items-center font-montserrat">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-3xl text-blue-800 col-span-3 border-b-4 ${isActive ? "border-blue-800" : "border-transparent"}`
        }
      >
        <b>HAIKUATRY</b>
      </NavLink>
      <div className="col-start-6 col-span-4 w-full h-full grid place-items-center grid-cols-3">
        {[
          { title: "FEED", path: "/feed", isCompact: "translate-x-[26.67vw]" },
          {
            title: "POST",
            path: "/post",
            isCompact: "translate-x-[13.33vw] translate-y-10",
          },
        ].map((link) => (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `text-lg w-24 text-center text-blue-800 border-b-4 ${isActive ? "border-blue-800" : "border-transparent"} transition-transform duration-500 ease-in-out ${
                isCompact() ? link.isCompact : "translate-x-0 translate-y-0"
              }`
            }
          >
            <b>{link.title}</b>
          </NavLink>
        ))}
        <button
          onClick={user ? signOut : googleSignIn}
          className={`text-lg w-24 text-center text-blue-800 border-b-4 border-transparent transition-transform duration-500 ease-in-out ${
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
