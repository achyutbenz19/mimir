"use client";
import { InputComponentProps } from "@/lib/types";
import { useState, useRef } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Button } from "./ui/button";
import { MicIcon } from "lucide-react";
import { motion } from "framer-motion";

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedImage(acceptedFiles[0]);
    },
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
    },
  } as DropzoneOptions);

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleRecording = () => {
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
    <div
      className={
        "flex z-[20] w-full flex-col items-center my-10 justify-center"
      }
    >
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
          onMouseDown={handleRecording}
          onMouseUp={handleRecording}
          onTouchStart={handleRecording}
          onTouchEnd={handleRecording}
          className="flex items-center justify-center w-full h-20 rounded-full"
          variant="outline"
        >
          <MicIcon className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default InputComponent;
