import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <CheckoutSteps step1 step2 step3 />

        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-6">
          <header>
            <h1 className="text-2xl font-bold text-gray-800 mb-8 uppercase tracking-tight">
              Select Payment Method
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="space-y-4"
              role="radiogroup"
              aria-labelledby="payment-label"
            >
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "Razorpay"
                    ? "border-blue-500 bg-blue-50/30"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  name="paymentMethod"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-4 font-semibold text-gray-700">
                  Razorpay or Credit Card
                </span>
              </label>

              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "COD"
                    ? "border-blue-500 bg-blue-50/30"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-4 font-semibold text-gray-700">
                  Cash On Delivery
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4 uppercase text-sm tracking-widest"
            >
              Continue to Place Order
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default PaymentPage;
