import {
  EVaultReduxActions,
  SetUserVaultSharesAction,
  SetVaultDetailsAction,
  SetVaultTvlAction
} from "./vaults.redux.types";
import { BigNumber } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Thunk } from "../redux.types";
import ActionUtil from "../../shared/utils/action.util";
import ContractFactory from "../../shared/contracts/contract.factory";
import { EContractType, ESupportedTokens } from "../../shared/types/contract.types";
import ApiService from "../../shared/services/api/api.service";
import { CONFIRMATIONS_SUCCESS } from "../../shared/constants/config.constants";
import { fetchTokenBalance } from "../tokens/tokens.redux.actions";
import { EChainId } from "../../shared/types/web3.types";

export function setVaultDetails(vault: string, symbol: string, apy: number): SetVaultDetailsAction {
  return {
    type: EVaultReduxActions.SET_VAULT_DETAILS,
    payload: {
      vault,
      symbol,
      apy
    }
  };
}

export function setUserVaultShares(vault: string, userShares: BigNumber, sharePrice: BigNumber): SetUserVaultSharesAction {
  return {
    type: EVaultReduxActions.SET_USER_VAULT_SHARES,
    payload: {
      vault,
      sharePrice,
      userShares
    }
  };
}

export function setVaultTvl(vault: string, tvl: BigNumber): SetVaultTvlAction {
  return {
    type: EVaultReduxActions.SET_VAULT_TVL,
    payload: {
      vault,
      tvl
    }
  };
}

export function fetchVaultDetails(vaultAddress: string, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const apiService = new ApiService();

      const symbol = await vaultContract.symbol();
      const apy = await apiService.getVaultAPY(symbol);

      dispatch(setVaultDetails(vaultAddress, symbol, parseFloat(apy)));
      dispatch(ActionUtil.successAction(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress));
    } catch {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress));
    }
  };
}

export function fetchUserVaultShares(vaultAddress: string, userAddress: string, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const userVaultShares = await vaultContract.balanceOf(userAddress);
      const sharePrice = await vaultContract.pricePerShare();

      dispatch(setUserVaultShares(vaultAddress, userVaultShares, sharePrice));
      dispatch(ActionUtil.successAction(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress));
    } catch {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress));
    }
  };
}

export function fetchVaultTvl(vaultAddress: string, provider: JsonRpcSigner): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const totalAssetsDeposited = await vaultContract.functions.totalAssets();

      dispatch(setVaultTvl(vaultAddress, totalAssetsDeposited[0]));
      dispatch(ActionUtil.successAction(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress));
    } catch (error) {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress));
    }
  };
}

export function depositAssets(token: ESupportedTokens, vaultAddress: string, userAddress: string, amount: BigNumber, provider: JsonRpcSigner, chainId: EChainId): Thunk<void> {
  return async dispatch => {
    try {
      dispatch(ActionUtil.requestAction(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress));

      const vaultContract = (new ContractFactory(EContractType.VAULT)).createContract(vaultAddress, provider);
      const tx = await vaultContract["deposit(uint256)"](amount);
      await tx.wait(CONFIRMATIONS_SUCCESS);

      dispatch(fetchUserVaultShares(vaultAddress, userAddress, provider));
      dispatch(fetchTokenBalance(token, userAddress, provider, chainId));
      dispatch(ActionUtil.successAction(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress));
    } catch {
      dispatch(ActionUtil.errorAction(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress));
    }
  };
}
