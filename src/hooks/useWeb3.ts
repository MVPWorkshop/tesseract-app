import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { EErrorTypes, WalletConnectorError } from "../shared/types/error.types";
import Web3Util from "../shared/utils/web3.util";
import { Nullable } from "../shared/types/util.types";
import { Web3Provider } from "@ethersproject/providers";

interface IUseWeb3Context<ProviderType extends any> extends Web3ReactContextInterface<ProviderType> {
  mappedError: Nullable<WalletConnectorError>;
  isChainSupported: boolean;
}

function useWeb3<ProviderType = Web3Provider>(): IUseWeb3Context<ProviderType> {
  const context = useWeb3React();

  const mappedError = context.error ? Web3Util.mapConnectorError(context.error) : null;
  const isChainSupported =
    mappedError !== EErrorTypes.UNSUPPORTED_CHAIN;

  return {
    ...context,
    mappedError,
    isChainSupported
  };
}

export default useWeb3;
