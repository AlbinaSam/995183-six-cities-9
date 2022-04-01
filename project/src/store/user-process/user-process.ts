import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { AuthorizationStatus } from '../../consts';
import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const {requireAuthorization} = userProcess.actions;
