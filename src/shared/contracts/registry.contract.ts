import { JsonRpcSigner, Provider } from "@ethersproject/providers";
import { RegistryAbi } from "./types/registry.contract.abi";
import { EChainId } from "../types/web3.types";
import { REGISTRY_ADDRESS_POLYGON_MAINNET } from "../constants/config.constants";
import { AllKeysRequired, DynamicObject } from "../types/util.types";
import ContractFactory from "./contract.factory";
import { EContractType, ESupportedTokens } from "../types/contract.types";
import { addressByNetworkAndToken } from "../constants/web3.constants";

class RegistryContract {
  private readonly _contract: RegistryAbi;
  private readonly _chainId: EChainId;

  private _addressByChain: DynamicObject<string, EChainId, AllKeysRequired> = {
    [EChainId.POLYGON_MAINNET]: REGISTRY_ADDRESS_POLYGON_MAINNET
  };

  constructor(provider: Provider | JsonRpcSigner, chainId: EChainId) {
    const address = this._addressByChain[chainId];
    const factory = new ContractFactory(EContractType.REGISTRY);

    this._contract = factory.createContract(address, provider);
    this._chainId = chainId;
  }

  public get contract() {
    return this._contract;
  }

  public async getVaultByToken(token: ESupportedTokens) {
    const tokenAddress = addressByNetworkAndToken[token][this._chainId];

    if (tokenAddress) {
      return await this._contract.latestVault(tokenAddress);
    }
  }
}

export default RegistryContract;
