import React from "react";

const Haiku = ({ haiku }) => {
  return (
    <div className="w-full h-fit gap-6 grid grid-rows-[auto,auto,auto,auto,auto] place-items-center text-center box mb-20">
      <h1 className="text-4xl">{haiku.title}</h1>
      <h1 className="text-lg">By {haiku.name}</h1>
      <p className="text">{haiku.line1}</p>
      <p className="text">{haiku.line2}</p>
      <p className="text">{haiku.line3}</p>
    </div>
  );
};

export default Haiku;
