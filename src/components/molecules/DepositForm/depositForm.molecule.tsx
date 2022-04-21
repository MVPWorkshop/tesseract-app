import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans } from "@lingui/macro";
import { Col, Row } from "react-bootstrap";
import BigDecimal from "js-big-decimal";

import Typography from "../../atoms/Typography/typography.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import Slider from "../../atoms/Slider/slider.atom";
import Input from "../../atoms/Input/input.atom";
import { EInputType } from "../../atoms/Input/input.atom.types";
import Button from "../../atoms/Button/button.atom";
import { formatAssetDisplayValue, hasMoreDecimalsThan, isEmptyValue, isZero } from "../../../shared/utils/common.util";
import { classes } from "../../../shared/utils/styles.util";
import Web3Util from "../../../shared/utils/web3.util";
import { getMaxDepositAmount } from "../../../shared/utils/vault.util";
import { depositAssetsIntoVault } from "../../../redux/vaults/vaults.redux.actions";
import { parseUnits } from "ethers/lib/utils";
import { approveTokenSpending } from "../../../redux/tokens/tokens.redux.actions";
import { IDepositFormProps } from "./depositForm.molecule.types";
import { RootState } from "../../../redux/redux.types";
import ActionUtil from "../../../shared/utils/action.util";
import { ETokenReduxActions, ITokenReduxState } from "../../../redux/tokens/tokens.redux.types";
import { createLoadingSelector } from "../../../redux/loading/loading.redux.reducer";
import { Nullable } from "../../../shared/types/util.types";
import { EVaultReduxActions, IVaultReduxState } from "../../../redux/vaults/vaults.redux.types";
import styles from "./depositForm.molecule.module.scss";
import { tokenLabels } from "../../../shared/constants/web3.constants";

const DepositForm: React.FC<IDepositFormProps> = (props) => {
  const {
    token,
    account,
    chainId,
    signer,
    vaultAddress,
  } = props;
  const dispatch = useDispatch();
  const [depositValue, setDepositValue] = useState<{ actual: BigDecimal, percent: number }>({
    actual: new BigDecimal(0), percent: 0
  });
  const {
    balance,
    decimals,
    amountApproved
  } = useSelector<RootState, ITokenReduxState>(state => state.tokens[token]);

  const vaultData: IVaultReduxState | null = useSelector<RootState, IVaultReduxState | null>(state => {
    if (vaultAddress) {
      return state.vaults[vaultAddress];
    } else {
      return null;
    }
  });

  const isFetchingApprovedTokenAmount = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(ETokenReduxActions.FETCH_TOKEN_APPROVED_AMOUNT, token)])
  );
  const isApprovingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(ETokenReduxActions.APPROVE_TOKEN_SPENDING, token)])
  );

  const isDepositingAssets = useSelector<RootState, boolean>(
    createLoadingSelector([ActionUtil.actionName(EVaultReduxActions.DEPOSIT_ASSETS, vaultAddress)])
  );

  const sliderMarks = [1, 25, 50, 75, 100];

  const formattedBalance = (balance && decimals) ? Web3Util.formatTokenNumber(balance, decimals, 6) : null;
  const maxDepositAmount = (balance && decimals && vaultData && vaultData.depositLimit) ?
    Web3Util.formatTokenNumber(getMaxDepositAmount(balance, vaultData.depositLimit), decimals) : new BigDecimal(0);
  const isDepositDisabled = isZero(maxDepositAmount);
  const isApproveAssetsDisabled = !(depositValue.actual && !isEmptyValue(decimals) && account && vaultAddress && !!signer && chainId);
  const isDepositSomeAssetsDisabled = !(vaultAddress && account && chainId && !!signer && depositValue.actual && decimals);

  // TODO: convert to selector
  const tokenLabel = (tokenLabels[token] && tokenLabels[token][chainId]) ? tokenLabels[token][chainId] : token;


  const getIsEnoughTokensApproved = () => {
    if (depositValue.actual && amountApproved && decimals) {
      const equality =
        Web3Util.formatTokenNumber(amountApproved, decimals).compareTo(depositValue.actual);

      return (equality === 1 || equality === 0);
    }

    return false;
  };

  const isEnoughTokensApproved = getIsEnoughTokensApproved();

  const depositAssets = () => {
    if (!isDepositSomeAssetsDisabled) {
      const amountToSpend = parseUnits(depositValue.actual.getValue(), decimals);
      dispatch(depositAssetsIntoVault(token, vaultAddress!, account!, amountToSpend, signer!, chainId));
    }
  };

  const approveAssets = () => {
    if (!isApproveAssetsDisabled) {
      const amountToApprove = parseUnits(depositValue.actual.getValue(), decimals);
      dispatch(approveTokenSpending(token, amountToApprove, account!, vaultAddress!, signer!, chainId));
    }
  };

  const onDepositValueChange = (value: string) => {
    if (decimals && hasMoreDecimalsThan(value, decimals)) {
      return;
    }

    let percent = "0";
    const parsedValue = new BigDecimal(value);

    if (formattedBalance && !isZero(formattedBalance) && value) {
      percent =
        parsedValue
          .divide(formattedBalance, 64)
          .multiply(new BigDecimal(100))
          .round(2)
          .getValue();
    }

    setDepositValue({
      actual: parsedValue,
      percent: parseFloat(percent)
    });
  };

  const onDepositPercentageChange = (percentage: number) => {
    const value =
      (maxDepositAmount || new BigDecimal(0))
        .multiply(new BigDecimal(percentage))
        .divide(new BigDecimal(100), 64)
        .round(decimals);

    setDepositValue({
      actual: value,
      percent: percentage
    });
  };

  const updateBalanceInput = (value: Nullable<string>) => {
    if (value) {
      onDepositValueChange(value);
    }
  };

  const renderBalance = () => {
    const balanceText = `${formatAssetDisplayValue(formattedBalance?.getValue())} ${tokenLabel}`;
    const value = (maxDepositAmount || new BigDecimal(0)).round(decimals);

    if (balance && !isZero(balance)) {
      return (
        <span
          className={classes(styles.balanceLabel)}
          onClick={() => updateBalanceInput(value.getValue())}
        >
          {balanceText}
        </span>
      );
    }

    return balanceText;
  };

  return (
    <>
      <div className="mb-2">
        <Typography variant={ETypographyVariant.BODY} small={true}>
          <Trans>Balance</Trans>: &nbsp;
          {renderBalance()}
        </Typography>
      </div>
      <Input
        type={EInputType.NUMBER}
        onChange={onDepositValueChange}
        value={depositValue.actual.getValue()}
        disabled={isDepositDisabled}
        min={"0"}
        max={maxDepositAmount?.getValue() || "0"}
      />
      <Slider
        value={depositValue.percent}
        onChange={onDepositPercentageChange}
        disabled={isDepositDisabled}
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
            disabled={isApproveAssetsDisabled || isEnoughTokensApproved}
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
            disabled={isDepositSomeAssetsDisabled || !isEnoughTokensApproved}
            loading={isDepositingAssets}
          >
            <Trans>Deposit</Trans>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DepositForm;
