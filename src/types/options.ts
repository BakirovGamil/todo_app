import { IOptions } from './types';

export type OptionState = IOptions;

export enum OptionsActionTypes {
  SET_MENU_VISIBILITY = 'SET_MENU_VISIBILITY'
}

export interface OptionsAction {
  type: OptionsActionTypes,
  payload: any
}
