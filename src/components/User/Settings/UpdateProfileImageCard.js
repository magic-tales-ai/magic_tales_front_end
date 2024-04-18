import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";

// Image default
import { ReactComponent as ProfileImageDefault } from "../../../assets/images/profiles/profile-svgrepo-com.svg";

// Selectors
import { selectAuth } from "../../../redux/auth/selectors";

// Components
import { ModalUpdateImage } from "../../Common/Modals/ModalUpdateImage";

// Constants
import { MAX_IMAGE_SIZE, IMAGE_SUPPORTED_FORMATS_TEXTS } from "../../../constants";

// Actions
import { updateUser } from "../../../redux/actions";

const UpdateProfileImageCardComponent = ({ user, loading, error }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const update = ({ image }) => {
        dispatch(updateUser({ image }));
    }

    return (
        <div className="container-setting">
            <h3 className="mb-4 ff-special font-size-24 fw-bold">{t("Profile Picture")}</h3>
            <Card color="secondary">
                <CardBody>
                    <div className="d-md-flex align-items-center">
                        <picture className="me-md-5">
                            {user?.get('image') && <img src={'data:image/*;base64,' + user.get('image')} className={`rounded avatar-md`} alt="avatar" />}
                            {!user?.get('image') && <ProfileImageDefault className={`rounded avatar-md`} alt="avatar" />}
                        </picture>

                        <div className="mt-2 mt-md-0">
                            <Button className="mb-2" size="sm" onClick={() => setIsOpen(true)} > {t("Update Profile Picture")} </Button>
                            {/* <Button size="sm" onClick={() => dispatch(updateUser({ image: '' }))} color="outline-danger" className="mb-2 ms-2"> <i className="ri-delete-bin-6-line mx-1 fw-normal font-size-16"></i> </Button> */}
                            <p> {t("The format can be: _formats_, but cannot exceed _size_MB.", { size: MAX_IMAGE_SIZE/1024, formats: IMAGE_SUPPORTED_FORMATS_TEXTS })} </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <ModalUpdateImage 
                isOpen={isOpen} 
                setOpen={setIsOpen} 
                title={t("Update Profile Picture")} 
                image={user?.get('image')} 
                loading={loading} 
                update={update}
                error={error}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    const { user, loading, error } = selectAuth(state);

    return { user, loading, error };
};

export const UpdateProfileImageCard = connect(mapStateToProps, updateUser)(UpdateProfileImageCardComponent);