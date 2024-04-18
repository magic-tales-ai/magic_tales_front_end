import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

// Components
import ChangePasswordForm from "./Form";


export const ModalChangePassword = ({ isOpen, setOpen }) => {
    const toggle = () => {
        setOpen(!isOpen);
    }

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader className="border-0 pb-0" toggle={toggle}></ModalHeader>
            <ModalBody className="pt-0" >
                <ChangePasswordForm updated={toggle} />
            </ModalBody>
        </Modal>
    )
}