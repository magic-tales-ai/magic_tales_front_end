import React, { useEffect, useCallback, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withRouter from "../../../withRouter";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

// Actions
import { velidateNewUserEmail, apiError } from '../../../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Selectors
import { selectUser } from '../../../../redux/user/selectors';

/**
 * Validate Change Email component
 * @param {*} props 
 */
const ValidateEmailComponent = ({ error, loading, user, ...props }) => {
    const { nextStep } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [successUpdated, setSuccessUpdated] = useState(false)

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            validationCode: "",
        },
        validationSchema: Yup.object({
            validationCode: Yup.number().required('Required'),
        }),
        onSubmit: (values, actions) => {
            dispatch(apiError(""));
            dispatch(velidateNewUserEmail(values));
        },
    });

    useEffect(() => {
        if (formik.isSubmitting && !loading) {
            formik.setSubmitting(false);
            setSuccessUpdated(!error);
        };
    }, [loading]);

    useEffect(() => {
        if (successUpdated) {
            setTimeout(() => {
                nextStep();
            }, 3000)
        }
    }, [successUpdated])

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Validation')}</p>
                <p> {t('Check your current email address')} </p>

                <div className="text-start">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >

                        {formik.submitCount > 0 && !loading && !error && (
                            <Alert color="success">
                                {t('Email Successfully Updated')}
                            </Alert>
                        )}

                        {formik.submitCount > 0 && error && !formik.isSubmitting && (
                            <Alert color="danger">
                                <div>{(error.detail && Array.isArray(error.detail) ? error.detail[0].msg : error.detail) || error}</div>
                            </Alert>
                        )}

                        <FormGroup>
                            <Label className="form-label">{t('Code')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="text"
                                    id="validationCode"
                                    name="validationCode"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Code"
                                    onChange={(e) => {
                                        const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                        formik.setFieldValue('validationCode', onlyNumbers);
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.validationCode}
                                    invalid={formik.touched.validationCode && formik.errors.validationCode ? true : false}
                                />
                                {formik.touched.validationCode && formik.errors.validationCode ? (
                                    <FormFeedback type="invalid">{formik.errors.validationCode}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className=" waves-effect waves-light" type="submit" disabled={formik.isSubmitting || successUpdated}>
                                {t('Validate')}
                            </Button>
                        </div>

                        {formik.isSubmitting && <div className="d-flex justify-content-center mt-4"><div className="loader"></div></div>}
                    </Form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { error, loading, user } = selectUser(state);
    return { error, loading, user };
};

export const ValidateEmail = connect(mapStateToProps, { velidateNewUserEmail, apiError })(ValidateEmailComponent);