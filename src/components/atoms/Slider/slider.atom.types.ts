import { SliderProps } from "rc-slider";
import { IClassableComponent } from "../../../shared/types/util.types";

export interface ISliderProps extends SliderProps, IClassableComponent {
  markSymbol: string;
  marks: number[];
}
