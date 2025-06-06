import dynamic from "next/dynamic";

export type { Reel, ProductReelsProps } from "./product-reels";

const ProductReels = dynamic(() => import("./product-reels"), { ssr: false });

export default ProductReels;
