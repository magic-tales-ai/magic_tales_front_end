import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import withRouter from '../components/withRouter';

// i18n
import { useTranslation } from 'react-i18next';

// Components
import { UpdateProfileImageCard } from '../components/User/Settings/Cards/UpdateProfileImageCard';
import { ProfileSettingsCard } from '../components/User/Settings/Cards/ProfileSettingsCard';
import { UpdateContactCard } from '../components/User/Settings/Cards/UpdateContactCard';
import { SecurityCard }  from '../components/User/Settings/Cards/SecurityCard';

/**
 * Settings component
 * @param {*} props 
 */
const Settings = (props) => {
    const { router: { navigate } } = props;
    const { t } = useTranslation();

    return (
        <div className="w-100">
            <div className="p-3 p-lg-4">
                <Row>
                    <Col lg="12" className="d-flex align-items-center mb-0">
                        <Button color="outline-primary me-3 p-1" onClick={() => navigate('/dashboard')}>
                            <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                        </Button>

                        <h1 className="mb-0 ff-special font-size-24 fw-bold">{t("Settings")}</h1>
                    </Col>
                </Row>

                <div className="vh-100 d-flex w-100 justify-content-center">
					<div className="d-grid container py-5 text-center text-md-start justify-content-center">
                        <section>
                            <UpdateProfileImageCard />
                        </section>

                        <section className="pt-4">
                            <ProfileSettingsCard />
                        </section>

                        <section className="pt-4">
                            <UpdateContactCard />
                        </section>

                        <section className="pt-4">
                            <SecurityCard />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {  };
};

export default withRouter(connect(mapStateToProps)(Settings));