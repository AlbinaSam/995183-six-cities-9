import { NameSpace } from '../../consts';
import {State} from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.AppUsing].city;

