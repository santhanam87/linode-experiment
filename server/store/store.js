import { configureStore } from '@reduxjs/toolkit';
import counter from './reducers/counterSlice';

export default (preloadedState) => configureStore({
  reducer: { counter },
  preloadedState,
});
