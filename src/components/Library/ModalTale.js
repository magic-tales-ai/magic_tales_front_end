import React, { useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";

//i18n
import { useTranslation } from 'react-i18next';

//image default
import avatar1 from "../../assets/images/users/user-avatar.png";

//icon
import iconFile from "../../assets/images/icons/file-plus.svg";

export const ModalTale = (props) => {
    const { t } = useTranslation();
    const {
        isOpen,
        setOpen,
        tale: { id, name, image, description, profile, characters = [], genres = [] }
    } = props;

    const toggle = () => {
        setOpen(!isOpen)
    }

    const getCharactersNames = () => {
        const charactersNames = characters.map(c => c.name);
        return charactersNames.join(', ')
    }

    const getGenresNames = () => {
        const genresNames = genres.map(g => g.name);
        return genresNames.join(', ')
    }

    return (
        <Modal isOpen={isOpen} centered toggle={toggle} size="lg">
            <ModalHeader toggle={toggle} className="border-0 pb-0"></ModalHeader>
            <ModalBody className="pt-0">
                <div className="d-lg-flex">
                    <div className="me-3">
                        <div className="mb-3 text-center text-lg-start">
                            <img src={image} className="rounded avatar-lg h-auto" alt="tale" />
                        </div>
                        <div className="d-none d-lg-block">
                            <Button color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><i className="ri-share-box-fill me-2 fw-normal font-size-20"></i>{t('Open chat')}</Button>
                            <Button color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><i className="ri-download-2-line me-2 fw-normal font-size-20"></i>{t('Download')}</Button>
                            <Button color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><span className="custom-icon me-2 font-size-20"><img src={iconFile} alt="icon file"/></span>{t('Create spin - off')}</Button>
                            <Button color="outline-danger" className="d-flex align-items-center w-100 text-start font-size-16"><i className="ri-delete-bin-6-line me-2 fw-normal font-size-20"></i>{t('Delete')}</Button>
                        </div>
                    </div>
                    <div>
                        <div id="title" className="mb-4">
                            <h6 className="fw-normal opacity-75 mb-3"> {t('Title Tale')} </h6>
                            <h5 className="border-light border py-2 px-3 rounded-3 ff-special fw-normal font-size-20"> {name} </h5>
                        </div>

                        <div id="reader-profile" className="mb-4">
                            <h6 className="fw-normal opacity-75 mb-3"> {t('Reader Profile')} </h6>
                            <div className="d-flex align-items-center border-light border p-2 rounded-3">
                                <div className="avatar-xs me-3">
                                    <picture>
                                        <source srcSet={profile.image} className="rounded img-fluid" />
                                        <img src={avatar1} className="rounded img-fluid" alt="avatar" />
                                    </picture>
                                </div>
                                <div>
                                    <p className="mb-0 text-body"> {profile.name} </p>
                                    <span> {profile.years + ' ' + t('years')} </span>
                                </div>
                            </div>
                        </div>

                        <div id="tale-summary" className="mb-4">
                            <h6 className="fw-normal opacity-75 mb-3"> {t('Tale Summary')} </h6>
                            <div className="border-light border p-2 rounded-3">
                                <p className="text-uppercase text-body mb-1">{t('Storyline')}</p>
                                <p className="font-size-12">{description}</p>
                                <hr />
                                <p className="text-uppercase text-body mb-1">{t('Characters')}</p>
                                <p className="font-size-12">{getCharactersNames()}</p>
                                <hr />
                                <p className="text-uppercase text-body mb-1">{t('Type Story')}</p>
                                <p className="font-size-12">{getGenresNames()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-lg-none">
                        <Button color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><i className="ri-share-box-fill me-2 fw-normal font-size-20"></i>{t('Open chat')}</Button>
                        <Button color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><i className="ri-download-2-line me-2 fw-normal font-size-20"></i>{t('Download')}</Button>
                        <Button color="primary" className="d-flex align-items-center mb-2 w-100 text-start font-size-16"><span className="custom-icon me-2 font-size-20"><img src={iconFile} alt="icon file"/></span>{t('Create spin - off')}</Button>
                        <Button color="outline-danger" className="d-flex align-items-center w-100 text-start font-size-16"><i className="ri-delete-bin-6-line me-2 fw-normal font-size-20"></i>{t('Delete')}</Button>
                    </div>
                </div>

            </ModalBody>

        </Modal >
    )
}