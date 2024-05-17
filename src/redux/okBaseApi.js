import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okBaseApi = createApi({
  reducerPath: "okBaseApi",
  tagTypes: ["Materials", "Material"],
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
  keepUnusedDataFor: 1,
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
      invalidatesTags: [{ type: "Materials", id: "LIST" }],
    }),

    logOut: build.query({
      query: () => `auth/logout`,
    }),

    getUser: build.query({
      query: () => `user`,
    }),

    getCategories: build.query({
      query: () => `knowledge-base/get-categories`,
      invalidatesTags: [{ type: "Materials", id: "LIST" }],
    }),

    getFilters: build.query({
      query: (category) => `knowledge-base/get-filter?category=${category}`,
      invalidatesTags: [{ type: "Materials", id: "LIST" }],
    }),

    getList: build.query({
      query: (filters) => {
        const queryString = new URLSearchParams(filters).toString();
        return `knowledge-base/get-list?${queryString}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Materials", id })),
              { type: "Materials", id: "LIST" },
            ]
          : [{ type: "Materials", id: "LIST" }],
    }),

    getMaterialDetail: build.query({
      query: ({ materialDetailId, filters }) =>
        `knowledge-base/${materialDetailId}?my=${filters && filters.my}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Material", id: result.id }, // Поле `id` в объекте `result`
              { type: "Material", id: "LIST" },
            ]
          : [{ type: "Material", id: "LIST" }],
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
      invalidatesTags: [{ type: "Material", id: "LIST" }],
    }),

    editMaterial: build.mutation({
      query: (body) => ({
        url: "knowledge-base/change",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Material", id: "LIST" }],
    }),

    deleteMaterial: build.mutation({
      query: (body) => ({
        url: "knowledge-base/remove",
        method: "POST",
        body,
      }),
    }),

    getPrivacyPolicy: build.query({
      query: () => `content/privacy-policy`,
    }),

    getTermsUse: build.query({
      query: () => `content/terms-use`,
    }),

    getLegalInformation: build.query({
      query: () => `content/legal-information`,
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
  useLogOutQuery,
  useRecoveryPassStartMutation,
  useRecoveryPassCheckCodeMutation,
  useRecoveryPassFinishMutation,
  useGetAboutQuery,
  useGetFormPropertiesQuery,
  useCreateMaterialMutation,
  useEditMaterialMutation,
  useDeleteMaterialMutation,
  useGetUserQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsUseQuery,
  useGetLegalInformationQuery,
} = okBaseApi;
