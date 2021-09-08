import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import styles from "./home.page.module.scss";
import { EHeaderType } from "../../organisms/Header/header.organism.types";

const HomePage: React.FC = () => {
  return (
    <PageOrganism
      headerType={EHeaderType.LANDING}
      className={styles.homePage}
      containerEnabled={true}
    >
      HomePage
    </PageOrganism>
  );
};

export default HomePage;
