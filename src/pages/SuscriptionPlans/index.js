import React, { useState, useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

//Import action
import { loadPlansList } from '../../redux/actions';

import Plan from "./Plan";

//i18n
import { useTranslation } from 'react-i18next';

const Index = ({plans, loading, error}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [state, setState] = useState(true);
    const [pay, setPay] = useState('monthly');

    const changePlan = () => {
        pay==='monthly' ? setPay('yearly') : setPay('monthly');
        setState(!state);
    }

    useEffect(() => {
        dispatch(loadPlansList())
    }, [])

    const planes = [
        {
            id: 1,
            code: 'FREE',
            name: 'Free Plan',
            isPopular: false,
            limitedStoriesForMonth: true,
            maxStoriesForMonth: 3,
            levelCustomization: 0,
            levelVoiceSynthesis: 0,
            hasPriorityCustomerSupport: false,
            price: 0,
            discountPerYear: 0,
            characteristics: [
                "Access to a limited number of stories per month (let's say 3)",
                "Limited customization."
            ],
            image: 'plan-img-1.png',
            saveUp: '',
        },
        {
            id: 2,
            code: 'STORYCRAFT',
            name: 'StoryCraft Plan',
            isPopular: false,
            limitedStoriesForMonth: true,
            maxStoriesForMonth: 5,
            levelCustomization: 1,
            levelVoiceSynthesis: 1,
            hasPriorityCustomerSupport: false,
            price: 4.99,
            discountPerYear: 50,
            characteristics: [
                "Access to a limited number of stories per month (let's say 5)",
                "Basic voice synthesis options",
                "Limited customization."
            ],
            image: 'plan-img-2.png',
            saveUp: 'Save up to 50% by paying yearly',
        },
        {
            id: 3,
            code: 'STORYCRAFT_PLUS',
            name: 'StoryCraft Plus',
            isPopular: true,
            limitedStoriesForMonth: true,
            maxStoriesForMonth: 15,
            levelCustomization: 2,
            levelVoiceSynthesis: 2,
            hasPriorityCustomerSupport: false,
            price: 9.99,
            discountPerYear: 50,
            characteristics: [
                "More stories (up to 15 per month)",
                "More customization options",
                "Premium voice synthesis."
            ],
            image: 'plan-img-3.png',
            saveUp: 'Save up to 50% by paying yearly',
        },
        {
            id: 4,
            code: 'STORYCRAFT_PRO', //no es necesario
            name: 'StoryCraft Pro',
            isPopular: false, //falta
            limitedStoriesForMonth: false, //no va
            maxStoriesForMonth: 0,
            levelCustomization: 3, //no va
            levelVoiceSynthesis: 3, //no va
            hasPriorityCustomerSupport: true, //no va
            price: 19.99,
            discountPerYear: 50, //falta
            characteristics: [
                "Unlimited stories",
                "Full customization",
                "Access to premium voice synthesis",
                "Priority customer support."
            ],
            image: 'plan-img-4.png',
            saveUp: 'Save up to 50% by paying yearly', //falta
        },
    ]

    return (
        <div className="w-100 overflow-hidden bg-black">
            <div className="justify-content-center text-center my-4 p-5">
                <div className="mb-4">
                    <h1 className="ff-special fw-normal mb-4">{t('Choose Your Ideal Plan')}</h1>
                    <p className="font-size-16">{t('Flexibility and Value: Our subscription plans have it all.')}</p>
                </div>

                <div className="swithces">
                    <div className="form-check form-switch mx-auto">
                      <Input type="switch" checked={!state} onClick={changePlan} role="switch" className="form-check-input mt-0" id="pay"/>
                      <Label check className="form-check-label" for="pay"><span>{t('Pay monthly')}</span> <span>{t('Pay yearly')}</span></Label>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center planes-cards gap-3 pb-5">
            {plans.map((p, i) => {
                return (
                    <React.Fragment key={`plan-${p.id}`}>
                        <Plan plan={p} pay={pay} />
                    </React.Fragment>
                )
            })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { list, loading, error } = state.PlansList;
    return { plans: list, loading, error };
};

export default connect(mapStateToProps, {})(Index);