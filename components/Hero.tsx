import React from "react";
import { BackgroundBeams } from "./Beams";
import Suggestions from "./Suggestions";
import { ClickProps } from "@/lib/types";

const Hero = ({ handleClick }: ClickProps) => {
  return (
    <>
      <div className="md:mt-56 z-[20] text-center mt-40 flex flex-col">
        <span className="text-7xl">Mimir</span>
        <span className="md:text-2xl text-xl text-neutral-500 mt-6">
          ask anything.
        </span>
        <div className="mt-12">
          <Suggestions handleClick={handleClick} />
        </div>
      </div>
      <BackgroundBeams />
    </>
  );
};

export default Hero;
