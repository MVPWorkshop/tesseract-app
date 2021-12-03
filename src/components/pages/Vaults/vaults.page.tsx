import React, { Fragment, useEffect, useState } from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { getSupportedTokensByChain } from "../../../shared/utils/vault.util";
import useWeb3 from "../../../hooks/useWeb3";
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
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { Nullable } from "../../../shared/types/util.types";
import { RootState } from "../../../redux/redux.types";
import BigDecimal from "js-big-decimal";
import { createTotalDepositedSelector, createTotalTvlSelector } from "../../../redux/vaults/vaults.redux.reducer";
import {
  areArraysEqual,
  areBigDecimalsEqual,
  formatAssetDisplayValue,
  objectListToArrayByConditionalKey
} from "../../../shared/utils/common.util";
import WalletService from "../../../shared/services/wallet/wallet.service";
import {
  fetchAllAvailableVaults,
  fetchTokenBalance,
  fetchTokenDetails
} from "../../../redux/tokens/tokens.redux.actions";
import { createAllVaultsSelector, IFlattenedVaultState } from "../../../redux/tokens/tokens.redux.reducer";
import { createLoadingSelector } from "../../../redux/loading/loading.redux.reducer";
import { ETokenReduxActions } from "../../../redux/tokens/tokens.redux.types";
import Loader from "../../atoms/Loader/loader.atom";
import { EVaultState } from "../../../shared/types/vault.types";
import { IVaultProps } from "../../organisms/Vault/vault.organism.types";
import { EFontWeight } from "../../../shared/types/styles.types";
import WarningBanner from "../../atoms/WarningBanner/warningBanner.atom";
import { BANNER_ENABLED, BANNER_TEXT } from "../../../shared/constants/config.constants";

const VaultsPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isChainSupported,
    active,
    library,
    account,
    getSigner,
    rpcProvider,
    displayChainId
  } = useWeb3();

  const [signer, setSigner] = useState<Nullable<JsonRpcSigner>>();
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState<boolean>(false);

  useEffect(() => {
    getSigner()
      .then(setSigner)
      .catch(() => setSigner(null));
  }, [library, account]);

  const tokens = getSupportedTokensByChain(displayChainId);

  useEffect(() => {
    if (rpcProvider) {
      tokens.forEach(token => {
        dispatch(fetchTokenDetails(token, rpcProvider, displayChainId));
      });
    }
  }, [rpcProvider]);

  useEffect(() => {
    if (rpcProvider && account) {
      dispatch(fetchAllAvailableVaults(tokens, account, rpcProvider, displayChainId));
      tokens.forEach(token => {
        dispatch(fetchTokenBalance(token, account, rpcProvider, displayChainId));
      });
    }
  }, [rpcProvider, account]);


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
  const allVaults = useSelector<RootState, IFlattenedVaultState[]>(createAllVaultsSelector(tokens), areArraysEqual);
  const isLoadingAnyData = useSelector<RootState, boolean>(createLoadingSelector([
    ETokenReduxActions.FETCH_ALL_AVAILABLE_VAULTS,
  ]));

  const switchToPolygonChain = async () => {
    setIsSwitchingNetwork(true);

    if (library) {
      await WalletService.switchToNetwork(library, displayChainId);
    } else if (window.ethereum) {
      const temporaryProvider = new Web3Provider(window.ethereum);
      await WalletService.switchToNetwork(temporaryProvider, displayChainId);
    }

    setIsSwitchingNetwork(false);
  };

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
        <Button
          theme={"tertiary"}
          onClick={switchToPolygonChain}
          loading={isSwitchingNetwork}
        >
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
              {allVaults.length} Vaults
            </Trans>
          </Typography>
          <div className="d-flex flex-column align-items-end">
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
              <Trans>Total Deposited Value</Trans>&nbsp;${formatAssetDisplayValue(totalDeposited.getValue())}
            </Typography>
          </div>
          { BANNER_ENABLED &&
            <div className="mt-6">
              <WarningBanner text={BANNER_TEXT} />
            </div>
          }
        </div>
        {allVaults.map(vaultData => {
          // Meaning, if user can see more than 1 vault, it should be flagged, otherwise don't do anything
          let flag: IVaultProps["flag"];
          if (vaultData.state === EVaultState.OBSOLETE) {
            flag = "obsolete";
          } else {
            const vaultsByToken = objectListToArrayByConditionalKey(allVaults, "token", vaultData.token);
            if (vaultsByToken.length > 1) {
              flag = "new";
            }
          }

          return (
            <Vault
              key={`${vaultData.address}-${displayChainId}`}
              flag={flag}
              chainId={displayChainId}
              token={vaultData.token}
              vaultAddress={vaultData.address}
              signer={signer!}
              account={account}
              provider={rpcProvider}
            />
          );
        })}
      </Fragment>
    );
  };

  const renderLoadingVaults = () => {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader height={"48px"}/>
        <Typography
          fontSize={24}
          fontWeight={EFontWeight.BOLD}
        >
          <Trans>Loading Vaults...</Trans>
        </Typography>
      </div>
    );
  };

  const renderContent = () => {
    if (!isChainSupported) {
      return renderWalletWrongNetwork();
    }
    if (!isProviderAvailable) {
      return renderProviderUnavailable();
    }
    if (isLoadingAnyData) {
      return renderLoadingVaults();
    }

    return renderVaults();
  };

  return (
    <PageOrganism className={styles.vaultsPage}>
      {renderContent()}
    </PageOrganism>
  );
};

export default VaultsPage;
