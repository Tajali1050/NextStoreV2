"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export interface Reel {
  id: string;
  src: string;
}

export interface ProductReelsProps {
  videos: Reel[];
}

export default function ProductReels({ videos }: ProductReelsProps) {
  const [current, setCurrent] = useState<Reel | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid && current) {
      vid.play().catch(() => {
        /* ignore autoplay errors */
      });
    }
  }, [current]);

  if (!videos?.length) return null;

  return (
    <>
      <Swiper
        direction="horizontal"
        slidesPerView={3}
        spaceBetween={12}
        modules={[Navigation]}
        className="h-60 w-full max-w-100 overflow-hidden rounded-lg"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id} className="aspect-[9/16]">
            <button
              type="button"
              onClick={() => setCurrent(video)}
              className="block h-full w-full overflow-hidden rounded-lg bg-neutral-100 shadow"
            >
              <video
                src={video.src}
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog
        open={current !== null}
        onOpenChange={(open) => {
          if (!open) setCurrent(null);
        }}
      >
        <DialogContent className="w-full max-w-sm p-0 overflow-hidden">
          {current && (
            <video
              ref={videoRef}
              controls
              playsInline
              muted
              preload="auto"
              autoPlay
              crossOrigin="anonymous"
              className="aspect-[9/16] w-full bg-black"
            >
              <source src={current.src} type="video/mp4" />
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
