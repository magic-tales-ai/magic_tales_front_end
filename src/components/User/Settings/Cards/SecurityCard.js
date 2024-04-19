import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Button, Label } from "reactstrap";
import { connect } from "react-redux";

// Components
import { ModalChangePassword } from "../../../Auth/LoggedIn/ChangePassword/Modal";

const SecurityCardComponent = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="container-setting">
            <h3 className="mb-4 ff-special font-size-24 fw-bold">{t("Security")}</h3>
            <Card color="secondary">
                <CardBody>
                    <div className="d-sm-flex d-block align-items-center">
                        <Label className="mb-1 m-0 me-sm-5"> {t('Password')} </Label>
                        <div className="d-flex justify-content-center">
                            <Button onClick={() => setIsOpen(true)} color="secondary" size='sm' className="d-block d-sm-flex text-center waves-effect waves-light btn btn-secondary btn-sm"> {t('Change Password')} </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <ModalChangePassword isOpen={isOpen} setOpen={setIsOpen} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {}
};

export const SecurityCard = connect(mapStateToProps)(SecurityCardComponent);