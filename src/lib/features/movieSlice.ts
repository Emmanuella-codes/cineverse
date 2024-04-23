import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: string;
  title: string;
}

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
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(movie => movie.id === action.payload)
    },
    addToWatchLater(state, action: PayloadAction<Movie>) {
      state.watchLater.push(action.payload);
    },
    removeFromWatchLater(state, action: PayloadAction<string>) {
      state.watchLater = state.watchLater.filter(movie => movie.id === action.payload)
    },
  },
});

export const { addToFavorites, removeFromFavorites, addToWatchLater, removeFromWatchLater } = movieSlice.actions;
export default movieSlice.reducer
