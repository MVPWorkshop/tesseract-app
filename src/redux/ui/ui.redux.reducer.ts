import { Reducer } from "redux";
import { EUiReduxActions, UiReduxActions, IUiReduxReducerState } from "./ui.redux.types";
import { ESupportedLocales } from "../../shared/types/locale.types";

const initialState: IUiReduxReducerState = {
  modals: {},
  locale: ESupportedLocales.ENGLISH
};

const uiReduxReducer: Reducer<IUiReduxReducerState, UiReduxActions> = (state = initialState, action) => {
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
