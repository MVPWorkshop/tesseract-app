import { EVaultReduxActions, IVaultsReduxReducerState, VaultsReduxActions } from "./vaults.redux.types";
import { Reducer } from "redux";
import { RootState } from "../redux.types";
import BigDecimal from "js-big-decimal";
import { getShareInUSD, getTokenInUSD } from "../../shared/utils/vault.util";
import { ESupportedTokens } from "../../shared/types/vault.types";

const initialState: IVaultsReduxReducerState = {
};

const vaultsReduxReducer: Reducer<IVaultsReduxReducerState, VaultsReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case EVaultReduxActions.SET_VAULT_DETAILS: {
      const { vault, apy, symbol, depositLimit, sharePrice } = action.payload;

      return {
        ...state,
        [vault]: {
          ...(state[vault] || {}),
          apy,
          symbol,
          depositLimit,
          sharePrice
        }
      };
    }
    case EVaultReduxActions.SET_USER_VAULT_SHARES: {
      const { vault, userShares } = action.payload;

      return {
        ...state,
        [vault]: {
          ...(state[vault] || {}),
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
    case EVaultReduxActions.CLEAR_ALL_VAULTS_STATE: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

export const createTotalTvlSelector = (tokens: ESupportedTokens[]) => (state: RootState) => {
  let totalSumUsd = new BigDecimal(0);

  for (let i = 0; i < tokens.length; i++) {
    const { vaults, decimals, priceUSD } = state.tokens[tokens[i]];

    if (vaults && decimals && priceUSD) {
      for (let j = 0; j < vaults.length; j++) {
        const vault = vaults[j];
        const vaultData = state.vaults[vault.address];

        if (vaultData) {
          const {tvl} = vaultData;

          if (tvl) {
            totalSumUsd = totalSumUsd.add(getTokenInUSD(tvl.toString(), priceUSD.toString(), decimals));
          }
        }
      }
    }
  }
  return totalSumUsd;
};

export const createTotalDepositedSelector = (tokens: ESupportedTokens[]) => (state: RootState) => {
  let totalSumUsd = new BigDecimal(0);

  for (let i = 0; i < tokens.length; i++) {
    const { vaults, decimals, priceUSD } = state.tokens[tokens[i]];

    if (vaults && decimals && priceUSD) {
      for (let j = 0; j < vaults.length; j++) {
        const vault = vaults[j];
        const vaultData = state.vaults[vault.address];

        if (vaultData) {
          const { userShares, sharePrice } = vaultData;

          if (userShares && sharePrice) {
            const valueOfShareUsd = getShareInUSD(userShares.toString(), sharePrice.toString(), priceUSD, decimals);
            totalSumUsd = totalSumUsd.add(valueOfShareUsd);
          }
        }
      }
    }
  }
  return totalSumUsd;
};

export default vaultsReduxReducer;
