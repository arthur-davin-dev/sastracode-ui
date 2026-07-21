import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  tagTypes: ["Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", 
  }),
  endpoints: () => ({}),
})