import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

//Import formik validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import actions and helpers
import { forgetPassword, apiError } from '../../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

/**
 * Forget Password component
 * @param {*} props 
 */
const ForgetPasswordForm = (props) => {

    const clearError = () => {
        props.apiError("");
    }

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    useEffect(clearError);

    // validation
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required')
        }),
        onSubmit: values => {
            props.forgetPassword(values.email);
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Navigate to="/" />;
    }

    const navigate = (e, to) => {
        if (props.navigate) {
            e.preventDefault();
            props.navigate(to)
        }
    }

    return (
        <div className="justify-content-center">
            <div className="text-center mb-4">
                <h4>{t('Reset Password')}</h4>
            </div>

            <div className="p-3">
                {
                    props.error && <Alert variant="danger">{props.error}</Alert>
                }
                {
                    props.passwordResetStatus ? <Alert variant="success" className="text-center mb-4">{props.passwordResetStatus}</Alert>
                        : <Alert variant="success" className="text-center mb-4">{t('Enter your Email and instructions will be sent to you')}!</Alert>
                }
                <Form onSubmit={formik.handleSubmit}>

                    <FormGroup className="mb-4">
                        <Label className="form-label">{t('Email')}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                className="form-control form-control-lg border-light bg-soft-light"
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

                    <div className="d-grid">
                        <Button color="primary" block className="waves-effect waves-light" type="submit">{t('Reset')}</Button>
                    </div>

                </Form>
            </div>

            <div className="mt-5 text-center">
                <p>{t('Remember It')} ? <Link to="login" onClick={(e) => { navigate(e, 'login') }} className="font-weight-medium"> {t('Signin')} </Link> </p>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const user = state.Auth.get('user');
    const loading = state.Auth.get('loading');
    const error = state.Auth.get('error');
    const passwordResetStatus = state.Auth.get('passwordResetStatus');

    return { user, loading, error, passwordResetStatus };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(ForgetPasswordForm);