import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRanking } from '../Services/Ranking';
import { ISorting } from '../Services/Sorting';

export enum ETemplateId {
  BAR = 'bar',
  LINE = 'line'
}

export interface IState {
  template: ETemplateId;
  ranking: IRanking;
  sorting: ISorting;
}

// Define your initial state
export const initialState: IState = {
  template: ETemplateId.LINE,
  ranking: { type: 'off', count: 0 },
  sorting: {
    type: 'off'
  }
};

// Create a slice
const templateSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<{ config: IState }>) {
      state = action.payload.config;
    },
    setTemplate(state, action: PayloadAction<{ template: ETemplateId }>) {
      state.template = action.payload.template;
    },
    setRanking(state, action: PayloadAction<IRanking>) {
      state.ranking = action.payload;
    },
    setSorting(state, action: PayloadAction<ISorting>) {
      state.sorting = action.payload;
    }
  }
});

// Extract the action creators object and the reducer
const { actions, reducer } = templateSlice;

// Export the actions
export const { setTemplate, setRanking, setSorting, setConfig } = actions;

// Export the reducer as default
export default reducer;
