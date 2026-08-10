import { configureStore } from "@reduxjs/toolkit";
import { sastraApi } from "@/redux/api/sastra-code";

export const makeStore = () =>
  configureStore({
    reducer: {
      [sastraApi.reducerPath]: sastraApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sastraApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
