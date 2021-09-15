import { ESupportedLocales } from "../types/locale.types";
import { AllKeysRequired, DynamicObject, SvgComponent } from "../types/util.types";
import { ESupportedTokens } from "../types/contract.types";

import { ReactComponent as USDCSVG } from "../assets/tokens/usdc.svg";
import { ReactComponent as USDTSVG } from "../assets/tokens/usdt.svg";
import { ReactComponent as DAISVG } from "../assets/tokens/dai.svg";
import { ReactComponent as WETHSVG } from "../assets/tokens/weth.svg";
import { ReactComponent as WBTCSVG } from "../assets/tokens/wbtc.svg";

export const supportedLocaleList: ESupportedLocales[] = [
  ESupportedLocales.ENGLISH,
  ESupportedLocales.INTERSLAVIC
];

export const tokenIcons: DynamicObject<SvgComponent, ESupportedTokens, AllKeysRequired> = {
  [ESupportedTokens.USDC]: USDCSVG,
  [ESupportedTokens.USDT]: USDTSVG,
  [ESupportedTokens.DAI]: DAISVG,
  [ESupportedTokens.WETH]: WETHSVG,
  [ESupportedTokens.WBTC]: WBTCSVG
};
