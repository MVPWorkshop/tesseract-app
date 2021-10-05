import React from "react";
import Link from "../Link/link.atom";
import Button from "../Button/button.atom";
import { ReactComponent as MediumLogoSVG } from "../../../shared/assets/medium.svg";
import { ReactComponent as DiscordLogoSVG } from "../../../shared/assets/discord.svg";
import { ReactComponent as TwitterLogoSVG } from "../../../shared/assets/twitter.svg";
import { ReactComponent as TelegramLogoSVG } from "../../../shared/assets/telegram.svg";
import styles from "./socialLinks.atom.module.scss";
import { ISocialLinksProps } from "./socialLinks.atom.types";
import { classes } from "../../../shared/utils/styles.util";

const SocialLinks: React.FC<ISocialLinksProps> = (props) => {

  const {
    className,
    spacingLarge
  } = props;

  const socialLinksClassName = classes(
    styles.socialLinks,
    [!!spacingLarge, styles.spacingLarge],
    className
  );

  return (
    <div className={socialLinksClassName}>
      <Link link={"medium"} newTab={true}>
        <Button theme="flat" className="p-0">
          <MediumLogoSVG/>
        </Button>
      </Link>
      <Link link={"https://discord.yearn.finance/"} newTab={true}>
        <Button theme="flat" className="p-0">
          <DiscordLogoSVG/>
        </Button>
      </Link>
      <Link link={"https://twitter.com/tesseract_fi"} newTab={true}>
        <Button theme="flat" className="p-0">
          <TwitterLogoSVG/>
        </Button>
      </Link>
      <Link link={"https://t.me/tesseractFinanceANN"} newTab={true}>
        <Button theme="flat" className="p-0">
          <TelegramLogoSVG/>
        </Button>
      </Link>
    </div>
  );
};

export default SocialLinks;
