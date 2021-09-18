import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { getSupportedTokensByChain } from "../../../shared/utils/vault.util";
import useWeb3 from "../../../hooks/useWeb3";
import { EChainId } from "../../../shared/types/web3.types";
import Vault from "../../organisms/Vault/vault.organism";

const VaultsPage: React.FC = () => {
  const { chainId, isChainSupported } = useWeb3();
  const displayChainId = (chainId && isChainSupported) ? chainId : EChainId.POLYGON_MAINNET;

  const tokens = getSupportedTokensByChain(displayChainId);

  return (
    <PageOrganism containerEnabled={true}>
      <br/>
      {tokens.map(token =>(
        <Vault
          key={token}
          token={token}
          chain={displayChainId}
        />
      ))}
    </PageOrganism>
  );
};

export default VaultsPage;
