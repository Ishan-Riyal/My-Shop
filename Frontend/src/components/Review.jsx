import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Review = ({ product, userInfo, createReviewHandler, loadingReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createReviewHandler({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-12 max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Customer Reviews
      </h2>

      <div className="space-y-8 mb-12">
        {product.reviews.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500">
            No reviews yet. Be the first to share your thoughts!
          </div>
        ) : (
          product.reviews.map((review) => (
            <div
              key={review._id}
              className="group border-b border-gray-100 pb-8 last:border-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-none mb-1">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? (
                      <FaStar size={16} />
                    ) : (
                      <FaRegStar size={16} />
                    )}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Write a Review</h3>

        {userInfo ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Overall Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer font-medium"
                  required
                >
                  <option value="">Choose a rating...</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Your Review
              </label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                placeholder="What did you like or dislike?"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loadingReview}
              className="w-full md:w-auto px-10 py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-gray-200"
            >
              {loadingReview ? "Posting..." : "Post Review"}
            </button>
          </form>
        ) : (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm">
            Please{" "}
            <Link
              to="/login"
              className="font-bold underline hover:text-blue-800"
            >
              Sign In
            </Link>{" "}
            to share your experience with this product.
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
