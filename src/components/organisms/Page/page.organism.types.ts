import { ContainerProps } from "react-bootstrap";
import { EHeaderType } from "../Header/header.organism.types";

export interface IPageProps extends ContainerProps {
  containerEnabled?: boolean;
  headerType?: EHeaderType;
}
