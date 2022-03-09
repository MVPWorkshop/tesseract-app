import React, { Fragment } from "react";
import ModalConnectWallet from "./ModalConnectWallet/modalConnectWallet.organism";
import ModalConnectWalletV2 from "./ModalConnectWalletV2/modalConnectWalletV2.organism";

const Modals: React.FC = () => {
  return (
    <Fragment>
      <ModalConnectWallet />
      <ModalConnectWalletV2 />
    </Fragment>
  );
};

export default Modals;
