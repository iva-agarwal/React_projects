import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamApi } from './sevices/shazam';
import { geniusApi } from './sevices/genius';
export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]:shazamApi.reducer,
    [geniusApi.reducerPath]:geniusApi.reducer,
    player: playerReducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamApi.middleware),
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(geniusApi.middleware),
});
