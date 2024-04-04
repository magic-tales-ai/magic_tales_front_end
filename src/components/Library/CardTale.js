import React, { useState } from 'react';
import { Card, CardBody, Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { ModalConfirmDelete } from '../Common/Modals/ModalConfirmDelete';
import { ModalTale } from './ModalTale';

// Actions
import { setActiveChat } from '../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Images default
import avatar1 from "../../assets/images/users/avatar-tales-big.png";
import avatar from "../../assets/images/users/avatar-tales-big.png";
import avatarDefault from "../../assets/images/users/user-avatar.png";

const CardTale = (props) => {
    const { id, name, image, description, profile } = props
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openModalTale, setOpenModalTale] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dropdownOpen, setdropdownOpen] = useState();
    const [dropdownOpenMobile, setDropdownOpenMobile] = useState();

    const toggle = () => {
        setdropdownOpen(!dropdownOpen)
    }

    const goToNewTale = () => {
        dispatch(setActiveChat('new'))
        navigate('/dashboard')
    }

    const profileInfo = <div className="d-flex">
        <div className="chat-user-emoji bg-primary rounded p-1 text-dark me-2 d-flex align-items-center justify-content-center">
            <picture>
                <source srcSet={avatarDefault} className="rounded avatar-xs" />
                <img src={avatarDefault} className="rounded avatar-xs" alt="avatar" />
            </picture>
        </div>
        <div>
            <p className="mb-0 fw-bold font-size-12">{profile.name}</p>
            <p className="mb-0 font-size-12 opacity-75">{profile.years + ' ' + t('years')}</p>
        </div>
    </div>

    return (
        <React.Fragment>
            <Card color="secondary" className="card-library cursor-pointer" onClick={() => setOpenModalTale(true) } >
                <CardBody>
                    <div className="d-flex">
                        <picture>
                            <source srcSet={avatar1} className="rounded avatar-md" />
                            <img src={avatar1} className="rounded avatar-md me-2 h-auto" alt={name}  />
                        </picture>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="font-size-14 mb-0 opacity-75">{name}</h2>
                                <div className="d-inline-block" onClick={(e) => { e.stopPropagation(); }}>
                                    <div className="flex-lg-column">
                                        <Nav className="side-menu-nav d-block">
                                            <Dropdown nav isOpen={dropdownOpen} toggle={toggle} className="nav-item d-block btn-group dropup profile-user-dropdown">
                                                <DropdownToggle tag="a" className="text-center">
                                                    <i className="ri-more-2-fill font-size-24"></i>
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem onClick={() => goToNewTale() }> {t('Create spin - off')} </DropdownItem>
                                                    <DropdownItem divider className="my-1" />
                                                    <DropdownItem> {t('Download')} </DropdownItem>
                                                    <DropdownItem divider className="my-1" />
                                                    <DropdownItem className="text-danger" > <div onClick={() => setOpenModalDelete(true)}> {t('Delete')} </div>  </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Nav>
                                    </div>
                                </div>
                            </div>
                            <p className="font-size-10 opacity-75">{description}</p>
                            {profileInfo}
                        </div>
                    </div>
                </CardBody>
            </Card>

            <ModalConfirmDelete isOpen={openModalDelete} setOpen={setOpenModalDelete} callback={() => { setOpenModalDelete(false) }} title={'Are you sure you want to delete?'} >
                <div>
                    <p className="text-center">{t('By deleteing the story, You do not delete the reader profile.')}</p>

                    <Card color="secondary" className="card-library mx-auto my-4">
                        <CardBody>
                            <div className="d-flex">
                                <picture>
                                    <source srcSet={avatar1} className="rounded avatar-md" />
                                    <img src={avatar1} className="rounded avatar-md me-2 h-auto" alt={name} />
                                </picture>
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2 className="font-size-14 mb-0 opacity-75">{name}</h2>
                                    </div>
                                    <p className="font-size-10 opacity-75">{description}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </ModalConfirmDelete>

            <ModalTale isOpen={openModalTale} setOpen={setOpenModalTale} tale={props} >

            </ModalTale>

        </React.Fragment>
    );
}

export default connect(null, { setActiveChat })(CardTale);