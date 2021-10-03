import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { EErrorTypes, WalletConnectorError } from "../shared/types/error.types";
import Web3Util from "../shared/utils/web3.util";
import { Nullable } from "../shared/types/util.types";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

interface IUseWeb3Context<ProviderType extends any> extends Web3ReactContextInterface<ProviderType> {
  mappedError: Nullable<WalletConnectorError>;
  isChainSupported: boolean;
  getSigner: () => Promise<Nullable<JsonRpcSigner>>;
}

function useWeb3(): IUseWeb3Context<JsonRpcProvider> {
  const {
    account,
    library,
    ...context
  } = useWeb3React<JsonRpcProvider>();

  const mappedError = context.error ? Web3Util.mapConnectorError(context.error) : null;
  const isChainSupported =
    mappedError !== EErrorTypes.UNSUPPORTED_CHAIN;

  const getSigner = async () => {
    if (library && account) {
      return library.getSigner(account).connectUnchecked();
    }
  };

  return {
    ...context,
    account,
    library,
    mappedError,
    isChainSupported,
    getSigner
  };
}

export default useWeb3;
