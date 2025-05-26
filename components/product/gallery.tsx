'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';
import { startTransition, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;
  
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const handleMainSlideChange = (swiper: SwiperType) => {
    startTransition(() => {
      const newState = updateImage(swiper.activeIndex.toString());
      updateURL(newState);
    });
  };

  const handleThumbnailClick = (index: number) => {
    startTransition(() => {
      const newState = updateImage(index.toString());
      updateURL(newState);
    });
    mainSwiper?.slideTo(index);
  };

  return (
    <div className="space-y-2">
      {/* Main Image Swiper */}
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-md">
        <Swiper
          onSwiper={setMainSwiper}
          spaceBetween={0}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          className="main-swiper h-full w-full"
          onSlideChange={handleMainSlideChange}
          initialSlide={imageIndex}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src}>
              <div className="relative h-full w-full">
                <Image
                  className="h-full w-full object-contain"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  alt={image.altText}
                  src={image.src}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              className="swiper-button-prev-custom absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-md transition-all hover:bg-white hover:scale-110"
              aria-label="Previous image"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <button
              className="swiper-button-next-custom absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-md transition-all hover:bg-white hover:scale-110"
              aria-label="Next image"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Swiper */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbnail-swiper"
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 8,
            },
          }}
        >
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <SwiperSlide key={image.src} className="!w-20 !h-20">
                <button
                  type="button"
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`Select image ${index + 1}`}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <style jsx global>{`
        .main-swiper .swiper-pagination {
          bottom: 16px;
        }
        
        .main-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.8);
          opacity: 0.7;
        }
        
        .main-swiper .swiper-pagination-bullet-active {
          background: white;
          opacity: 1;
        }
        
        .thumbnail-swiper .swiper-slide {
          width: 96px !important;
          height: 96px !important;
        }
        
        .thumbnail-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        
        .thumbnail-swiper .swiper-slide:not(.swiper-slide-thumb-active) {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .thumbnail-swiper .swiper-slide:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
