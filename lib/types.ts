export interface UIComponent {
  component: string;
  data: any;
}

export interface Message {
  rateLimitReached: any;
  transcription?: string;
  audio?: string;
  result?: string;
  weather?: string;
  spotify?: string;
  time?: string;
}

export interface InputComponentProps {
  onSubmit: (formData: FormData) => void;
  useTTS: boolean;
  useInternet: boolean;
  usePhotos: boolean;
  useLudicrousMode: boolean;
  useRabbitMode: boolean;
}

export interface GeneratedUIProps {
  transcription?: string;
  message?: {
    message: string;
    responseTime: number;
  };
  currentUIComponent?: UIComponent;
  useSpotify?: string;
  useRabbitMode?: boolean;
  totalResponseTime?: number;
}

export interface SettingsProps {
  useTTS: boolean;
  useInternet: boolean;
  usePhotos: boolean;
  useLudicrousMode: boolean;
  useRabbitMode: boolean;
  onTTSToggle: () => void;
  onInternetToggle: () => void;
  onPhotosToggle: () => void;
  onLudicrousModeToggle: () => void;
  onRabbitModeToggle: () => void;
  setTTS: (useTTS: boolean) => void;
  setInternet: (useInternet: boolean) => void;
  setPhotos: (usePhotos: boolean) => void;
}

export interface WeatherDataItem {
  time: string;
  temperature: number;
}

export interface WeatherDataProps {
  data: WeatherDataItem[];
}
