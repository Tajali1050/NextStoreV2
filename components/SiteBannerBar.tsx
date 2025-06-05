"use client";

import { addToast } from '@heroui/react';
import clsx from 'clsx';
import type { SiteBanner } from 'lib/shopify/types';
import React from 'react';
import { MovingBorderButton } from './ui/moving-border';

export interface SiteBannerBarProps {
  banner: SiteBanner;
}

export function SiteBannerBar({ banner }: SiteBannerBarProps) {
  const { message, ctaType, discountCode = '', linkUrl } = banner;

  const [beforeText, afterText] = React.useMemo(() => {
    if (ctaType === 'copyCode' && discountCode) {
      const idx = message.indexOf(discountCode);
      if (idx > -1) {
        return [
          message.slice(0, idx),
          message.slice(idx + discountCode.length),
        ];
      }
    }
    return [message, ''];
  }, [message, discountCode, ctaType]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      addToast({
        title: 'Copied!',
        description: discountCode,
        color: 'success',
      });
    } catch {
      addToast({ title: 'Copy failed', color: 'danger' });
    }
  };

  return (
    <div role="status" className={clsx('relative', 'bg-black text-white')}>
      <div className="container mx-auto flex items-center justify-center space-x-2 py-2">
        <span className='text-small font-semibold'>{beforeText}</span>

        {ctaType === 'copyCode' && discountCode && (
          <MovingBorderButton onClick={handleCopy} className="h-8 px-4">
            <div className="text-white font-bold text-medium">
              {discountCode}
            </div>
          </MovingBorderButton>
        )}

        {ctaType === 'link' && linkUrl && (
          <a href={linkUrl}>
            <MovingBorderButton className="h-8 px-4">
              {'SHOP NOW'}
            </MovingBorderButton>
          </a>
        )}

        <span className='text-small font-semibold'>{afterText}</span>
      </div>
    </div>
  );
}
