import { EVaultState, IRegistryVault } from "../types/vault.types";
import { RegistryAbi } from "../contracts/types/registry.contract.abi";
import { BigNumber } from "ethers";

export async function getAllVaultsForToken(tokenAddress: string, registryContract: RegistryAbi): Promise<IRegistryVault[]> {
  const vaults: IRegistryVault[] = [];
  const numberOfVaultForToken = await registryContract.numVaults(tokenAddress);

  for (let i = 0; i < numberOfVaultForToken.toNumber(); i++) {
    const vaultAddress = await registryContract.vaults(tokenAddress, BigNumber.from(i));

    vaults.push({
      address: vaultAddress,
      state: EVaultState.OBSOLETE
    });
  }

  if (vaults.length > 0) {
    vaults[vaults.length - 1].state = EVaultState.STABLE;
  }

  return vaults;
}
