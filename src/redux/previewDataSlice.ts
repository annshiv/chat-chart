import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IState } from './templateSlice';

// Create a slice
const previewDataSlice = createSlice({
  name: 'previewData',
  initialState: {} as IState,
  reducers: {
    setPreviewDataConfig(state, action: PayloadAction<IState>) {
      state = action.payload;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = previewDataSlice;

// Export the actions
export const { setPreviewDataConfig } = actions;

// Export the reducer as default
export default reducer;
