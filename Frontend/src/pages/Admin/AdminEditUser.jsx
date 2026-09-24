import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaUserShield } from "react-icons/fa";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userSlice";

import UserEditForm from "../../components/Admin/UserEditForm";

const AdminEditUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleUpdate = async (updateData) => {
    try {
      await updateUser({ userId, ...updateData }).unwrap();
      toast.success("User permissions updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-bold">User Not Found</p>
        <Link
          to="/admin/userlist"
          className="mt-4 inline-block text-indigo-600 underline"
        >
          Back to User List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-12 max-w-2xl mx-auto">
      <Link
        to="/admin/userlist"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-bold text-sm transition-colors"
      >
        <FaArrowLeft /> BACK TO USERS
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl mb-4 shadow-lg shadow-indigo-500/30">
            <FaUserShield className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-black text-white">Manage Permissions</h1>
          <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
        </div>

        <div className="p-8 md:p-10">
          <UserEditForm
            key={user._id}
            user={user}
            onSave={handleUpdate}
            isUpdating={isUpdating}
          />
        </div>
      </div>

      <p className="text-center text-[10px] text-slate-400 mt-6 font-mono tracking-widest uppercase">
        System UID: {userId}
      </p>
    </div>
  );
};

export default AdminEditUser;
