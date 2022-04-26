import React, { MouseEventHandler, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans } from "@lingui/macro";
import { Col, Row } from "react-bootstrap";

import Typography from "../../atoms/Typography/typography.atom";
import { EColor } from "../../../shared/types/styles.types";
import { classes } from "../../../shared/utils/styles.util";
import Separator from "../../atoms/Separator/separator.atom";
import Link from "../../atoms/Link/link.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import Web3Util from "../../../shared/utils/web3.util";
import {
  fetchTokenApprovedAmount
} from "../../../redux/tokens/tokens.redux.actions";
import { RootState } from "../../../redux/redux.types";
import { createLoadingSelector } from "../../../redux/loading/loading.redux.reducer";
import ActionUtil from "../../../shared/utils/action.util";
import { ETokenReduxActions } from "../../../redux/tokens/tokens.redux.types";
import {
  fetchUserVaultShares,
  fetchVaultDetails,
  fetchVaultTvl,
} from "../../../redux/vaults/vaults.redux.actions";
import {
  isZero
} from "../../../shared/utils/common.util";
import { EVaultReduxActions, IVaultReduxState } from "../../../redux/vaults/vaults.redux.types";
import { tokenLabels } from "../../../shared/constants/web3.constants";
import VaultHeader from "../../molecules/VaultHeader/vaultHeader.molecule";
import DepositForm from "../../molecules/DepositForm/depositForm.molecule";
import WithdrawForm from "../../molecules/WithdrawForm/withdrawForm.molecule";
import { Nullable } from "../../../shared/types/util.types";
import styles from "./vault.organism.module.scss";
import { IVaultProps } from "./vault.organism.types";


const Vault: React.FC<IVaultProps> = (props) => {
  const {
    token,
    flag,
    vaultAddress,
    chainId,
    account,
    signer,
    provider
  } = props;

  const tokenLabel = (tokenLabels[token] && tokenLabels[token][chainId]) ? tokenLabels[token][chainId] : token;
  const dispatch = useDispatch();

  const isVaultObsolete = flag === "obsolete";
  const isVaultNew = flag === "new";
  const isSignerAvailable = !!signer;

  const isFetchingAnyData = useSelector<RootState, boolean>(
    createLoadingSelector([
      ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_BALANCE, token),
      ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_DETAILS, token),
      ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_VAULTS, token),
      ActionUtil.actionName(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress),
      ActionUtil.actionName(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress),
      ActionUtil.actionName(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress)
    ])
  );

  const vaultData: Nullable<IVaultReduxState> = useSelector<RootState, IVaultReduxState | null>(state => {
    if (vaultAddress) {
      return state.vaults[vaultAddress];
    } else {
      return null;
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (account && vaultAddress) {
      dispatch(fetchUserVaultShares(vaultAddress, account, provider));
      dispatch(fetchTokenApprovedAmount(token, account, vaultAddress, provider, chainId));
    }
  }, [account, vaultAddress]);

  useEffect(() => {
    if (vaultAddress) {
      dispatch(fetchVaultDetails(vaultAddress, chainId, provider));
      dispatch(fetchVaultTvl(vaultAddress, provider));
    }
  }, [vaultAddress]);

  const toggleDropdown: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!isFetchingAnyData) {
      setIsOpen(prevState => !prevState);
    }
  };

  const renderDropdownBodyContent = () => {
    if (!isSignerAvailable) {
      return (
        <Fragment>
          <Separator marginAfter={55} />
          <Typography
            element={"p"}
            textAlign={"center"}
            fontSize={20}
          >
            <Trans>Wallet connection required</Trans>
          </Typography>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {isZero(vaultData?.depositLimit || 0) ?
          <Typography
            color={EColor.RED}
            element={"p"}
          >
            <Trans>Deposit limit reached, stay tuned till we increase the limit again</Trans>
          </Typography> : null
        }
        <Separator marginAfter={55} />
        <Row>
          <Col>
            <Typography
              variant={ETypographyVariant.BODY}
              small={true}
              element={"p"}
            >
              <Trans>
                Deposit {tokenLabel} token into this vault and we will put it to good use. Lay back and watch it compound while we deploy the best strategies to generate yield.
              </Trans>
            </Typography>
            <Typography
              variant={ETypographyVariant.BODY}
              small={true}
              element="p"
              className="text-break"
            >
              <Trans>Link to contract</Trans>:
              &nbsp;
              <Link link={Web3Util.getExplorerLink(chainId, vaultAddress!, "account")!}>
                {vaultAddress}
              </Link>
            </Typography>
          </Col>
          {isVaultObsolete &&
            <Col>
              <div className={styles.warningContent}>
                <Typography textAlign={"center"}>
                  <Trans>
                    This vault is being retired. A new, better, more optimised vault is coming in its place.
                    Please withdraw your assets below by clicking "withdraw all"
                    and deposit them to the <span className="color-green">new</span> vault.
                  </Trans>
                </Typography>
              </div>
            </Col>
          }
        </Row>
        <br />
        <Row>
          <Col className="mb-4 mb-md-0">
            <DepositForm
              account={account}
              chainId={chainId}
              signer={signer}
              vaultAddress={vaultAddress}
              token={token}
            />
          </Col>
          <Col>
            <WithdrawForm
              account={account}
              chainId={chainId}
              signer={signer}
              vaultAddress={vaultAddress}
              token={token}
            />
          </Col>
        </Row>
      </Fragment>
    );
  };

  return (
    <div className={styles.vault}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          {flag &&
            <div className={classes(
              styles.vaultStateFlag,
              [isVaultObsolete, styles.obsolete]
            )}>
              {isVaultNew ? <Trans>NEW</Trans> : null}
              {isVaultObsolete ? <Trans>OLD</Trans> : null}
            </div>
          }
          <VaultHeader
            onClick={toggleDropdown}
            token={token}
            chainId={chainId}
            vaultData={vaultData}
            loading={isFetchingAnyData}
          />
          <div className={classes(styles.body, [isOpen, styles.open], [!isSignerAvailable, styles.noWallet])}>
            <div className={styles.content}>
              {renderDropdownBodyContent()}
            </div>
          </div>
        </div>
      </div>
      <div className={classes(styles.indicator, [isOpen, styles.open])} />
    </div>
  );
};

export default React.memo(Vault, (prevProps, nextProps) => {
  const isAddressEqual = prevProps.vaultAddress === nextProps.vaultAddress;
  const isChainIdEqual = prevProps.chainId === nextProps.chainId;
  const isAccountEqual = prevProps.account === nextProps.account;

  return (
    isAddressEqual &&
    isChainIdEqual &&
    isAccountEqual
  );
});
