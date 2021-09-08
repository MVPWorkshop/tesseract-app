import { IClassableComponent } from "../../../shared/types/util.types";

export interface IDropdownMenuProps extends IClassableComponent {
  selected: string;
  onSelect: (item: string) => void;
  items: string[];
}
