import { Icons } from "./icons";

function SingleReview({ review }) {
  const renderStars = () => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Icons.StarIcon
            key={index}
            className={`h-5 w-5 ${
              index < review.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="font-semibold">{review.user.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {renderStars()}
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}

export default function DisplayReviews({ reviews }) {
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold flex items-center gap-2">
        <Icons.StarIcon className="h-6 w-6" />
        <span>
          {averageRating} · {totalReviews} reviews
        </span>
      </h3>
      <hr />
      {totalReviews > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {reviews.map((review) => (
            <SingleReview key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          No reviews yet. Be the first to leave one!
        </p>
      )}
    </div>
  );
}
