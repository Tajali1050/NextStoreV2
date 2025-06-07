"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { useSelectedVariant } from "components/product/product-context";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <Button
      aria-label="Add to cart"
      type="submit"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
    >
      Add To Cart
      <div className="">
        <div className="ml-2">
          <Image
            src="/icons/endContent.png"
            alt="plus"
            width={20}
            height={20}
            className="filter brightness-0 invert"
          />
        </div>
      </div>
    </Button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const selectedVariant = useSelectedVariant(variants);
  const [message, formAction] = useActionState(addItem, null);

  const selectedVariantId = selectedVariant?.id;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = selectedVariant;

  return (
    <form
      action={async () => {
        if (!finalVariant) return;
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
