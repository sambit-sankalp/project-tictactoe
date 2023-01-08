import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  games: [],
  error: '',
};

export const getGames = createAsyncThunk('games/getGames', async (email) => {
  const { data } = await axios.post('https://sambittictactoeserver.onrender.com/api/game/getGames', {
    email,
  });
  
  return data;
});

const getGamesSlice = createSlice({
  name: 'getGames',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.error = '';
      })
      .addCase(getGames.rejected, (state, action) => {
        state.loading = false;
        state.games = [];
        state.error = action.error.message;
      });
  },
});

export default getGamesSlice.reducer;
