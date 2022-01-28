import React, { useState } from "react";
import useWeb3 from "../../../hooks/useWeb3";
import { useDispatch } from "react-redux";
import { arbirtrayChainDataById } from "../../../shared/constants/web3.constants";
import TextDialog from "../../atoms/TextDialog/textDialog.atom";
import Typography from "../../atoms/Typography/typography.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { Trans } from "@lingui/macro";
import Button from "../../atoms/Button/button.atom";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import { IChainConstrainDialogProps } from "./ccDialog.organism.types";
import { EChainId } from "../../../shared/types/web3.types";
import WalletService from "../../../shared/services/wallet/wallet.service";
import { Web3Provider } from "@ethersproject/providers";

const ChainConstrainDialog: React.FC<IChainConstrainDialogProps> = (props) => {
  const {
    wantedNetwork,
    isSignerAvailable
  } = props;

  const {
    isChainSupported,
    chainId,
    library
  } = useWeb3();

  const switchToChain = (_chainId: number) => async () => {
    setIsSwitchingNetwork(true);

    if (library) {
      await WalletService.switchToNetwork(library, _chainId);
    } else if (window.ethereum) {
      const temporaryProvider = new Web3Provider(window.ethereum);
      await WalletService.switchToNetwork(temporaryProvider, _chainId);
    }

    setIsSwitchingNetwork(false);
  };

  const dispatch = useDispatch();
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState<boolean>(false);

  if (!isChainSupported || (chainId && wantedNetwork !== chainId)) {
    const networkError = isChainSupported && chainId ?
      arbirtrayChainDataById[chainId as EChainId].label :
      <Trans>unsupported network</Trans>;

    return (
      <TextDialog>
        <Typography
          element="p"
          variant={ETypographyVariant.BODY}
        >
          <Trans>
            This app supports {arbirtrayChainDataById[wantedNetwork].label}. You are currently on
          </Trans>
          &nbsp;{networkError}
        </Typography>
        <div className="d-flex">
          <Button
            theme={"tertiary"}
            onClick={switchToChain(wantedNetwork)}
            loading={isSwitchingNetwork}
          >
            <Typography>
              <Trans>Switch to {arbirtrayChainDataById[wantedNetwork].label} Network</Trans>
            </Typography>
          </Button>
        </div>
        <br/>
        <Typography
          variant={ETypographyVariant.BODY}
          small={true}
          className="d-block"
        >
          <Trans>
            You may need to manually switch network via your wallet.
          </Trans>
        </Typography>
      </TextDialog>
    );
  }

  // Wallet unavailable, prompt user to connect it
  if (!isSignerAvailable) {
    return (
      <TextDialog>
        <Typography
          element="p"
          variant={ETypographyVariant.BODY}
        >
          <Trans>
            Wallet connection to {arbirtrayChainDataById[wantedNetwork].label} required
          </Trans>
        </Typography>
        <Button
          theme={"tertiary"}
          onClick={() => dispatch(toggleModal(EModalName.CONNECT_WALLET, true))}
        >
          <Trans>Connect wallet</Trans>
        </Button>
      </TextDialog>
    );
  }

  /**
   * All conditions are met:
   * 1. Wallet/Signer is connected
   * 2. Wallet chain is the same as the wanted one
   *
   * No dialog needed, return null
   * */
  return null;
};

export default ChainConstrainDialog;
