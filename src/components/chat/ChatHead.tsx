"use client";

// This file is a client component (runs in the browser).
// ChatHead renders the animated character/animation used as the chat
// assistant's avatar in the chat widget.
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// URL of the hosted Lottie animation shown as the chat head.
const CHAT_HEAD_LOTTIE =
  "https://lottie.host/fccf90ec-0ca7-4363-9b44-a3d62b87ebe0/Tx3wFsqpGl.lottie";

// Props: className — optional extra classes appended to the wrapper.
export function ChatHead({ className }: { className?: string }) {
  return (
    // Wrapper div fills its parent and merges any caller-supplied classes.
    <div className={`h-full w-full ${className ?? ""}`}>
      {/* The actual looping, autoplaying animation fills the wrapper. */}
      <DotLottieReact
        src={CHAT_HEAD_LOTTIE}
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  );
}
