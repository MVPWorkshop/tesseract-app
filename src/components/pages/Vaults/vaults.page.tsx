import React, { Fragment, useEffect, useState } from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { getSupportedTokensByChain } from "../../../shared/utils/vault.util";
import useWeb3 from "../../../hooks/useWeb3";
import Vault from "../../organisms/Vault/vault.organism";
import Typography from "../../atoms/Typography/typography.atom";
import { Trans } from "@lingui/macro";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { useDispatch, useSelector } from "react-redux";
import styles from "./vaults.page.module.scss";
import { JsonRpcSigner } from "@ethersproject/providers";
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
import { clearAllTokensState, fetchTokenBalance, fetchTokenDetails } from "../../../redux/tokens/tokens.redux.actions";
import { createAllVaultsSelector, IFlattenedVaultState } from "../../../redux/tokens/tokens.redux.reducer";
import { createLoadingSelector } from "../../../redux/loading/loading.redux.reducer";
import { ETokenReduxActions } from "../../../redux/tokens/tokens.redux.types";
import Loader from "../../atoms/Loader/loader.atom";
import { EVaultState } from "../../../shared/types/vault.types";
import { IVaultProps } from "../../organisms/Vault/vault.organism.types";
import { EFontWeight } from "../../../shared/types/styles.types";
import WarningBanner from "../../atoms/WarningBanner/warningBanner.atom";
import { BANNER_ENABLED, BANNER_TEXT, DEFAULT_CHAIN_ID } from "../../../shared/constants/config.constants";
import { clearAllVaultsState, fetchAllAvailableVaults } from "../../../redux/vaults/vaults.redux.actions";
import { RouteComponentProps } from "react-router-dom";
import { ERouteNetwork, IVaultPageParams } from "../../../router/router.types";
import ChainConstrainDialog from "../../organisms/CCDialog/ccDialog.organism";
import {
  arbirtrayChainDataById,
  chainIdByRouteNetwork,
  supportedChainIds
} from "../../../shared/constants/web3.constants";
import { generatePath } from "react-router-dom";
import NetworkPicker from "../../molecules/NetworkPicker/networkPicker.molecule";
import Separator from "../../atoms/Separator/separator.atom";

const VaultsPage: React.FC<RouteComponentProps<IVaultPageParams>> = (props) => {

  const dispatch = useDispatch();
  const pageNetwork = props.match.params.network;

  //@TODO Make network base parameter of every chain related route and handle this on global level
  useEffect(() => {
    if (!Object.keys(ERouteNetwork).includes(pageNetwork || "")) {
      const defaultRouteParam = arbirtrayChainDataById[DEFAULT_CHAIN_ID].routeParam;
      const path = generatePath(props.match.path, { network: defaultRouteParam });
      props.history.replace(path);
    }
  }, []);

  const {
    active,
    library,
    account,
    getSigner,
    rpcProvider,
    displayChainId
  } = useWeb3(pageNetwork ? chainIdByRouteNetwork[pageNetwork] : DEFAULT_CHAIN_ID);

  const [isGettingSigner, setIsGettingSigner] = useState(true);
  const [signer, setSigner] = useState<Nullable<JsonRpcSigner>>();

  useEffect(() => {
    setIsGettingSigner(true);

    getSigner()
      .then(result => {
        setSigner(result);
        setIsGettingSigner(false);
      })
      .catch(() => {
        setSigner(null);
        setIsGettingSigner(false);
      });
  }, [library, account]);

  const tokens = getSupportedTokensByChain(displayChainId);

  useEffect(() => {
    dispatch(clearAllTokensState());
    dispatch(clearAllVaultsState());
    tokens.forEach(token => {
      dispatch(fetchTokenDetails(token, rpcProvider, displayChainId));
    });
  }, [pageNetwork]);

  useEffect(() => {
    if (!isGettingSigner) {
      dispatch(fetchAllAvailableVaults(tokens, account, rpcProvider, displayChainId));
    }
  }, [pageNetwork, isGettingSigner]);

  useEffect(() => {
    if (!isGettingSigner && account) {
      tokens.forEach(token => {
        dispatch(fetchTokenBalance(token, account, rpcProvider, displayChainId));
      });
    }
  }, [pageNetwork, account, isGettingSigner]);

  const isSignerAvailable = !!(active && library && signer);

  const totalTvl = useSelector<RootState, BigDecimal>(createTotalTvlSelector(tokens), areBigDecimalsEqual);
  const totalDeposited = useSelector<RootState, BigDecimal>(createTotalDepositedSelector(tokens), areBigDecimalsEqual);
  const allVaults = useSelector<RootState, IFlattenedVaultState[]>(createAllVaultsSelector(tokens), areArraysEqual);
  const isLoadingAnyData = useSelector<RootState, boolean>(createLoadingSelector([
    ETokenReduxActions.FETCH_ALL_AVAILABLE_VAULTS,
  ]));

  const renderVaults = () => {
    return (
      <Fragment>
        <ChainConstrainDialog
          isSignerAvailable={isSignerAvailable}
          wantedNetwork={displayChainId}
          className={"mb-5"}
        />
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
        <NetworkPicker
          chainIds={supportedChainIds}
          activeChainId={displayChainId}
        />
        <Separator
          invisible={true}
          marginAfter={30}
        />
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
              signer={signer}
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
          <Trans>Loading Vaults, this will take some time, please don't refresh...</Trans>
        </Typography>
      </div>
    );
  };

  const renderContent = () => {
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
