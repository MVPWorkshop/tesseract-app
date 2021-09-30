import RestService from "../rest/rest.service";
import { API_BASE_URL } from "../../constants/config.constants";
import { IGetVaultAPYResponse } from "./vault.service.types";

class VaultService extends RestService {
  constructor() {
    super({
      baseUrl: API_BASE_URL
    });
  }

  public async getVaultAPY(vaultSymbol: string): Promise<string> {
    const response = await this.get<IGetVaultAPYResponse>({
      url: "/query",
      config: {
        params: {
          query: `rate(price{ticker="${vaultSymbol}"}[1d])*60*60*24*365`
        }
      }
    });

    return response.data.data.result[0].value[1];
  }
}

export default VaultService;
