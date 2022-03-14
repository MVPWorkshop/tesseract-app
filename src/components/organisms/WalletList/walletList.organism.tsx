import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import Typography from "../../atoms/Typography/typography.atom";
import {
  CONNECTOR_METADATA,
  supportedConnectorList,
} from "../../../shared/constants/web3.constants";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";
import {EConnectorType} from "../../../shared/types/web3.types";
import styles from "./walletList.organism.module.scss";
import WalletService from "../../../shared/services/wallet/wallet.service";
import useWeb3 from "../../../hooks/useWeb3";
import {EModalName} from "../../../redux/ui/ui.redux.types";
import {toggleModal} from "../../../redux/ui/ui.redux.actions";
import {EErrorTypes} from "../../../shared/types/error.types";

const WalletList: React.FC = () => {
  const dispatch = useDispatch();
  const { activate, active, error, connector, mappedError } = useWeb3();

  const closeModal = () => dispatch(toggleModal(EModalName.CONNECT_WALLET_V2, false));

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
    supportedConnectorList.map((type_: EConnectorType) => {
      const Logo = CONNECTOR_METADATA[type_].logo;

      return (
        <li 
          key={type_} 
          onClick={connectWalletFnFactory(type_)} 
          className={styles.walletItem}
        >
          <Logo className={styles.walletLogo}/>
          <Typography 
            color={EColor.BLACK} 
            fontSize={24} 
            fontWeight={EFontWeight.BOLD}
          >
            {CONNECTOR_METADATA[type_].label}
          </Typography>
          <Typography
            color={EColor.DARK_GREY}
            fontSize={18}
          >
            {CONNECTOR_METADATA[type_].description}
          </Typography> 
        </li>
      );
    })
  );

  return (
    <ul className={styles.walletList}>
      {renderSupportedWallets()} 
    </ul>
  );
};

export default WalletList;
