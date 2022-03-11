import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import Typography from "../../atoms/Typography/typography.atom";
import { CONNECTOR_LABELS, CONNECTOR_LOGOS, CONNECTOR_DESCRIPTIONS, supportedConnectorList } from "../../../shared/constants/web3.constants";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";
import {EConnectorType} from "../../../shared/types/web3.types";
import styles from "./walletList.organism.module.scss";
import WalletService from "../../../shared/services/wallet/wallet.service";
import useWeb3 from "../../../hooks/useWeb3";
import {EModalName} from "../../../redux/ui/ui.redux.types";
import {toggleModal} from "../../../redux/ui/ui.redux.actions";

const WalletList: React.FC = () => {
  const dispatch = useDispatch();
  const { activate, active, mappedError} = useWeb3();  // eslint-disable-line

  const connectWalletFnFactory = (type_: EConnectorType) => {
    return () => {
      const _connector = WalletService.typeToProvider(type_);
      activate(_connector).finally(() => dispatch(toggleModal(EModalName.CONNECT_WALLET_V2, false)));
    };
  };

  useEffect(() => {
    if (active) {
      dispatch(toggleModal(EModalName.CONNECT_WALLET_V2, false));
    }
  }, [active])

  const renderSupportedWallets = () => (
    supportedConnectorList.map((type_: EConnectorType) => {
      const Logo = CONNECTOR_LOGOS[type_];

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
            {CONNECTOR_LABELS[type_]}
          </Typography>
          <Typography
            color={EColor.DARK_GREY}
            fontSize={18}
          >
            {CONNECTOR_DESCRIPTIONS[type_]}
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
