import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { EErrorTypes, WalletConnectorError } from "../shared/types/error.types";
import Web3Util from "../shared/utils/web3.util";
import { Nullable } from "../shared/types/util.types";
import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import WalletService from "../shared/services/wallet/wallet.service";

interface IUseWeb3Context<ProviderType extends any> extends Web3ReactContextInterface<ProviderType> {
  mappedError: Nullable<WalletConnectorError>;
  isChainSupported: boolean;
  getSigner: () => Promise<Nullable<JsonRpcSigner>>;
  alchemyProvider: JsonRpcProvider;
}

function useWeb3(): IUseWeb3Context<Web3Provider> {
  const {
    account,
    library,
    ...context
  } = useWeb3React<Web3Provider>();

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
    getSigner,
    alchemyProvider: WalletService.alchemyProvider
  };
}

export default useWeb3;
