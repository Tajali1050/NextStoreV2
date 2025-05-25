import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { ProductExtrasSection } from './ProductExtrasSection';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>

        {product.subtitle && (
        <p className="mb-4 text-lg text-neutral-700">{product.subtitle}</p>
      )}

        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        {product.ratingAverage !== undefined && product.ratingAverage > 0 ? (
        <div className="mt-2 text-sm text-neutral-600">
          {product.ratingAverage.toFixed(1)}
        </div>
      ) : (
        <div className="mt-2 text-sm text-neutral-600">Not yet rated</div>
      )}

      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
      {product.benefits && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-medium">Benefits</h2>
          <ul className="list-disc pl-5">
            {product.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      <ProductExtrasSection internalRatings={product.internalRatings} />
    </>
  );
}