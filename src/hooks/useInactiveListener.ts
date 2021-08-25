import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import WalletService from "../services/wallet.service";

interface IUseInactiveListenerParams {
  suppress?: boolean;
  onConnect?: () => void;
  onAccountChange?: (accounts: string[]) => void;
  onChainChange?: (chainId: string | number) => void;
  onNetworkChange?: (networkId: string | number) => void;
}

export function useInactiveListener(params: IUseInactiveListenerParams = {}): void {
  const { active, error, activate } = useWeb3React();

  const {
    suppress,
    onConnect,
    onAccountChange,
    onChainChange,
    onNetworkChange
  } = params;

  useEffect(() => {
    const { ethereum } = window;
    const injected = WalletService.injected;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        onConnect && onConnect();
        activate(injected);
      };
      const handleChainChanged = (chainId: string | number) => {
        onChainChange && onChainChange(chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        onAccountChange && onAccountChange(accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: string | number) => {
        onNetworkChange && onNetworkChange(networkId);
        activate(injected);
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [
    active, error, suppress, activate, onNetworkChange, onAccountChange, onChainChange, onConnect
  ]);
}
