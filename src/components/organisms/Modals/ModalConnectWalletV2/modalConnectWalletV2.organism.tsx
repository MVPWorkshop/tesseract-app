import React from "react";
import {useSelector} from "react-redux";
import { Trans } from "@lingui/macro";
import { Modal } from "react-bootstrap";
import { EModalName } from "../../../../redux/ui/ui.redux.types";
import { RootState } from "../../../../redux/redux.types";
import styles from "./modalConnectWallet.organism.module.scss";

const ModalConnectWalletV2: React.FC = () => {
  const name = EModalName.CONNECT_WALLET_V2;
  const visible = useSelector<RootState, boolean>(state => !!state.ui.modals[name]);

  return (
    <Modal 
      show={visible} 
      name={EModalName.CONNECT_WALLET_V2}
      dialogClassName={styles.selectWalletModal}
      contentClassName={styles.selectWalletModalContent}
    >
      <Modal.Title> 
        <Trans>Select the wallet you want to connect with:</Trans>
      </Modal.Title> 
    </Modal>
  );
};

export default ModalConnectWalletV2;
