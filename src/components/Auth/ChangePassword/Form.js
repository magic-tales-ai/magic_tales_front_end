import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Actions
import { changePassword, apiError } from '../../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Selectors
import { selectAuth } from '../../../redux/auth/selectors';

/**
 * Change Password component
 * @param {*} props 
 */
const ChangePasswordForm = (props) => {
    const { loading, error, currentEmailField } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [chanding, setChanging] = useState(false)
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatedPassword, setRepeatedPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleRepeatedPassword = () => {
        setRepeatedPassword(!showRepeatedPassword);
    };

    useEffect(() => {
        dispatch(apiError(""));
    }, []);

    // validation
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            repeatedNewPassword: "",
            validationCode: null
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required('Required'),
            repeatedNewPassword: Yup.string()
                .test('passwordsMatch', 'Passwords must match', function(value){
                    return this.parent.newPassword === value;
                }).required('Required'),
            validationCode: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            setChanging(true);
            dispatch(changePassword({ ...values, email: currentEmailField }));
        },
    });

    useEffect(() => {
        if (chanding && !loading) {
            setChanging(false)
            setSuccess(!error)
        };
    }, [loading]);

    useEffect(() => {
        if (success) {
            navigate({ to: 'login' });
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
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Change Password')}</p>

                <Form onSubmit={formik.handleSubmit}>

                    {error && error ? (
                        <Alert color="danger">
                            <div>{error.length ? error[0]?.msg || '' : error}</div>
                        </Alert>
                    ) : null}

                    <FormGroup className="mb-4">
                        <Label className="form-label">{t('New Password')}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                id="newPassword"
                                name="newPassword"
                                className="form-control form-control-lg border-light bg-soft-light"
                                placeholder="Enter New Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                                invalid={formik.touched.newPassword && formik.errors.newPassword ? true : false}
                            />
                            <Button type="button" color="link py-0 px-2 text-body btn-eye" onClick={handleTogglePassword}><i className="ri-eye-line font-size-24 fw-normal"></i></Button>
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <FormFeedback type="invalid">{formik.errors.newPassword}</FormFeedback>
                            ) : null}
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label className="form-label">{t('Repeat the New Password')}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <Input
                                type={showRepeatedPassword ? 'text' : 'password'}
                                id="repeatedNewPassword"
                                name="repeatedNewPassword"
                                className="form-control form-control-lg border-light bg-soft-light"
                                placeholder="Enter New Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.repeatedNewPassword}
                                invalid={formik.touched.repeatedNewPassword && formik.errors.repeatedNewPassword ? true : false}
                            />
                            <Button type="button" color="link py-0 px-2 text-body btn-eye" onClick={handleToggleRepeatedPassword}><i className="ri-eye-line font-size-24 fw-normal"></i></Button>
                            {formik.touched.repeatedNewPassword && formik.errors.repeatedNewPassword ? (
                                <FormFeedback type="invalid">{formik.errors.repeatedNewPassword}</FormFeedback>
                            ) : null}
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className="mb-4">
                        <Label className="form-label">{t('Code')}</Label>
                        <InputGroup className="mb-3 bg-soft-light rounded-3">
                            <Input
                                type="text"
                                id="validationCode"
                                name="validationCode"
                                className="form-control form-control-lg border-light bg-soft-light"
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

                    <div className="d-grid">
                        <Button color="secondary" size="lg" block className="waves-effect waves-light" type="submit">{t('Change Password')}</Button>
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
    const { loading, error, currentEmailField } = selectAuth(state);

    return { loading, error, currentEmailField };
}

export default connect(mapStateToProps, { changePassword, apiError })(ChangePasswordForm);