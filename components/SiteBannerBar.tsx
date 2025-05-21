"use client";

import { SiteBannerBarProps } from "lib/shopify/types";
import Link from "next/link";

export default function SiteBannerBar({ banner }: SiteBannerBarProps) {
  const { message, ctaType, linkUrl, discountCode } = banner;

  const handleCopy = () => {
    if (!discountCode) return;
    navigator.clipboard.writeText(discountCode);
    // You can replace this with a custom toast or UI notification // lets add some shadcn or heroUI compoenent here
    alert(`Copied code: ${discountCode}`);
  };

  return (
    <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-2">
      <span className="font-medium">{message}</span>
      {ctaType === "link" && linkUrl && (
        <Link href={linkUrl} className="underline font-semibold">
          Learn more
        </Link>
      )}
      {ctaType === "copyCode" && discountCode && (
        <button
          onClick={handleCopy}
          className="bg-white text-blue-600 font-semibold px-3 py-1 rounded"
        >
          Copy Code
        </button>
      )}
    </div>
  );
}
