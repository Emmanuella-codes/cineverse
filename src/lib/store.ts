import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./features/movieSlice";

export const createStore = () => {
  return configureStore({
    reducer: {
      movies: MovieReducer,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
