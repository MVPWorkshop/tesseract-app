import { AllKeysRequired, DynamicObject } from "../types/util.types";
import { EErrorTypes, IErrorMessage } from "../types/error.types";
import { defineMessage } from "@lingui/macro";

export const errorMessages: DynamicObject<IErrorMessage, EErrorTypes, AllKeysRequired> = {
  [EErrorTypes.UNKNOWN_ERROR]: {
    long: defineMessage({ message: "Sorry, an unknown error occurred" }).id!,
    short: defineMessage({ message: "Unknown error" }).id!
  },
  [EErrorTypes.API_ERROR]: {
    long: defineMessage({ message: "Something went wrong on the API" }).id!,
    short: defineMessage({ message: "API Errored" }).id!
  },
  [EErrorTypes.NO_ETHEREUM_PROVIDER]: {
    long: defineMessage({ message: "No ethereum provider found, please install it" }).id!,
    short: defineMessage({ message: "No provider" }).id!
  },
  [EErrorTypes.UNSUPPORTED_CHAIN]: {
    long: defineMessage({ message: "Unsupported chain, please switch to supported one" }).id!,
    short: defineMessage({ message: "Unsupported chain" }).id!
  },
  [EErrorTypes.USER_REJECTED_REQUEST]: {
    long: defineMessage({ message: "Request was rejected, please try again" }).id!,
    short: defineMessage({ message: "Request rejected" }).id!
  }
};
