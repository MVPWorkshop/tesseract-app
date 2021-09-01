import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import styles from "./home.page.module.scss";
import ConnectWallet from "../../molecules/ConnectWalletButton/connectWalletButton.molecule";
import Typography from "../../atoms/Typography/typography";
import { ETypographyVariant } from "../../atoms/Typography/typography.types";

const HomePage: React.FC = () => {

  return (
    <PageOrganism className={styles.homePage} containerEnabled={true}>
      <ConnectWallet/>

      <Typography variant={ETypographyVariant.TITLE} element={"h1"}>Heading 1</Typography>
      <Typography variant={ETypographyVariant.TITLE} element={"h2"}>Heading 2</Typography>
      <Typography variant={ETypographyVariant.TITLE} element={"h3"}>Heading 3</Typography>
      <Typography variant={ETypographyVariant.TITLE} element={"h4"}>Heading 4</Typography>
      <Typography variant={ETypographyVariant.TITLE} element={"h5"}>Heading 5</Typography>
      <Typography variant={ETypographyVariant.TITLE} element={"h6"}>Heading 6</Typography>
    </PageOrganism>
  );
};

export default HomePage;
