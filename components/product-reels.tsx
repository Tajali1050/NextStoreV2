"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export interface Reel {
  id: string;
  poster: string;
  src: string;
}

export interface ProductReelsProps {
  videos: Reel[];
}

export default function ProductReels({ videos }: ProductReelsProps) {
  const [current, setCurrent] = useState<Reel | null>(null);

  if (!videos?.length) return null;

  return (
    <>
      <Swiper
        direction="vertical"
        slidesPerView={2}
        spaceBetween={12}
        modules={[Navigation]}
        className="h-80 w-full max-w-60 overflow-hidden rounded-lg"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id} className="aspect-[9/16]">
            <button
              type="button"
              onClick={() => setCurrent(video)}
              className="block h-full w-full overflow-hidden rounded-lg bg-neutral-100 shadow"
            >
              <img
                src={video.poster}
                alt="Video poster"
                className="h-full w-full object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Transition show={current !== null} as={Fragment}>
        <Dialog onClose={() => setCurrent(null)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-transform duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-sm">
                <button
                  aria-label="Close video"
                  onClick={() => setCurrent(null)}
                  className="absolute right-2 top-2 z-10 rounded bg-white p-1 text-black shadow"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                {current && (
                  <MediaPlayer
                    controls
                    playsInline
                    muted
                    className="aspect-[9/16] w-full rounded-lg bg-black"
                    src={current.src}
                    poster={current.poster}
                  >
                    <MediaProvider />
                  </MediaPlayer>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
