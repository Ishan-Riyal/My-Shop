import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";

import Meta from "../components/Meta";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Review from "../components/Review";

function ProductPage() {
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: quantity }));
    navigate("/cart");
  };

  const createReviewHandler = async (reviewData) => {
    try {
      await createReview({
        productId,
        ...reviewData,
      }).unwrap();
      refetch();
      toast.success("Review submitted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || "Product not found"}
      </Message>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {product && <Meta title={product.name} />}

      <nav aria-label="Breadcrumb">
        <Link
          to="/"
          className="text-gray-500 hover:text-blue-600 mb-8 inline-flex items-center gap-2 font-semibold transition-colors"
        >
          <span>&larr;</span> Back to Products
        </Link>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">
        <section className="w-full bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-100 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-125 object-contain hover:scale-105 transition-transform duration-500"
          />
        </section>

        <section className="flex flex-col">
          <header>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="mb-6 flex items-center gap-4">
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
              />
            </div>
          </header>

          <article>
            <p className="text-3xl font-black text-blue-600 mb-6 tracking-tight">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <div className="prose prose-slate mb-8">
              <p className="text-gray-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>
          </article>

          <div className="border border-gray-100 p-6 rounded-3xl bg-gray-50/50 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-bold uppercase text-xs tracking-widest">
                Availability
              </span>
              <span
                className={`font-black text-sm ${product.countInStock > 0 ? "text-green-600" : "text-red-500"}`}
              >
                {product.countInStock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200/50">
                <span className="text-gray-600 font-bold uppercase text-xs tracking-widest">
                  Select Quantity
                </span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:bg-gray-300 disabled:shadow-none"
            >
              {product.countInStock > 0 ? "Add to Cart" : "Sold Out"}
            </button>
          </div>
        </section>
      </div>

      <section className="mt-20 border-t border-gray-100 pt-12">
        <header className="mb-10 text-center">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic">
            Customer Feedback
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </header>
        <Review
          product={product}
          userInfo={userInfo}
          createReviewHandler={createReviewHandler}
          loadingReview={loadingReview}
        />
      </section>
    </main>
  );
}

export default ProductPage;
