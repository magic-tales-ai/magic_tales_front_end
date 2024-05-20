import React, { useState, useEffect } from 'react';
import { Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

// Import action
import { loadPlansList } from '../../redux/actions';

// Selector
import { selectPlans } from '../../redux/plans-list/selectors';
import { selectUser } from '../../redux/user/selectors';

// Components
import Plan from "./Plan";

// i18n
import { useTranslation } from 'react-i18next';

const PlansListComponent = (props) => {
    const { plans, user } = props;
    const { t } = useTranslation()
    const [state, setState] = useState(true);
    const [pay, setPay] = useState('monthly');

    const changePlan = () => {
        pay === 'monthly' ? setPay('yearly') : setPay('monthly');
        setState(!state);
    }

    useEffect(() => {
        props.loadPlansList()
    }, [])

    return (
        <div id="plansList" className="w-100 d-flex flex-column align-items-center justify-content-center planes-box bg-black">
            <div className="container py-5 text-center">
                <div className="title-plan mx-auto mb-4">
                    <h1 className="ff-special fw-normal mb-4">{t('Choose Your Ideal Plan')}</h1>
                    <p className="opacity-75 font-size-16">{t('Flexibility and Value: Our subscription plans have it all.')}</p>
                </div>

                <div className="swithces">
                    <div className="form-check form-switch mx-auto">
                      <Input type="switch" checked={!state} onClick={changePlan} role="switch" className="form-check-input mt-0" id="pay"/>
                      <Label check className="form-check-label" for="pay"><span>{t('Pay monthly')}</span> <span>{t('Pay yearly')}</span></Label>
                    </div>
                </div>
            </div>

            <div className="d-sm-flex justify-content-center planes-cards gap-3">
            {plans?.list?.map((p, i) => {
                return (
                    <React.Fragment key={`plan-${p.get('id')}`}>
                        <Plan plan={p} pay={pay} currentPlan={user && p.get('id') === user.get('plan').get('id')} />
                    </React.Fragment>
                )
            })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const plans = selectPlans(state);
    const { user } = selectUser(state);

    return { plans, user };
};

export const PlansList = connect(mapStateToProps, { loadPlansList })(PlansListComponent);