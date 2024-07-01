import React from 'react';
import { Card, Badge, Button } from "reactstrap";

//i18n
import { useTranslation } from 'react-i18next';

const Plan = (props) => {
    const { t } = useTranslation()
    const { plan, pay = 'monthly', currentPlan } = props
    const annualPrice = plan.get('price') * 12 * (plan.get('discountPerYear') / 100)

    return (
        <Card className="text-start mb-5 mb-lg-0">
            <h3 className="mb-3">{plan.get('name')}{plan.get('isPopular') &&
                <Badge
                    className="ms-2 align-middle text-uppercase"
                    color="amarillo"
                    pill>
                    {t('POPULAR')}
                </Badge>
            }
            </h3>
            <picture><img src={'data:image/*;base64,' + plan.get('image')} className="img-fluid w-100 mb-3" /></picture> 

            {pay === 'monthly' ?
                <p className="price"> {plan.get('price')} $ {plan.get('price') > 0 && <span className="h5"> {'/ ' + t('month')} </span>} </p>
                :
                <p className="price"> {annualPrice} $ </p>
            }

            <ul className="list-unstyled">
                {plan?.get('description')?.messages?.map((c, i) => {
                    return (
                        <li key={`plan-${plan.get('id')}-item-${i}`}>
                            {c}
                        </li>
                    )
                })}
            </ul>
            <div className="mt-auto">
                {plan.get('saveUpMessage') && <p>{plan.get('saveUpMessage')}</p>}
                <Button color="outline-secondary" className="w-100" type="button" disabled={!plan.get('enabled') || currentPlan}>
                    {currentPlan 
                        ? <> {t("Your current plan")} </>
                        : <> {plan.get('enabled') 
                            ? plan.get('price') === 0 
                                ? t("Try for free")
                                : t("Get Started")
                            : t("Soon")}
                        </>
                    }
                    
                    <i className="ri-arrow-right-line fw-normal align-middle"></i>
                </Button>
            </div>
        </Card>
    );
}

export default Plan;