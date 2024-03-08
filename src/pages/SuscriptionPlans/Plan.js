import React from 'react';
import { Card, CardBody, Badge, Button } from "reactstrap";

//i18n
import { useTranslation } from 'react-i18next';

const Plan = (props) => {
    const { t } = useTranslation()
    const { plan, pay = 'monthly' } = props
    const annualPrice = plan.price * 12 * (plan.discount_per_year / 100)

    return (
        <React.Fragment>
            <Card className="text-start mb-5 mb-lg-0">
                <h3 className="mb-3">{plan.name}{plan.is_popular &&
                        <Badge
                            className="ms-2 align-middle text-uppercase"
                            color="amarillo"
                            pill>
                                {t('POPULAR')}
                        </Badge>
                    }
                </h3>
                <picture><img src={plan.image} className="img-fluid w-100 mb-3"/></picture>

                {pay === 'monthly' ?
                    <p className="price"> {plan.price} $ {plan.price > 0 && <span className="h5"> {'/ ' + t('month')} </span>} </p>
                    :
                    <p className="price"> {annualPrice} $ </p>
                }

                <ul className="list-unstyled">
                    {plan?.description?.messages?.map((c, i) => {
                        return (
                            <li key={`plan-${plan.id}-item-${i}`}>
                                {c}
                            </li>
                        )
                    })}
                </ul>
                <div className="mt-auto">
                    {plan.save_up_message && <p>{plan.save_up_message}</p>}
                    <Button color="outline-secondary" className="w-100" type="button">
                        {plan.price === 0 ? "Try for free" : "Get Stated"} <i className="ri-arrow-right-line fw-normal align-middle"></i>
                    </Button>
                </div>
            </Card>
        </React.Fragment>
    );
}

export default Plan;