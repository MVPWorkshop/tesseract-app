import LoaderGif from "../../../shared/assets/initializing.gif";
import React, { Fragment } from "react";
import { ILoaderProps } from "./loader.atom.types";

const Loader: React.FC<ILoaderProps> = (props) => {
  return (
    <Fragment>
      <img
        alt="loader"
        src={LoaderGif}
        className={props.className}
      />
    </Fragment>
  );
};

export default Loader;
