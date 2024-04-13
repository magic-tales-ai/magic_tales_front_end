import React, { useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

// Pages
import LoginForm from "./Login/Form";
import RegisterForm from "./Register/Form";
import ForgetPasswordForm from "./ForgetPassword/Form";
import ValidateRegistration from "./ValidateRegistration/Form";
import ChangePassword from "./ChangePassword/Form";

// Actions
import { closeModalSignin, setView } from "../../redux/actions";

// Selectors
import { selectModalSignIn } from "../../redux/modal-signin/selectors";

export const ModalSignIn = () => {
    const dispatch = useDispatch()
    const { isOpen, view } = useSelector(selectModalSignIn);
    const user = useSelector(state => state.Auth?.get('user'));

    useEffect(() => {
        if(user?.get('id')) {
            toggle();
        }
    }, [user])

    const toggle = () => {
        dispatch(closeModalSignin());
    }

    const changeView = (view) => {
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