import React, { useEffect, useRef, useState } from "react";
import bgImages from "../bgImages";

const Background = ({ layoutRef }) => {
  const getImageHeight = () => window.innerHeight;

  const [, setRenderTick] = useState(0);
  const virtualScroll = useRef(getImageHeight());

  const randBg = (excluded) => {
    const allowed = bgImages.filter((bg) => !excluded.includes(bg));

    return allowed[Math.floor(Math.random() * allowed.length)];
  };

  const [bgArray, setBgArray] = useState(() => {
    const arr = new Array(4);

    for (let i = 0; i < arr.length; i++) {
      arr[i] = randBg([...arr.slice(0, i), bgImages[0]]);
    }

    arr[1] = bgImages[0];

    return arr;
  });

  useEffect(() => {
    const layout = layoutRef.current;

    if (!layout) return;

    const handleWheel = (e) => {
      e.preventDefault();

      layout.scrollTop += e.deltaY;

      virtualScroll.current += e.deltaY * 0.3;

      const fraction = virtualScroll.current / getImageHeight();

      if (fraction >= 2) {
        virtualScroll.current -= getImageHeight();

        setBgArray((prev) => {
          return [...prev.slice(1), randBg(prev)];
        });
      }

      if (fraction <= 1) {
        virtualScroll.current += getImageHeight();

        setBgArray((prev) => {
          return [randBg(prev), ...prev.slice(0, -1)];
        });
      }

      setRenderTick((v) => v + 1);
    };

    layout.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      layout.removeEventListener("wheel", handleWheel);
    };
  }, [layoutRef]);

  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div
        style={{
          transform: `translateY(-${virtualScroll.current}px)`,
        }}
      >
        {bgArray.map((image, i) => (
          <div
            key={`${image}-${i}`}
            className="w-screen h-screen"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;
