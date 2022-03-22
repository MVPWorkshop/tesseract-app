import React from "react";
import { useDispatch } from "react-redux";
import { Trans } from "@lingui/macro";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import Web3Util from "../../../shared/utils/web3.util";
import { errorMessages } from "../../../shared/constants/error.constants";
import { EErrorTypes } from "../../../shared/types/error.types";
import Button from "../../atoms/Button/button.atom";
import Typography from "../../atoms/Typography/typography.atom";
import styles from "./connectWalletButton.molecule.module.scss";
import useWeb3 from "../../../hooks/useWeb3";
import { IClassableComponent } from "../../../shared/types/util.types";
import { classes } from "../../../shared/utils/styles.util";
import { EFontWeight } from "../../../shared/types/styles.types";

const ConnectWallet: React.FC<IClassableComponent> = (props) => {

  const dispatch = useDispatch();
  const context = useWeb3();
  const { account, active, mappedError } = context;
  const isUnsupportedChain = mappedError && mappedError === EErrorTypes.UNSUPPORTED_CHAIN;
  const isAccountAvailable = active && account;

  const onButtonClick = () => {
    // clicking this button should disconnect the current active connector
    if (context.connector) {
      // wallet connect disconnect issue - https://github.com/NoahZinsmeister/web3-react/issues/239
      if (context.connector instanceof WalletConnectConnector) {
        context.connector.close();
      }
      context.deactivate();
    } else {
      dispatch(toggleModal(EModalName.CONNECT_WALLET_V2, true));
    }
  };

  
  const renderLabel = () => {
    if (isUnsupportedChain) {
      return <Trans id={errorMessages[EErrorTypes.UNSUPPORTED_CHAIN].short} />;
    } else if (isAccountAvailable) {
      return Web3Util.getFormattedAddress(account!);
    }

    return <Trans>Wallet</Trans>;
  };

  return (
    <Button
      theme={"secondary"}
      onClick={onButtonClick}
      className={classes(styles.connectWalletButton, props.className)}
    >
      <Typography uppercase={true} fontWeight={EFontWeight.BOLD}>
        {renderLabel()}
      </Typography>
    </Button>
  );
};

export default ConnectWallet;
