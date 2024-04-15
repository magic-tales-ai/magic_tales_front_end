import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

//Import formik validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import actions and helpers
import { forgetPassword, apiError } from '../../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';
import { selectAuth } from '../../../redux/auth/selectors';

/**
 * Forget Password component
 * @param {*} props 
 */
const SendCodeForm = (props) => {
    const { loading, error } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [sending, setSending] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        dispatch(apiError(""));
    }, []);

    // validation
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required')
        }),
        onSubmit: values => {
            setSending(true);
            dispatch(forgetPassword(values.email));
        },
    });

    useEffect(() => {
        if (sending && !loading) {
            setSending(false)
            setSuccess(!error)
        };
    }, [loading]);

    useEffect(() => {
        if (success) {
            navigate({ to: 'change-password' });
        }
    }, [success]);

    const navigate = ({ e, to }) => {
        if (props.navigate) {
            e?.preventDefault();
            props.navigate(to)
        }
    }

    if (localStorage.getItem("authUser")) {
        return <Navigate to="/" />;
    }

    return (
        <div className="justify-content-center">
            <div className="px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Password Recovery')}</p>
                <p className="font-weight-medium mb-4 d-inline-block">{t('Enter your Email and we will send you a code!')}</p>

                <Form onSubmit={formik.handleSubmit}>

                    {error && error ? (
                        <Alert color="danger">
                            <div>{error}</div>
                        </Alert>
                    ) : null}

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
                        <Button color="secondary" size="lg" block className="waves-effect waves-light" type="submit">{t('Send Code')}</Button>
                    </div>

                </Form>

                <div className="mt-2 text-center">
                    <p>{t('Remember It')}? <Link to="login" onClick={(e) => { navigate({ e, to: 'login' }) }} className="font-weight-medium"> {t('Signin')} </Link> </p>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const { loading, error } = selectAuth(state);

    return { loading, error };
};

export default connect(mapStateToProps, { forgetPassword, apiError })(SendCodeForm);