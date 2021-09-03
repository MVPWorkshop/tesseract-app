import React from "react";
import { ETypographyVariant, ITypographyProps } from "./typography.atom.types";
import {
  accentToClassName,
  classes,
  colorToClassName,
  fontFamilyToClassName,
  fontWeightToClassName
} from "../../../shared/utils/styles.util";
import styles from "./typography.atom.module.scss";

function getVariantClassName(variant: ETypographyVariant) {
  return {
    [ETypographyVariant.MAIN]: styles.main,
    [ETypographyVariant.BODY]: styles.body,
    [ETypographyVariant.TITLE]: styles.title
  }[variant];
}

const Typography: React.FC<ITypographyProps> = (props) => {

  const {
    element: Element = "span",
    variant,
    color,
    className,
    uppercase,
    fontSize,
    accent,
    fontFamily,
    fontWeight,
    children,
    style,
    textAlign,
    small
  } = props;

  const classColor = color && colorToClassName(color).color;
  const classAccent = accent && accentToClassName(accent).color;
  const classFontFamily = fontFamily && fontFamilyToClassName(fontFamily);
  const classVariant = variant && getVariantClassName(variant);
  const classFontWeight = fontWeight && fontWeightToClassName(fontWeight);

  return (
    <Element
      className={classes(
        styles.typography,
        classVariant,
        classColor,
        classAccent,
        classFontFamily,
        classFontWeight,
        fontSize ? `fs-${fontSize}` : "",
        uppercase ? "text-uppercase" : "",
        small ? "type-small" : "",
        className
      )}
      style={{
        ...style,
        textAlign
      }}
    >
      {children}
    </Element>
  );
};

export default Typography;
