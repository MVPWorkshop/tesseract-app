import React, { FC } from "react";
import { ISliderProps } from "./slider.atom.types";
import RcSlider, { SliderProps as RcSliderProps } from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./slider.atom.module.scss";
import { classes } from "../../../shared/utils/styles.util";

const Slider: FC<ISliderProps> = (props) => {

  const {
    markSymbol,
    marks,
    className,
    ...otherProps
  } = props;

  const formatSliderMark = (num: number): string => {
    return `${num}${markSymbol}`;
  };

  const formatMarks = () => {
    const formattedMarks: RcSliderProps["marks"] = {};

    marks.forEach(mark => {
      formattedMarks![mark] = formatSliderMark(mark);
    });

    return formattedMarks;
  };

  return (
    <div className={classes(styles.slider, className)}>
      <RcSlider
        marks={formatMarks()}
        {...otherProps}
      />
    </div>
  );
};


export default Slider;
