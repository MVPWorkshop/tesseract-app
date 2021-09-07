import LoaderGif from "../../../shared/assets/initializing.gif";
import React  from "react";
import { ILoaderProps } from "./loader.atom.types";

const Loader: React.FC<ILoaderProps> = (props) => {

  const {
    className,
    height,
    width
  } = props;

  return (
    <img
      alt="loader"
      src={LoaderGif}
      className={className}
      height={height}
      width={width}
    />
  );
};

export default Loader;
