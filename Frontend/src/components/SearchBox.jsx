import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ basePath = "", placeholder = "Search products..." }) => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const [query, setQuery] = useState(keyword || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      navigate(`${basePath}/search/${trimmedQuery}`);
    } else {
      navigate(basePath || "/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md group">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm transition-all outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
        />
      </div>
    </form>
  );
};

export default SearchBox;
