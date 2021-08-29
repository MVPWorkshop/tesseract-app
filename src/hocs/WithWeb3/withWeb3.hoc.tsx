import React, { Fragment } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { useEagerConnect } from "../../hooks/useEagerConnect";
import { useInactiveListener } from "../../hooks/useInactiveListener";
import { PROVIDER_POLLING_INTERVAL } from "../../shared/constants/config.constants";
import { IWithWeb3Props } from "./withWeb3.hoc.types";

const WithWeb3Listener: React.FC = (props) => {
  const triedEager = useEagerConnect();
  useInactiveListener({ suppress: !triedEager });

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
};

const WithWeb3: React.FC<IWithWeb3Props> = (props) => {

  const {
    pollingInterval,
    useWeb3Listener
  } = props;

  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider => {
    const library = new Web3Provider(provider);

    library.pollingInterval = pollingInterval || PROVIDER_POLLING_INTERVAL;
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {useWeb3Listener ? <WithWeb3Listener {...props}/> : props.children}
    </Web3ReactProvider>
  );
};

export default WithWeb3;
