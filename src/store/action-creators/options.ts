import { OptionsActionTypes } from '../../types/options';

export const setMenuVisibility = (isVisibleMenu: boolean) => {
  return {
    type: OptionsActionTypes.SET_MENU_VISIBILITY,
    payload: {
      isVisibleMenu
    }
  };
};