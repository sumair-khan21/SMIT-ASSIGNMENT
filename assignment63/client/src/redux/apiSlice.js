import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include',
        prepareHeaders: (headers) => {
            // Cookies are handled automatically by the browser with credentials: 'include'
            return headers;
        },
    }),
    tagTypes: ['Product', 'User'],
    endpoints: (builder) => ({
        // Auth Endpoints
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        signup: builder.mutation({
            query: (userData) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),

        // Product Endpoints
        getProducts: builder.query({
            query: () => '/products/getAllProducts',
            providesTags: ['Product'],
        }),
        getProduct: builder.query({
            query: (id) => `/products/getProduct/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/products/addProduct',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...updates }) => ({
                url: `/products/updateProduct/${id}`,
                method: 'POST',
                body: updates,
            }),
            invalidatesTags: (result, error, { id }) => ['Product', { type: 'Product', id }],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/deleteProduct/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = apiSlice;
