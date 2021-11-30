import { ETokenReduxActions, ITokensReduxReducerState, ITokenReduxState, TokenReduxActions } from "./tokens.redux.types";
import { Reducer } from "redux";
import { ESupportedTokens } from "../../shared/types/contract.types";

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
    case ETokenReduxActions.SET_TOKEN_VAULT: {
      return {
        ...state,
        [action.payload.token]: ({
          ...state[action.payload.token],
          vaultAddress: action.payload.vaultAddress
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

export default tokensReduxReducer;
