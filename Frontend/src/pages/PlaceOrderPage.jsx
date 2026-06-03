import { Link } from "react-router-dom";
import { usePlaceOrder } from "../hooks/usePlaceOrder";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import Message from "../components/Message";

function PlaceOrderPage() {
  const { cart, isLoading, placeOrderHandler } = usePlaceOrder();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <Section
              title="Shipping Address"
              content={`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.country}`}
            />

            <Section title="Payment Method" content={cart.paymentMethod} />

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 uppercase text-gray-700 tracking-tight">
                Order Items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cart.cartItems.map((item) => (
                    <OrderItem key={item._id} item={item} />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="h-fit">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md sticky top-10">
              <h2 className="font-bold text-xl mb-6 border-b border-gray-100 pb-2">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3">
                <SummaryRow label="Items" value={cart.itemsPrice} />
                <SummaryRow label="Shipping" value={cart.shippingPrice} />
                <SummaryRow label="Tax" value={cart.taxPrice} />
              </div>

              <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4 mt-4 text-gray-900">
                <span>Total</span>
                <span>₹{Number(cart.totalPrice).toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0 || isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold mt-6 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isLoading ? <Loader /> : "PLACE ORDER & PAY"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

const Section = ({ title, content }) => (
  <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-lg font-bold mb-3 uppercase text-gray-700 tracking-tight">
      {title}
    </h2>
    <p className="text-gray-600 leading-relaxed font-medium">{content}</p>
  </section>
);

const OrderItem = ({ item }) => (
  <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 border border-gray-100 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>
      <Link
        to={`/product/${item._id}`}
        className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
      >
        {item.name}
      </Link>
    </div>
    <div className="text-right">
      <p className="text-sm text-gray-500 font-medium">
        {item.qty} x ₹{item.price}
      </p>
      <p className="font-bold text-gray-800">
        ₹{(item.qty * item.price).toFixed(2)}
      </p>
    </div>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-600 font-medium">
    <span>{label}</span>
    <span>₹{Number(value).toFixed(2)}</span>
  </div>
);

export default PlaceOrderPage;
