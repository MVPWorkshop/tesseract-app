import { Nullable } from "../types/util.types";
import { EAccent, EColor, EFontFamily, EFontWeight } from "../types/styles.types";

/**
 * @description Transforms EColor ts enum into a class inside the scss styles,
 * the colors are mapped based on their variable names inside variables.scss
 * @param color
 */
export function colorToClassName(color: EColor) {
  const colorNames: Record<EColor, string> = {
    [EColor.WHITE]: "white",
    [EColor.RHYTM]: "rhytm",
    [EColor.BLUE_BELL]: "blueBell",
    [EColor.PURPLE_NAVY]: "purpleNavy",
    [EColor.TIFFANY_BLUE]: "tiffanyBlue",
    [EColor.YANKES_BLUE]: "yankesBlue",
    [EColor.YANKES_BLUE_LIGHTER]: "yankeesBlueLighter",
    [EColor.SPACE_CADET]: "spaceCadet",
    [EColor.JACARTA]: "jacarta",
    [EColor.AMERICAN_BLUE]: "americanBlue",
    [EColor.DARK_JUNGLE_GREEN]: "darkJungleGreen",
    [EColor.RED]: "red",
    [EColor.STRONGER_RED]: "strongerRed",
    [EColor.GREEN]: "green",
    [EColor.BLACK]: "black"
  };

  return {
    bgColor: `bg-color-${colorNames[color]}`,
    color: `color-${colorNames[color]}`
  };
}

/**
 * @description Transforms EAccent ts enum into a class inside the scss styles,
 * the accents are mapped based on their variable names inside variables.scss
 * @param accent
 */
export function accentToClassName(accent: EAccent) {
  const accentNames = {
    [EAccent.PRIMARY]: "primary",
    [EAccent.SECONDARY]: "secondary"
  };

  return {
    bgColor: `bg-color-accent-${accentNames[accent]}`,
    color: `color-accent-${accentNames[accent]}`
  };
}

export function fontWeightToClassName(fontWeight: EFontWeight) {
  const size = {
    [EFontWeight.LIGHT]: 300,
    [EFontWeight.REGULAR]: 400,
    [EFontWeight.SEMI_BOLD]: 600,
    [EFontWeight.BOLD]: 700
  }[fontWeight];

  return `fw-${size}`;
}

export function fontFamilyToClassName(fontFamily: EFontFamily) {
  return {
    [EFontFamily.TITILLIUM_WEB]: "Titillium Web"
  }[fontFamily];
}

type ClassesArgs =
  number |
  string |
  boolean |
  [condition: boolean, className: string]

export function classes(...args: Nullable<ClassesArgs>[]) {
  let className = "";

  const pushToClassName = (newClassName: string) => {
    className += newClassName + " ";
  };

  for (let i = 0; i < args.length; i++) {
    const element = args[i];

    if (element) {
      if (typeof element === "string") {
        pushToClassName(element);
      } else if (Array.isArray(element)) {
        if (element[0] && element[1]) {
          pushToClassName(element[1]);
        }
      }
    }
  }

  return className;
}
