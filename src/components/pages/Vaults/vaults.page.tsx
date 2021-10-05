import React, { Fragment, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";
import { EModalName } from "../../../redux/ui/ui.redux.types";
import styles from "./vaults.page.module.scss";
import { JsonRpcSigner } from "@ethersproject/providers";
import { Nullable } from "../../../shared/types/util.types";
import { RootState } from "../../../redux/redux.types";
import BigDecimal from "js-big-decimal";
import { createTotalDepositedSelector, createTotalTvlSelector } from "../../../redux/vaults/vaults.redux.reducer";
import { areBigDecimalsEqual, formatAssetDisplayValue } from "../../../shared/utils/common.util";

const VaultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { chainId, isChainSupported, active, library, account, getSigner } = useWeb3();

  const [signer, setSigner] = useState<Nullable<JsonRpcSigner>>();

  useEffect(() => {
    getSigner()
      .then(setSigner)
      .catch(() => setSigner(null));
  }, [library, account]);

  const displayChainId = (chainId && isChainSupported) ? chainId : EChainId.POLYGON_MAINNET;
  const tokens = getSupportedTokensByChain(displayChainId);
  const isProviderAvailable = active && library && signer;

  const getChainLabelList = () => {
    return supportedChainIds.map((chainId, index) => {
      const chainLabel = chainLabels[chainId];
      const isFirst = index === 0;

      return isFirst ? chainLabel : `, ${chainLabel}`;
    });
  };

  const totalTvl = useSelector<RootState, BigDecimal>(createTotalTvlSelector(tokens), areBigDecimalsEqual);
  const totalDeposited = useSelector<RootState, BigDecimal>(createTotalDepositedSelector(tokens), areBigDecimalsEqual);

  const renderWalletWrongNetwork = () => {
    return (
      <TextDialog>
        <Typography
          element="p"
          variant={ETypographyVariant.BODY}
        >
          <Trans>
            This app supports
            {" "+getChainLabelList()}.
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
              <Trans>TVL</Trans>&nbsp;${formatAssetDisplayValue(totalTvl.getValue())}
            </Typography>
            <Typography
              variant={ETypographyVariant.TITLE}
              element={"h5"}
            >
              <Trans>Deposited</Trans>&nbsp;${formatAssetDisplayValue(totalDeposited.getValue())}
            </Typography>
          </div>
        </div>
        {tokens.map(token => (
          <Vault
            key={`${token}-${displayChainId}`}
            token={token}
            signer={signer!}
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
