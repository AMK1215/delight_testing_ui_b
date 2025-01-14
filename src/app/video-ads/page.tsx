"use client";

import { fetchVideoAds } from "@/services/videoAdsService";
import { useQuery } from "@tanstack/react-query";
import { Volume2Icon, VolumeXIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VideoAds = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const { data = [] } = useQuery({
    queryKey: ["GET_VIDEOS_ADS"],
    queryFn: fetchVideoAds,
  });

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleVideoEnd = () => {
        video.currentTime = 0;
        video.play();
      };

      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, []);

  return (
    <div className="space-y-5 p-5">
      {data.map((v, idx) => (
        <div key={idx} className="relative">
          <video
            ref={videoRef}
            src={v.video_url}
            autoPlay
            muted={isMuted}
            loop={true}
            playsInline
            style={{ width: "100%", height: "auto" }}
          />
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeXIcon className="h-5 w-5" />
            ) : (
              <Volume2Icon className="h-5 w-5" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default VideoAds;
