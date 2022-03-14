import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Modal } from "react-bootstrap";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import { EModalName } from "../../../../redux/ui/ui.redux.types";
import { RootState } from "../../../../redux/redux.types";
import { toggleModal } from "../../../../redux/ui/ui.redux.actions";
import styles from "./modalConnectWalletV2.organism.module.scss";
import {EConnectorType} from "../../../../shared/types/web3.types";
import useWeb3 from "../../../../hooks/useWeb3";
import {supportedConnectorList} from "../../../../shared/constants/web3.constants";
import WalletService from "../../../../shared/services/wallet/wallet.service";
import {EErrorTypes} from "../../../../shared/types/error.types";
import WalletItem from "../../../molecules/WalletItem/walletItem.molecule";


const ModalConnectWalletV2: React.FC = () => {
  const name = EModalName.CONNECT_WALLET_V2;
  const dispatch = useDispatch();
  const visible = useSelector<RootState, boolean>(state => !!state.ui.modals[name]);

  const closeModal = () => {
    dispatch(toggleModal(name, false));
  };

  const { activate, active, error, connector, mappedError } = useWeb3();

  const connectWalletFnFactory = (type_: EConnectorType) => {
    return () => {
      const _connector = WalletService.typeToProvider(type_);
      activate(_connector).finally(() => closeModal());
    };
  };

  useEffect(() => {
    if (error) {
      if (connector instanceof WalletConnectConnector) {
        if (mappedError === EErrorTypes.UNSUPPORTED_CHAIN) {
          closeModal();
        } else if (connector.walletConnectProvider?.wc?.uri) {
          connector.walletConnectProvider = undefined; // Makes the dialog be opennable after cancellation
        }
      }
    }
  }, [error]);

  useEffect(() => {
    if (active) {
      dispatch(toggleModal(EModalName.CONNECT_WALLET_V2, false));
    }
  }, [active]);

  const renderSupportedWallets = () => (
    supportedConnectorList.map((type_: EConnectorType) => (
      <WalletItem connectorType={type_} onClick={connectWalletFnFactory(type_)} /> 
    ))
  );

  return (
    <Modal 
      show={visible} 
      name={EModalName.CONNECT_WALLET_V2}
      contentClassName={styles.selectWalletModalContent}
      onHide={closeModal}
      centered
    >
      <Modal.Body className={styles.selectWalletModalBody}>
        <ul className={styles.walletList}>
          {renderSupportedWallets()} 
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConnectWalletV2;
