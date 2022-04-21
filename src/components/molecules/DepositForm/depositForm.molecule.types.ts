import { BigNumber } from "ethers";

export interface IDepositFormProps {
  balance?: BigNumber,
  amountApproved?: BigNumber,
  decimals?: number
}
