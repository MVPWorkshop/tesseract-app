import React, { Fragment } from "react";
import { Container, Nav } from "react-bootstrap";
import styles from "./header.organism.module.scss";
import { ReactComponent as TesseractLogoSVG } from "../../../shared/assets/tesseract-logo.svg";
import ConnectWallet from "../../molecules/ConnectWalletButton/connectWalletButton.molecule";
import DropdownMenu from "../../molecules/DropdownMenu/dropdownMenu.molecule";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/redux.types";
import { ESupportedLocales } from "../../../shared/types/locale.types";
import { changeLocale } from "../../../redux/ui/ui.redux.actions";
import { supportedLocaleList } from "../../../shared/constants/common.constants";
import { EHeaderType, IHeaderProps } from "./header.organism.types";
import Button from "../../atoms/Button/button.atom";
import { Trans } from "@lingui/macro";
import Typography from "../../atoms/Typography/typography.atom";
import { EColor } from "../../../shared/types/styles.types";
import Link from "../../atoms/Link/link.atom";
import { Link as RouterLink } from "react-router-dom";
import { ERoutes } from "../../../router";
import LanguagePicker from "../../molecules/LanguagePicker/languagePicker.molecule";

const Header: React.FC<IHeaderProps> = (props) => {
  const AppHeaderContent = () => {
    return (
      <Fragment>
        <LanguagePicker/>
        <ConnectWallet/>
      </Fragment>
    );
  };

  const LandingPageHeaderContent = () => {
    return (
      <Fragment>
        <Link link={"docs"} newTab={false}>
          <Button theme={"flat"}>
            <Typography uppercase={true} color={EColor.WHITE}>
              <Trans>Documentation</Trans>
            </Typography>
          </Button>
        </Link>
        <LanguagePicker/>
        <RouterLink to={ERoutes.VAULTS}>
          <Button>
            <Typography uppercase={true}>
              <Trans>Launch app</Trans>
            </Typography>
          </Button>
        </RouterLink>
      </Fragment>
    );
  };

  const getHeaderContent = () => {
    if (props.type === EHeaderType.LANDING) {
      return <LandingPageHeaderContent/>;
    }

    return <AppHeaderContent/>;
  };

  return (
    <Nav className={styles.header}>
      <Container className={styles.container}>
        <TesseractLogoSVG className={styles.logo}/>
        <div className={styles.content}>
          {getHeaderContent()}
        </div>
      </Container>
    </Nav>
  );
};

export default Header;
