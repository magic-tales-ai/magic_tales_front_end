import React, { useEffect, useCallback, useState } from 'react';
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
const ValidateRegistrationForm = ({ user, error, loading, navigate }) => {
    const dispatch = useDispatch();
    const [successValidation, setSuccessValidation] = useState(false)
    const [validating, setValidating] = useState(false)
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    // validation
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            email: '',
            validationCode : '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required'),
            validationCode: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            setValidating(true)
            dispatch(validateRegister(values));
        },
    });

    const clearError = useCallback(() => {
        dispatch(apiError(""));
    }, [dispatch])

    useEffect(() => {
        clearError();
    }, [clearError])

    useEffect(() => {
        if (successValidation) {
            setTimeout(() => customNavigate({ to: 'login' }), 3000);
        }
    }, [successValidation]);

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if (validating && !loading) {
            setValidating(false)
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
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Verification')}</p>
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

                        {error && error ? (
                            <Alert color="danger">
                                <div>{error}</div>
                            </Alert>
                        ) : null}

                        <FormGroup>
                            <Label className="form-label">{t('Email')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="text"
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.validationCode}
                                    invalid={formik.touched.validationCode && formik.errors.validationCode ? true : false}
                                />
                                {formik.touched.validationCode && formik.errors.validationCode ? (
                                    <FormFeedback type="invalid">{formik.errors.validationCode}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

                        { formik.values.email && !formik.errors.email &&
                            <Link to="#" onClick={() => { dispatch(resendVerificationCode({ email: formik.values.email })) }} className="font-weight-medium text-decoration-underline mb-4 d-inline-block"> {t('Resend verification code')} </Link>
                        }

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className=" waves-effect waves-light" type="submit">
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
    const { user, error, loading } = selectAuth(state);

    return { user, error, loading };
};

export default connect(mapStateToProps, { validateRegister, apiError })(ValidateRegistrationForm);