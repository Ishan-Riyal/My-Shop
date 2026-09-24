import { Link } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "", basePath = "" }) => {
  if (pages <= 1) return null;

  const getPath = (pageNumber) => {
    const searchPart = keyword ? `/search/${keyword}` : "";
    return `${basePath}${searchPart}/page/${pageNumber}`;
  };

  return (
    <div className="flex justify-center my-10">
      <nav className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
        {[...Array(pages).keys()].map((x) => {
          const pageNum = x + 1;
          const isActive = pageNum === page;

          return (
            <Link key={pageNum} to={getPath(pageNum)}>
              <button
                className={`min-w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-transparent text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {pageNum}
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Paginate;
