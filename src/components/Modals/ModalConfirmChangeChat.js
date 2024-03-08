import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// Import Actions
import { closeModal } from "../../redux/actions";

export const ModalConfirmChangeChat = () => {
    const dispatch = useDispatch();
    const { isOpen, title, message, callback } = useSelector(state => state.ModalConfirm) || {};

    const handleClose = () => dispatch(closeModal());

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