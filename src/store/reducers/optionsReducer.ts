import { getDataLocalStorage } from '../../lib/todo';
import { OptionsAction, OptionsActionTypes, OptionState } from '../../types/options';

const data = getDataLocalStorage();

const initialState: OptionState = data.options;

export const optionsReducer = (state: OptionState = initialState, action: OptionsAction) => {
  switch(action.type) {
    case OptionsActionTypes.SET_MENU_VISIBILITY:
      const {isVisibleMenu} = action.payload;

      return {
        ...state,
        isVisibleMenu
      };
      
    default:
      return state;
  }
}