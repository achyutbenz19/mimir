import React from "react";
import { BackgroundBeams } from "./Beams";

const Hero = () => {
  return (
    <>
      <div className="md:mt-56 text-center mt-40 flex flex-col">
        <span className="text-7xl">Mimir</span>
        <span className="md:text-2xl text-xl text-neutral-500 mt-6">
          ask anything.
        </span>
      </div>
      <BackgroundBeams />
    </>
  );
};

export default Hero;
