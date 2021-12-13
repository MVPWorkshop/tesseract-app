import { ContractCall, Provider } from "ethers-multicall";
import { JsonRpcProvider } from "@ethersproject/providers";
import { EChainId } from "../../types/web3.types";

class MultiCallService {
  private _batchedCalls: ContractCall[] = [];
  private _plannedCallbacks: Map<number, (result: any) => any> = new Map<number, (result: any) => any>();

  private _multiCallProvider: Provider;

  constructor(provider: JsonRpcProvider, chainId: EChainId) {
    this._multiCallProvider = new Provider(provider, chainId);
  }

  public batch<T>(call: ContractCall, callback?: (result: T) => any) {
    const id = this._batchedCalls.length;

    this._batchedCalls.push(call);

    if (callback) {
      this._plannedCallbacks.set(id, callback);
    }
  }

  public async execute(shouldAwaitCallbacks = true): Promise<any[]> {
    const results = await this._multiCallProvider.all(this._batchedCalls);

    for (let i = 0; i < results.length; i++) {
      const callback = this._plannedCallbacks.get(i);

      if (callback) {
        if (shouldAwaitCallbacks) {
          await callback(results[i]);
        } else {
          callback(results[i]);
        }
      }
    }

    return results;
  }
}

export default MultiCallService;
