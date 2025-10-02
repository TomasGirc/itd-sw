"use client";

import { useState } from "react";
import "./starWarsCrawl.scss";

interface StarWarsCrawlProps {
  text: string;
  duration?: number;
}

export default function StarWarsCrawl({
  text,
  duration = 60,
}: StarWarsCrawlProps) {
  const [stopped, setStopped] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleClick = () => {
    if (stopped) {
      // Restart animation from bottom
      setAnimationKey((prev) => prev + 1);
    }
    setStopped((prev) => !prev);
  };

  return (
    <div
      className={`relative w-full h-80 overflow-hidden perspective cursor-pointer ${
        stopped ? "flex flex-col justify-center items-center" : ""
      }`}
      onClick={handleClick}
      title="Click to toggle crawl"
    >
      <div
        key={animationKey}
        className={`font-starjedi ${
          stopped
            ? "stopped"
            : "crawl absolute bottom-0 w-full text-center text-yellow-500  md:text-base whitespace-pre-line"
        }`}
        style={!stopped ? { animationDuration: `${duration}s` } : undefined}
      >
        {text}
      </div>
    </div>
  );
}
