"use client";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { FileUp, FileX2, MicIcon } from "lucide-react";
import { motion } from "framer-motion";
import { InputComponentProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const InputComponent: React.FC<InputComponentProps> = ({
  onSubmit,
  useTTS,
  useInternet,
  usePhotos,
  useBasicMode,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedImage(files[0]);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
    setRecording(!recording);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const options = { mimeType: "audio/webm" };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        (event: BlobEvent) => {
          chunksRef.current.push(event.data);
        },
      );
      mediaRecorderRef.current.start();
    });
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob);
        formData.append("useTTS", String(useTTS));
        formData.append("useInternet", String(useInternet));
        formData.append("usePhotos", String(usePhotos));
        formData.append("useBasicMode", String(useBasicMode));
        if (selectedImage) {
          formData.append("image", selectedImage, selectedImage.name);
        }
        onSubmit(formData);
        chunksRef.current = [];
      });
    }
  };

  return (
    <>
      <div className="w-full z-[20] flex items-center flex-col my-10">
        {recording && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-5 tracking-wider font-semi-bold text-xl"
          >
            Listening...
          </motion.div>
        )}
        <div className="flex items-center justify-center w-full max-w-md">
          <Button
            onClick={toggleRecording}
            className={cn(
              "flex items-center justify-center w-full h-20 rounded-full",
              recording && "bg-accent",
            )}
            variant="outline"
          >
            <MicIcon className="w-8 h-8" />
          </Button>
        </div>
      </div>
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpeg,.jpg,.webp,.gif"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      {usePhotos && (
        <Button
          variant="ghost"
          className="absolute bottom-10 z-20 right-10 sm:rounded-full rounded-full py-6"
          onClick={() => {
            selectedImage
              ? setSelectedImage(null)
              : fileInputRef.current && fileInputRef.current.click();
          }}
        >
          {selectedImage ? <FileX2 /> : <FileUp />}
        </Button>
      )}
    </>
  );
};

export default InputComponent;
