import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ETemplateId {
  BAR = 'BAR',
  LINE = 'LINE'
}

export interface IState {
  template: ETemplateId;
}

export interface IPayload {
  template: ETemplateId;
}

// Define your initial state
const initialState: IState = {
  template: ETemplateId.BAR
};

// Create a slice
const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate(state, action: PayloadAction<IPayload>) {
      state.template = action.payload.template;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = templateSlice;

// Export the actions
export const { setTemplate } = actions;

// Export the reducer as default
export default reducer;
