import { JsonRpcSigner } from "@ethersproject/providers";
import ContractFactory from "./contract.factory";
import { EContractType, ESupportedTokens } from "../types/contract.types";
import { EChainId } from "../types/web3.types";
import { addressByNetworkAndToken } from "../constants/web3.constants";

class Erc20ContractFactory {
  private readonly _provider: JsonRpcSigner;
  private _factory = new ContractFactory(EContractType.ERC20);
  private _tokenType: ESupportedTokens;

  constructor(token: ESupportedTokens, provider: JsonRpcSigner) {
    this._provider = provider;
    this._tokenType = token;
  }

  public async getInstance(chainId?: EChainId) {
    let _chainId = chainId;

    if (!_chainId) {
      _chainId = await this._provider.getChainId();
    }

    const tokenAddress = addressByNetworkAndToken[this._tokenType][_chainId];
    if (!tokenAddress) {
      throw new Error("Token not available on current network");
    }

    return this._factory.createContract(tokenAddress, this._provider);
  }
}

export default Erc20ContractFactory;
