import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okBaseApi = createApi({
  reducerPath: "okBaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ok-base.wptt.ru/api/" }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `knowledge-base/get-categories`,
    }),

    getFilters: build.query({
      query: () => `knowledge-base/get-filter`,
    }),

    getList: build.query({
      query: (filters) =>
        `knowledge-base/get-list?` + `${new URLSearchParams(filters)}`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetListQuery, useGetFiltersQuery } =
  okBaseApi;
