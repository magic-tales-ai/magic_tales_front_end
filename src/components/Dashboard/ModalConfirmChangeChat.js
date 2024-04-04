import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Actions
import { closeModalConfirmChangeChat } from "../../redux/actions";

// Selectors
import { selectModalConfirm } from "../../redux/modal-confirm-change-chat/selectors";

export const ModalConfirmChangeChat = () => {
    const dispatch = useDispatch();
    const { isOpen, title, message, callback } = useSelector(selectModalConfirm) || {};

    const handleClose = () => dispatch(closeModalConfirmChangeChat());

    const handleAccept = () => {
        callback();
        handleClose();
    }

    return (
        <Modal isOpen={isOpen} centered toggle={handleClose}>
            <ModalHeader toggle={handleClose} cssModule={{ 'modal-title': 'modal-title text-center w-100' }}>
                {title}
            </ModalHeader>
            {message && <ModalBody>
                <p>{message}</p>
            </ModalBody>}
            <ModalFooter className="px-4">
                <Button color="outline-danger flex-fill w-100 w-lg-auto" onClick={handleAccept}>
                    Accept
                </Button>
                <Button color="primary flex-fill w-100 w-lg-auto" onClick={handleClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}