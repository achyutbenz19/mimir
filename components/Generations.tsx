import { GeneratedUIProps } from "@/lib/types";
import GeneratedUI from "./GeneratedUI";
import { StreamText } from "./StreamText";
import Hero from "./Hero";
import Spinner from "./Spinner";

const Generation = ({
  transcription,
  message,
  useSpotify,
  currentUIComponent,
  totalResponseTime,
}: GeneratedUIProps) => {
  return (
    <div className="flex-col flex h-full max-h-[calc(100vh-160px)] justify-between text-2xl flex-1 break-words items-center">
      {message && (
        <>
          <div className="flex leading-2 mt-20 justify-center max-h-[40%] overflow-y-auto text-3xl items-center w-full max-w-3xl text-center">
            <StreamText words={message.message} />
          </div>
          <GeneratedUI
            useSpotify={useSpotify}
            currentUIComponent={currentUIComponent}
          />
          <div className="flex items-center max-h-[40%] justify-center overflow-y-auto max-w-3xl text-center w-full">
            {transcription}
          </div>
        </>
      )}
      {message === undefined && <Hero />}
      {message === null && (
        <div className="flex mt-20 w-full h-full justify-center items-center">
          <Spinner />
        </div>
      )}
      <span className="text-lg hidden md:block md:text-sm absolute md:bottom-10 md:right-10 text-neutral-400">
        {totalResponseTime && `generated in ${totalResponseTime.toFixed(3)}ms`}
      </span>
    </div>
  );
};

export default Generation;
