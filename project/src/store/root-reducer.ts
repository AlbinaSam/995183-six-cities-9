import { combineReducers } from '@reduxjs/toolkit';
import { appData } from './app-data/app-data';
import { appUsing } from './app-using/app-using';
import { userProcess } from './user-process/user-process';
import { NameSpace } from '../consts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Data]: appData.reducer,
  [NameSpace.AppUsing]: appUsing.reducer,
});
