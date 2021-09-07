import { useWeb3React } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { WalletConnectorError } from "../shared/types/error.types";
import Web3Util from "../shared/utils/web3.util";
import { Nullable } from "../shared/types/util.types";

interface IUseWeb3Context extends Web3ReactContextInterface {
  mappedError: Nullable<WalletConnectorError>;
}

function useWeb3(): IUseWeb3Context {
  const context = useWeb3React();

  const mappedError = context.error ? Web3Util.mapConnectorError(context.error) : null;

  return {
    ...context,
    mappedError
  };
}

export default useWeb3;
