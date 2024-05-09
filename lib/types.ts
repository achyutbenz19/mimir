import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

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
  useBasicMode: boolean;
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
  handleClick?: (suggestion: string) => void;
}

export interface SettingsProps {
  useTTS: boolean;
  useInternet: boolean;
  usePhotos: boolean;
  useBasicMode: boolean;
  useRabbitMode: boolean;
  onTTSToggle: () => void;
  onInternetToggle: () => void;
  onPhotosToggle: () => void;
  onBasicModeToggle: () => void;
  onRabbitModeToggle: () => void;
  setBasicMode: (useBasicMode: boolean) => void;
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

export interface AttributionComponentProps {
  usePhotos: boolean;
  useInternet: boolean;
  useTTS: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export interface ClickProps {
  handleClick: (suggestion: string) => void;
}
