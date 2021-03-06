import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { EErrorTypes, WalletConnectorError } from "../shared/types/error.types";
import Web3Util from "../shared/utils/web3.util";
import { Nullable } from "../shared/types/util.types";
import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import WalletService from "../shared/services/wallet/wallet.service";
import { EChainId } from "../shared/types/web3.types";
import { DEFAULT_CHAIN_ID } from "../shared/constants/config.constants";

interface IUseWeb3Context<ProviderType extends any> extends Web3ReactContextInterface<ProviderType> {
  mappedError: Nullable<WalletConnectorError>;
  isChainSupported: boolean;
  getSigner: () => Promise<Nullable<JsonRpcSigner>>;
  rpcProvider: JsonRpcProvider;
  displayChainId: EChainId;
}

function useWeb3(wantChainId?: EChainId): IUseWeb3Context<Web3Provider> {
  const {
    account,
    library,
    chainId,
    ...context
  } = useWeb3React<Web3Provider>();

  const mappedError = context.error ? Web3Util.mapConnectorError(context.error) : null;
  const isChainSupported =
    mappedError !== EErrorTypes.UNSUPPORTED_CHAIN;

  let displayChainId = DEFAULT_CHAIN_ID;
  if (wantChainId) {
    displayChainId = wantChainId;
  } else if (chainId && isChainSupported) {
    displayChainId = chainId;
  }

  const rpcProvider = WalletService.rpcProvider(displayChainId);

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
    displayChainId,
    chainId,
    rpcProvider
  };
}

export default useWeb3;
