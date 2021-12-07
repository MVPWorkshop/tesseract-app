import React, { ChangeEventHandler } from "react";
import { EInputType, IInputProps, OnChange } from "./input.atom.types";
import { isBigDecimalGte, isBigDecimalLte, isEmptyValue } from "../../../shared/utils/common.util";
import styles from "./input.atom.module.scss";
import { classes } from "../../../shared/utils/styles.util";
import BigDecimal from "js-big-decimal";

const Input: React.FC<IInputProps> = (props) => {

  const {
    type,
    onChange,
    value,
    placeholder,
    min,
    max,
    className,
    disabled
  } = props;

  const validateNumberRange = (num: BigDecimal) => {
    let isValid = true;

    if (!isEmptyValue(min)) {
      isValid = isValid && (isBigDecimalGte(num, new BigDecimal(min)));
    }
    if (!isEmptyValue(max)) {
      isValid = isValid && (isBigDecimalLte(num, new BigDecimal(max)));
    }

    return isValid;
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value as unknown;

    if (type === EInputType.TEXT) {
      (onChange as OnChange<string>)(newValue as string);
    } else if (type === EInputType.NUMBER) {
      const parsedValue = new BigDecimal(newValue as string);

      if (validateNumberRange(parsedValue)) {
        (onChange as OnChange<string>)(parsedValue.getValue());
      }
    }
  };

  const inputClassName = classes(
    styles.input,
    className
  );

  return (
    <div className={inputClassName}>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChangeHandler}
        min={min}
        max={max}
        disabled={disabled}
      />

      <span className={classes(styles.corner, styles.top, styles.left)}/>
      <span className={classes(styles.corner, styles.top, styles.right)}/>
      <span className={classes(styles.corner, styles.bottom, styles.left)}/>
      <span className={classes(styles.corner, styles.bottom, styles.right)}/>
    </div>
  );
};

export default Input;
