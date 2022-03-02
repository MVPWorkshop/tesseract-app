import { IClassableComponent, OnChange } from "../../../shared/types/util.types";

export enum EInputType {
  NUMBER = "number",
  TEXT = "text"
}

interface IBaseInputProps extends IClassableComponent {
  type: EInputType;
  placeholder?: string;
  onChange: OnChange<any>;
  value: any;
  disabled?: boolean;
}

interface ITextInputProps extends IBaseInputProps {
  type: EInputType.TEXT,
  onChange: OnChange<string>;
  value: string;
  min?: never;
  max?: never;
}

interface INumberInputProps extends IBaseInputProps {
  type: EInputType.NUMBER,
  onChange: OnChange<string>
  value: string;
  min?: string;
  max?: string;
}

export type IInputProps = ITextInputProps | INumberInputProps;
