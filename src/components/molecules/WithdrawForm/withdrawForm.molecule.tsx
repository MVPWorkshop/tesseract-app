import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trans } from "@lingui/macro";
import { Col, Row } from "react-bootstrap";
import BigDecimal from "js-big-decimal";

import Typography from "../../atoms/Typography/typography.atom";
import Button from "../../atoms/Button/button.atom";
import Input from "../../atoms/Input/input.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { EInputType } from "../../atoms/Input/input.atom.types";
import Slider from "../../atoms/Slider/slider.atom";
import { EVaultReduxActions, IVaultReduxState } from "../../../redux/vaults/vaults.redux.types";
import { RootState } from "../../../redux/redux.types";
import { ITokenReduxState } from "../../../redux/tokens/tokens.redux.types";
import { classes } from "../../../shared/utils/styles.util";
import { formattedTokenToShare, getShareInFormattedToken } from "../../../shared/utils/vault.util";
import { tokenLabels } from "../../../shared/constants/web3.constants";
import { createLoadingSelector } from "../../../redux/loading/loading.redux.reducer";
import ActionUtil from "../../../shared/utils/action.util";
import { hasMoreDecimalsThan, isBigDecimalGt, isZero } from "../../../shared/utils/common.util";
import { Nullable } from "../../../shared/types/util.types";
import { withdrawAssetsFromVault } from "../../../redux/vaults/vaults.redux.actions";
import { BigNumber } from "ethers";
import styles from "./withdrawFrom.molecule.module.scss";
import { IVaultForm } from "../../../shared/types/vault.types";

const WithdrawForm: React.FC<IVaultForm> = (props) => {
  const {
    token,
    account,
    chainId,
    signer,
    vaultAddress,
  } = props;
  const dispatch = useDispatch();
  const [withdrawValue, setWithdrawValue] = useState<{ actual: BigDecimal, percent: number }>({ actual: new BigDecimal(0), percent: 0 });

  // Selectors
  const {
    decimals,
  } = useSelector<RootState, ITokenReduxState>(state => state.tokens[token]);
  const vaultData: IVaultReduxState | null = useSelector<RootState, IVaultReduxState | null>(state => {
    if (vaultAddress) {
      return state.vaults[vaultAddress];
    } else {
      return null;
    }
  });
  const isDepositingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress)])
  );
  const isWithdrawingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.WITHDRAW_ASSETS, vaultAddress)])
  );
  const isWithdrawingAllAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.WITHDRAW_ALL_ASSETS, vaultAddress)])
  );

  // TODO - move to a common function
  const tokenLabel = (tokenLabels[token] && tokenLabels[token][chainId]) ? tokenLabels[token][chainId] : token;
  const sliderMarks = [1, 25, 50, 75, 100];
  const depositedValue = (vaultData && vaultData.userShares && vaultData.sharePrice && decimals) ? getShareInFormattedToken(vaultData.userShares, vaultData.sharePrice, decimals) : null;
  const formattedUserShares = depositedValue ? depositedValue.round(6) : null;

  const isWithdrawAllAssetsDisabled = !(vaultAddress && account && chainId && !!signer);
  const isWithdrawSomeAssetsDisabled = isWithdrawAllAssetsDisabled || !(isBigDecimalGt(withdrawValue.actual, new BigDecimal(0)) && decimals && vaultData?.sharePrice);


  const renderUserShares = () => {
    const value = (depositedValue || new BigDecimal(0)).round(decimals, BigDecimal.RoundingModes.DOWN);

    const userShareValue = formattedUserShares?.getValue();
    const userShareText = `${userShareValue} ${tokenLabel}`;

    if (vaultData?.userShares && !isZero(vaultData?.userShares)) {
      return (
        <span
          className={classes(styles.balanceLabel)}
          onClick={() => updateBalanceInput(value.getValue())}
        >
          {userShareText}
        </span>
      );
    }

    return userShareText;
  };

  const updateBalanceInput = (value: Nullable<string>) => {
    if (value) {
      onWithdrawValueChange(value);
    }
  };

  const onWithdrawPercentageChange = (percentage: number) => {
    const value =
      (depositedValue || new BigDecimal(0))
        .multiply(new BigDecimal(percentage))
        .divide(new BigDecimal(100), 64)
        .round(decimals, BigDecimal.RoundingModes.DOWN);

    setWithdrawValue({
      actual: value,
      percent: percentage
    });
  };

  const withdrawAssets = (withdrawAll: boolean) => () => {
    if (withdrawAll && !isWithdrawAllAssetsDisabled) {
      const amountToWithdraw = -1; // Withdraw all
      dispatch(withdrawAssetsFromVault(token, vaultAddress!, account!, amountToWithdraw, signer!, chainId));
    } else if (!isWithdrawSomeAssetsDisabled) {
      const amountToWithdraw = formattedTokenToShare(withdrawValue.actual.getValue(), vaultData!.sharePrice!, decimals!);
      dispatch(withdrawAssetsFromVault(token, vaultAddress!, account!, BigNumber.from(amountToWithdraw.getValue()), signer!, chainId));
    }
  };


  const onWithdrawValueChange = (value: string) => {
    if (decimals && hasMoreDecimalsThan(value, decimals)) {
      return;
    }

    let percent = "0";
    const parsedValue = new BigDecimal(value);

    if (formattedUserShares && !isZero(formattedUserShares) && value) {
      percent =
        parsedValue
          .divide(formattedUserShares, 64)
          .multiply(new BigDecimal(100))
          .round(2)
          .getValue();
    }

    setWithdrawValue({
      actual: parsedValue,
      percent: parseFloat(percent)
    });
  };

  return (
    <>
      <div className="mb-2">
        <Typography variant={ETypographyVariant.BODY} small={true}>
          <Trans>Available to withdraw</Trans>:
          &nbsp;
          {renderUserShares()}
        </Typography>
      </div>
      <Input
        type={EInputType.NUMBER}
        onChange={onWithdrawValueChange}
        value={withdrawValue.actual.getValue()}
        min={"0"}
        max={formattedUserShares?.getValue() || "0"}
      />
      <Slider
        value={withdrawValue.percent}
        onChange={onWithdrawPercentageChange}
        min={0}
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
    </>
  );
};

export default WithdrawForm;
