import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  success: false,
  games: [],
  error: '',
};

export const updateGame = createAsyncThunk('games/updateGame', async (game) => {
  const {
    id,
    stepnumber,
    history,
    xIsNext,
    winner,
    isCompleted,
    player,
    createdBy,
  } = game;

  const { data } = await axios.put(
    `https://sambittictactoeserver.onrender.com/api/game/update/${id}`,
    {
      stepnumber,
      history,
      xIsNext,
      winner,
      isCompleted,
      player,
      createdBy,
    }
  );
  return data;
});

const updateGameSlice = createSlice({
  name: 'updateGame',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateGame.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.success = true;
        state.error = '';
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.games = [];
        state.error = action.error.message;
      });
  },
});

export default updateGameSlice.reducer;
