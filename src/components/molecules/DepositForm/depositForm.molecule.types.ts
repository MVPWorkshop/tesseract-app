import { BigNumber } from "ethers";
import { ESupportedTokens } from "../../../shared/types/vault.types";

export interface IDepositFormProps {
  balance?: BigNumber;
  amountApproved?: BigNumber;
  decimals?: number;
  token: ESupportedTokens;
}
