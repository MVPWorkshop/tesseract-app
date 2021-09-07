import React, { Fragment, useEffect, useState } from "react";
import Modal from "../../../molecules/Modal/modal.molecule";
import { EModalName } from "../../../../redux/ui/ui.redux.types";
import { EConnectorType } from "../../../../shared/types/web3.types";
import { Nullable } from "../../../../shared/types/util.types";
import WalletService from "../../../../shared/services/wallet.service";
import { CONNECTOR_LABELS, CONNECTOR_LOGOS, supportedConnectorList } from "../../../../shared/constants/web3.constants";
import Web3Util from "../../../../shared/utils/web3.util";
import { Trans } from "@lingui/macro";
import { METAMASK_DOWNLOAD_LINK } from "../../../../shared/constants/config.constants";
import styles from "./modalConnectWallet.organism.module.scss";
import Typography from "../../../atoms/Typography/typography.atom";
import { ETypographyVariant } from "../../../atoms/Typography/typography.atom.types";
import { ReactComponent as CloseSVG } from "../../../../shared/assets/close.svg";
import Button from "../../../atoms/Button/button.atom";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../../../redux/ui/ui.redux.actions";
import useWeb3 from "../../../../hooks/useWeb3";
import { EColor, EFontWeight } from "../../../../shared/types/styles.types";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { classes } from "../../../../shared/utils/styles.util";
import { ReactComponent as CopyIcon } from "../../../../shared/assets/copy.svg";
import { ReactComponent as LinkIcon } from "../../../../shared/assets/link.svg";
import { copyToClipboard, sleep } from "../../../../shared/utils/common.util";

enum EModalConnectWalletScreens {
  PickWallet = "PickWallet",
  CurrentWallet = "CurrentWallet"
}

const ModalConnectWallet: React.FC = () => {
  const modalName = EModalName.CONNECT_WALLET;

  const dispatch = useDispatch();
  const { activate, error, connector, active, account, chainId } = useWeb3();

  const [activatingConnector, setActivatingConnector] = useState<Nullable<EConnectorType>>();
  const [erroredConnector, setErroredConnector] = useState<Nullable<EConnectorType>>();
  const [currentScreen, setCurrentScreen] = useState<EModalConnectWalletScreens>(EModalConnectWalletScreens.PickWallet);

  const [isAddressBeingCopied, setIsAddressBeingCopied] = useState(false);

  useEffect(() => {
    if (error && activatingConnector) {
      setErroredConnector(activatingConnector);

      // ISSUE-217, WalletConnect can't connect after user rejects https://github.com/NoahZinsmeister/web3-react/issues/217
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }
    } else if (!error) {
      setErroredConnector(null);
    }
  }, [error]);

  useEffect(() => {
    if (active) {
      setCurrentScreen(EModalConnectWalletScreens.CurrentWallet);
    }
  }, [active]);

  const onConnectWalletClick = (type: EConnectorType, isActive: boolean) => () => {
    if (isActive) {
      setCurrentScreen(EModalConnectWalletScreens.CurrentWallet);
    } else {
      const _connector = WalletService.typeToProvider(type);
      setErroredConnector(null);
      setActivatingConnector(type);

      activate(_connector)
        .finally(() => setActivatingConnector(null));
    }
  };

  const onOpen = () => {
    setErroredConnector(null);

    if (active && connector) {
      setCurrentScreen(EModalConnectWalletScreens.CurrentWallet);
    }
  };

  const closeModal = () => {
    dispatch(toggleModal(modalName, false));
  };

  const wrapWithDownloadLink = (ComponentToWrap: React.FC, link?: string) => {
    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <ComponentToWrap/>
        </a>
      );
    } else {
      return (
        <ComponentToWrap/>
      );
    }
  };

  const renderButton = (type: EConnectorType) => {
    const isMetamaskWithoutWeb3 = type === EConnectorType.INJECTED && !Web3Util.isProviderInjected();
    const isActivationHappening = !!activatingConnector;
    const isCurrentActivating = type === activatingConnector;
    const hasCurrentErrored = type === erroredConnector;
    const isCurrentActive = active && type === WalletService.providerToType(connector);

    const onClick = isMetamaskWithoutWeb3 ? undefined : onConnectWalletClick(type, isCurrentActive);
    const label = isMetamaskWithoutWeb3 ? <Trans>Install Metamask</Trans> : <Trans id={CONNECTOR_LABELS[type]}/>;
    const Logo = CONNECTOR_LOGOS[type];

    const ButtonElement = () => {
      if (hasCurrentErrored) {
        return (
          <div className={styles.infoContainer}>
            <Typography uppercase={true} color={EColor.RED}>
              <Trans>Error connecting</Trans>
            </Typography>
            <Button
              onClick={onClick}
              theme={"primary"}
              className={"ml-2"}
            >
              <Typography uppercase={true}>
                <Trans>Try again</Trans>
              </Typography>
            </Button>
          </div>
        );
      } else {
        return (
          <Button
            onClick={onClick}
            disabled={isActivationHappening}
            loading={isCurrentActivating}
            className={styles.connectorButton}
            loadingTextComponent={
              <Typography
                uppercase={true}
                maximize={true}
                textAlign="left"
              >
                <Trans>Initializing</Trans>...
              </Typography>
            }
            theme={isCurrentActive ? "primary" : "secondary"}
          >
            <div className="d-flex align-items-center">
              <Typography uppercase={true} maximize={true} textAlign="left">
                {label}
              </Typography>
              <Logo/>
            </div>
          </Button>
        );
      }
    };

    if (isMetamaskWithoutWeb3) {
      return wrapWithDownloadLink(ButtonElement, METAMASK_DOWNLOAD_LINK);
    } else {
      return <ButtonElement/>;
    }
  };

  const getModalTitle = () => {
    if (erroredConnector) {
      return <Trans>Something went wrong</Trans>;
    } else  if (activatingConnector) {
      return <Trans>Approve connecting with {CONNECTOR_LABELS[activatingConnector]}</Trans>;
    } else {
      return <Trans>Select the wallet you want to connect with:</Trans>;
    }
  };

  const onCopyAddressClick = () => {
    const copyAddressToClipboard = async (_account: string) => {
      copyToClipboard(_account);
      setIsAddressBeingCopied(true);
      await sleep(600);
      setIsAddressBeingCopied(false);
    };

    if (account) {
      copyAddressToClipboard(account);
    }
  };

  const renderScreen = () => {
    const activeConnectorType = WalletService.providerToType(connector);

    if (activeConnectorType && account && currentScreen === EModalConnectWalletScreens.CurrentWallet) {
      const ConnectorLogo = CONNECTOR_LOGOS[activeConnectorType];

      return (
        <Fragment>
          <div className={classes(styles.infoContainer, "mb-0")}>
            <Typography uppercase={true}>
              {Web3Util.getFormattedAddress(account)}
            </Typography>
            <ConnectorLogo/>
          </div>
          <div className="mt-2 mb-5">
            <Button
              theme={"flat"}
              className={styles.utilBtn}
              onClick={onCopyAddressClick}
              disabled={isAddressBeingCopied}
            >
              <CopyIcon className="mr-2"/>
              <Typography color={EColor.RHYTM} fontWeight={EFontWeight.SEMI_BOLD}>
                {isAddressBeingCopied ? <Trans>Copied!</Trans> : <Trans>Copy address</Trans>}
              </Typography>
            </Button>
            {wrapWithDownloadLink(
              () => (
                <Button
                  theme={"flat"}
                  className={styles.utilBtn}
                >
                  <LinkIcon className="mr-2"/>
                  <Typography color={EColor.RHYTM} fontWeight={EFontWeight.SEMI_BOLD}>
                    <Trans>View on explorer</Trans>
                  </Typography>
                </Button>
              ),
              Web3Util.getExplorerLink(chainId!, account!, "account")
            )}
          </div>
          <Button
            theme="primary"
            onClick={() => setCurrentScreen(EModalConnectWalletScreens.PickWallet)}
            className="align-self-end"
          >
            <Typography uppercase={true}>
              <Trans>Change wallet</Trans>
            </Typography>
          </Button>
        </Fragment>
      );
    } else {
      return supportedConnectorList.map(type => (
        <Fragment key={type}>
          {renderButton(type as EConnectorType)}
        </Fragment>
      ));
    }
  };

  return (
    <Modal
      name={modalName}
      contentClassName={styles.modalConnectWallet}
      onOpen={onOpen}
    >
      <Modal.Title>
        <div className={styles.closeButton}>
          <Button
            onClick={closeModal}
            theme="flat"
          >
            <CloseSVG/>
          </Button>
        </div>
        <Typography
          variant={ETypographyVariant.TITLE}
          element="h5"
        >
          {getModalTitle()}
        </Typography>
      </Modal.Title>
      <Modal.Body>
        {renderScreen()}
      </Modal.Body>
    </Modal>
  );
};

export default ModalConnectWallet;
