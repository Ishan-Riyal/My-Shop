import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useOrderDetails } from "../hooks/useOrderDetails";
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderDetailsPage() {
  const { order, userInfo, isLoading, error, deliverHandler, loadingDeliver } =
    useOrderDetails();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const showDeliverButton = useMemo(() => {
    return userInfo?.isAdmin && order?.isPaid && !order?.isDelivered;
  }, [userInfo, order]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto">
      <header>
        <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 uppercase">
          Order ID:{" "}
          <span className="text-blue-600 font-mono select-all">
            {order._id}
          </span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <InfoBox title="Shipping Details">
            <div className="space-y-1 text-gray-700">
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p className="mb-4">
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}
              </p>
            </div>
            <StatusBadge
              condition={order.isDelivered}
              successMsg={`Delivered on ${formatDate(order.deliveredAt)}`}
              failMsg="Not Delivered"
            />
          </InfoBox>

          <InfoBox title="Payment">
            <p className="mb-4 text-gray-700">
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            <StatusBadge
              condition={order.isPaid}
              successMsg={`Paid on ${formatDate(order.paidAt)}`}
              failMsg="Not Paid"
            />
          </InfoBox>

          <InfoBox title="Order Items">
            <div className="divide-y divide-gray-100">
              {order.orderItems.map((item) => (
                <div
                  key={item.product}
                  className="flex justify-between items-center py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain border border-gray-100 rounded-lg shadow-sm"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {item.qty} x ₹{item.price}
                    </p>
                    <p className="font-bold text-gray-800">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </InfoBox>
        </section>

        <aside className="h-fit sticky top-8">
          <div className="border border-gray-200 p-6 rounded-xl bg-gray-50 shadow-md">
            <h2 className="font-bold text-lg mb-6 border-b border-gray-200 pb-2">
              ORDER SUMMARY
            </h2>
            <div className="space-y-3">
              <SummaryLine label="Items" value={order.itemsPrice} />
              <SummaryLine label="Shipping" value={order.shippingPrice} />
              <SummaryLine label="Tax" value={order.taxPrice} />
            </div>

            <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4 mt-4 text-gray-900">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>

            {showDeliverButton && (
              <button
                onClick={deliverHandler}
                disabled={loadingDeliver}
                className="w-full bg-black text-white py-3 rounded-lg font-bold mt-6 hover:bg-gray-800 active:scale-95 transition-all disabled:opacity-50"
              >
                {loadingDeliver ? "Updating..." : "MARK AS DELIVERED"}
              </button>
            )}

            <Link
              to="/"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold mt-3 hover:bg-blue-700 active:scale-95 transition-all"
            >
              BACK TO SHOPPING
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}

const InfoBox = ({ title, children }) => (
  <article className="border border-gray-100 p-5 rounded-xl bg-white shadow-sm">
    <h2 className="font-bold text-gray-500 mb-4 uppercase text-xs tracking-widest border-b border-gray-50 pb-2">
      {title}
    </h2>
    {children}
  </article>
);

const StatusBadge = ({ condition, successMsg, failMsg }) => (
  <div
    className={`p-3 rounded-lg font-bold text-sm text-center ${
      condition ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
    }`}
  >
    {condition ? successMsg : failMsg}
  </div>
);

const SummaryLine = ({ label, value }) => (
  <div className="flex justify-between text-gray-600 font-medium">
    <span>{label}</span>
    <span>₹{Number(value).toFixed(2)}</span>
  </div>
);

export default OrderDetailsPage;
