import { Contract, utils } from "ethers";
import { Provider, JsonRpcSigner } from "@ethersproject/providers";
import type { VaultAbi, VaultAbiInterface } from "./types/vault.contract.abi";

import vaultAbi from "./abi/vault.abi.json";
import erc20Abi from "./abi/erc20.abi.json";
import { EContractType } from "../types/contract.types";
import { Erc20Abi, Erc20AbiInterface } from "./types/erc20.contract.abi";

type CreateInterface<T extends EContractType> =
  T extends EContractType.ERC20 ? Erc20AbiInterface :
  T extends EContractType.VAULT ? VaultAbiInterface :
    never;

type CreateContract<T extends EContractType> =
  T extends EContractType.ERC20 ? Erc20Abi :
  T extends EContractType.VAULT ? VaultAbi :
    never;

class ContractFactory<T extends EContractType> {
  constructor(contractType: T) {
    this._contractType = contractType;
  }

  private readonly _contractType: EContractType;

  private static readonly _abiByType = {
    [EContractType.ERC20]: erc20Abi,
    [EContractType.VAULT]: vaultAbi
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
}

export default ContractFactory;
