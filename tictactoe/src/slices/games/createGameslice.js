import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  game: [],
  success: false,
  error: '',
};

export const createGame = createAsyncThunk(
  'games/createGame',
  async (email) => {
    const { data } = await axios.post('https://sambittictactoeserver.onrender.com/api/game/create', {
      stepnumber: 0,
      history: Array(9).fill(null),
      xIsNext: true,
      isCompleted: false,
      playerEmail: email,
      createdByEmail: JSON.parse(localStorage.getItem('userInfo')).email,
    });
    return data;
  }
);

const createGameSlice = createSlice({
  name: 'createGame',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
        state.success = true;
        state.error = '';
      })
      .addCase(createGame.rejected, (state, action) => {
        state.loading = false;
        state.game = [];
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default createGameSlice.reducer;
