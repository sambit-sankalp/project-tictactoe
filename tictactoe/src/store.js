import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/auth/registerSlice';
import loginReducer from './slices/auth/loginSlice';
import getGamesReducer from './slices/games/getGamesSlice';
import getGameByIDReducer from './slices/games/getGameByIdSlice';
import createGameReducer from './slices/games/createGameslice';
import updateGameReducer from './slices/games/updateGameSlice';

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    getGamebyID: getGameByIDReducer,
    getGames: getGamesReducer,
    createGame: createGameReducer,
    updateGame: updateGameReducer,
  },
});
