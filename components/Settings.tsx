import { config } from '../config';

interface SettingsProps {
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

export const Settings: React.FC<SettingsProps> = ({
  useTTS,
  useInternet,
  usePhotos,
  useLudicrousMode,
  useRabbitMode,
  onTTSToggle,
  onInternetToggle,
  onPhotosToggle,
  onLudicrousModeToggle,
  onRabbitModeToggle,
  setTTS,
  setInternet,
  setPhotos,
}) => {
  const handleLudicrousModeToggle = () => {
    onLudicrousModeToggle();
    if (!useLudicrousMode) {
      setTTS(false);
      setInternet(false);
      setPhotos(false);
    }
  };

  return (
    <div className="absolute bottom-24 left-7 bg-white rounded-md shadow-md p-4 animate-slide-up">
      {config.enabledLudicrousMode && (
        <>
          <div className="flex items-center mb-1">
            <label htmlFor="ludicrous-mode-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="ludicrous-mode-toggle"
                  className="sr-only"
                  checked={useLudicrousMode}
                  onChange={handleLudicrousModeToggle}
                />
                <div className={`block w-10 h-6 rounded-full ${useLudicrousMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useLudicrousMode ? 'transform translate-x-full' : ''}`}></div>
              </div>
              <div className="ml-3 text-sm">Ludicrous Mode</div>
            </label>
          </div>
          <div className="text-xs text-gray-500 mb-2">(Groq Llama3 + Groq Whisper only)</div>
        </>
      )}
      {config.enableTextToSpeechUIToggle && (
        <div className="flex items-center mb-2">
          <label htmlFor="tts-toggle" className="flex items-center cursor-pointer">
            <div className={`relative ${useLudicrousMode ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input
                type="checkbox"
                id="tts-toggle"
                className="sr-only"
                checked={useTTS && !useLudicrousMode}
                onChange={onTTSToggle}
                disabled={useLudicrousMode}
              />
              <div className={`block w-10 h-6 rounded-full ${useTTS && !useLudicrousMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useTTS && !useLudicrousMode ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm">Text-to-Speech</div>
          </label>
        </div>
      )}
      {config.enableInternetResultsUIToggle && (
        <div className="flex items-center mb-2">
          <label htmlFor="internet-toggle" className="flex items-center cursor-pointer">
            <div className={`relative ${useLudicrousMode ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input
                type="checkbox"
                id="internet-toggle"
                className="sr-only"
                checked={useInternet && !useLudicrousMode}
                onChange={onInternetToggle}
                disabled={useLudicrousMode}
              />
              <div className={`block w-10 h-6 rounded-full ${useInternet && !useLudicrousMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useInternet && !useLudicrousMode ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm">Use Internet Results</div>
          </label>
        </div>
      )}
      {config.enableUsePhotUIToggle && (
        <div className="flex items-center mb-2">
          <label htmlFor="photos-toggle" className="flex items-center cursor-pointer">
            <div className={`relative ${useLudicrousMode ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <input
                type="checkbox"
                id="photos-toggle"
                className="sr-only"
                checked={usePhotos && !useLudicrousMode}
                onChange={onPhotosToggle}
                disabled={useLudicrousMode}
              />
              <div className={`block w-10 h-6 rounded-full ${usePhotos && !useLudicrousMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${usePhotos && !useLudicrousMode ? 'transform translate-x-full' : ''}`}></div>
            </div>
            <div className="ml-3 text-sm">Use Photos</div>
          </label>
        </div>
      )}
      <div className="flex items-center">
        <label htmlFor="rabbit-mode-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="rabbit-mode-toggle"
              className="sr-only"
              checked={useRabbitMode}
              onChange={onRabbitModeToggle}
            />
            <div className={`block w-10 h-6 rounded-full ${useRabbitMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${useRabbitMode ? 'transform translate-x-full' : ''}`}></div>
          </div>
          <div className="ml-3 text-sm flex items-center">
            Rabbit Mode
          </div>
        </label>
      </div>
    </div>
  );
};