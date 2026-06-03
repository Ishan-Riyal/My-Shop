import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productSlice";
import ProductEditForm from "../../components/Admin/ProductEditForm";

const AdminEditProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const handleUpdate = async (formData) => {
    try {
      await updateProduct({ productId, ...formData }).unwrap();
      toast.success("Product successfully updated");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium">Fetching product data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 border border-red-100 rounded-xl text-center">
        <h3 className="text-red-800 font-bold mb-2">Something went wrong</h3>
        <p className="text-red-600 text-sm mb-4">
          Could not find the product requested.
        </p>
        <Link
          to="/admin/productlist"
          className="text-indigo-600 font-bold underline"
        >
          Return to List
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link
            to="/admin/productlist"
            className="hover:text-indigo-600 transition-colors"
          >
            Admin
          </Link>
          <FaChevronRight className="text-[10px]" />
          <Link
            to="/admin/productlist"
            className="hover:text-indigo-600 transition-colors"
          >
            Inventory
          </Link>
          <FaChevronRight className="text-[10px]" />
          <span className="text-slate-900 font-semibold">Edit Product</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              Edit Product
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Modify item details, pricing, and stock levels.
            </p>
          </div>
          <Link
            to="/admin/productlist"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
          >
            <FaArrowLeft /> Back to List
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 h-1.5 w-full" />
          <div className="p-6 md:p-10">
            <ProductEditForm
              key={product._id}
              product={product}
              onUpdate={handleUpdate}
              isUpdating={isUpdating}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-mono rounded-full uppercase tracking-widest">
            ID: {productId}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
