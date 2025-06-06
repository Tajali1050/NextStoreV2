import { InternalRating } from "../../lib/shopify/types";
import { InternalRatingCard } from "./InternalRatingCard";

export function ProductExtrasSection({
  internalRatings = [],
}: {
  internalRatings?: InternalRating[];
}) {
  if (internalRatings == null) return null;

  return (
    <section className="my-10">
      <h2 className="mb-4 text-2xl font-medium">In-House Ratings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {internalRatings.map((r, i) => (
          <InternalRatingCard key={i} rating={r} />
        ))}
      </div>
    </section>
  );
}
