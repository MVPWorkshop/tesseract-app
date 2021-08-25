import { ChangeLocale, EModalName, EUiReduxActions, ToggleModalAction } from "./ui.redux.types";
import { ESupportedLocales } from "../../shared/types/locale.types";

export function toggleModal(modalName: EModalName, modalState: boolean): ToggleModalAction {
  return {
    type: EUiReduxActions.TOGGLE_MODAL,
    payload: {
      name: modalName,
      state: modalState
    }
  };
}

export function changeLocale(locale: ESupportedLocales): ChangeLocale {
  return {
    type: EUiReduxActions.CHANGE_LOCALE,
    payload: {
      locale
    }
  };
}
