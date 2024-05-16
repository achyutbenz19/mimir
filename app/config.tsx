export const config = {
  inferenceModelProvider: "groq", // 'groq' or 'openai'
  inferenceModel: "llama3-8b-8192", // Groq: 'llama3-70b-8192' or 'llama3-8b-8192'.. OpenAI: 'gpt-4-turbo etc

  whisperModelProvider: "openai", // 'groq' or 'openai'
  whisperModel: "whisper-1", // Groq: 'whisper-large-v3' OpenAI: 'whisper-1'

  ttsModelProvider: "openai", // only openai supported for now...
  ttsModel: "tts-1", // only openai supported for now...
  ttsvoice: "alloy", // only openai supported for now... [alloy, echo, fable, onyx, nova, and shimmer]

  visionModelProvider: "openai", // 'openai' or 'fal.ai'
  visionModel: "gpt-4o", // OpenAI: 'gpt-4-turbo' Fal.ai: 'llava-next'

  functionCallingModelProvider: "openai", // 'openai' current only
  functionCallingModel: "gpt-3.5-turbo", // OpenAI: 'gpt-3-5-turbo'

  enableResponseTimes: true, // Display response times for each message
  enableSettingsUIToggle: true, // Display the settings UI toggle
  enableTextToSpeechUIToggle: true, // Display the text to speech UI toggle
  enableInternetResultsUIToggle: true, // Display the internet results UI toggle
  enableUsePhotUIToggle: true, // Display the use photo UI toggle
  enabledRabbitMode: true, // Enable the rabbit mode UI toggle
  enabledBasicMode: true, // Enable the basic mode UI toggle
  useAttributionComponent: false, // Use the attribution component to display the attribution of the AI models/services used

  useRateLimiting: false, // Use Upstash rate limiting to limit the number of requests per user

  useLangSmith: true, // Use LangSmith by Langchain to trace the execution of the functions in the config.tsx set to true to use.

  searchEngine: "BRAVE", // Use Brave or Serper
};
