import { Reducer } from "redux";
import { EUiReduxActions, UiReduxActions, UiReduxReducerState } from "./ui.redux.types";
import { ESupportedLocales } from "../../shared/types/locale.types";

const initialState: UiReduxReducerState = {
  modals: {},
  locale: ESupportedLocales.ENGLISH
};

const uiReduxReducer: Reducer<UiReduxReducerState, UiReduxActions> = (state = initialState, action) => {
  switch (action.type) {
  case EUiReduxActions.TOGGLE_MODAL: {

    const { state: modalState, name: modalName } = action.payload;

    return {
      ...state,
      modals: {
        ...state.modals,
        [modalName]: modalState
      }
    };
  }
  case EUiReduxActions.CHANGE_LOCALE: {
    return {
      ...state,
      locale: action.payload.locale
    };
  }
  default: {
    return state;
  }
  }
};

export default uiReduxReducer;
