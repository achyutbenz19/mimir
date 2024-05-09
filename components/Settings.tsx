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
  setBasicMode,
  setTTS,
  setInternet,
  setPhotos,
}) => {
  const handleEvent = (e: MouseEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    switch (type) {
      case "tts":
        onTTSToggle();
        setBasicMode(false);
        break;
      case "internet":
        onInternetToggle();
        setBasicMode(false);
        break;
      case "photos":
        onPhotosToggle();
        setBasicMode(false);
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

  console.log(useTTS);

  return (
    <div className="md:bottom-10 md:top-auto z-[20] top-5 left-5 font-normal md:left-10 font-sans absolute">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="rounded-full py-6">
            <SettingsIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent alignOffset={10} className="ml-4 p-2 font-sans">
          <DropdownMenuItem
            className="flex space-x-3 items-center"
            onClick={(e) => handleEvent(e, "basic")}
          >
            <Switch
              checked={useBasicMode}
              onCheckedChange={onBasicModeToggle}
            />
            <span>Basic</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex space-x-3 items-center"
            onClick={(e) => handleEvent(e, "tts")}
          >
            <Switch checked={useTTS} onCheckedChange={onTTSToggle} />
            <span>TTS</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex space-x-3 items-center"
            onClick={(e) => handleEvent(e, "internet")}
          >
            <Switch checked={useInternet} onCheckedChange={onInternetToggle} />
            <span>Internet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex space-x-3 items-center"
            onClick={(e) => handleEvent(e, "photos")}
          >
            <Switch checked={usePhotos} onCheckedChange={onPhotosToggle} />
            <span>Photos</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
