import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ETemplateId {
  BAR = 'BAR',
  LINE = 'LINE'
}

export interface IState {
  template: ETemplateId;
  ranking: {
    type: string;
    count: number;
  };
  sorting: {
    type: string;
  };
}

// Define your initial state
const initialState: IState = {
  template: ETemplateId.BAR,
  ranking: { type: 'off', count: 0 },
  sorting: {
    type: 'off'
  }
};

// Create a slice
const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate(state, action: PayloadAction<{ template: ETemplateId }>) {
      state.template = action.payload.template;
    },
    setRanking(state, action: PayloadAction<{ type: string; count: number }>) {
      state.ranking = action.payload;
    },
    setSorting(state, action: PayloadAction<{ type: string }>) {
      state.sorting = action.payload;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = templateSlice;

// Export the actions
export const { setTemplate, setRanking, setSorting } = actions;

// Export the reducer as default
export default reducer;
