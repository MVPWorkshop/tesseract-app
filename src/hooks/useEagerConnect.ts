import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import WalletService from "../shared/services/wallet.service";

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const activateConnector = async () => {
      const injected = WalletService.injected;
      const isAuthorized = await injected.isAuthorized();

      if (isAuthorized) {
        try {
          await activate(injected, undefined, true);
        } catch(error) {
          setTried(true);
        }
      }
    };

    activateConnector().then();
  }, [activate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
