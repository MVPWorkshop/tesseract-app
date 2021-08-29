import React, { Fragment, useState, useEffect } from "react";
import Modal from "../../../molecules/Modal/modal.molecule";
import { EModalName } from "../../../../redux/ui/ui.redux.types";
import { useWeb3React } from "@web3-react/core";
import { EConnectorType } from "../../../../shared/types/web3.types";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { Nullable } from "../../../../shared/types/util.types";
import WalletService from "../../../../shared/services/wallet.service";
import { CONNECTOR_LABELS, supportedConnectorList } from "../../../../shared/constants/web3.constants";
import Web3Util from "../../../../shared/utils/web3.util";
import { Trans } from "@lingui/macro";
import { METAMASK_DOWNLOAD_LINK } from "../../../../shared/constants/config.constants";
import LoaderAtom from "../../../atoms/Loader/loader.atom";

const ModalConnectWallet: React.FC = () => {

  const { connector, activate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<Nullable<AbstractConnector>>(connector);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const onConnectWalletClick = (_connector: AbstractConnector) => () => {
    setActivatingConnector(_connector);
    activate(_connector);
  };

  const renderButton = (type: EConnectorType) => {
    const isMetamaskWithoutWeb3 = type === EConnectorType.INJECTED && !Web3Util.isProviderInjected();
    const currentConnector = WalletService.typeToProvider(type);

    const onClick = isMetamaskWithoutWeb3 ? undefined : onConnectWalletClick(currentConnector);
    const label = isMetamaskWithoutWeb3 ? <Trans>Install Metamask</Trans> : <Trans id={CONNECTOR_LABELS[type]}/>;
    const isActivating = currentConnector === activatingConnector;

    const ButtonElement = () => (
      <button onClick={onClick} disabled={isActivating}>
        {isActivating ?
          <LoaderAtom /> : label
        }
      </button>
    );

    if (isMetamaskWithoutWeb3) {
      return (
        <a href={METAMASK_DOWNLOAD_LINK} target="_blank" rel="noopener noreferrer">
          <ButtonElement/>
        </a>
      );
    } else {
      return <ButtonElement/>;
    }
  };

  return (
    <Modal name={EModalName.CONNECT_WALLET}>
      <Modal.Title>
        Select the wallet you want to connect with:
      </Modal.Title>
      <Modal.Body>
        {supportedConnectorList.map(type => (
          <Fragment key={type}>
            {renderButton(type as EConnectorType)}
          </Fragment>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ModalConnectWallet;
