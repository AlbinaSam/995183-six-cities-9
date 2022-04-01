import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AppUsing } from '../../types/state';

const initialState: AppUsing = {
  city: 'Paris',
};

export const appUsing = createSlice({
  name: NameSpace.AppUsing,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const {changeCity} = appUsing.actions;
