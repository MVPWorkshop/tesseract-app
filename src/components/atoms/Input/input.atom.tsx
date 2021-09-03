import React, { ChangeEventHandler } from "react";
import { EInputType, IInputProps, OnChange } from "./input.atom.types";
import { isEmptyValue } from "../../../shared/utils/common.util";
import styles from "./input.atom.module.scss";
import { classes } from "../../../shared/utils/styles.util";

const Input: React.FC<IInputProps> = (props) => {

  const {
    type,
    onChange,
    value,
    placeholder,
    min,
    max,
    className
  } = props;

  const validateNumberRange = (num: number) => {
    let isValid = true;

    if (!isEmptyValue(min)) {
      isValid = isValid && (num >= min!);
    }
    if (!isEmptyValue(max)) {
      isValid = isValid && (num <= max!);
    }

    return isValid;
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value as unknown;

    if (type === EInputType.TEXT) {
      (onChange as OnChange<string>)(newValue as string);
    } else if (type === EInputType.NUMBER) {
      if (validateNumberRange(newValue as number)) {
        (onChange as OnChange<number>)(newValue as number);
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
      />

      <span className={classes(styles.corner, styles.top, styles.left)}/>
      <span className={classes(styles.corner, styles.top, styles.right)}/>
      <span className={classes(styles.corner, styles.bottom, styles.left)}/>
      <span className={classes(styles.corner, styles.bottom, styles.right)}/>
    </div>
  );
};

export default Input;
