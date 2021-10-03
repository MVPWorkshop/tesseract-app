import { Action } from "redux";

class ActionUtil {
  public static actionName<T extends string>(actionType: T, uniqueIdentifier?: string): string {
    if (uniqueIdentifier) {
      return `${actionType}_${uniqueIdentifier}`;
    } else {
      return actionType;
    }
  }

  public static requestAction<T extends string>(actionType: T, uniqueIdentifier?: string): Action<string> {
    return {
      type: `${this.actionName(actionType, uniqueIdentifier)}_REQUEST`
    };
  }

  public static successAction<T extends string>(actionType: T, uniqueIdentifier?: string): Action<string> {
    return {
      type: `${this.actionName(actionType, uniqueIdentifier)}_SUCCESS`
    };
  }

  public static errorAction<T extends string>(actionType: T, uniqueIdentifier?: string): Action<string> {
    return {
      type: `${this.actionName(actionType, uniqueIdentifier)}_ERROR`
    };
  }
}

export default ActionUtil;
