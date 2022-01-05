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

  public async getVaultAPY(vaultSymbol: string, apiVersion: string, dayRange = 10): Promise<string> {
    const { data } = await this.get<IGetVaultAPYResponse>({
      url: "/query",
      config: {
        params: {
          query: `rate(price{ticker="${vaultSymbol}", version="${apiVersion}"}[${dayRange}d])*60*60*24*365`
        }
      }
    });

    return data.data.result[0].value[1];
  }

  public async getTokenPrice(tokenSymbol: string, chainId: EChainId): Promise<string> {
    const tokenTicker = getTokenTicker(tokenSymbol, chainId);

    const { data } = await this.get<IGetVaultAPYResponse>({
      url: "/query",
      config: {
        params: {
          query: `price{ticker="${tokenTicker}",dex="Quickswap"}`
        }
      }
    });

    return data.data.result[0].value[1];
  }
}

export default ApiService;
