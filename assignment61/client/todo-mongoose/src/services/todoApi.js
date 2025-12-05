import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todo',
            providesTags: ['Todo']
        }),
        getTodoById: builder.query({
            query: (id) => `/todo/${id}`,
            providesTags: (result, error, id) => [{ type: 'Todo', id }]
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todo',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todo/${todo.id || todo._id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        })
    })
})



export const { useGetTodosQuery, useGetTodoByIdQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi

export default todoApi
