import React from "react";
import Modal from "../../../molecules/Modal/modal.molecule";
import { EModalName } from "../../../../redux/ui/ui.redux.types";

const ModalConnectWallet: React.FC = () => {
  return (
    <Modal name={EModalName.CONNECT_WALLET}>
      Hey!
    </Modal>
  );
};

export default ModalConnectWallet;
