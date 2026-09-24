import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import ProductCarousel from "../components/ProductCarousel";

const HomePage = () => {
  const { pageNumber = 1, keyword = "" } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const productList = useMemo(() => data?.products || [], [data]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 selection:bg-indigo-100">
      {!keyword ? (
        <section className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ProductCarousel />
          </div>
        </section>
      ) : (
        <section className="bg-white border-b border-slate-100 py-8 mb-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <Link
                to="/"
                className="text-sm text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 transition-colors"
              >
                <span>&larr;</span> Back to Gallery
              </Link>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Search: <span className="text-indigo-600">"{keyword}"</span>
              </h1>
            </div>
            <div className="w-full md:w-96 shadow-sm">
              <SearchBox basePath="" placeholder="Search again..." />
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {!keyword && (
          <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                Latest Arrivals
              </h2>
              <p className="text-slate-500 font-medium">
                Our newest tech and lifestyle essentials
              </p>
            </div>
            <div className="hidden md:block w-80">
              <SearchBox basePath="" placeholder="Filter products..." />
            </div>
          </header>
        )}

        <div className="min-h-100">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-96 space-y-4">
              <Loader />
              <p className="text-slate-400 font-bold animate-pulse uppercase text-xs tracking-widest">
                Fetching Products
              </p>
            </div>
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : productList.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-black text-slate-800">
                No matches found
              </h3>
              <p className="text-slate-500 mb-8">
                Try checking for typos or use more general terms.
              </p>
              <Link
                to="/"
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
              >
                Reset All Filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {productList.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <footer className="mt-20 flex justify-center border-t border-slate-200 pt-12">
                <Paginate
                  pages={data.pages}
                  page={data.page}
                  keyword={keyword}
                  basePath=""
                />
              </footer>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
