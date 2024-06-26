"use client";
import InputComponent from "@/components/InputComponent";
import { useActions, readStreamableValue } from "ai/rsc";
import React, { useEffect, useState } from "react";
import { AI } from "./action";
import { UIComponent, Message } from "@/lib/types";
import Generation from "@/components/Generations";
import { Settings } from "@/components/Settings";
import Spinner from "@/components/Spinner";

const Main = () => {
  const { action } = useActions<typeof AI>();
  const [useBasicMode, setUseBasicMode] = useState(false);
  const [useTTS, setUseTTS] = useState(true);
  const [useInternet, setUseInternet] = useState(true);
  const [usePhotos, setUsePhotos] = useState(false);
  const [useRabbitMode, setuseRabbitMode] = useState(false);
  const [useSpotify, setUseSpotify] = useState("");
  const [currentTranscription, setCurrentTranscription] = useState<
    | {
        transcription: string;
        responseTime: number;
      }
    | null
    | undefined
  >(undefined);
  const [totalResponseTime, setTotalResponseTime] = useState<number | null>(
    null,
  );
  const [currentUIComponent, setCurrentUIComponent] =
    useState<UIComponent | null>(null);
  const [message, setMessage] = useState<
    | {
        message: string;
        responseTime: number;
      }
    | null
    | undefined
  >(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleClick = (suggestion: string) => {
    const formData = new FormData();
    formData.append("text", suggestion);
    formData.append("useTTS", String(useTTS));
    formData.append("useInternet", String(useInternet));
    formData.append("usePhotos", String(usePhotos));
    formData.append("useBasicMode", String(useBasicMode));
    handleSubmit(formData);
  };

  const handleSubmit = async (formData: FormData) => {
    const startTime = Date.now();
    const streamableValue = await action(formData);
    let transcriptionResponseTime;
    let transcriptionCompletionTime;
    let messageResponseTime;
    let audioResponseTime;
    setCurrentUIComponent(null);
    setMessage(null);

    for await (const message of readStreamableValue<Message>(streamableValue)) {
      if (
        message &&
        message.rateLimitReached &&
        typeof message.rateLimitReached === "string"
      ) {
        setMessage({ message: message.rateLimitReached, responseTime: 0 });
      }
      if (message && message.time && typeof message.time === "string") {
        setCurrentUIComponent({ component: "time", data: message.time });
      }
      if (
        message &&
        message.transcription &&
        typeof message.transcription === "string"
      ) {
        transcriptionResponseTime = (Date.now() - startTime) / 1000;
        transcriptionCompletionTime = Date.now();
        setCurrentTranscription({
          transcription: message.transcription,
          responseTime: transcriptionResponseTime,
        });
      }
      if (message && message.weather && typeof message.weather === "string") {
        setCurrentUIComponent({
          component: "weather",
          data: JSON.parse(message.weather),
        });
      }
      if (message && message.result && typeof message.result === "string") {
        messageResponseTime =
          (Date.now() - (transcriptionCompletionTime || startTime)) / 1000;
        setMessage({
          message: message.result,
          responseTime: messageResponseTime,
        });
      }
      if (message && message.audio && typeof message.audio === "string") {
        audioResponseTime =
          (Date.now() - (transcriptionCompletionTime || startTime)) / 1000;
        const audio = new Audio(message.audio);
        audio.play();
      }
      if (message && message.spotify && typeof message.spotify === "string") {
        setUseSpotify(message.spotify);
      }
    }

    let totalResponseTime = 0;
    if (transcriptionResponseTime) {
      totalResponseTime += transcriptionResponseTime;
    }
    if (messageResponseTime) {
      totalResponseTime += messageResponseTime;
    }
    if (audioResponseTime) {
      totalResponseTime += audioResponseTime;
    }
    setTotalResponseTime(totalResponseTime);
  };

  const handleReset = () => {
    setTotalResponseTime(null);
    setCurrentTranscription(null);
    setCurrentUIComponent(null);
    setMessage(undefined);
  };

  return (
    <div className="flex-col flex h-screen">
      <div
        className="absolute cursor-pointer w-fit z-30 top-10 md:left-10 right-10"
        onClick={handleReset}
      >
        Mimir
      </div>
      <Generation
        transcription={currentTranscription?.transcription!}
        message={message!}
        currentUIComponent={currentUIComponent!}
        useSpotify={useSpotify}
        useRabbitMode={useRabbitMode}
        totalResponseTime={totalResponseTime!}
        handleClick={handleClick}
      />
      <InputComponent
        onSubmit={handleSubmit}
        useTTS={useTTS}
        useInternet={useInternet}
        usePhotos={usePhotos}
        useBasicMode={useBasicMode}
        useRabbitMode={useRabbitMode}
      />
      <Settings
        useBasicMode={useBasicMode}
        useTTS={useTTS}
        useInternet={useInternet}
        usePhotos={usePhotos}
        useRabbitMode={useRabbitMode}
        onBasicModeToggle={() => setUseBasicMode(!useBasicMode)}
        onTTSToggle={() => setUseTTS(!useTTS)}
        onInternetToggle={() => setUseInternet(!useInternet)}
        onPhotosToggle={() => setUsePhotos(!usePhotos)}
        onRabbitModeToggle={() => setuseRabbitMode(!useRabbitMode)}
        setBasicMode={setUseBasicMode}
        setTTS={setUseTTS}
        setInternet={setUseInternet}
        setPhotos={setUsePhotos}
      />
    </div>
  );
};

export default Main;
