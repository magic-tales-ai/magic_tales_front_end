import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

// Components
import { ChangeEmail } from "./ChangeEmailForm";
import { ValidateEmail } from "./ValidateEmailForm";


export const ModalChangeEmail = ({ isOpen, setOpen }) => {
    const [currentView, setCurrentView] = useState('change-email');

    useEffect(() => {
        setCurrentView('change-email');

        return () => {
            setCurrentView('change-email');
        }
    }, [isOpen])

    const toggle = () => {
        setOpen(!isOpen);
    }

    const nextStep = () => {
        if(currentView === 'change-email') {
            setCurrentView('validate-email');
            return;
        }
        
        toggle();
    }

    const content = new Map([
        ['change-email', <ChangeEmail nextStep={nextStep} />],
        ['validate-email', <ValidateEmail nextStep={nextStep} />],
    ]);

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader className="border-0 pb-0" toggle={toggle}></ModalHeader>
            <ModalBody className="pt-0" >
                { content.get(currentView) }
            </ModalBody>
        </Modal>
    )
}