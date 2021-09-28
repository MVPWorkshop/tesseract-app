import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import styles from "./home.page.module.scss";
import { EHeaderType } from "../../organisms/Header/header.organism.types";
import SpaceFarmImg from "../../../shared/assets/home-bg.png";
import Typography from "../../atoms/Typography/typography.atom";
import { Trans } from "@lingui/macro";
import { ETypographyVariant } from "../../atoms/Typography/typography.atom.types";
import { Col, Row } from "react-bootstrap";
import SocialLinks from "../../atoms/SocialLinks/socialLinks.atom";
import { ReactComponent as YearnLogoSVG } from "../../../shared/assets/yearn-logo.svg";

const HomePage: React.FC = () => {
  return (
    <PageOrganism
      headerType={EHeaderType.LANDING}
      className={styles.homePage}
      disableFooter={true}
      fluid={true}
    >
      <Row className="flex-grow-1">
        <Col
          className={styles.textContent}
          xs={12}
          md={6}
        >
          <div className={styles.title}>
            <Typography
              variant={ETypographyVariant.TITLE}
              element={"h1"}
              uppercase={true}
            >
              <Trans>
                Generate more yield with tesseract.
              </Trans>
            </Typography>
            <Typography
              variant={ETypographyVariant.BODY}
              className={styles.titleBody}
            >
              <Trans>
                In collaboration with the Yearn team we bring you the true power of DeFi by using the best Yearn strategies adapted for Polygon. Add liquidity to Tesseract and generate juicy yields.
              </Trans>
            </Typography>
            <SocialLinks
              className="d-flex mt-6"
              spacingLarge={true}
            />
          </div>
          <div className="align-self-start pb-2 p-md-2 p-lg-8">
            <Typography>
              <Trans>Powered by</Trans>
            </Typography>
            &nbsp;
            <YearnLogoSVG/>
          </div>
        </Col>
        <Col
          className={styles.spaceFarm}
          xs={12}
          md={6}
        >
          <img
            alt={"spaceFarm"}
            src={SpaceFarmImg}
            className={styles.spaceFarmImg}
          />
        </Col>
      </Row>
    </PageOrganism>
  );
};

export default HomePage;
