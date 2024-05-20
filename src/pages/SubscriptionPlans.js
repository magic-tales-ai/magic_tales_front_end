import React from 'react';
import { Button, Row, Col } from 'reactstrap';

// i18n
import { useTranslation } from 'react-i18next';

// Components
import { PlansList } from '../components/SubscriptionPlans/PlansList';
import withRouter from "../components/withRouter";

const SubscriptionPlans = (props) => {
    const { t } = useTranslation()
    const { router: { navigate } } = props;

    return (
        <React.Fragment>
            <div className="vh-100 vw-100 w-100 bg-black">
                <div className="p-3 pb-0 p-lg-4 pb-lg-0">
                    <Row>
                        <Col lg="12" className="d-flex align-items-center mb-0">
                            <Button color="outline-primary me-3 p-1" onClick={() => navigate('/dashboard')}>
                                <i className="ri-arrow-left-line font-size-24 fw-normal mx-2"></i>
                            </Button>
                            <h1 className="mb-0 ff-special font-size-24 fw-bold">{" "}{t("Plans")}</h1>
                        </Col>
                    </Row>
                </div>

                <PlansList />
            </div>
        </React.Fragment>
    );
}

export default withRouter(SubscriptionPlans);