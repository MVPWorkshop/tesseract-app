import { EErrorTypes } from "../types/error.types";
import { errorMessages } from "../constants/error.constants";

class BaseError extends Error {
  public type: EErrorTypes;

  constructor(errorType: EErrorTypes, message?: string) {
    super(message);

    this.type = errorType;
    this.message = message || errorMessages[errorType];
  }
}

export class UnknownError extends BaseError {
  constructor() {
    super(EErrorTypes.UNKNOWN_ERROR);
  }
}

export class APIError extends BaseError {
  constructor(message?: string) {
    super(EErrorTypes.API_ERROR, message);
  }
}
