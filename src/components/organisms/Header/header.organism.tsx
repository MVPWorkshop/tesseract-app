import React, { Fragment, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import styles from "./header.organism.module.scss";
import { ReactComponent as TesseractLogoSVG } from "../../../shared/assets/tesseract-logo.svg";
import ConnectWallet from "../../molecules/ConnectWalletButton/connectWalletButton.molecule";
import { EHeaderType, IHeaderProps } from "./header.organism.types";
import Button from "../../atoms/Button/button.atom";
import { Trans } from "@lingui/macro";
import Typography from "../../atoms/Typography/typography.atom";
import { EColor } from "../../../shared/types/styles.types";
import Link from "../../atoms/Link/link.atom";
import { Link as RouterLink } from "react-router-dom";
import { ERoutes } from "../../../router";
import LanguagePicker from "../../molecules/LanguagePicker/languagePicker.molecule";
import { classes } from "../../../shared/utils/styles.util";

const Header: React.FC<IHeaderProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
        <Link link="https://tesseract-finance.gitbook.io/">
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

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const headerClassName = classes(
    styles.header,
    isMenuOpen ? "" : styles.navCollapsed
  );

  return (
    <Nav className={headerClassName}>
      <Container className={styles.container}>
        <RouterLink to={ERoutes.LANDING}>
          <TesseractLogoSVG className={styles.logo}/>
        </RouterLink>
        <div className={classes(styles.content, "d-none d-md-flex")}>
          {getHeaderContent()}
        </div>
        <div className="flex-grow-1 d-flex d-md-none justify-content-end">
          <Button
            theme="flat"
            onClick={toggleMenu}
          >
            <Typography color={EColor.WHITE}>
              MENU
            </Typography>
          </Button>
        </div>
      </Container>
      <Container className={classes(styles.mobileMenu, isMenuOpen ? "" : styles.menuClosed)}>
        {
          isMenuOpen &&
          <div className={styles.content}>
            {getHeaderContent()}
          </div>
        }
      </Container>
    </Nav>
  );
};

export default Header;
