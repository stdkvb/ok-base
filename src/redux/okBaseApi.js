import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okBaseApi = createApi({
  reducerPath: "okBaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ok-base.wptt.ru/api/" }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `knowledge-base/get-categories`,
    }),

    getFilters: build.query({
      query: (category) => `knowledge-base/get-filter?category=${category}`,
    }),

    getList: build.query({
      query: (filters) =>
        `knowledge-base/get-list?` + `${new URLSearchParams(filters)}`,
    }),
    getDetailPage: build.query({
      query: (detailPageId) => `knowledge-base/${detailPageId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetListQuery,
  useGetFiltersQuery,
  useGetDetailPageQuery,
} = okBaseApi;
