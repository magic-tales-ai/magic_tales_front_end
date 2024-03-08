import React, { useState } from 'react';
import { Button, Card, CardBody, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import Profile from './Profile';

//i18n
import { useTranslation } from 'react-i18next';

//images
import avatar2 from "../../assets/images/users/avatar-2.jpg";

const Index = (props) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const profiles = [
        {
            id: 0,
            name: 'Carlos',
            image: '',
            years: 8,
            description: "Smiles a lot, like magic, is strong"
        },
        {
            id: 1,
            name: 'Juan',
            image: avatar2,
            years: 6,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima sed neque commodi voluptas ad obcaecati?"
        },
    ]

    const cardNewProfile = <div className="border-light border rounded-3 filter-profile">
            <div className="justify-content-center align-items-center d-flex h-100 my-2">
                <Button color="primary" className="py-2 px-3"><i className="font-size-24 fw-normal text-white ri-add-line"></i></Button>
            </div>
        </div>

    return (
        <React.Fragment>
        <div className="w-100 overflow-hidden">
            <div className="p-3 p-lg-4">
                <Row>
                    <Col lg="12" className="d-flex align-items-center mb-0">
                        <Button color="outline-primary me-3 p-1" onClick={() => navigate('/dashboard')}>
                            <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                        </Button>
                        <h1 className="mb-0 ff-special font-size-24 fw-bold">{" "}{t("Reader Profiles")}</h1>
                    </Col>
                </Row>
            </div>

            <div className="p-3 p-lg-4 flex-wrap d-flex flex-column flex-lg-row-reverse justify-content-center reader-list-profile gap-3">
                {cardNewProfile}

                {profiles.map(profile => {
                    return (
                    <div className="border-light border rounded-3 filter-profile">
                        <Profile key={profile.id} profile={profile} />
                    </div>
                    )
                })
                }

            </div>


        </div>
        </React.Fragment>
    );
}

export default Index;