import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import withRouter from "../../withRouter";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

// Actions
import { validateRegister, resendVerificationCode, apiError } from '../../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Selectors
import { selectAuth } from '../../../redux/auth/selectors';

/**
 * Validate Registration component
 * @param {*} props 
 */
const ValidateRegistrationForm = ({ error, loading, currentEmailField, navigate }) => {
    const dispatch = useDispatch();
    const [successValidation, setSuccessValidation] = useState(false);
    const currentEmail = useRef(currentEmailField)
    const { t } = useTranslation();

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            email: currentEmail.current || '',
            validationCode: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required'),
            validationCode: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            dispatch(apiError(""));
            dispatch(validateRegister(values));
        },
        handleReset: e => {
            console.log(e);
            e.preventDefault();
        }
    });

    useEffect(() => {
        if (successValidation) {
            setTimeout(() => customNavigate({ to: 'login' }), 3000);
        }
    }, [successValidation]);

    useEffect(() => {
        if (formik.isSubmitting && !loading) {
            formik.setSubmitting(false);
            setSuccessValidation(!error)
        };
    }, [loading]);

    const customNavigate = ({ e, to }) => {
        if (navigate) {
            e?.preventDefault();
            navigate(to)
        }
    }

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Validation')}</p>
                <div className="text-start">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            // return false;
                        }}
                    >
                        {successValidation ? (
                            <Alert color="success">
                                {t('Validation Successfully')}
                            </Alert>
                        ) : null}

                        {formik.submitCount > 0 && error && (
                            <Alert color="danger">
                                <div>{(error.detail && Array.isArray(error.detail) ? error.detail[0].msg : error.detail) || error}</div>
                            </Alert>
                        )}

                        <FormGroup>
                            <Label className="form-label">{t('Email')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    invalid={formik.touched.email && formik.errors.email ? true : false}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

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

                        {(formik.values.email && !formik.errors.email)
                            ? <Link to="#" onClick={() => { dispatch(resendVerificationCode({ email: formik.values.email })) }} className="pb-2 font-weight-medium text-decoration-underline d-inline-block"> {t('Resend Code')} </Link>
                            : <span className="pb-2 d-inline-block"> {t('Resend Code')} </span>
                        }

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className="waves-effect waves-light" type="submit" disabled={formik.isSubmitting}>
                                {t('Validate')}
                            </Button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { error, loading, currentEmailField } = selectAuth(state);

    return { error, loading, currentEmailField };
};

export default connect(mapStateToProps, { validateRegister, apiError })(ValidateRegistrationForm);