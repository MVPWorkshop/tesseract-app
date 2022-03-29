import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { ESupportedLocales } from "../types/locale.types";
import { AllKeysRequired, DynamicObject, SvgComponent } from "../types/util.types";

import { ReactComponent as USDCSVG } from "../assets/tokens/usdc.svg";
import { ReactComponent as USDTSVG } from "../assets/tokens/usdt.svg";
import { ReactComponent as DAISVG } from "../assets/tokens/dai.svg";
import { ReactComponent as WETHSVG } from "../assets/tokens/weth.svg";
import { ReactComponent as WBTCSVG } from "../assets/tokens/wbtc.svg";
import { ReactComponent as WMATICSVG } from "../assets/tokens/wmatic.svg";
import { ReactComponent as TRICRYPTOSVG } from "../assets/tokens/3crv.svg";
import { ReactComponent as WAVAXSVG } from "../assets/tokens/wavax.svg";

import { ESupportedTokens } from "../types/vault.types";
import {EAssetType} from "../types/metadata.types";

export const supportedLocaleList: ESupportedLocales[] = [
  ESupportedLocales.ENGLISH,
  ESupportedLocales.INTERSLAVIC
];

export const assetTypeLabel: DynamicObject<string, EAssetType, AllKeysRequired> = {
  [EAssetType.LP]: i18n._(t`Add liquidity`),
  [EAssetType.Token]: i18n._(t`Buy token`),
}

export const tokenTypes: DynamicObject<EAssetType, ESupportedTokens, AllKeysRequired> = {
  [ESupportedTokens.USDC]: EAssetType.Token,
  [ESupportedTokens.USDT]: EAssetType.Token,
  [ESupportedTokens.DAI]: EAssetType.Token,
  [ESupportedTokens.WETH]: EAssetType.Token,
  [ESupportedTokens.WBTC]: EAssetType.Token,
  [ESupportedTokens.WMATIC]: EAssetType.Token,
  [ESupportedTokens.WAVAX]: EAssetType.Token,
  [ESupportedTokens.CRVTRICRYPTO]: EAssetType.LP

};

export const tokenIcons: DynamicObject<SvgComponent, ESupportedTokens, AllKeysRequired> = {
  [ESupportedTokens.USDC]: USDCSVG,
  [ESupportedTokens.USDT]: USDTSVG,
  [ESupportedTokens.DAI]: DAISVG,
  [ESupportedTokens.WETH]: WETHSVG,
  [ESupportedTokens.WBTC]: WBTCSVG,
  [ESupportedTokens.WMATIC]: WMATICSVG,
  [ESupportedTokens.WAVAX]: WAVAXSVG,
  [ESupportedTokens.CRVTRICRYPTO]: TRICRYPTOSVG
};
