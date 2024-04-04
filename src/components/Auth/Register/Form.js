import React, { useEffect, useCallback, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import withRouter from "../../../components/withRouter";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

//Import action
import { registerUser, apiError } from '../../../redux/actions';

//i18n
import { useTranslation } from 'react-i18next';

import { createSelector } from 'reselect';

/**
 * Register component
 * @param {*} props 
 */
const RegisterForm = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [successRegister, setSuccessRegister] = useState(false)
    const [registering, setRegistering] = useState(false)
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    // validation
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Enter proper email').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: values => {
            setRegistering(true)
            dispatch(registerUser(values));
        },
    });

    const selectAccount = createSelector(
        (state) => state.Auth,
        (account) => ({
            user: account.get('user'),
            loading: account.get('loading'),
            error: account.get('error'),
        })
    );

    const { user, error, loading } = useSelector(selectAccount);

    const clearError = useCallback(() => {
        dispatch(apiError(""));
    }, [dispatch])

    useEffect(() => {
        clearError();
    }, [clearError])

    useEffect(() => {
        if (successRegister) {
            setTimeout(() => props.navigate("login"), 3000);
        }
    }, [successRegister]);

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    useEffect(() => {
        if(registering && !loading) {
            setRegistering(false)
            setSuccessRegister(!error)
        };
    }, [loading]);

    const customNavigate = (e, to) => {
        if (props.navigate) {
            e?.preventDefault();
            props.navigate(to)
        }
    }

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Register')}</p>
                <Link to="/login" onClick={(e) => { customNavigate(e, 'login') }} className="font-weight-medium text-decoration-underline mb-4 d-inline-block"> {t('Do you have an account?')} </Link>

                <div className="text-start">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                            // return false;
                        }}
                    >
                        {successRegister ? (
                            <Alert color="success">
                                Register User Successfully
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
                            <Label className="form-label">{t('Username')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    invalid={formik.touched.username && formik.errors.username ? true : false}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <FormFeedback type="invalid">{formik.errors.username}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <Label className="form-label">{t('Password')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    invalid={formik.touched.password && formik.errors.password ? true : false}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                ) : null}

                            </InputGroup>
                        </FormGroup>


                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className=" waves-effect waves-light" type="submit">
                                Register</Button>
                        </div>

                    </Form>
                </div>

                <div className="text-center mt-2">
                    <Link to="login" onClick={(e) => { customNavigate(e, 'login') }} className="font-size-13"> {t('Already have an account')}? {t('Signin')} </Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(connect(null, { registerUser, apiError })(RegisterForm));