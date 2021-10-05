import BigDecimal from "js-big-decimal";

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

export function formatAssetDisplayValue(value: any) {
  if (isEmptyValue(value)) {
    return "-";
  } else {
    // eslint-disable-next-line
    if (value == 0) {
      return 0;
    } else {
      return value;
    }
  }
}

export function areBigDecimalsEqual(a: BigDecimal, b: BigDecimal): boolean {
  return a.getValue() === b.getValue();
}
