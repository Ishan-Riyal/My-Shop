import React from "react";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaPlus, FaBoxOpen } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productSlice";
import Paginate from "../../components/Paginate";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import SearchBox from "../../components/SearchBox";

const AdminProductList = () => {
  const { pageNumber = 1, keyword = "" } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this product permanently?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product removed");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Initialize a new product entry?")) {
      try {
        await createProduct().unwrap();
        refetch();
        toast.success("New product initialized");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="p-4 md:p-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <FaBoxOpen className="text-indigo-600" /> Inventory Manager
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Total: {data?.products?.length || 0} products in current view
          </p>
        </div>

        <button
          onClick={createProductHandler}
          disabled={loadingCreate}
          className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-95 transition-all disabled:opacity-50"
        >
          <FaPlus size={14} />{" "}
          {loadingCreate ? "Processing..." : "Create New Product"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto mb-10">
        <SearchBox
          basePath="/admin/productlist"
          placeholder="Search by name or category..."
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {isLoading || loadingDelete ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader />
            <p className="text-slate-400 mt-4 animate-pulse">
              Updating inventory...
            </p>
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                    <tr>
                      <th className="p-6">Product Details</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Pricing</th>
                      <th className="p-6 text-center">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.products?.map((product) => (
                      <tr
                        key={product._id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-6">
                          <div className="font-bold text-slate-800">
                            {product.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">
                            SKU: {product._id.slice(-12)}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">
                            {product.category}
                          </span>
                        </td>
                        <td className="p-6">
                          <div className="text-lg font-black text-slate-900">
                            ₹{product.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex justify-center gap-2">
                            <Link
                              to={`/admin/product/${product._id}/edit`}
                              className="p-3 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                              title="Edit"
                            >
                              <FaEdit size={16} />
                            </Link>
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="p-3 text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                              title="Delete"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword}
                isAdmin={true}
                basePath="/admin/productlist"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProductList;
