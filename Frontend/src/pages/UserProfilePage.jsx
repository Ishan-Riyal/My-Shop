import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/userSlice";
import { setCredentials } from "../slices/authSlice";

function UserProfilePage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const payload = {
        _id: userInfo._id,
        name,
        email,
      };

      if (password.trim()) {
        payload.password = password;
      }

      const res = await updateProfile(payload).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully");

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-8 border-b pb-4 text-gray-800">
        My Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="w-32 h-32 bg-blue-600 text-white rounded-full flex items-center justify-center text-4xl font-bold uppercase shadow-inner">
            {userInfo?.name?.charAt(0)}
          </div>
          <div className="w-full space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <label className="text-xs text-gray-400 uppercase font-black tracking-wider">
                Current Name
              </label>
              <p className="text-gray-800 font-semibold">{userInfo?.name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-black tracking-wider">
                Current Email
              </label>
              <p className="text-gray-800 font-semibold">{userInfo?.email}</p>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Update Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Update Email"
            />
          </div>

          <hr className="my-6" />

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              New Password
            </label>
            <p className="text-[10px] text-gray-400 italic">
              Leave blank to keep current password
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Min 6 characters"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Repeat password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-300 active:scale-95 transform mt-4"
          >
            {isLoading ? "Updating Profile..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfilePage;
