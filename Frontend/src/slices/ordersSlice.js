import { apiSlice } from "./apiSlice";

export const ordersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orders/create",
        method: "POST",
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),

    getMyOrders: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: "/api/orders/myorders",
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
    }),

    getRazorpayKey: builder.query({
      query: () => ({
        url: "/api/config/razorpay",
      }),
    }),

    getOrders: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/api/orders",
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useGetRazorpayKeyQuery,
} = ordersSlice;
