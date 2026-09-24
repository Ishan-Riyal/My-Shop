import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1 my-1">
      <div className="flex text-yellow-500">
        {stars.map((index) => (
          <span key={index}>
            {value >= index ? (
              <FaStar />
            ) : value >= index - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        ))}
      </div>

      {text && (
        <span className="text-xs font-medium text-gray-500 ml-2">{text}</span>
      )}
    </div>
  );
};

export default Rating;
