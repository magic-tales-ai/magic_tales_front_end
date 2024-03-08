import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, CardBody } from "reactstrap";

import LoginForm from "./Login/Form";
import RegisterForm from "./Register/Form";
import ForgetPasswordForm from "./ForgetPassword/Form";

export const ModalSignIn = (props) => {
    const { isOpen, setOpen, defaultStep } = props
    const [step, setStep] = useState(defaultStep || '')

    const toggle = () => {
        setOpen(!isOpen)
        setStep(defaultStep || '')
    }

    const content = new Map([
        ['login', <LoginForm navigate={setStep} />],
        ['register', <RegisterForm navigate={setStep} />],
        ['forget-password', <ForgetPasswordForm navigate={setStep} />]
    ]);

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader className="border-0 pb-0" toggle={toggle}></ModalHeader>
            <ModalBody className="pt-0" >
                { content.get(step) ??
                <>
                    TODO aquí iria el caso de descargar con los botones para navegar al login y register
                </>
                }
            </ModalBody>
        </Modal>
    )
}