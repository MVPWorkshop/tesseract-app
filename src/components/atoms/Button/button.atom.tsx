import React, { FC } from "react";
import { Button as BTButton, ButtonProps } from "react-bootstrap";
import { IButtonProps } from "./button.atom.types";
import styles from "./button.atom.module.scss";
import { classes } from "../../../shared/utils/styles.util";
import Loader from "../Loader/loader.atom";
import { Trans } from "@lingui/macro";

const Button: FC<IButtonProps> = (props) => {
  const {
    className,
    children,
    onClick,
    disabled,
    uppercase,
    loading,
    theme,
    loadingTextComponent,
    disableLoadingText,
    ...other
  } = props;

  let variant: ButtonProps["variant"] = "light";
  let customTheme: string | undefined;

  // If tertiary variant (not native to bootstrap) add the class manually
  if (theme === "tertiary") {
    customTheme = " btn-tertiary";
  } else if (theme === "outline-tertiary") {
    customTheme = "btn-tertiary-outline";
  } else if (theme === "flat") {
    customTheme = "btn-flat";
  } else {
    variant = theme;
  }

  const btnClassName = classes(
    styles.appButton,
    className,
    [!!disabled, "disabledElement"],
    [!!uppercase, "text-uppercase"],
    customTheme,
    props.flat && styles.flat
  );

  return (
    <BTButton
      className={btnClassName}
      onClick={onClick}
      disabled={disabled || !!loading}
      variant={variant}
      {...other}
    >
      {loading ?
        <div className="d-flex align-items-center justify-content-center mh-100">
          <Loader width="20px" height="20px"/>
          { !disableLoadingText &&
            (
              loadingTextComponent ?
                loadingTextComponent :
                <span className="ml-2">
                  <Trans>Loading</Trans>
                </span>
            )
          }
        </div>
        :
        children
      }
    </BTButton>
  );
};

export default Button;
