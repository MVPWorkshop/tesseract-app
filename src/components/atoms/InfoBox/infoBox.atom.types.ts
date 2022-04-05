import {Nullable} from "../../../shared/types/util.types";

export interface IInfoBox {
  header?: Nullable<string>;
  value: string;
  footer: string;
  loading: boolean;
}
