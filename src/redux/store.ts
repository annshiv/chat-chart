import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './templateSlice';

const store = configureStore({
  reducer: {
    config: templateReducer
  }
});

// Export the store
export default store;

// Export RootState and AppDispatch for use in the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
