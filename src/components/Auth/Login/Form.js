import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, FormGroup, Alert, Form, Input, Button, FormFeedback, InputGroup } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import withRouter from "../../../components/withRouter";
import { useFormik } from 'formik';
import * as Yup from 'yup';

//i18n
import { useTranslation } from 'react-i18next';

//redux store
import { loginUser, apiError } from '../../../redux/actions';

/**
 * Login component
 * @param {*} props 
 */
const LoginForm = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };

    const clearError = useCallback(() => {
        dispatch(apiError(""));
    }, [dispatch])

    useEffect(() => {
        clearError();
    }, [clearError])

    // validation
    const formik = useFormik({
        initialValues: {
            user: '',
            password: ''
        },
        validationSchema: Yup.object({
            user: Yup.string().required('Please Enter Your Username Or Email'),
            password: Yup.string().required('Please Enter Your Password')
        }),
        onSubmit: values => {
            props.loginUser(values.user, values.password, props.router.navigate);
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Navigate to="/" />;
    }

    const navigate = (e, to) => {
        if(props.navigate) {
            e.preventDefault();
            props.navigate(to)
        }
    }

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Login')}</p>
                <Link to="/register" onClick={(e) => { navigate(e, 'register') }} className="font-weight-medium text-decoration-underline mb-4 d-inline-block"> {t('Do you have an account?')} </Link>
                {
                    props.error && <Alert color="danger">{props.error}</Alert>
                }
                <div>

                    <Form onSubmit={formik.handleSubmit}>

                        <div className="mb-3">
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="text"
                                    id="user"
                                    name="user"
                                    className="form-control form-control-lg border-light bg-soft-light"
                                    placeholder="Enter Username Or Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user}
                                    invalid={formik.touched.user && formik.errors.user ? true : false}
                                />
                                {formik.touched.user && formik.errors.user ? (
                                    <FormFeedback type="invalid">{formik.errors.user}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </div>

                        <FormGroup className="mb-4">
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="form-control form-control-lg border-light bg-soft-light"
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

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className=" waves-effect waves-light" type="submit">{t('Login')}</Button>
                        </div>

                        <div className="text-center mt-2">
                            <Link to="/forget-password" onClick={(e) => { navigate(e, 'forget-password') }} className="font-size-13">{t('Forgot password')}?</Link>
                        </div>
                    </Form>
                </div>
            </div>


        </div>

    )
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(LoginForm));