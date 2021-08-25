import React  from "react";
import { Container } from "react-bootstrap";
import { IPageProps } from "./page.organism.types";
import { classes } from "../../../shared/utils/styles.util";
import styles from "./page.organism.module.scss";

const PageOrganism: React.FC<IPageProps> = (props) => {

  const {
    containerEnabled,
    children,
    ...otherProps
  } = props;

  if (containerEnabled) {
    return (
      <Container
        {...otherProps}
        className={classes(props.className, styles.page)}
      >
        <div className={styles.container}>
          {children}
        </div>
      </Container>
    );
  }

  return (
    <Container
      {...props}
      className={classes(props.className, styles.page)}
    >
      {children}
    </Container>
  );
};

export default PageOrganism;
