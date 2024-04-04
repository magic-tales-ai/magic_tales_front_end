import React, { useState, useEffect } from 'react';
import { Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// Import action
import { loadPlansList } from '../../redux/actions';

// Selector
import { selectPlans } from '../../redux/plans-list/selectors';

// Components
import Plan from "./Plan";

// i18n
import { useTranslation } from 'react-i18next';

export const PlansList = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [state, setState] = useState(true);
    const [pay, setPay] = useState('monthly');

    const plans = useSelector(selectPlans)

    const changePlan = () => {
        pay === 'monthly' ? setPay('yearly') : setPay('monthly');
        setState(!state);
    }

    useEffect(() => {
        dispatch(loadPlansList())
    }, [])

    return (
        <div className="vh-100 w-100 align-items-center justify-content-center planes-box bg-black">
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

            <div className="d-sm-flex justify-content-center planes-cards gap-3 pb-5">
            {plans?.list?.map((p, i) => {
                return (
                    <React.Fragment key={`plan-${p.get('id')}`}>
                        <Plan plan={p} pay={pay} />
                    </React.Fragment>
                )
            })}
            </div>
        </div>
    );
}