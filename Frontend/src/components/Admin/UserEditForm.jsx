import { useState } from "react";
import { FaUserShield, FaUserSlash } from "react-icons/fa";

const UserEditForm = ({ user, onSave, isUpdating }) => {
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [isBlocked, setIsBlocked] = useState(user?.isBlocked || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ isAdmin, isBlocked });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        onClick={() => setIsAdmin(!isAdmin)}
        className={`p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
          isAdmin
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-100 bg-gray-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaUserShield
              className={isAdmin ? "text-indigo-600" : "text-gray-400"}
              size={24}
            />
            <div>
              <p className="font-bold text-gray-800">Administrator Access</p>
              <p className="text-xs text-gray-500">
                Allows managing products and orders
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded cursor-pointer accent-indigo-600"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </div>
      </div>

      <div
        onClick={() => setIsBlocked(!isBlocked)}
        className={`p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
          isBlocked ? "border-red-500 bg-red-50" : "border-gray-100 bg-gray-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaUserSlash
              className={isBlocked ? "text-red-600" : "text-gray-400"}
              size={24}
            />
            <div>
              <p className="font-bold text-gray-800">Block User Account</p>
              <p className="text-xs text-gray-500">
                User will be unable to log in
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-6 h-6 rounded cursor-pointer accent-red-600"
            checked={isBlocked}
            onChange={(e) => setIsBlocked(e.target.checked)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
      >
        {isUpdating ? "Updating Status..." : "Save Status Changes"}
      </button>
    </form>
  );
};

export default UserEditForm;
