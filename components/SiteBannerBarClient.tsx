import { addToast, Button } from "@heroui/react";
import clsx from "clsx";
import Link from "next/link";

export interface SiteBannerBarClientProps {
  ctaType?: "copyCode" | "link" | null;
  discountCode?: string;
  linkUrl?: string;
}

export function SiteBannerBarClient({
  ctaType,
  discountCode,
  linkUrl,
}: SiteBannerBarClientProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode || "");
      addToast({
        title: "Copied!",
        description: discountCode,
        color: "success",
      });
    } catch {
      addToast({
        title: "Copy failed",
        color: "danger",
      });
    }
  };

  return (
    <div
      className={clsx(
        "flex-shrink-0 transform transition-transform duration-300 ease-in-out",
      )}
    >
      {ctaType === "copyCode" && discountCode && (
        <Button onPress={handleCopy}>{discountCode}</Button>
      )}

      {ctaType === "link" && linkUrl && (
        <Link href={linkUrl} className="underline font-medium">
          Learn more
        </Link>
      )}
    </div>
  );
}
