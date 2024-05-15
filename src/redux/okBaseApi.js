import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okBaseApi = createApi({
  reducerPath: "okBaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ok-base.wptt.ru/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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

    recoveryPassStart: build.mutation({
      query: (body) => ({
        url: "auth/recovery-pass-start",
        method: "POST",
        body,
      }),
    }),

    recoveryPassCheckCode: build.mutation({
      query: (body) => ({
        url: "auth/recovery-pass-check-code",
        method: "POST",
        body,
      }),
    }),

    recoveryPassFinish: build.mutation({
      query: (body) => ({
        url: "auth/recovery-pass-finish",
        method: "POST",
        body,
      }),
    }),

    logIn: build.mutation({
      query: (body) => ({
        url: "auth/login",
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

    getAbout: build.query({
      query: () => `content/about`,
    }),

    getFormProperties: build.query({
      query: () => `knowledge-base/form-properties`,
    }),

    createMaterial: build.mutation({
      query: (body) => ({
        url: "knowledge-base/create",
        method: "POST",
        body,
      }),
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
  useLogInMutation,
  useRecoveryPassStartMutation,
  useRecoveryPassCheckCodeMutation,
  useRecoveryPassFinishMutation,
  useGetAboutQuery,
  useGetFormPropertiesQuery,
  useCreateMaterialMutation,
} = okBaseApi;
