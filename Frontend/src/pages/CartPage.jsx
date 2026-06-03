import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { addToCart, deleteFromCart } from "../slices/cartSlice";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product, qty) => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalPrice = cartItems
    .reduce(
      (acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0),
      0,
    )
    .toFixed(2);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-gray-800 text-center lg:text-left">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              <FaArrowLeft className="mr-2" size={16} />
              Back to Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <Link
                      to={`/product/${item._id}`}
                      className="font-bold text-gray-800 hover:text-blue-600 text-lg line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-blue-600 font-semibold mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={item.qty}
                      onChange={(e) => handleAddToCart(item, e.target.value)}
                      className="bg-gray-50 border border-gray-200 p-2 rounded-lg outline-none cursor-pointer"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-4">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-6 text-xl font-bold text-gray-900">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 disabled:bg-gray-300 shadow-md shadow-blue-100"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-gray-500 hover:text-blue-600 font-semibold transition-colors text-sm"
                  >
                    <FaArrowLeft className="mr-2" size={12} />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
