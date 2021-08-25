import React from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import { useEagerConnect } from "../../../hooks/useEagerConnect";
import { useInactiveListener } from "../../../hooks/useInactiveListener";

const ConnectWallet: React.FC = () => {

  const context = useWeb3React();
  const dispatch = useDispatch();
  const triedEager = useEagerConnect();
  useInactiveListener({ suppress: !triedEager });

  const { account, active } = context;

  const onButtonClick = () => {
    dispatch(toggleModal(EModalName.CONNECT_WALLET, true));
  };

  const accountLabel = (active && account) &&
    account.substr(0, 6) + "..." + account.substr(-4);

  return (
    <button onClick={onButtonClick}>
      {accountLabel || "CONNECT WALLET"}
    </button>
  );
};

export default ConnectWallet;
