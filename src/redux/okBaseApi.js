import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okBaseApi = createApi({
  reducerPath: "okBaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ok-base.wptt.ru/api/" }),
  endpoints: (build) => ({
    regStart: build.mutation({
      query: (body) => ({
        url: "auth/reg-start",
        method: "POST",
        body,
      }),
    }),

    regRepeatCode: build.mutation({
      query: (body) => ({
        url: "auth/reg-repeat-code",
        method: "POST",
        body,
      }),
    }),

    regCheckCode: build.mutation({
      query: (body) => ({
        url: "auth/reg-check-code",
        method: "POST",
        body,
      }),
    }),

    regFinish: build.mutation({
      query: (body) => ({
        url: "auth/reg-finish",
        method: "POST",
        body,
      }),
    }),

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
    getMaterialDetail: build.query({
      query: (materialDetailId) => `knowledge-base/${materialDetailId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetListQuery,
  useGetFiltersQuery,
  useGetMaterialDetailQuery,
  useRegStartMutation,
  useRegRepeatCodeMutation,
  useRegCheckCodeMutation,
  useRegFinishMutation,
} = okBaseApi;
