import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { cacheVariables } from '../../utils/cacheConstants';

const initialState = {
  loading: false,
  user: [],
  success: undefined,
  error: '',
};

export const login = createAsyncThunk('user/login', async (user) => {
  const { username, password } = user;
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  let isCacheSupported = 'caches' in window;

  const { data } = await axios.post(
    'https://sambittictactoeserver.onrender.com/api/user/signin',
    { username, password },
    config
  );

  if (isCacheSupported) {
    caches.open(cacheVariables.cacheName).then(function (cache) {
      cache.put(
        cacheVariables.cacheURL,
        new Response(JSON.stringify(data))
      );
    });
  }

  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

const loginSlice = createSlice({
  name: 'userLogin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.user = [];
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
