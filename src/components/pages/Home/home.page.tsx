import React, { useState } from "react";
import PageOrganism from "../../organisms/Page/page.organism";
import styles from "./home.page.module.scss";
import ConnectWallet from "../../molecules/ConnectWalletButton/connectWalletButton.molecule";
import Button from "../../atoms/Button/button.atom";
import Typography from "../../atoms/Typography/typography.atom";
import DropdownArrow from "../../atoms/DropdownArrow/dropdownArrow.atom";

const HomePage: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);

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
      <Button
        onClick={() => setIsOpen(prevState => !prevState)}
        theme={"flat"}
      >
        <DropdownArrow isOpen={isOpen} />
      </Button>
    </PageOrganism>
  );
};

export default HomePage;
