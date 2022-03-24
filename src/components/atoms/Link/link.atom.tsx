import React from "react";
import { ILinkProps } from "./link.atom.types";

const Link: React.FC<ILinkProps> = (props) => {

  const {
    link,
    className = "",
    newTab = true
  } = props;

  return (
    <a
      className={className}
      href={link}
      rel="noopener noreferrer"
      target={newTab ? "_blank" : undefined}
    >
      {props.children}
    </a>
  );
};

export default Link;
