import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import { EHeaderType } from "../../organisms/Header/header.organism.types";
import { ReactComponent as NotFoundIllustrationSVG } from "../../../shared/assets/tesseract-logo.svg";

const NotFoundPage: React.FC = () => {
  return (
    <PageOrganism
      headerType={EHeaderType.LANDING}
      containerEnabled={true}
      className="d-flex align-items-center justify-content-center"
    >
      <NotFoundIllustrationSVG/>
    </PageOrganism>
  );
};

export default NotFoundPage;
