import { EVaultReduxActions, IVaultsReduxReducerState, VaultsReduxActions } from "./vaults.redux.types";
import { Reducer } from "redux";

const initialState: IVaultsReduxReducerState = {
};

const vaultsReduxReducer: Reducer<IVaultsReduxReducerState, VaultsReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case EVaultReduxActions.SET_VAULT_DETAILS: {
      const { vault, apy, symbol } = action.payload;

      return {
        ...state,
        [vault]: {
          ...(state[vault] || {}),
          apy,
          symbol
        }
      };
    }
    case EVaultReduxActions.SET_USER_VAULT_SHARES: {
      const { vault, sharePrice, userShares } = action.payload;

      return {
        ...state,
        [vault]: {
          ...(state[vault] || {}),
          sharePrice,
          userShares
        }
      };
    }
    case EVaultReduxActions.SET_VAULT_TVL: {
      const { vault, tvl } = action.payload;

      return {
        ...state,
        [vault]: {
          ...(state[vault] || {}),
          tvl
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default vaultsReduxReducer;
