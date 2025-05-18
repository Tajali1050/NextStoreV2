import { InternalRating } from '../../lib/shopify/types';

export function InternalRatingCard({ rating }: { rating: InternalRating }) {
  const { image, rating: score, title, description } = rating;
  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
      <img src={image} alt={title} className="h-12 w-12" />
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-blue-600 font-bold">{score.toFixed(1)}</p>
      <p className="text-sm text-neutral-600 text-center">{description}</p>
    </div>
  );
}
