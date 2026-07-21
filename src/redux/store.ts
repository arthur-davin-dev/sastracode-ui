// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { ecommerceApi } from "./api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
    .concat(ecommerceApi.middleware)
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer RootState
export type RootState = ReturnType<AppStore["getState"]>;

// Infer AppDispatch
export type AppDispatch = AppStore["dispatch"];
