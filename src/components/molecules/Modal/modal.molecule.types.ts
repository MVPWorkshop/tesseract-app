import React from "react";
import { ModalProps as BSModalProps, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { EModalName } from "../../../redux/ui/ui.redux.types";

export interface IModalProps extends Exclude<BSModalProps, "show" | "onHide"> {
  name: EModalName;
  disableHide?: boolean;
  onHide?: () => void;
  onOpen?: () => void;
}

export type ModalType = React.FC<IModalProps> & {
  Title: typeof ModalTitle;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}
