import React, { useEffect, useState, useCallback, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

// Actions
import { registerUser, createUserTryMode, apiError, fetchSystem } from '../../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Selectors
import { selectAuth } from '../../../redux/auth/selectors';
import { selectCurrentChatWebsocket } from '../../../redux/websocket/selectors';
import { selectLanguages } from '../../../redux/systems/selectors';

/**
 * Register component
 * @param {*} props 
 */
const RegisterForm = ({ currentChatWebsocket, tryModeId, error, loading, languages, navigate }) => {
    const dispatch = useDispatch();
    const [successRegister, setSuccessRegister] = useState(false)
    const { t } = useTranslation();
    const prevLoadingRef = useRef(loading); // Necessary because formik updates before the reducer switches to 'pending'
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const customNavigate = useCallback(({ e, to }) => {
        if (navigate) {
            e?.preventDefault();
            navigate(to)
        }
    }, [navigate])

    // validation
    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            name: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            language: languages.length > 0 ? languages[0].code : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Enter a valid email address').required('Required'),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
            language: Yup.string().required('Required')
        }),
        onSubmit: values => {
            dispatch(apiError(""));
            dispatch(registerUser({...values, tryModeId}));
        },
    });

    useEffect(() => {
        dispatch(fetchSystem('languages'));
    }, [dispatch])

    useEffect(() => {
        if (successRegister) {
            currentChatWebsocket?.close();
            dispatch(createUserTryMode());
            setTimeout(() => customNavigate({ to: 'validate-registration' }), 3000);
        }
    }, [successRegister, currentChatWebsocket, customNavigate, dispatch]);

    useEffect(() => {
        if (formik.isSubmitting && prevLoadingRef.current && !loading) {
            formik.setSubmitting(false);
            setSuccessRegister(!error);
        };
        prevLoadingRef.current = loading;
    }, [loading, error, formik]);

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Register')}</p>
                <Link to="/login" onClick={(e) => { customNavigate({ e, to: 'login' }) }} className="font-weight-medium text-decoration-underline mb-4 d-inline-block"> {t('Do you have an account?')} </Link>

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
                                {t('Register User Successfully')}
                            </Alert>
                        ) : null}

                        {formik.submitCount > 0 && error && !formik.isSubmitting && (
                            <Alert color="danger">
                                <div>{(error.detail && Array.isArray(error.detail) ? error.detail[0].msg : error.detail) || error}</div>
                            </Alert>
                        )}

                        <FormGroup className="mb-3">
                            <Label className="form-label">{t('Name')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Your Name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    invalid={formik.touched.name && formik.errors.name ? true : false}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <FormFeedback type="invalid">{formik.errors.name}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Label className="form-label">{t('Last Name')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Your Last Name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    invalid={formik.touched.lastName && formik.errors.lastName ? true : false}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <FormFeedback type="invalid">{formik.errors.lastName}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    invalid={formik.touched.password && formik.errors.password ? true : false}
                                />
                                <Button type="button" color="link py-0 px-2 text-body btn-eye" onClick={handleTogglePassword}><i className="ri-eye-line font-size-24 fw-normal"></i></Button>
                                {formik.touched.password && formik.errors.password ? (
                                    <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                ) : null}

                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                                <Label className="form-label">{t('Language')}</Label>
                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                    <Input
                                        type="select"
                                        id="language"
                                        name="language"
                                        className="form-control form-control-lg bg-soft-light border-light"
                                        placeholder="Language"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.language}
                                        invalid={formik.touched.language && formik.errors.language ? true : false}
                                    >
                                        {languages?.map(language => {
                                            return <option key={language.code} value={language.code}>
                                                {language.name}
                                            </option>
                                        })}
                                    </Input>
                                    {formik.touched.language && formik.errors.language ? (
                                        <FormFeedback type="invalid">{formik.errors.language}</FormFeedback>
                                    ) : null}
                                </InputGroup>
                            </FormGroup>

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className="waves-effect waves-light" type="submit" disabled={formik.isSubmitting || successRegister}>
                                {t('Register')}
                            </Button>
                        </div>

                    </Form>
                </div>

                <div className="text-center mt-2">
                    <Link to="login" onClick={(e) => { customNavigate({ e, to: 'login' }) }} className="font-size-13"> {t('Already have an account')}? {t('Signin')} </Link>
                </div>

                {formik.isSubmitting && <div className="d-flex justify-content-center mt-4"><div className="loader"></div></div>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { tryModeId, error, loading } = selectAuth(state);
    const { currentChatWebsocket } = selectCurrentChatWebsocket(state)
    const languages = selectLanguages(state);

    return { currentChatWebsocket, tryModeId, error, loading, languages };
};

export default connect(mapStateToProps, { registerUser, apiError, fetchSystem })(RegisterForm);