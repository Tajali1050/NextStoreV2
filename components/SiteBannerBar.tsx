"use client";

import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { addToast } from "@heroui/react";
import clsx from "clsx";
import type { SiteBanner } from "lib/shopify/types";
import React from "react";

export interface SiteBannerBarProps {
  banner: SiteBanner;
}

export function SiteBannerBar({ banner }: SiteBannerBarProps) {
  const { message, ctaType, discountCode = "", linkUrl } = banner;

  const [beforeText, afterText] = React.useMemo(() => {
    if (ctaType === "copyCode" && discountCode) {
      const idx = message.indexOf(discountCode);
      if (idx > -1) {
        return [
          message.slice(0, idx),
          message.slice(idx + discountCode.length),
        ];
      }
    }
    return [message, ""];
  }, [message, discountCode, ctaType]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      addToast({
        title: "Copied!",
        description: discountCode,
        color: "success",
      });
    } catch {
      addToast({ title: "Copy failed", color: "danger" });
    }
  };

  return (
    <div role="status" className={clsx("relative", "bg-black text-white")}>
      <div className="container mx-auto flex items-center justify-center space-x-2 py-2">
        <span className="text-small font-semibold">{beforeText}</span>

        {ctaType === "copyCode" && discountCode && (
          <MovingBorderButton
            onClick={handleCopy}
            containerClassName="h-8 w-auto"
            className="px-4 text-white font-bold text-medium"
            borderRadius="9999px"
          >
            {discountCode}
          </MovingBorderButton>
        )}

        {ctaType === "link" && linkUrl && (
          <MovingBorderButton
            as="a"
            href={linkUrl}
            containerClassName="h-8 w-auto"
            className="px-4 text-white font-semibold"
            borderRadius="9999px"
          >
            {"SHOP NOW"}
          </MovingBorderButton>
        )}

        <span className="text-small font-semibold">{afterText}</span>
      </div>
    </div>
  );
}
