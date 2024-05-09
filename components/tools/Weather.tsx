import { WeatherDataItem, WeatherDataProps } from "@/lib/types";
import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

const getWeatherIcon = (temperature: number) => {
  if (temperature >= 25) {
    return <WiDaySunny className="text-yellow-600 text-2xl" />;
  } else if (temperature >= 10) {
    return <WiCloudy className="text-yellow-600 text-2xl" />;
  } else if (temperature >= 0) {
    return <WiRain className="text-yellow-600 text-2xl" />;
  } else {
    return <WiSnow className="text-yellow-600 text-2xl" />;
  }
};

const formatTime = (time: string) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;
  return formattedTime;
};

export const WeatherData: React.FC<WeatherDataProps> = ({ data }) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const currentIndex = data.findIndex((item) => {
    const itemTime = new Date(item.time);
    return itemTime.getHours() === currentHour;
  });

  const slicedData = data.slice(currentIndex);

  return (
    <div className="rounded-xl p-2 border-2 w-full font-sans text-xl text-center">
      <div className="overflow-x-auto whitespace-nowrap flex items-center p-2 rounded-lg">
        {slicedData.map((item, index) => (
          <div key={index} className="flex flex-col items-center mr-4">
            <div className="text-sm font-bold">{formatTime(item.time)}</div>
            <div className="text-lg font-bold">
              {getWeatherIcon(item.temperature)}
            </div>
            <div className="text-sm font-bold">
              {((item.temperature * 9) / 5 + 32).toFixed(1)}°F
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
