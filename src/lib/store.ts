// lib/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { sastraApi } from "@/redux/api/sastra-code";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [sastraApi.reducerPath]: sastraApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sastraApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer RootState
export type RootState = ReturnType<AppStore["getState"]>;

// Infer AppDispatch
export type AppDispatch = AppStore["dispatch"];