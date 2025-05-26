// components/atoms/RatingStars.tsx
"use client";

import clsx from "clsx"; // npm i clsx  (optional helper)
import { Star } from "lucide-react"; // npm i lucide-react

/** Full-width star fill with clip-path so any decimal works (0-5). */
interface RatingStarsProps {
  rating: number;          // e.g. 4.7
  max?: number;            // default 5
  label?: string;          // e.g. "Reviews", "Internally rated"
  className?: string;      // tailwind overrides
}

export default function RatingStars({
  rating,
  max = 5,
  className,
}: RatingStarsProps) {
  // keep value safe
  const value = Math.min(Math.max(rating, 0), max);

  return (
    <div
      className={clsx("flex items-center gap-2", className)}
    >
      {/* Stars */}
      {Array.from({ length: max }).map((_, i) => {
        const fill = Math.min(Math.max(value - i, 0), 1); // 0-1 for this star

        return (
          <span key={i} className="relative inline-block h-5 w-5">
            {/* empty outline */}
            <Star className="absolute h-full w-full text-gray-300" strokeWidth={2} />
            {/* filled overlay, clipped horizontally */}
            <Star
              className="absolute h-full w-full text-yellow-500 fill-yellow-500"
              strokeWidth={2}
              style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
            />
          </span>
        );
      })}

      {/* Numeric label */}
      <span className="ml-1 text-lg font-semibold">{value.toFixed(1)}</span>
          <span className="text-sm font-medium tracking-wide">
            <div className="flex flex-col">
              <div className="text-xs font-semibold">Reviews</div>
              <div className="text-[4px]">INTERNALLY RATED</div>
            </div>
          </span>
    </div>
  );
}
