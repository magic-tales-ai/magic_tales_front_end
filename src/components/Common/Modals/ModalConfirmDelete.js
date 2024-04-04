import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const ModalConfirmDelete = (props) => {
    const { isOpen, setOpen, callback, title = 'Are you sure to delete?', children = '' } = props

    const handleClose = () => setOpen(false);

    const toggle = () => {
        setOpen(!isOpen)
    }

    const handleDelete = () => {
        callback();
        handleClose();
    }

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'modal-title text-center w-100' }}>
                {title}
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            <ModalFooter className="px-4">
                <Button color="outline-danger flex-fill w-100 w-lg-auto" onClick={handleDelete}>
                    Delete
                </Button>
                <Button color="primary flex-fill w-100 w-lg-auto" onClick={handleClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}