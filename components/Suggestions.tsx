import { ClickProps } from "@/lib/types";

export const suggestions = [
  "What is the time right now?",
  'Play "My eyes" by Travis Scott',
  "What is the weahter in Chicago?",
];

const Suggestions = ({ handleClick }: ClickProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-4">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="border cursor-pointer hover:bg-muted text-sm rounded-full p-2"
          onClick={() => handleClick(suggestion)}
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
