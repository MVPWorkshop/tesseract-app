import React from "react";
import { Trans } from "@lingui/macro";
import { Col, Row } from "react-bootstrap";

import Typography from "../../atoms/Typography/typography.atom";
import {ETypographyVariant} from "../../atoms/Typography/typography.atom.types";
import Slider from "../../atoms/Slider/slider.atom";
import Input from "../../atoms/Input/input.atom";
import {EInputType} from "../../atoms/Input/input.atom.types";
import Button from "../../atoms/Button/button.atom";
import {formatAssetDisplayValue} from "../../../shared/utils/common.util";
import {classes} from "../../../shared/utils/styles.util";


const DepositForm: React.FC = (props) => {

  const renderBalance = () => {
    const balanceText = `${formatAssetDisplayValue(formattedBalance?.getValue())} ${tokenLabel}`;
    const value = (maxDepositAmount || new BigDecimal(0)).round(decimals);

    if (balance && !isZero(balance)) {
      return (
        <span
          className={classes(styles.balanceLabel)}
          onClick={updateBalanceInput({
            value: value.getValue(),
            handler: onDepositValueChange
          })}
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
  ) 
};

export default DepositForm;
