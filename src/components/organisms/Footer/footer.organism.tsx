import React from "react";
import { ReactComponent as TesseractLogoSVG } from "../../../shared/assets/tesseract-logo.svg";
import styles from "./footer.organism.module.scss";
import Typography from "../../atoms/Typography/typography.atom";
import { Trans } from "@lingui/macro";
import { EFontWeight } from "../../../shared/types/styles.types";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import Link from "../../atoms/Link/link.atom";
import { ReactComponent as MediumLogoSVG } from "../../../shared/assets/medium.svg";
import { ReactComponent as TelegramLogoSVG } from "../../../shared/assets/telegram.svg";
import { ReactComponent as DiscordLogoSVG } from "../../../shared/assets/discord.svg";
import { ReactComponent as TwitterLogoSVG } from "../../../shared/assets/twitter.svg";
import { Container } from "react-bootstrap";
import Button from "../../atoms/Button/button.atom";

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Container className={styles.container}>
        <TesseractLogoSVG/>
        <div className={styles.content}>
          <Typography
            fontWeight={EFontWeight.SEMI_BOLD}
            variant={ETypographyVariant.TITLE}
            element={"h5"}
          >
            <Trans>Join the community</Trans>
          </Typography>
          <div className={styles.socialContainer}>
            <Link link={"medium"}>
              <Button theme="flat" className="p-0">
                <MediumLogoSVG/>
              </Button>
            </Link>
            <Link link={"discord"}>
              <Button theme="flat" className="p-0">
                <DiscordLogoSVG/>
              </Button>
            </Link>
            <Link link={"twitter"}>
              <Button theme="flat" className="p-0">
                <TwitterLogoSVG/>
              </Button>
            </Link>
            <Link link={"telegram"}>
              <Button theme="flat" className="p-0">
                <TelegramLogoSVG/>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
