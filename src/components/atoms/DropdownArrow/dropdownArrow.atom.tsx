import React from "react";
import { IDropdownArrowProps } from "./dropdownArrow.atom.types";
import { classes } from "../../../shared/utils/styles.util";
import styles from "./dropdownArrow.module.scss";
import { ReactComponent as ChevronSVG } from "../../../shared/assets/chevron.svg";

const DropdownArrow: React.FC<IDropdownArrowProps> = (props) => {

  const {
    className,
    isOpen
  } = props;

  const arrowClassName = classes(
    styles.dropdownArrow,
    isOpen ? styles.open : "",
    className
  );

  return (
    <span className={arrowClassName}>
      <ChevronSVG/>
    </span>
  );
};

export default DropdownArrow;
