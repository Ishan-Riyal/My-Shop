import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingPage() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const { address, city, state, postalCode, country } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate("/payment");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <CheckoutSteps step1 step2 />

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
          <header>
            <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-tight">
              Shipping Details
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">
                Street Address
              </label>
              <input
                name="address"
                type="text"
                placeholder="123 Main St"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">
                  City
                </label>
                <input
                  name="city"
                  type="text"
                  placeholder="Mumbai"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">
                  State
                </label>
                <input
                  name="state"
                  type="text"
                  placeholder="Maharashtra"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">
                  Postal Code
                </label>
                <input
                  name="postalCode"
                  type="text"
                  placeholder="400001"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">
                  Country
                </label>
                <input
                  name="country"
                  type="text"
                  placeholder="India"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 mt-4 uppercase text-sm tracking-widest transition-all active:scale-[0.98]"
            >
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default ShippingPage;
