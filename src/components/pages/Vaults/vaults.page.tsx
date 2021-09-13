import React, { useState } from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { Trans } from "@lingui/macro";
import Button from "../../atoms/Button/button.atom";
import useWeb3 from "../../../hooks/useWeb3";
import RegistryContract from "../../../shared/contracts/registry.contract";
import { ESupportedTokens } from "../../../shared/types/contract.types";

const VaultsPage: React.FC = () => {
  const [state, setState] = useState<any>();
  const { library, chainId } = useWeb3();

  const getVaultAddress = async () => {
    if (library && chainId) {
      const registry = new RegistryContract(library, chainId);
      const theAddress = await registry.getVaultByToken(ESupportedTokens.DAI);
      setState(theAddress);
    }
  }

  return (
    <PageOrganism>
      <Trans>Hi!</Trans><br/>
      <Button onClick={() => getVaultAddress()}>
        Hey
      </Button>
      {state}
    </PageOrganism>
  );
};

export default VaultsPage;
