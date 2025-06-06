"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useSelectedVariant } from "./product-context";
import RatingStars from "./ratingStars";
import { VariantSelector } from "./variant-selector";
import ProductReels from "components/ProductReels";

export function ProductDescription({ product }: { product: Product }) {
  const selectedVariant = useSelectedVariant(product.variants);
  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-semibold mt-6">{product.title}</h1>

          {product.ratingAverage !== undefined && product.ratingAverage > 0 ? (
            <div className="mt-2 text-sm text-black">
              <RatingStars rating={Number(product.ratingAverage.toFixed(1))} />
            </div>
          ) : (
            <div className="mt-2 text-sm text-black">Not yet rated</div>
          )}

          {product.subtitle && (
            <p className="text-large text-black">{product.subtitle}</p>
          )}
        </div>
        {product.descriptionHtml ? (
          <Prose
            className="mb-6 text-sm leading-tight"
            html={product.descriptionHtml}
          />
        ) : null}

        <ProductReels videos={product.videos ?? []} />

        {product.benefits && (
          <div className="mb-6">
            <ul className="space-y-4">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <Image
                    src="/icons/Vector.png"
                    alt="check"
                    width={20}
                    height={20}
                  />
                  <span className="text-medium font-semibold text-black">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <VariantSelector
          options={product.options}
          variants={product.variants}
        />
        <div className="text-2xl font-semibold text-black flex items-center gap-2">
          <Price
            amount={
              selectedVariant?.price.amount ??
              product.priceRange.minVariantPrice.amount
            }
            currencyCode={
              selectedVariant?.price.currencyCode ??
              product.priceRange.minVariantPrice.currencyCode
            }
          />
          <div className="rounded-full bg-red-500 text-white text-center text-xs py-1 px-2 justify-center items-center">
            60% OFF
          </div>
        </div>
        <AddToCart product={product} />
      </div>
    </>
  );
}
