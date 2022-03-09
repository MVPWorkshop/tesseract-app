import React from "react";
import { Trans } from "@lingui/macro";
import Modal from "../../../molecules/Modal/modal.molecule";
import { EModalName } from "../../../../redux/ui/ui.redux.types";


const ModalConnectWalletV2: React.FC = () => {
  return (
    <Modal name={EModalName.CONNECT_WALLET_V2}>
      <Modal.Title> 
        <Trans>Select the wallet you want to connect with:</Trans>
      </Modal.Title> 
    </Modal>
  );
};

export default ModalConnectWalletV2;
