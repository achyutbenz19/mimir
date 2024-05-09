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
  message: {
    message: string;
    responseTime: number;
  };
  currentUIComponent: UIComponent;
  useSpotify: string;
  useRabbitMode: boolean;
}
