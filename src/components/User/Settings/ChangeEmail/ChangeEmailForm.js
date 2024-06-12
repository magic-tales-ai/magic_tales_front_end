import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';

// Actions
import { updateUser, userApiError } from '../../../../redux/actions';

// i18n
import { useTranslation } from 'react-i18next';

// Selectors
import { selectUser } from '../../../../redux/user/selectors';

/**
 * Change Email component
 * @param {*} props 
 */
const ChangeEmailComponent = ({ error, loading, user, ...props }) => {
    const { nextStep } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [successUpdated, setSuccessUpdated] = useState(false)

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            email: "",
            repeatedNewEmail: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Enter a valid email address').required('Required'),
            repeatedNewEmail: Yup.string()
                .test('emailsMatch', 'Emails must match', function (value) {
                    return this.parent.email === value;
                }).required('Required'),
        }),
        onSubmit: (values, actions) => {
            dispatch(userApiError(null));
            dispatch(updateUser(values));
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
            nextStep();
        }
    }, [successUpdated])

    return (
        <div className="justify-content-center">
            <div className="text-center px-4 px-lg-5 mb-4">
                <p className="text-reset ff-special fw-normal h1 mb-3">{t('Change Email')}</p>
                <div className="text-start">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            formik.handleSubmit();
                        }}
                    >
                        {successUpdated ? (
                            <Alert color="success">
                                {t('Email Successfully Updated')}
                            </Alert>
                        ) : null}

                        {formik.submitCount > 0 && error && !formik.isSubmitting && (
                            <Alert color="danger">
                                <div>{(error.detail && Array.isArray(error.detail) ? error.detail[0].msg : error.detail) || error}</div>
                            </Alert>
                        )}

                        <FormGroup>
                            <Label className="form-label">{t('New Email')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Enter New Email"
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
                            <Label className="form-label">{t('Confirm New Email')}</Label>
                            <InputGroup className="mb-3 bg-soft-light rounded-3">
                                <Input
                                    type="email"
                                    id="repeatedNewEmail"
                                    name="repeatedNewEmail"
                                    className="form-control form-control-lg bg-soft-light border-light"
                                    placeholder="Repeat New Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.repeatedNewEmail}
                                    invalid={formik.touched.repeatedNewEmail && formik.errors.repeatedNewEmail ? true : false}
                                />
                                {formik.touched.repeatedNewEmail && formik.errors.repeatedNewEmail ? (
                                    <FormFeedback type="invalid">{formik.errors.repeatedNewEmail}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>

                        <div className="d-grid">
                            <Button color="secondary" size="lg" block className=" waves-effect waves-light" type="submit" disabled={formik.isSubmitting || successUpdated}>
                                {t('Change Email')}
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

export const ChangeEmail = connect(mapStateToProps, { userApiError })(ChangeEmailComponent);