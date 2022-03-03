import { FunctionComponent, SVGProps } from "react";
import BigDecimal from "js-big-decimal";


type SupportedValues = string | BigDecimal;

// Used for typing some dynamic object, first param defines the value type, second the key type
export type DynamicObject<
  Value = any,
  Key extends (string | number) = string,
  AllKeysRequired = false
  > = AllKeysRequired extends true ?
  { [K in Key]: Value } :
  { [K in Key]?: Value };

export type AllKeysRequired = true;

export type Nullable<T = any> = T | undefined | null;

export interface IClassableComponent {
  className?: string;
}

export type SvgComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type OnChange<T extends SupportedValues> = (callbackValue: T) => void;

