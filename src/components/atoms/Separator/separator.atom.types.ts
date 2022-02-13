import { IClassableComponent } from "../../../shared/types/util.types";

export interface ISeparatorProps extends IClassableComponent {
  vertical?: boolean;
  marginBefore?: number;
  marginAfter?: number;
  invisible?: boolean;
}
