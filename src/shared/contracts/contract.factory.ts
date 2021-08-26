import { Contract, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { VaultAbi, VaultAbiInterface } from "./types/vault.contract.abi";

import vaultAbi from "./abi/vault.abi.json";
import erc20Abi from "./abi/erc20.abi.json";
import { EContractType } from "../types/contract.types";
import { Erc20Abi, Erc20AbiInterface } from "./types/erc20.contract.abi";

class ContractFactory {
  constructor(contractType: EContractType) {
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

  public createInterface() {
    switch (this._contractType) {
      case EContractType.ERC20: {
        return new utils.Interface(this.abi as any) as Erc20AbiInterface;
      }
      case EContractType.VAULT: {
        return new utils.Interface(this.abi as any) as VaultAbiInterface;
      }
    }
  }

  public createContract(address: string, provider: Provider) {
    switch (this._contractType) {
      case EContractType.ERC20: {
        return new Contract(address, this.abi as any, provider) as Erc20Abi;
      }
      case EContractType.VAULT: {
        return new Contract(address, this.abi as any, provider) as VaultAbi;
      }
    }
  }
}

export default ContractFactory;
