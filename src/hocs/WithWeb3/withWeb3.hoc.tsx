import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";

const WithWeb3: React.FC = (props) => {

  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider);

    library.pollingInterval = 12000;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {props.children}
    </Web3ReactProvider>
  );
};

export default WithWeb3;
