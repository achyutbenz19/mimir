"use client";
import InputComponent from "@/components/InputComponent";
import { useActions, readStreamableValue } from "ai/rsc";
import React, { useState } from "react";
import { AI } from "./action";
import { UIComponent, Message } from "@/lib/types";
import GeneratedUI from "@/components/GeneratedUI";

const Main = () => {
  const { action } = useActions<typeof AI>();
  const [useLudicrousMode, setUseLudicrousMode] = useState(true);
  const [useTTS, setUseTTS] = useState(false);
  const [useInternet, setUseInternet] = useState(false);
  const [usePhotos, setUsePhotos] = useState(false);
  const [useRabbitMode, setuseRabbitMode] = useState(false);
  const [useSpotify, setUseSpotify] = useState("");
  const [currentTranscription, setCurrentTranscription] = useState<{
    transcription: string;
    responseTime: number;
  } | null>(null);
  const [totalResponseTime, setTotalResponseTime] = useState<number | null>(
    null,
  );
  const [currentUIComponent, setCurrentUIComponent] =
    useState<UIComponent | null>(null);
  const [message, setMessage] = useState<{
    message: string;
    responseTime: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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

  return (
    <div>
      {currentTranscription?.transcription}
      {message?.message}
      {totalResponseTime}
      <InputComponent
        onSubmit={handleSubmit}
        useTTS={true}
        useInternet={true}
        usePhotos={true}
        useLudicrousMode={true}
        useRabbitMode={true}
      />
      <GeneratedUI
        message={message!}
        currentUIComponent={currentUIComponent!}
        useSpotify={useSpotify}
        useRabbitMode={useRabbitMode}
      />
    </div>
  );
};

export default Main;
