import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import LoginForm from "./Login/Form";
import RegisterForm from "./Register/Form";
import ForgetPasswordForm from "./ForgetPassword/Form";
import ValidateRegistration from "./ValidateRegistration/Form";
import ChangePassword from "./ChangePassword/Form";

// Actions
import { closeModalSignin, setView, setActiveChat, createUserTryMode } from "../../redux/actions";

// Selectors
import { selectModalSignIn } from "../../redux/modal-signin/selectors";

export const ModalSignIn = () => {
    const dispatch = useDispatch()
    const { isOpen, view } = useSelector(selectModalSignIn);
    const user = useSelector(state => state.User);
    const [previousView, setPreviousView] = useState(null);
    const [newRegister, setNewRegister] = useState(false);

    useEffect(() => {
        if(user?.get('id') && isOpen) {
            toggle();
        }
    }, [user])

    useEffect(() => {
        if(previousView === 'register' && view === 'validate-registration') {
            setNewRegister(true);
        }
    }, [view])

    useEffect(() => {
        if(newRegister && !isOpen && (view === 'validate-registration' || view === 'login')) {
            // new temporary user for new chat
            dispatch(createUserTryMode());
            // for the dashboard to create a new chat
            dispatch(setActiveChat(null));
        }
        
        if(!isOpen) {
            setNewRegister(false);
        }
    }, [isOpen])

    const toggle = () => {
        dispatch(closeModalSignin());
    }

    const changeView = (view) => {
        setPreviousView(view)
        dispatch(setView({ view }))
    }

    const content = new Map([
        ['login', <LoginForm navigate={changeView} />],
        ['register', <RegisterForm navigate={changeView} />],
        ['validate-registration', <ValidateRegistration navigate={changeView} />],
        ['forget-password', <ForgetPasswordForm navigate={changeView} />],
        ['change-password', <ChangePassword navigate={changeView} />]
    ]);

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader className="border-0 pb-0" toggle={toggle}></ModalHeader>
            <ModalBody className="pt-0" >
                { content.get(view) }
            </ModalBody>
        </Modal>
    )
}