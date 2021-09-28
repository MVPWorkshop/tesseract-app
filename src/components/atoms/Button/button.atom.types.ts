import React from "react";
import { ButtonProps } from "react-bootstrap";
import { IClassableComponent } from "../../../shared/types/util.types";

export interface IButtonProps extends ButtonProps, IClassableComponent {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  uppercase?: boolean;
  loading?: boolean;
  theme?:
    "primary" |
    "secondary" |
    "tertiary" |
    "outline-primary" |
    "outline-secondary" |
    "outline-tertiary" |
    "link" |
    "flat" |
    "error";
  variant?: never;
  flat?: boolean;
  loadingTextComponent?: JSX.Element;
  disableLoadingText?: boolean;
}
