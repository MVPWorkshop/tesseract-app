import RestService from "../rest/rest.service";
import { API_BASE_URL } from "../../constants/config.constants";
import { IGetVaultAPYResponse } from "./api.service.types";
import { EChainId } from "../../types/web3.types";
import { getTokenTicker } from "../../utils/vault.util";

class ApiService extends RestService {
  constructor() {
    super({
      baseUrl: API_BASE_URL
    });
  }

  private static _getNetworkByChainId(chainId: EChainId): string {
    switch (chainId) {
      case EChainId.POLYGON_MAINNET: {
        return "matic";
      }
      case EChainId.AVAX_MAINNET: {
        return "avalanche";
      }
    }
  }

  public async getVaultAPY(vaultSymbol: string, apiVersion: string, chainId: EChainId, dayRange = 10): Promise<string> {
    const network = ApiService._getNetworkByChainId(chainId);

    const { data } = await this.get<IGetVaultAPYResponse>({
      url: "/query",
      config: {
        params: {
          query: `deriv(price{network="${network}", ticker="${vaultSymbol}", version="${apiVersion}"}[${dayRange}d])*60*60*24*365`
        }
      }
    });

    return data.data.result[0].value[1];
  }

  public async getTokenPrice(tokenSymbol: string, chainId: EChainId): Promise<string> {
    const tokenTicker = getTokenTicker(tokenSymbol, chainId);
    const network = ApiService._getNetworkByChainId(chainId);

    const { data } = await this.get<IGetVaultAPYResponse>({
      url: "/query",
      config: {
        params: {
          query: `price{network="${network}", ticker="${tokenTicker}"}`
        }
      }
    });

    return data.data.result[0].value[1];
  }
}

export default ApiService;
