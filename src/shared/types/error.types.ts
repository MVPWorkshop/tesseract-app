export enum EErrorTypes {
  UNSUPPORTED_CHAIN = "UNSUPPORTED_CHAIN",
  NO_ETHEREUM_PROVIDER = "NO_ETHEREUM_PROVIDER",
  USER_REJECTED_REQUEST = "USER_REJECTED_REQUEST",
  API_ERROR = "API_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

export type WalletConnectorError =
  EErrorTypes.UNSUPPORTED_CHAIN |
  EErrorTypes.NO_ETHEREUM_PROVIDER |
  EErrorTypes.USER_REJECTED_REQUEST |
  EErrorTypes.UNKNOWN_ERROR;

export interface IErrorMessage {
  short: string;
  long: string;
}
