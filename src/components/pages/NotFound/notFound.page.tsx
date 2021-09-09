import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { EHeaderType } from "../../organisms/Header/header.organism.types";
import { ReactComponent as NotFoundIllustrationSVG } from "../../../shared/assets/404.svg";
import Typography from "../../atoms/Typography/typography.atom";
import { Trans } from "@lingui/macro";
import { EFontWeight } from "../../../shared/types/styles.types";
import styles from "./notFound.page.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <PageOrganism
      headerType={EHeaderType.LANDING}
      className={styles.notFoundPage}
    >
      <NotFoundIllustrationSVG className={styles.illustration} />
      <br/>
      <Typography
        uppercase={true}
        fontWeight={EFontWeight.SEMI_BOLD}
        fontSize={20}
      >
        <Trans> Page not found </Trans>
      </Typography>
    </PageOrganism>
  );
};

export default NotFoundPage;
