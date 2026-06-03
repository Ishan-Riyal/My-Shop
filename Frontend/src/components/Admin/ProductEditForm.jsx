import { useState } from "react";
import { toast } from "react-toastify";
import { useUploadProductImageMutation } from "../../slices/productSlice";

const ProductEditForm = ({ product, onUpdate, isUpdating }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    image: product?.image || "",
    brand: product?.brand || "",
    category: product?.category || "",
    countInStock: product?.countInStock || 0,
    description: product?.description || "",
  });

  const [uploadProductImage, { isLoading: uploading }] =
    useUploadProductImageMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await uploadProductImage(data).unwrap();
      setFormData((prev) => ({ ...prev, image: res.url }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Upload failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Product Name</label>
          <input
            name="name"
            type="text"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Price (₹)</label>
          <input
            name="price"
            type="number"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="md:col-span-2 bg-slate-50 p-4 rounded-lg border-2 border-dashed border-slate-200">
          <label className="block text-sm font-bold mb-2">
            Image Selection
          </label>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                className="w-20 h-20 object-cover rounded border bg-white shadow-sm"
              />
            )}
            <div className="w-full flex flex-col gap-2">
              <input
                type="text"
                className="w-full border p-2 rounded bg-gray-100 text-xs text-gray-500"
                value={formData.image}
                readOnly
              />
              <input
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
              />
              {uploading && (
                <span className="text-xs text-indigo-600 font-bold animate-pulse">
                  Uploading...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Brand</label>
          <input
            name="brand"
            type="text"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Category</label>
          <input
            name="category"
            type="text"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Stock Count</label>
          <input
            name="countInStock"
            type="number"
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.countInStock}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold">Description</label>
        <textarea
          name="description"
          className="border p-2 rounded h-28 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isUpdating || uploading}
        className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        {isUpdating ? "Saving Changes..." : "Update Product"}
      </button>
    </form>
  );
};

export default ProductEditForm;
