import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { WalletConnectorError } from "../shared/types/error.types";
import Web3Util from "../shared/utils/web3.util";
import { Nullable } from "../shared/types/util.types";
import { Web3Provider } from "@ethersproject/providers";

interface IUseWeb3Context<ProviderType extends any> extends Web3ReactContextInterface<ProviderType> {
  mappedError: Nullable<WalletConnectorError>;
}

function useWeb3<ProviderType = Web3Provider>(): IUseWeb3Context<ProviderType> {
  const context = useWeb3React();

  const mappedError = context.error ? Web3Util.mapConnectorError(context.error) : null;

  return {
    ...context,
    mappedError
  };
}

export default useWeb3;
