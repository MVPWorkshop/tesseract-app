import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import styles from "./home.page.module.scss";
import ConnectWallet from "../../molecules/ConnectWalletButton/connectWalletButton.molecule";

const HomePage: React.FC = () => {
  return (
    <PageOrganism className={styles.homePage} containerEnabled={true}>
      <ConnectWallet/>
    </PageOrganism>
  );
};

export default HomePage;
