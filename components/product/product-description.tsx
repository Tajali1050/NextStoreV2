"use client";

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import RatingStars from './ratingStars';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
    <div className='space-y-4'>
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-semibold mt-4">{product.title}</h1>

        {product.ratingAverage !== undefined && product.ratingAverage > 0 ? (
          <div className="mt-2 text-sm text-neutral-600">
            
            <RatingStars rating={Number(product.ratingAverage.toFixed(1))} />
          </div>
        ) : (
          <div className="mt-2 text-sm text-neutral-600">Not yet rated</div>
        )}

        {product.subtitle && (
        <p className="text-medium text-neutral-700">{product.subtitle}</p>
      )}

      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.descriptionHtml}
        />
      ) : null}
      
      {product.benefits && (
        <div className="mb-6">
          <ul className="space-y-4">
            {product.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <Image src="/Vector.png" alt="check" width={20} height={20} />
                <span className="text-sm font-semibold text-neutral-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mr-auto w-min my-2 rounded-full bg-blue-600 p-2 text-sm text-white">
        <Price
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
        />
      </div>
        <AddToCart product={product} />
      </div>
    </>
  );
}