import { Contract, utils } from "ethers";
import { Contract as MultiCallContract } from "ethers-multicall";
import { Provider, JsonRpcSigner } from "@ethersproject/providers";
import type { VaultAbi, VaultAbiInterface } from "./types/vault.contract.abi";

import vaultAbi from "./abi/vault.abi.json";
import erc20Abi from "./abi/erc20.abi.json";
import registryAbi from "./abi/registry.abi.json";

import { EContractType } from "../types/contract.types";
import { Erc20Abi, Erc20AbiInterface } from "./types/erc20.contract.abi";
import { RegistryAbi, RegistryAbiInterface } from "./types/registry.contract.abi";

type CreateInterface<T extends EContractType> =
  T extends EContractType.ERC20 ? Erc20AbiInterface :
  T extends EContractType.VAULT ? VaultAbiInterface :
  T extends EContractType.REGISTRY ? RegistryAbiInterface :
    never;

type CreateContract<T extends EContractType> =
  T extends EContractType.ERC20 ? Erc20Abi :
  T extends EContractType.VAULT ? VaultAbi :
  T extends EContractType.REGISTRY ? RegistryAbi :
    never;

class ContractFactory<T extends EContractType> {
  constructor(contractType: T) {
    this._contractType = contractType;
  }

  private readonly _contractType: EContractType;

  private static readonly _abiByType = {
    [EContractType.ERC20]: erc20Abi,
    [EContractType.VAULT]: vaultAbi,
    [EContractType.REGISTRY]: registryAbi
  }

  public get abi() {
    return ContractFactory._abiByType[this._contractType];
  }

  public createInterface(): CreateInterface<T> {
    return new utils.Interface(this.abi as any) as CreateInterface<T>;
  }

  public createContract(address: string, provider: Provider | JsonRpcSigner): CreateContract<T> {
    return new Contract(address, this.abi as any, provider) as CreateContract<T>;
  }

  public createMultiCallContract(address: string): MultiCallContract {
    return new MultiCallContract(address, this.abi as any);
  }
}

export default ContractFactory;
