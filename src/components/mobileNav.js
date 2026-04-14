import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MobileNav = ({ showMenu, setShowMenu }) => {
  const [user] = useAuthState(auth);

  const links = [
    { title: "HOME", path: "/" },
    { title: "FEED", path: "/feed" },
    {
      title: "POST",
      path: "/post",
    },
  ];

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      alert("Error during sign-in:", error);
    });
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-[13vh] w-full bg-yellow-100 bg-opacity-80 ${showMenu ? "border-transparent" : "border-primary"} border-b-4 border-double grid-cols-6 place-items-center font-montserrat grid text-primary z-10`}
    >
      <NavLink to="/" className={`text-xl col-span-3`}>
        <b>HAIKUATRY</b>
      </NavLink>
      <div
        className={`w-full h-[32vh] absolute top-[13vh] left-0 grid grid-rows-4 place-items-center text-center text-lg bg-inherit border-b-4 border-b-primary border-double  ${showMenu ? "block" : "hidden"}`}
      >
        {links.map((link) => (
          <a href={link.path}>
            <b>{link.title}</b>
          </a>
        ))}
        <button onClick={user ? signOut : googleSignIn}>
          <b>{user ? "SIGN OUT" : "SIGN IN"}</b>
        </button>
      </div>
      {links.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `text-lg text-center col-start-5 ${isActive ? "block" : "hidden"}`
          }
        >
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2"
          >
            <b>{link.title}</b>
            {showMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;
