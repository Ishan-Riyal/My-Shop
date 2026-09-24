import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
  }),

  tagTypes: ["Product", "Order", "User"],

  endpoints: (builder) => ({}),
});
