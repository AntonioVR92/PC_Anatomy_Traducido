"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CHAT_HEAD_LOTTIE =
  "https://lottie.host/fccf90ec-0ca7-4363-9b44-a3d62b87ebe0/Tx3wFsqpGl.lottie";

export function ChatHead({ className }: { className?: string }) {
  return (
    <div className={`h-full w-full ${className ?? ""}`}>
      <DotLottieReact
        src={CHAT_HEAD_LOTTIE}
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  );
}
