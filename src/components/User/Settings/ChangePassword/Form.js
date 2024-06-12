import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

// Actions
import { updateUserPassword, apiError } from '../../../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Selectors
import { selectUser } from '../../../../redux/user/selectors';

/**
 * Change Email component
 * @param {*} props 
 */
const ChangePassword = ({ error, loading, user, ...props }) => {
    const { updated } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [successUpdated, setSuccessUpdated] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatedNewPassword, setShowRepeatedNewPassword] = useState(false);

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            oldPassword: "",
            newPassword: "",
            repeatedNewPassword: ""
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Required'),
            newPassword: Yup.string().required('Required'),
            repeatedNewPassword: Yup.string()
                .test('passwordsMatch', 'New Password must match', function (value) {
                    return this.parent.newPassword === value;
                }).required('Required'),
        }),
        onSubmit: (values, actions) => {
            dispatch(apiError(""));
            dispatch(updateUserPassword(values));
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
                updated();
            }, 3000)
        }
    }, [successUpdated])

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Change Password')}</p>
                <div className="text-start">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >

                        {formik.submitCount > 0 && !loading && !error && (
                            <Alert color="success">
                                {t('Password Successfully Updated')}
                            </Alert>
                        )}

                        {formik.submitCount > 0 && error && !loading && (
                            <Alert color="danger">
                                <div>{(error.detail && Array.isArray(error.detail) ? error.detail[0].msg : error.detail) || error}</div>
                            </Alert>
                        )}

                        <FormGroup>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type={showOldPassword ? 'text' : 'password'}
                                    id="oldPassword"
                                    name="oldPassword"
                                    className="form-control form-control-lg border-light bg-soft-light"
                                    placeholder="Enter Current Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.oldPassword}
                                    invalid={formik.touched.oldPassword && formik.errors.oldPassword ? true : false}
                                />
                                <Button type="button" color="link py-0 px-2 text-body btn-eye" onClick={() => setShowOldPassword(!showOldPassword)}><i className="ri-eye-line font-size-24 fw-normal"></i></Button>
                                {formik.touched.oldPassword && formik.errors.oldPassword ? (
                                    <FormFeedback type="invalid">{formik.errors.oldPassword}</FormFeedback>
                                ) : null}

                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    name="newPassword"
                                    className="form-control form-control-lg border-light bg-soft-light"
                                    placeholder="Enter New Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                    invalid={formik.touched.newPassword && formik.errors.newPassword ? true : false}
                                />
                                <Button type="button" color="link py-0 px-2 text-body btn-eye" onClick={() => setShowNewPassword(!showNewPassword)}><i className="ri-eye-line font-size-24 fw-normal"></i></Button>
                                {formik.touched.newPassword && formik.errors.newPassword ? (
                                    <FormFeedback type="invalid">{formik.errors.newPassword}</FormFeedback>
                                ) : null}

                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type={showRepeatedNewPassword ? 'text' : 'password'}
                                    id="repeatedNewPassword"
                                    name="repeatedNewPassword"
                                    className="form-control form-control-lg border-light bg-soft-light"
                                    placeholder="Repeat New Password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.repeatedNewPassword}
                                    invalid={formik.touched.repeatedNewPassword && formik.errors.repeatedNewPassword ? true : false}
                                />
                                <Button type="button" color="link py-0 px-2 text-body btn-eye" onClick={() => setShowRepeatedNewPassword(!showRepeatedNewPassword)}><i className="ri-eye-line font-size-24 fw-normal"></i></Button>
                                {formik.touched.repeatedNewPassword && formik.errors.repeatedNewPassword ? (
                                    <FormFeedback type="invalid">{formik.errors.repeatedNewPassword}</FormFeedback>
                                ) : null}

                            </InputGroup>
                        </FormGroup>

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className=" waves-effect waves-light" type="submit" disabled={formik.isSubmitting || successUpdated}>
                                {t('Change Password')}
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

export default connect(mapStateToProps, { updateUserPassword, apiError })(ChangePassword);