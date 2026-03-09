import React from "react";

const Haiku = ({ haiku }) => {
  return (
    <div className="w-full h-fit p-4 grid grid-rows-6 place-items-center text-center">
      <h1 className="text-4xl">{haiku.title}</h1>
      <h1 className="text-lg text-black">By {haiku.name}</h1>
      <p className="text">{haiku.line1}</p>
      <p className="text">{haiku.line2}</p>
      <p className="text">{haiku.line3}</p>
      <div className="w-full h-[2px] bg-blue-800" />
    </div>
  );
};

export default Haiku;
