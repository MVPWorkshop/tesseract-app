import React from "react";
import { ReactComponent as TesseractLogoSVG } from "../../../shared/assets/tesseract-logo.svg";
import styles from "./footer.organism.module.scss";
import Typography from "../../atoms/Typography/typography.atom";
import { Trans } from "@lingui/macro";
import { EFontWeight } from "../../../shared/types/styles.types";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { Container } from "react-bootstrap";
import SocialLinks from "../../atoms/SocialLinks/socialLinks.atom";
import { ReactComponent as YearnLogoSVG } from "../../../shared/assets/yearn-logo.svg";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <TesseractLogoSVG className={"mb-4"}/>
          <div>
            <Typography>
              <Trans>Powered by</Trans>
            </Typography>
            &nbsp;
            <YearnLogoSVG/>
          </div>
        </div>
        <div className={styles.content}>
          <Typography
            fontWeight={EFontWeight.SEMI_BOLD}
            variant={ETypographyVariant.TITLE}
            element={"h5"}
          >
            <Trans>Join the community</Trans>
          </Typography>
          <SocialLinks/>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
