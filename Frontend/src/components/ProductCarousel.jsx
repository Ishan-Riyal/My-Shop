import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [index, setIndex] = useState(0);

  const carouselItems = products?.slice(0, 5) || [];

  useEffect(() => {
    if (carouselItems.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % carouselItems.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [carouselItems.length]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <div className="group relative w-full overflow-hidden bg-slate-900 rounded-3xl mb-10 shadow-2xl">
      <div
        className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {carouselItems.map((product) => (
          <div
            key={product._id}
            className="min-w-full relative h-75 md:h-112.5"
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-linear-to-t from-slate-900/80 to-transparent">
                <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight drop-shadow-2xl mb-2">
                  {product.name}
                </h2>
                <p className="text-slate-200 text-sm md:text-lg max-w-xl line-clamp-2 mb-6 opacity-90">
                  {product.description}
                </p>
                <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                  Explore Now
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index
                ? "w-10 bg-white"
                : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
