import {IClassableComponent} from "../../../shared/types/util.types";

export interface ILinkProps extends IClassableComponent {
  link: string;
  newTab?: boolean;
}
