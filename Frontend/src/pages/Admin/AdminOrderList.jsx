import React from "react";
import { FaEye,FaClipboardList } from "react-icons/fa";
import { useGetOrdersQuery } from "../../slices/ordersSlice";
import { Link, useParams } from "react-router-dom";

import SearchBox from "../../components/SearchBox";
import Paginate from "../../components/Paginate";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const AdminOrderList = () => {
  const { pageNumber = 1, keyword = "" } = useParams();

  const { data, isLoading, error } = useGetOrdersQuery({
    pageNumber,
    keyword,
  });

  return (
    <div className="p-4 md:p-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <FaClipboardList size={20} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Order Management
            </h1>
          </div>
          <p className="text-slate-500 font-medium">
            {keyword ? (
              <span>
                Results for <span className="text-indigo-600">"{keyword}"</span>
              </span>
            ) : (
              "Track and manage all customer transactions"
            )}
          </p>
        </div>

        <div className="w-full md:w-96">
          <SearchBox
            placeholder="Search Order ID..."
            basePath="/admin/orderlist"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <Loader />
            <p className="mt-4 text-slate-400 animate-pulse">
              Fetching orders...
            </p>
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {data.orders?.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      ID: {order._id.slice(-8)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${order.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-800">
                      {order.user?.name || "Guest User"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {order.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-slate-900">
                      ₹{order.totalPrice}
                    </span>
                    <Link
                      to={`/orders/${order._id}`}
                      className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                    <th className="p-5">Order Reference</th>
                    <th className="p-5">Customer</th>
                    <th className="p-5">Date</th>
                    <th className="p-5">Total Amount</th>
                    <th className="p-5">Payment</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.orders?.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-5 font-mono text-[11px] text-indigo-600 font-bold">
                        #{order._id}
                      </td>
                      <td className="p-5 font-bold text-slate-700">
                        {order.user?.name || "Guest"}
                      </td>
                      <td className="p-5 text-sm text-slate-400">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-5 font-black text-slate-900">
                        ₹{order.totalPrice}
                      </td>
                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold ${order.isPaid ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}
                        >
                          {order.isPaid ? "Completed" : "Awaiting"}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <Link
                          to={`/orders/${order._id}`}
                          className="inline-flex p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <FaEye size={20} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 flex justify-center">
              <Paginate
                pages={data.pages}
                page={data.page}
                isAdmin={true}
                keyword={keyword}
                basePath="/admin/orderlist"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrderList;
