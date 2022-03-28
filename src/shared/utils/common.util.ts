import { i18n } from "@lingui/core";
import BigDecimal from "js-big-decimal";
import { BigNumber } from "ethers";

export function keys<O extends Record<string, unknown>>(obj: O): (keyof O)[] {
  return Object.keys(obj) as (keyof O)[];
}

export function isEmptyValue(value: any) {
  return value === undefined || value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
}

export function copyToClipboard(str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const isIOS = navigator.userAgent.match(/ipad|iphone/i);

  if (isIOS) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
    el.setSelectionRange(0, str.length);
  } else {
    el.select();
  }

  document.execCommand("copy");
  document.body.removeChild(el);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function humanizeValue(value: number) {
  return i18n.number(value, { style: "currency", currency: "USD" });
}

export function formatAssetDisplayValue(value: any, options = { humanize: false }) {
  if (isEmptyValue(value)) {
    return "0";
  } else {
    // eslint-disable-next-line 
    if (value == 0) {
      return options.humanize ? "$0" : 0;
    } else {
      return options.humanize ? humanizeValue(value) : value;
    }
  }
}

export function areBigDecimalsEqual(a: BigDecimal, b: BigDecimal): boolean {
  return a.getValue() === b.getValue();
}

export function areArraysEqual(a: any[], b: any[]): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Extract properties from object array by their key
 *
 * @example
 * input =>
 * list: [{foo: 'a1', bar: 'b1'}, {foo: 'a2', bar: 'b2'}, {foo: 'a3', bar: 'b3'}, {foo: 'a4', bar: 'b4'}]
 * key: 'foo'
 *
 * returns =>
 * ['a1', 'a2', 'a3', 'a4']
 */
export function objectListToArrayByConditionalKey<T extends Array<any>, R extends (T extends Array<infer ArrType> ? ArrType : never), K extends keyof R>(list: T, key: K, conditionValue: R[K]): Array<R[K]> {
  if (!list || !key) {
    return [];
  }

  const finalList: Array<R[K]> = [];

  list.forEach(item => {
    if (item[key] === conditionValue) {
      finalList.push(item[key]);
    }
  });

  return finalList;
}

export function countDecimals(value: number | string) {
  if (typeof value === "number" && Math.floor(value) === value) {
    return 0;
  } else {
    const decimalPart = value.toString().split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  }
}

export function hasMoreDecimalsThan(value: number | string, requiredDecimals: number) {
  const actualDecimals = countDecimals(value);

  return actualDecimals > requiredDecimals;
}

export function isBigDecimalGte(a: BigDecimal, b: BigDecimal) {
  const equality = a.compareTo(b);

  return (equality === 1 || equality === 0);
}

export function isBigDecimalLte(a: BigDecimal, b: BigDecimal) {
  const equality = a.compareTo(b);

  return (equality === -1 || equality === 0);
}

export function isBigDecimalGt(a: BigDecimal, b: BigDecimal) {
  const equality = a.compareTo(b);

  return equality === 1;
}

export function isZero(value: string | number | BigDecimal | BigNumber) {
  if (value instanceof BigDecimal) {
    return (value.compareTo(new BigDecimal(0))) === 0;
  } else if (value instanceof BigNumber) {
    return value.eq(BigNumber.from(0));
  } else if (typeof value === "string") {
    return value === "0";
  } else {
    return value === 0;
  }
}
