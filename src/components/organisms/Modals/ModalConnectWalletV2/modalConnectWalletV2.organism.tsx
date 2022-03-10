import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { Modal } from "react-bootstrap";
import { EModalName } from "../../../../redux/ui/ui.redux.types";
import { RootState } from "../../../../redux/redux.types";
import { toggleModal } from "../../../../redux/ui/ui.redux.actions";
import WalletList from "../../WalletList/walletList.organism";
import styles from "./modalConnectWalletV2.organism.module.scss";

const ModalConnectWalletV2: React.FC = () => {
  const name = EModalName.CONNECT_WALLET_V2;
  const dispatch = useDispatch();
  const visible = useSelector<RootState, boolean>(state => !!state.ui.modals[name]);

  const closeModal = () => {
    dispatch(toggleModal(name, false));
  };

  return (
    <Modal 
      show={visible} 
      name={EModalName.CONNECT_WALLET_V2}
      contentClassName={styles.selectWalletModalContent}
      onHide={closeModal}
    >
      <Modal.Body className={styles.selectWalletModalBody}>
        <WalletList /> 
      </Modal.Body>
    </Modal>
  );
};

export default ModalConnectWalletV2;
