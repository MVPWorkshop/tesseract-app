import {
  ETokenReduxActions,
  ITokenReduxState,
  ITokensReduxReducerState,
  TokenReduxActions
} from "./tokens.redux.types";
import { Reducer } from "redux";
import { ESupportedTokens, EVaultState, IRegistryVault } from "../../shared/types/vault.types";
import { RootState } from "../redux.types";

const initialState: ITokensReduxReducerState = {
  [ESupportedTokens.USDC]: {},
  [ESupportedTokens.USDT]: {},
  [ESupportedTokens.DAI]: {},
  [ESupportedTokens.WETH]: {},
  [ESupportedTokens.WBTC]: {},
  [ESupportedTokens.WMATIC]: {}
};

const tokensReduxReducer: Reducer<ITokensReduxReducerState, TokenReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case ETokenReduxActions.SET_TOKEN_BALANCE: {
      return {
        ...state,
        [action.payload.token]: ({
          ...state[action.payload.token],
          balance: action.payload.balance
        } as ITokenReduxState)
      };
    }
    case ETokenReduxActions.SET_TOKEN_DETAILS: {
      return {
        ...state,
        [action.payload.token]: ({
          ...state[action.payload.token],
          decimals: action.payload.decimals,
          priceUSD: action.payload.tokenPriceUSD
        } as ITokenReduxState)
      };
    }
    case ETokenReduxActions.ADD_TOKEN_VAULT: {
      const oldVaults = state[action.payload.token].vaults || [];

      const newVaults = oldVaults.map(oldVault => {
        if (oldVault.address !== action.payload.vault.address) {
          return {
            ...oldVault,
            state: EVaultState.OBSOLETE
          };
        }
      });
      newVaults.push(action.payload.vault);

      return {
        ...state,
        [action.payload.token]: ({
          ...state[action.payload.token],
          vaults: [...newVaults]
        } as ITokenReduxState)
      };
    }
    case ETokenReduxActions.SET_TOKEN_APPROVED_AMOUNT: {
      return {
        ...state,
        [action.payload.token]: ({
          ...state[action.payload.token],
          amountApproved: action.payload.amount
        } as ITokenReduxState)
      };
    }
    default: {
      return state;
    }
  }
};

export interface IFlattenedVaultState extends IRegistryVault {
  token: ESupportedTokens;
}

export const createAllVaultsSelector = (tokens: ESupportedTokens[], disableShareFilter = false) => (state: RootState) => {
  const flattenedVaults: IFlattenedVaultState[] = [];

  tokens.forEach(token => {
    const { vaults } = state.tokens[token];

    if (vaults) {
      vaults.forEach(registryVault => {
        const vaultState = state.vaults[registryVault.address];
        const isShareHolder = vaultState && vaultState.userShares && vaultState.userShares.gt(0);
        const isStable = registryVault.state === EVaultState.STABLE;

        if (disableShareFilter || (isStable || isShareHolder)) {
          flattenedVaults.push({
            ...registryVault,
            token
          });
        }
      });
    }
  });

  return flattenedVaults;
};

export default tokensReduxReducer;
