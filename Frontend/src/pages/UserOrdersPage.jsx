import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useGetMyOrdersQuery } from "../slices/ordersSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";

function UserOrdersPage() {
  const { pageNumber = 1, keyword = "" } = useParams();

  const { data, isLoading, error } = useGetMyOrdersQuery({
    pageNumber,
    keyword,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const StatusCell = ({ condition, date }) => (
    <td className="p-4 text-sm">
      {condition ? (
        <span className="text-green-600 flex items-center gap-1">
          <FaCheck size={12} /> {formatDate(date)}
        </span>
      ) : (
        <FaTimes className="text-red-500" />
      )}
    </td>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 mt-10">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 mt-10">
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Orders
        </h2>
        <div className="w-full md:w-auto">
          <SearchBox
            basePath="/user/myorders"
            placeholder="Search by Order ID..."
          />
        </div>
      </div>

      {keyword && (
        <p className="mb-4 text-gray-600">
          Showing results for Order ID:{" "}
          <span className="font-bold">"{keyword}"</span>
        </p>
      )}

      <div className="min-h-100">
        <div className="block md:hidden space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-blue-600 uppercase">
                    ID: {order._id.slice(-6)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <Link
                  to={`/orders/${order._id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <Message>No orders found.</Message>
          )}
        </div>

        <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                {["ID", "Date", "Total", "Paid", "Delivered", ""].map(
                  (head) => (
                    <th
                      key={head}
                      className="p-4 font-semibold text-gray-600 text-sm uppercase"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-700 font-mono">
                      {order._id}
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="p-4 text-sm text-gray-700 font-bold">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </td>
                    <StatusCell condition={order.isPaid} date={order.paidAt} />
                    <StatusCell
                      condition={order.isDelivered}
                      date={order.deliveredAt}
                    />
                    <td className="p-4">
                      <Link
                        to={`/orders/${order._id}`}
                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-all"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {orders.length > 0 && (
          <div className="mt-8">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword}
              basePath="/user/myorders"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrdersPage;
