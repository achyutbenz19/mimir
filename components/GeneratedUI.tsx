import React from "react";
import { GeneratedUIProps } from "@/lib/types";
import { SpotifyTrack } from "./tools/Spotify";
import { WeatherData } from "./tools/Weather";
import { ClockComponent } from "./tools/Clock";

const GeneratedUI = ({ currentUIComponent, useSpotify }: GeneratedUIProps) => {
  return (
    <div className="my-5">
      {useSpotify && (
        <div className="max-w-3xl">
          <SpotifyTrack trackId={useSpotify} />
        </div>
      )}
      {currentUIComponent && currentUIComponent.component === "weather" && (
        <div className="max-w-xl">
          <WeatherData data={currentUIComponent.data} />
        </div>
      )}
      {currentUIComponent && currentUIComponent.component === "time" && (
        <ClockComponent />
      )}
    </div>
  );
};

export default GeneratedUI;
