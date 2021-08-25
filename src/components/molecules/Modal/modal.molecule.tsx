import React, { useEffect } from "react";
import { Modal as BSModal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { ModalType } from "./modal.molecule.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/redux.types";
import { toggleModal } from "../../../redux/ui/ui.redux.actions";

const Modal: ModalType = (props) => {

  const {
    name,
    onHide,
    onOpen,
    disableHide,
    ...otherProps
  } = props;

  const modalOpen = useSelector<RootState, boolean>(state => {
    return !!state.ui.modals[name];
  });

  const dispatch = useDispatch();

  const closeModal = () => {
    if (disableHide) {
      return;
    }

    dispatch(toggleModal(name, false));

    if (onHide) {
      onHide();
    }
  };

  useEffect(() => {
    if (modalOpen && onOpen) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  return (
    <BSModal
      key={name}
      show={modalOpen}
      onHide={closeModal}
      {...otherProps}
    />
  );
};

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
