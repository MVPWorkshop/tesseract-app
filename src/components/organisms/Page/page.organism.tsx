import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { IPageProps } from "./page.organism.types";
import { classes } from "../../../shared/utils/styles.util";
import styles from "./page.organism.module.scss";
import Header from "../Header/header.organism";
import Footer from "../Footer/footer.organism";
import Link from "../../atoms/Link/link.atom";
import { ReactComponent as WarningIconSVG } from "../../../shared/assets/warning.svg";

const PageOrganism: React.FC<IPageProps> = (props) => {

  const {
    containerEnabled,
    children,
    className,
    headerType,
    disableFooter,
    disableHeader,
    ...otherProps
  } = props;

  return (
    <Fragment>
      <div className={styles.shutdownRibbon}>
        <WarningIconSVG/>&nbsp;
        Tesseract Finance will be shutting down.
        You can find more details&nbsp;
        <Link
          link="https://twitter.com/tesseract_fi/status/1531322228188581888"
        >
          here
        </Link>
      </div>
      {!disableHeader && <Header type={headerType}/>}
      <Container
        {...otherProps}
        className={classes(styles.page, props.className)}
      >
        {children}
      </Container>
      {!disableFooter && <Footer/>}
    </Fragment>
  );
};

export default PageOrganism;
