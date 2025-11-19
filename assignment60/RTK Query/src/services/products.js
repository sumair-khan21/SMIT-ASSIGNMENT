import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// export const productApi = createApi({
//     reducerPath: "productApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "https://fakestoreapi.com/"
//     }),
//     tagTypes: ['Products'],
//     endpoints: (builder) => ({
//         getProducts: builder.query({
//             query: () => "products",
//             providesTags: ['Products'],
//         }),
//         addProduct: builder.mutation({
//             query: (product) => ({
//                 url: "products",
//                 method: "POST",
//                 body: product,
//             }),
//             invalidatesTags: ['Products'],
//         }),
//     }),
// })

// export const { useGetProductsQuery, useAddProductMutation } = productApi;
// // export default productApi;









export const productApi = createApi({
    reducerPath: "ProductApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com/"
    }),
    endpoints: ((builder) => ({
        getProduct: builder.query({
            query: () => "products"
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: "products",
                method: "POST",
                body: product,
            })
        }),
        updateProduct: builder.mutation({
            query: (product)=>({
                url: "products",
                method: "PUT",
                body: product,
            })
        }),
        deleteProduct: builder.mutation({
            query: (id)=>({
                url: `products/${id}`,
                method: "DELETE",
                body: id,
            })
        })
    }))
})
export const { useGetProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;