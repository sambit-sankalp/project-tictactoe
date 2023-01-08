import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  game: [],
  error: '',
};

export const getGameByID = createAsyncThunk('games/getGame', async (id) => {
  const { data } = await axios.get(
    `https://sambittictactoeserver.onrender.com/api/game/${id}`
  );
  return data;
});

const getGameByIDSlice = createSlice({
  name: 'getGameByID',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGameByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGameByID.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
        state.error = '';
      })
      .addCase(getGameByID.rejected, (state, action) => {
        state.loading = false;
        state.games = [];
        state.error = action.error.message;
      });
  },
});

export default getGameByIDSlice.reducer;
