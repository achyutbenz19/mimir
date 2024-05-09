import { GeneratedUIProps } from "@/lib/types";
import GeneratedUI from "./GeneratedUI";
import { StreamText } from "./StreamText";

const Generation = ({
  transcription,
  message,
  currentUIComponent,
  useSpotify,
  useRabbitMode,
}: GeneratedUIProps) => {
  return (
    <div className="flex-col flex h-full max-h-[calc(100vh-160px)] justify-between text-2xl flex-1 break-words items-center">
      <div className="flex mt-20 justify-center max-h-[40%] overflow-y-auto text-3xl items-center w-full max-w-3xl text-center">
        {message && message.message && <StreamText words={message.message} />}
      </div>
      <GeneratedUI
        message={message!}
        currentUIComponent={currentUIComponent!}
        useSpotify={useSpotify}
        useRabbitMode={useRabbitMode}
      />
      <div className="flex items-center max-h-[40%] justify-center overflow-y-auto max-w-3xl text-center w-full">
        {transcription}
      </div>
    </div>
  );
};

export default Generation;
