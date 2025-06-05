import dynamic from "next/dynamic";

const ProductReels = dynamic(() => import("./ProductReels.client"), {
  ssr: false,
});
export default ProductReels;
export type { ProductReelsProps, ProductReel } from "./ProductReels.client";
