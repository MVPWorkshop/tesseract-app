import React  from "react";
import styles from "./networkPicker.molecule.module.scss";
import { INetworkPickerProps } from "./networkPicker.molecule.types";
import { EChainId } from "../../../shared/types/web3.types";
import { arbirtrayChainDataById } from "../../../shared/constants/web3.constants";
import Typography from "../../atoms/Typography/typography.atom";
import { classes } from "../../../shared/utils/styles.util";
import { Link as RouterLink } from "react-router-dom";
import { getVaultPageRoute } from "../../../shared/utils/vault.util";
import { EColor, EFontWeight } from "../../../shared/types/styles.types";

const NetworkPicker: React.FC<INetworkPickerProps> = (props) => {

  const {
    chainIds,
    activeChainId
  } = props;

  const renderNetworkButton = (chainId: EChainId) => {
    const isActive = activeChainId === chainId;
    const Logo = arbirtrayChainDataById[chainId].logo;
    const label = arbirtrayChainDataById[chainId].label;

    const ElementsToRender = () => {
      return (
        <div className={classes(styles.button, [isActive, styles.active])}>
          <Logo/>
          <Typography
            color={EColor.WHITE}
            fontSize={18}
            fontWeight={EFontWeight.SEMI_BOLD}
            className={styles.btnLabel}
          >
            {isActive && <div className={styles.activeIndicator}/>}
            {label}
          </Typography>
        </div>
      );
    };

    if (isActive) {
      return <ElementsToRender key={chainId}/>;
    } else {
      return (
        <RouterLink
          key={chainId}
          to={getVaultPageRoute(chainId)}
        >
          <ElementsToRender/>
        </RouterLink>
      );
    }
  };

  return (
    <div className={classes(styles.networkPicker, props.className)}>
      {chainIds.map(renderNetworkButton)}
    </div>
  );
};

export default NetworkPicker;
