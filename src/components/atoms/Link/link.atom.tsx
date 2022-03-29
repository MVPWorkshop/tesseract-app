import React from "react";
import { ILinkProps } from "./link.atom.types";

const Link: React.FC<ILinkProps> = (props) => {

  const {
    link,
    className,
    onClick,
    newTab = true,
  } = props;

  return (
    <a
      onClick={onClick}
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
