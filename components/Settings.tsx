import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SettingsProps } from "@/lib/types";

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
    <div className="md:bottom-10 md:top-auto z-[20] top-5 left-5 font-normal md:left-10 font-sans absolute">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="py-6">
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent alignOffset={10} className="ml-4 p-2 font-sans">
          <DropdownMenuItem>
            <div className="flex items-center mb-2 mt-1">
              <label
                htmlFor="ludicrous-mode-toggle"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="ludicrous-mode-toggle"
                    className="sr-only"
                    checked={useLudicrousMode}
                    onChange={handleLudicrousModeToggle}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full ${
                      useLudicrousMode ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      useLudicrousMode ? "transform translate-x-full" : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-sm">Ludicrous Mode</div>
              </label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center mb-2">
              <label
                htmlFor="tts-toggle"
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`relative ${
                    useLudicrousMode ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="tts-toggle"
                    className="sr-only"
                    checked={useTTS && !useLudicrousMode}
                    onChange={onTTSToggle}
                    disabled={useLudicrousMode}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full ${
                      useTTS && !useLudicrousMode
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      useTTS && !useLudicrousMode
                        ? "transform translate-x-full"
                        : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-sm">Text-to-Speech</div>
              </label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center mb-2">
              <label
                htmlFor="internet-toggle"
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`relative ${
                    useLudicrousMode ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="internet-toggle"
                    className="sr-only"
                    checked={useInternet && !useLudicrousMode}
                    onChange={onInternetToggle}
                    disabled={useLudicrousMode}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full ${
                      useInternet && !useLudicrousMode
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      useInternet && !useLudicrousMode
                        ? "transform translate-x-full"
                        : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-sm">Use Internet Results</div>
              </label>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center mb-2">
              <label
                htmlFor="photos-toggle"
                className="flex items-center cursor-pointer"
              >
                <div
                  className={`relative ${
                    useLudicrousMode ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    id="photos-toggle"
                    className="sr-only"
                    checked={usePhotos && !useLudicrousMode}
                    onChange={onPhotosToggle}
                    disabled={useLudicrousMode}
                  />
                  <div
                    className={`block w-10 h-6 rounded-full ${
                      usePhotos && !useLudicrousMode
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                      usePhotos && !useLudicrousMode
                        ? "transform translate-x-full"
                        : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-sm">Use Photos</div>
              </label>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
