import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import Web3Util from "../../../shared/utils/web3.util";
import { errorMessages } from "../../../shared/constants/error.constants";
import { Trans } from "@lingui/macro";
import { EErrorTypes } from "../../../shared/types/error.types";
import Button from "../../atoms/Button/button.atom";
import Typography from "../../atoms/Typography/typography.atom";
import styles from "./connectWalletButton.molecule.module.scss";

const ConnectWallet: React.FC = () => {

  const dispatch = useDispatch();
  const context = useWeb3React();
  const { account, active, error: web3Error } = context;
  const error = web3Error ? Web3Util.mapConnectorError(web3Error) : null;

  const onButtonClick = () => {
    dispatch(toggleModal(EModalName.CONNECT_WALLET, true));
  };

  const isUnsupportedChain = error && error === EErrorTypes.UNSUPPORTED_CHAIN;
  const isAccountAvailable = active && account;

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
      theme={'secondary'}
      onClick={onButtonClick}
      className={styles.connectWalletButton}
    >
      <Typography uppercase={true}>
        {renderLabel()}
      </Typography>
    </Button>
  );
};

export default ConnectWallet;
