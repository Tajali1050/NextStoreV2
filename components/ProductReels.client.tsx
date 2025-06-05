"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import { MediaPlayer, MediaOutlet, MediaCommunitySkin } from "@vidstack/react";
import "swiper/css";

export interface ProductReel {
  id: string;
  poster: string;
  src: string;
}

export interface ProductReelsProps {
  videos: ProductReel[];
}

export function ProductReels({ videos }: ProductReelsProps) {
  const [active, setActive] = useState<ProductReel | null>(null);
  const close = () => setActive(null);

  if (!videos.length) return null;

  return (
    <>
      <Swiper
        direction="vertical"
        slidesPerView={2}
        spaceBetween={16}
        modules={[A11y]}
        className="h-[420px] w-full"
      >
        {videos.map((video) => (
          <SwiperSlide
            key={video.id}
            className="overflow-hidden rounded-lg shadow-sm"
          >
            <button
              type="button"
              onClick={() => setActive(video)}
              className="block h-full w-full focus:outline-none"
            >
              <Image
                src={video.poster}
                alt="Video thumbnail"
                width={320}
                height={570}
                className="h-full w-full object-cover"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <Transition show={Boolean(active)} as={Fragment}>
        <Dialog onClose={close} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-transform ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="fixed inset-0 flex items-center justify-center p-4">
              {active && (
                <div className="relative w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
                  <button
                    onClick={close}
                    className="absolute right-2 top-2 rounded-full bg-white p-1 text-black shadow"
                    aria-label="Close video"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <MediaPlayer
                    src={active.src}
                    poster={active.poster}
                    controls
                    muted
                    playsInline
                    className="aspect-video w-full rounded-md"
                  >
                    <MediaOutlet />
                    <MediaCommunitySkin />
                  </MediaPlayer>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
