import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import Web3Util from "../../../shared/utils/web3.util";
import { errorMessages } from "../../../shared/constants/error.constants";
import { Trans } from "@lingui/macro";
import { EErrorTypes } from "../../../shared/types/error.types";

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

    return <Trans>Connect wallet</Trans>;
  };

  return (
    <button onClick={onButtonClick}>
      {renderLabel()}
    </button>
  );
};

export default ConnectWallet;
