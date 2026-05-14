import React, { useEffect, useRef, useState } from "react";
import bgImages from "../bgImages";

const Background = ({ layoutRef }) => {
  const ref = useRef(null);
  const neededScroll = useRef(0);
  const lastScroll = useRef(0);

  const randBg = (unallowedBgs) => {
    const allowedBgs = bgImages.filter((bg) => !unallowedBgs.includes(bg));

    if (allowedBgs.length === 0) {
      console.error("No available backgrounds to choose from.");
      return null;
    }

    return allowedBgs[Math.floor(Math.random() * allowedBgs.length)];
  };

  const [bgArray, setBgArray] = useState(() => {
    const newArray = new Array(4);

    newArray[0] = bgImages[0];

    for (let i = 1; i < newArray.length; i++) {
      newArray[i] = randBg(newArray.slice(0, i));
    }

    return newArray;
  });

  useEffect(() => {
    const layout = layoutRef.current;
    const element = ref.current;

    if (!layout || !element) {
      return;
    }

    const scrollDownBgArray = () =>
      setBgArray((prevArray) => {
        const newArray = new Array(prevArray.length);

        newArray[newArray.length - 1] = randBg(prevArray);

        for (let i = 0; i < newArray.length - 1; i++) {
          newArray[i] = prevArray[i + 1];
        }

        return newArray;
      });

    const scrollUpBgArray = () =>
      setBgArray((prevArray) => {
        const newArray = new Array(prevArray.length);

        newArray[0] = randBg(prevArray);

        for (let i = 1; i < newArray.length; i++) {
          newArray[i] = prevArray[i - 1];
        }

        return newArray;
      });

    const handleScroll = (e) => {
      e.preventDefault();

      layout.scrollTop += e.deltaY;
      element.scrollTop += neededScroll.current + e.deltaY * 0.3;

      neededScroll.current = 0;

      if (
        element.scrollTop >= 0.75 * element.scrollHeight &&
        lastScroll.current <= 0.75 * element.scrollHeight
      ) {
        scrollDownBgArray();
        neededScroll.current = -element.scrollHeight / bgArray.length;
      } else if (
        element.scrollTop <= 0.25 * element.scrollHeight &&
        lastScroll.current >= 0.25 * element.scrollHeight
      ) {
        scrollUpBgArray();
        neededScroll.current = element.scrollHeight / bgArray.length;
      }

      lastScroll.current = element.scrollTop;
    };

    layout.addEventListener("wheel", handleScroll);

    return () => layout.removeEventListener("wheel", handleScroll);
  }, [ref, layoutRef, bgArray]);

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden"
    >
      {bgArray.map((image) => (
        <div
          key={image}
          className="w-screen h-screen"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      ))}
    </div>
  );
};

export default Background;
