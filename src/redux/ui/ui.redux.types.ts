// Actions
import { ReduxAction } from "../redux.types";
import { DynamicObject } from "../../shared/types/util.types";
import { ESupportedLocales } from "../../shared/types/locale.types";

export enum EModalName {
  CONNECT_WALLET = "CONNECT_WALLET"
}

export enum EUiReduxActions {
  TOGGLE_MODAL = "TOGGLE_MODAL",
  CHANGE_LOCALE = "CHANGE_LOCALE"
}

export type ToggleModalAction = ReduxAction<EUiReduxActions.TOGGLE_MODAL, {
  name: EModalName;
  state: boolean;
}>

export type ChangeLocale = ReduxAction<EUiReduxActions.CHANGE_LOCALE, {
  locale: ESupportedLocales;
}>

export type UiReduxActions =
  ToggleModalAction |
  ChangeLocale;

// Reducer
export interface IUiReduxReducerState {
  modals: DynamicObject<boolean, EModalName>;
  locale: ESupportedLocales;
}
