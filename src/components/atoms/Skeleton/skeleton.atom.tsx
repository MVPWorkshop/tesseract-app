import React, { Fragment } from "react";
import LoadingSkeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ISkeletonProps } from "./skeleton.atom.types";

const Skeleton: React.FC<ISkeletonProps> = (props) => {
  const {
    loading
  } = props;

  if (loading) {
    return (
      <SkeletonTheme color="#232743" highlightColor="#6E79A3">
        <LoadingSkeleton count={1}/>
      </SkeletonTheme>
    );
  } else {
    return (
      <Fragment>
        {props.children}
      </Fragment>
    );
  }
};

export default Skeleton;
