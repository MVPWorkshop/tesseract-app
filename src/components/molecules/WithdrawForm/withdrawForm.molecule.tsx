import React from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/macro";
import { Col, Row } from "react-bootstrap";

import Typography from "../../atoms/Typography/typography.atom";
import Button from "../../atoms/Button/button.atom";
import Input from "../../atoms/Input/input.atom";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { EInputType } from "../../atoms/Input/input.atom.types";
import Slider from "../../atoms/Slider/slider.atom";
import { IVaultReduxState } from "../../../redux/vaults/vaults.redux.types";
import { RootState } from "../../../redux/redux.types";
import { ITokenReduxState } from "../../../redux/tokens/tokens.redux.types";
import { classes } from "../../../shared/utils/styles.util";

const WithdrawForm: React.FC = (props) => {
  const {
    token,
    account,
    chainId,
    signer,
    vaultAddress,
  } = props;
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

  const sliderMarks = [1, 25, 50, 75, 100];

  const renderUserShares = () => {
    const value = (formattedUserShares || new BigDecimal(0)).round(decimals);

    const userShareValue = formattedUserShares?.getValue();
    const userShareText = `${userShareValue} ${tokenLabel}`;

    if (vaultData?.userShares && !isZero(vaultData?.userShares)) {
      return (
        <span
          className={classes(styles.balanceLabel)}
          onClick={updateBalanceInput({
            value: value.getValue(),
            handler: onWithdrawValueChange,
          })}
        >
          {userShareText}
        </span>
      );
    }

    return userShareText;
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
  )
}

export default WithdrawForm;
