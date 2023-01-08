import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { cacheVariables } from '../../utils/cacheConstants';

const initialState = {
  loading: false,
  user: [],
  success: false,
  error: '',
};

export const register = createAsyncThunk('user/register', async (user) => {
  const { name, username, email, password } = user;
  const config = {
    headers: {
      'content-type': 'application/json',
    },
  };

  let isCacheSupported = 'caches' in window;

  const { data } = await axios.post(
    'https://sambittictactoeserver.onrender.com/api/user/signup',
    { name, username, email, password },
    config
  );

  if (isCacheSupported) {
    caches.open(cacheVariables.cacheName).then(function (cache) {
      cache.put(cacheVariables.cacheURL, new Response(JSON.stringify(data)));
    });
  }

  localStorage.setItem('userInfo', JSON.stringify(data));
  return data;
});

const registerSlice = createSlice({
  name: 'userRegister',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.user = [];
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
