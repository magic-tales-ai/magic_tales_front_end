import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DynamicModal = ({ isOpen, close, title, bodyContent, footerContent }) => {
    const handleClose = () => {
        close();
    };

    return (
        <Modal isOpen={isOpen} centered toggle={handleClose}>
            <ModalHeader toggle={handleClose} cssModule={{ 'modal-title': 'modal-title text-center w-100' }}>
                {title}
            </ModalHeader>
            {bodyContent && (
                <ModalBody>
                    {bodyContent}
                </ModalBody>
            )}
            {footerContent && <ModalFooter className="px-4">
                {footerContent}
            </ModalFooter>}
        </Modal>
    );
};

export default DynamicModal;