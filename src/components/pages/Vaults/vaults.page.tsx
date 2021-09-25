import React, { Fragment } from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { getSupportedTokensByChain } from "../../../shared/utils/vault.util";
import useWeb3 from "../../../hooks/useWeb3";
import { EChainId } from "../../../shared/types/web3.types";
import Vault from "../../organisms/Vault/vault.organism";
import TextDialog from "../../atoms/TextDialog/textDialog.atom";
import Typography from "../../atoms/Typography/typography.atom";
import { Trans } from "@lingui/macro";
import { chainLabels, supportedChainIds } from "../../../shared/constants/web3.constants";
import Button from "../../atoms/Button/button.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import styles from "./vaults.page.module.scss";

const VaultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { chainId, isChainSupported, active, library } = useWeb3();
  const displayChainId = (chainId && isChainSupported) ? chainId : EChainId.POLYGON_MAINNET;

  const tokens = getSupportedTokensByChain(displayChainId);
  const isProviderAvailable = active && library;

  const getChainLabelList = () => {
    return supportedChainIds.map((chainId, index) => {
      const chainLabel = chainLabels[chainId];
      const isFirst = index === 0;

      return isFirst ? chainLabel : `, ${chainLabel}`;
    });
  };

  const renderWalletWrongNetwork = () => {
    return (
      <TextDialog>
        <Typography
          element="p"
          variant={ETypographyVariant.BODY}
        >
          <Trans>
            This app supports&nbsp;
            {getChainLabelList()}.
            You are currently on unsupported network
          </Trans>
        </Typography>
        <Button theme={"tertiary"}>
          <Typography>
            <Trans>Switch to Polygon Network</Trans>
          </Typography>
        </Button>
        <br/>
        <Typography
          variant={ETypographyVariant.BODY}
          small={true}
          className="d-block"
        >
          <Trans>
            You may need to manually switch network via your wallet.
          </Trans>
        </Typography>
      </TextDialog>
    );
  };

  const renderProviderUnavailable = () => {
    return (
      <TextDialog>
        <Typography
          element="p"
          variant={ETypographyVariant.BODY}
        >
          <Trans>
            Wallet connection to {getChainLabelList()} required
          </Trans>
        </Typography>
        <Button
          theme={"tertiary"}
          onClick={() => dispatch(toggleModal(EModalName.CONNECT_WALLET, true))}
        >
          <Trans>Connect wallet</Trans>
        </Button>
      </TextDialog>
    );
  };

  const renderVaults = () => {
    return (
      <Fragment>
        <div className={styles.vaultsTitle}>
          <Typography
            variant={ETypographyVariant.TITLE}
            element={"h3"}
            className={"mr-4"}
          >
            <Trans>
              {tokens.length} Vaults
            </Trans>
          </Typography>
          <div className="d-flex flex-column">
            <Typography
              variant={ETypographyVariant.TITLE}
              element={"h3"}
            >
              <Trans>TVL</Trans>&nbsp;$134.24M
            </Typography>
            <Typography
              variant={ETypographyVariant.TITLE}
              element={"h5"}
            >
              <Trans>Deposited</Trans>&nbsp;$0.00
            </Typography>
          </div>
        </div>
        {tokens.map(token => (
          <Vault
            key={`${token}-${displayChainId}`}
            token={token}
          />
        ))}
      </Fragment>
    );
  };

  const renderContent = () => {
    if (!isChainSupported) {
      return renderWalletWrongNetwork();
    }
    if (!isProviderAvailable) {
      return renderProviderUnavailable();
    }

    return renderVaults();
  };

  return (
    <PageOrganism
      containerEnabled={true}
      className={styles.vaultsPage}
    >
      {renderContent()}
    </PageOrganism>
  );
};

export default VaultsPage;
