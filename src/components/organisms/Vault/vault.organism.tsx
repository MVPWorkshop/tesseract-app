import React, { MouseEventHandler, useEffect, useState } from "react";
import styles from "./vault.organism.module.scss";
import { IVaultProps } from "./vault.organism.types";
import { tokenIcons } from "../../../shared/constants/common.constants";
import { Table } from "react-bootstrap";
import { Trans } from "@lingui/macro";
import Typography from "../../atoms/Typography/typography.atom";
import { EFontWeight } from "../../../shared/types/styles.types";
import DropdownArrow from "../../atoms/DropdownArrow/dropdownArrow.atom";
import Button from "../../atoms/Button/button.atom";
import { classes } from "../../../shared/utils/styles.util";
import Separator from "../../atoms/Separator/separator.atom";
import Link from "../../atoms/Link/link.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import Input from "../../atoms/Input/input.atom";
import { EInputType } from "../../atoms/Input/input.atom.types";
import { Row, Col } from "react-bootstrap";
import Slider from "../../atoms/Slider/slider.atom";
import useWeb3 from "../../../hooks/useWeb3";
import Web3Util from "../../../shared/utils/web3.util";
import { useDispatch, useSelector } from "react-redux";
import {
  approveTokenSpending,
  fetchTokenApprovedAmount,
  fetchTokenBalance,
  fetchTokenDetails,
  fetchTokenVault
} from "../../../redux/tokens/tokens.redux.actions";
import { RootState } from "../../../redux/redux.types";
import { createLoadingSelector } from "../../../redux/loading/loading.redux.reducer";
import ActionUtil from "../../../shared/utils/action.util";
import { ETokenReduxActions, ITokenReduxState } from "../../../redux/tokens/tokens.redux.types";
import {
  depositAssetsIntoVault,
  fetchUserVaultShares,
  fetchVaultDetails,
  fetchVaultTvl, withdrawAssetsFromVault
} from "../../../redux/vaults/vaults.redux.actions";
import { formatAssetDisplayValue, isEmptyValue } from "../../../shared/utils/common.util";
import { EVaultReduxActions, IVaultReduxState } from "../../../redux/vaults/vaults.redux.types";
import { parseUnits } from "ethers/lib/utils";
import { getShareInToken, getTokenInUSD } from "../../../shared/utils/vault.util";

const Vault: React.FC<IVaultProps> = (props) => {
  const {
    token,
    signer
  } = props;

  const dispatch = useDispatch();
  const { chainId, account } = useWeb3();

  const {
    vaultAddress,
    balance,
    decimals,
    priceUSD
  } = useSelector<RootState, ITokenReduxState>(state => state.tokens[token]);

  const isFetchingAnyData = useSelector<RootState, boolean>(
    createLoadingSelector([
      ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_BALANCE, token),
      ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_DETAILS, token),
      ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_VAULT, token),
      ActionUtil.actionName(EVaultReduxActions.FETCH_VAULT_TVL, vaultAddress),
      ActionUtil.actionName(EVaultReduxActions.FETCH_VAULT_DETAILS, vaultAddress),
      ActionUtil.actionName(EVaultReduxActions.FETCH_USER_VAULT_SHARES, vaultAddress)
    ])
  );
  const isFetchingApprovedTokenAmount = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token)])
  );
  const isApprovingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(ETokenReduxActions.APPROVE_TOKEN_SPENDING, token)])
  );
  const isDepositingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress)])
  );
  const isWithdrawingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.WITHDRAW_ASSETS, vaultAddress)])
  );
  const isWithdrawingAllAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.WITHDRAW_ALL_ASSETS, vaultAddress)])
  );

  const vaultData: IVaultReduxState | undefined = useSelector<RootState, IVaultReduxState | undefined>(state => {
    if (vaultAddress) {
      return state.vaults[vaultAddress];
    } else {
      return undefined;
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [depositValue, setDepositValue] = useState<number>(0);
  const [withdrawValue, setWithdrawValue] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchTokenDetails(token, signer, chainId));
    dispatch(fetchTokenVault(token, signer, chainId));
  }, [chainId]);

  useEffect(() => {
    if (account) {
      dispatch(fetchTokenBalance(token, account, signer, chainId));
    }
  }, [chainId, account]);

  useEffect(() => {
    if (account && vaultAddress) {
      dispatch(fetchUserVaultShares(vaultAddress, account, signer));
    }
  }, [chainId, account, vaultAddress]);

  useEffect(() => {
    if (isOpen && account && vaultAddress) {
      dispatch(fetchTokenApprovedAmount(token, account, vaultAddress, signer, chainId));
    }
  }, [isOpen, account, vaultAddress]);

  useEffect(() => {
    if (vaultAddress) {
      dispatch(fetchVaultDetails(vaultAddress, signer));
      dispatch(fetchVaultTvl(vaultAddress, signer));
    }
  }, [chainId, vaultAddress]);

  const onDepositValueChange = (value: number) => {
    setDepositValue(value);
  };

  const onWithdrawValueChange = (value: number) => {
    setWithdrawValue(value);
  };

  const toggleDropdown: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!isFetchingAnyData) {
      setIsOpen(prevState => !prevState);
    }
  };

  const TokenLogo = tokenIcons[token];
  const sliderMarks = [1, 25, 50, 75, 100];

  const isApproveAssetsDisabled = !(depositValue && !isEmptyValue(decimals) && account && vaultAddress && signer && chainId);
  const approveAssets = () => {
    if (!isApproveAssetsDisabled) {
      const amountToApprove = parseUnits(depositValue.toString(), decimals);
      dispatch(approveTokenSpending(token, amountToApprove, account!, vaultAddress!, signer, chainId!));
    }
  };

  const isDepositSomeAssetsDisabled = !(vaultAddress && account && chainId && depositValue && decimals);
  const depositAssets =  () => {
    if (!isDepositSomeAssetsDisabled) {
      const amountToSpend = parseUnits(depositValue.toString(), decimals);
      dispatch(depositAssetsIntoVault(token, vaultAddress!, account!, amountToSpend, signer, chainId!));
    }
  };

  const isWithdrawAllAssetsDisabled = !(vaultAddress && account && chainId);
  const isWithdrawSomeAssetsDisabled = isWithdrawAllAssetsDisabled || !(withdrawValue > 0 && decimals);
  const withdrawAssets = (withdrawAll: boolean) => () => {
    if (withdrawAll && !isWithdrawAllAssetsDisabled) {
      const amountToWithdraw = -1; // Deposit all
      dispatch(withdrawAssetsFromVault(token, vaultAddress!, account!, amountToWithdraw, signer, chainId!));
    } else if (!isWithdrawSomeAssetsDisabled) {
      const amountToWithdraw = parseUnits(withdrawValue.toString(), decimals);
      dispatch(withdrawAssetsFromVault(token, vaultAddress!, account!, amountToWithdraw, signer, chainId!));
    }
  };

  const vaultAPY = (vaultData && vaultData.apy) && vaultData.apy * 100;
  const tvl = (vaultData && vaultData.tvl && priceUSD && decimals) ? getTokenInUSD(vaultData.tvl, priceUSD, decimals) : undefined;
  const formattedBalance = (balance && decimals) ? Web3Util.formatTokenNumber(balance, decimals, 6) : undefined;
  const formattedUserShares = (vaultData && vaultData.userShares && vaultData.sharePrice && decimals) ? getShareInToken(vaultData.userShares, vaultData.sharePrice, decimals).round(6) : undefined;

  return (
    <div className={styles.vault}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <div className={styles.header} onClick={toggleDropdown}>
            <div className={styles.tokenLogoContainer}>
              <TokenLogo className="d-inline mr-2"/>
              <Typography
                fontWeight={EFontWeight.SEMI_BOLD}
                className="d-inline"
              >
                {token}
              </Typography>
            </div>
            <Table
              borderless={true}
              responsive={true}
            >
              <thead>
                <tr>
                  <th><Trans>APY</Trans></th>
                  <th><Trans>Total value locked</Trans></th>
                  <th><Trans>Your staked LP</Trans></th>
                  <th><Trans>Available to stake</Trans></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatAssetDisplayValue(vaultAPY?.toPrecision(3))}%</td>
                  <td>${formatAssetDisplayValue(tvl?.getValue())}</td>
                  <td>{formatAssetDisplayValue(formattedUserShares?.getValue())} {token}</td>
                  <td>{formatAssetDisplayValue(formattedBalance?.getValue())} {token}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              theme={"flat"}
              onClick={toggleDropdown}
              disableLoadingText={true}
              loading={isFetchingAnyData}
              disabled={isFetchingAnyData}
            >
              <DropdownArrow isOpen={isOpen}/>
            </Button>
          </div>
          <div className={classes(styles.body, [isOpen, styles.open])}>
            <div className={styles.content}>
              <Separator marginAfter={55}/>
              <Typography
                variant={ETypographyVariant.BODY}
                small={true}
                element={"p"}
              >
                <Trans>
                  Deposit {token} token into this vault and we will put it to good use. Lay back and watch it compound while we deploy the best strategies to generate yield.
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
                <Link link={Web3Util.getExplorerLink(chainId!, vaultAddress!, "account")!}>
                  {vaultAddress}
                </Link>
              </Typography>

              <br/>
              <Row>
                <Col className="mb-4 mb-md-0">
                  <Typography variant={ETypographyVariant.BODY} small={true}>
                    <Trans>Balance</Trans>:
                    &nbsp;
                    {`${formatAssetDisplayValue(formattedBalance?.getValue())} ${token}`}
                  </Typography>
                  <Input
                    type={EInputType.NUMBER}
                    onChange={onDepositValueChange}
                    value={depositValue}
                  />
                  <Slider
                    value={depositValue}
                    onChange={onDepositValueChange}
                    min={1}
                    max={100}
                    marks={sliderMarks}
                    markSymbol={"%"}
                    className="mt-4 mb-12"
                  />
                  <Row className="mt-6">
                    <Col className="d-flex justify-content-center">
                      <Button
                        uppercase={true}
                        className={styles.actionButton}
                        disabled={isApproveAssetsDisabled}
                        loading={isApprovingAssets || isFetchingApprovedTokenAmount}
                        onClick={approveAssets}
                      >
                        <Trans>Approve</Trans>
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center mt-lg-0 mt-4">
                      <Button
                        uppercase={true}
                        className={styles.actionButton}
                        onClick={depositAssets}
                        disabled={isDepositSomeAssetsDisabled}
                      >
                        <Trans>Deposit</Trans>
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Typography variant={ETypographyVariant.BODY} small={true}>
                    <Trans>Available to withdraw</Trans>:
                    &nbsp;
                    {`${formattedUserShares?.getValue()} ${token}`}
                  </Typography>
                  <Input
                    type={EInputType.NUMBER}
                    onChange={onWithdrawValueChange}
                    value={withdrawValue}
                  />
                  <Slider
                    value={withdrawValue}
                    onChange={onWithdrawValueChange}
                    min={1}
                    max={100}
                    marks={sliderMarks}
                    markSymbol={"%"}
                    className="mt-4 mb-12"
                  />
                  <Row className="mt-6">
                    <Col className="d-flex justify-content-center">
                      <Button
                        uppercase={true}
                        theme={"secondary"}
                        className={styles.actionButton}
                        disabled={isWithdrawSomeAssetsDisabled || isDepositingAssets || isWithdrawingAllAssets}
                        loading={isWithdrawingAssets}
                        onClick={withdrawAssets(false)}
                      >
                        <Trans>Withdraw</Trans>
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center mt-lg-0 mt-4">
                      <Button
                        uppercase={true}
                        theme={"secondary"}
                        className={styles.actionButton}
                        disabled={isWithdrawAllAssetsDisabled || isDepositingAssets || isWithdrawingAssets}
                        onClick={withdrawAssets(true)}
                        loading={isWithdrawingAllAssets}
                      >
                        <Trans>Withdraw all</Trans>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <div className={classes(styles.indicator, [isOpen, styles.open])}/>
      {!isOpen && <div className={styles.corner}/>}
    </div>
  );
};

export default Vault;
