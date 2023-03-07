import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["Fahrzeuge", "Fahrer"],
    endpoints: (build) => ({
        getFahrzeuge: build.query({
            query: () => "general/fahrzeuge",
            providesTags: ["Fahrzeuge"],
        }),
        setFahrzeuge: build.mutation({
            query: (data) => `general/fahrzeuge/${data.id}`,
            method: "POST",
            providesTags: ["Fahrzeuge"],
        }),
        getFahrer: build.query({
            query: () => "general/fahrer",
            providesTags: ["Fahrer"],
        }),
    }),
});

export const { useGetFahrzeugeQuery, useSetFahrzeugeMutation, useGetFahrerQuery } = api;