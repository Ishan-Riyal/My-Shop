import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaUserAlt, FaShieldAlt } from "react-icons/fa";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userSlice";

import SearchBox from "../../components/SearchBox";
import Paginate from "../../components/Paginate";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const AdminUserList = () => {
  const { pageNumber = 1, keyword = "" } = useParams();

  const { data, isLoading, error, refetch } = useGetUsersQuery({
    pageNumber,
    keyword,
  });

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Permanently delete this user account?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("Account successfully removed");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || "Operation failed");
      }
    }
  };

  return (
    <div className="p-4 md:p-12 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <FaShieldAlt className="text-indigo-600" /> User Directory
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {keyword
              ? `Search results for "${keyword}"`
              : "Manage system access and permissions"}
          </p>
        </div>
        <div className="w-full md:w-80">
          <SearchBox
            basePath="/admin/userlist"
            placeholder="Search by name or email..."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading || isDeleting ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader />
            <p className="text-slate-400 mt-4 animate-pulse">
              Synchronizing database...
            </p>
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {data.users?.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-xl shadow-inner">
                      <FaUserAlt />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold truncate">{user.name}</div>
                      <div className="text-xs text-slate-400 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${user.isAdmin ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {user.isAdmin ? "Admin" : "Client"}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="p-3 bg-rose-50 text-rose-500 rounded-xl"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                    <th className="p-6">User Identity</th>
                    <th className="p-6 text-center">Security Level</th>
                    <th className="p-6 text-center">Account Status</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.users?.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <FaUserAlt size={14} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">
                              {user.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${user.isAdmin ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {user.isAdmin ? "Admin" : "Standard"}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${user.isBlocked ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"}`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/user/${user._id}/edit`}
                            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Edit Profile"
                          >
                            <FaEdit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            title="Delete Account"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
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
                basePath="/admin/userlist"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
