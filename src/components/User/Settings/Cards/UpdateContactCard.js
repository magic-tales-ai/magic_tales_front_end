import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Button, Form, Label, InputGroup, FormGroup, Input } from "reactstrap";
import { connect, useDispatch } from "react-redux";

// Selectors
import { selectUser } from "../../../../redux/user/selectors";

// Components
import { ModalChangeEmail } from "../../../Auth/LoggedIn/ChangeEmail/Modal";

const UpdateContactCardComponent = ({ user }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container-setting">
            <h3 className="mb-4 ff-special font-size-24 fw-bold">{t("Contact")}</h3>
            <Card color="secondary">
                <CardBody>
                    <div className="align-items-center">
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsOpen(true);
                            }}
                        >
                            <FormGroup>
                                <Label className="form-label">{t('Email')}</Label>
                                <InputGroup className="bg-soft-light rounded-3">
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control form-control-lg bg-soft-light border-light"
                                        value={user.get('email')}
                                        disabled
                                    />
                                    <Button color="primary" className="d-flex align-item-center text-start"><i className="ri-edit-box-line fw-normal"></i></Button>
                                </InputGroup>
                                <p className="mt-1"> {t('This email is linked to your account. If you decide to change it, you will need to revalidate it.')} </p>
                            </FormGroup>
                        </Form>
                    </div>
                </CardBody>
            </Card>

            <ModalChangeEmail
                isOpen={isOpen}
                setOpen={setIsOpen}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { user } = selectUser(state);

    return { user };
};

export const UpdateContactCard = connect(mapStateToProps)(UpdateContactCardComponent);