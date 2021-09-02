import React from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import styles from "./home.page.module.scss";
import ConnectWallet from "../../molecules/ConnectWalletButton/connectWalletButton.molecule";
import Button from "../../atoms/Button/button.atom";
import Typography from "../../atoms/Typography/typography.atom";

const HomePage: React.FC = () => {

  return (
    <PageOrganism className={styles.homePage} containerEnabled={true}>
      <ConnectWallet/>
      <br/><br/>
      <Button theme={"primary"}>
        <Typography>
          Primary!
        </Typography>
      </Button>
      <br/><br/>
      <Button theme={"outline-primary"}>
        Primary-outline!
      </Button>
      <br/><br/><br/>
      <Button theme={"secondary"}>
        Secondary!
      </Button>
      <br/><br/>
      <Button theme={"outline-secondary"}>
        Secondary-outline!
      </Button>
      <br/><br/><br/>
      <Button theme={"tertiary"}>
        Tertiary!
      </Button>
      <br/><br/>
      <Button theme={"outline-tertiary"}>
        Tertiary-outline!
      </Button>
      <br/><br/><br/>
      <Button theme={"error"}>
        Error!
      </Button>
    </PageOrganism>
  );
};

export default HomePage;
