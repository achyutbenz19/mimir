"use client";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen w-full flex items-center flex-col space-y-6 place-content-center">
      <h2 className="text-2xl">
        Rate limit reached! Please try again in a while.
      </h2>
      <Button
        size="lg"
        className="text-lg"
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
    </div>
  );
}
