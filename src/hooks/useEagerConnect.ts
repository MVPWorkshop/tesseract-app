import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import WalletService from "../shared/services/wallet.service";

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const injected = WalletService.injected;

    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      }
    });
  }, [activate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
