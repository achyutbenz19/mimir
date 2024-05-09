import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SettingsProps } from "@/lib/types";
import { MouseEvent } from "react";
import { Switch } from "./ui/switch";

export const Settings: React.FC<SettingsProps> = ({
  useTTS,
  useInternet,
  usePhotos,
  useBasicMode,
  onTTSToggle,
  onInternetToggle,
  onPhotosToggle,
  onBasicModeToggle,
  setTTS,
  setInternet,
  setPhotos,
}) => {
  const handleEvent = (e: MouseEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    switch (type) {
      case "tts":
        onTTSToggle();
        break;
      case "internet":
        onInternetToggle();
        break;
      case "photos":
        onPhotosToggle();
        break;
      case "basic":
        onBasicModeToggle();
        if (!useBasicMode) {
          setTTS(false);
          setInternet(false);
          setPhotos(false);
        }
        break;
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
          <DropdownMenuItem
            className="flex space-x-3 items-center mb-2 mt-1"
            onClick={(e) => handleEvent(e, "basic")}
          >
            <Switch
              checked={useBasicMode}
              onCheckedChange={onBasicModeToggle}
            />
            <span className="text-lg">Basic</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex space-x-3 items-center mb-2"
            onClick={(e) => handleEvent(e, "tts")}
          >
            <Switch checked={useTTS} onCheckedChange={onTTSToggle} />
            <span className="text-lg">TTS</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex space-x-3 items-center mb-2"
            onClick={(e) => handleEvent(e, "internet")}
          >
            <Switch checked={useInternet} onCheckedChange={onInternetToggle} />
            <span className="text-lg">Internet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex space-x-3 items-center mb-2"
            onClick={(e) => handleEvent(e, "photos")}
          >
            <Switch checked={usePhotos} onCheckedChange={onPhotosToggle} />
            <span className="text-lg">Photos</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
