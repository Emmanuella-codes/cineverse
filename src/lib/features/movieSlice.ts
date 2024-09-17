import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Movie } from "../../../typings";

interface MovieState {
  favorites: Movie[];
  watchLater: Movie[];
}

const initialState: MovieState = {
  favorites: [],
  watchLater: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Movie>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        (movie) => movie.id === action.payload
      );
    },
    addToWatchLater(state, action: PayloadAction<Movie>) {
      state.watchLater.push(action.payload);
    },
    removeFromWatchLater(state, action: PayloadAction<number>) {
      state.watchLater = state.watchLater.filter(
        (movie) => movie.id === action.payload
      );
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToWatchLater,
  removeFromWatchLater,
} = movieSlice.actions;
export default movieSlice.reducer;

export const isMovieInFavorites = (movieId: number) => (state: RootState) =>
  state.movies.favorites.some((movies) => movies.id === movieId);

export const isMovieInWatchLater = (movieId: number) => (state: RootState) =>
  state.movies.watchLater.some((movies) => movies.id === movieId);
