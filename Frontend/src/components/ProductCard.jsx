import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  const { _id, image, name, rating, numReviews, price } = product;

  return (
    <div className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${_id}`} className="flex flex-col h-full">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center p-4 mb-4">
          <img
            src={image}
            alt={name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col grow">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-10 mb-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          <div className="mb-3">
            <Rating value={rating} text={`${numReviews} reviews`} />
          </div>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-xl font-extrabold text-slate-900">
              ₹{price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
