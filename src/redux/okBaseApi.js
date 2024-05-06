import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okBaseApi = createApi({
  reducerPath: "okBaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ok-base.wptt.ru/api/" }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `knowledge-base/get-categories`,
    }),
    getList: build.query({
      query: (category) =>
        `knowledge-base/get-list?${category && `category=${category}`}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetListQuery } = okBaseApi;
