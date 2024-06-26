import { ClickProps } from "@/lib/types";

export const suggestions = [
  "What is the time right now?",
  'Play "Blinding Lights" by the Weeknd.',
  "What is the current weather in Chicago?",
];

const Suggestions = ({ handleClick }: ClickProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-4">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="border cursor-pointer hover:bg-muted drop-shadow-sm text-sm rounded-full p-2"
          onClick={() => handleClick(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
