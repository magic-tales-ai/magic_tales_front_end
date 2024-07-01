import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect, useDispatch } from "react-redux";

import { useFormik } from 'formik';
import * as Yup from 'yup';

// Selectors
import { selectUser } from "../../../../redux/user/selectors";
import { selectLanguages } from "../../../../redux/systems/selectors";

// Actions
import { updateUser, apiError, fetchSystem } from "../../../../redux/actions";

const ProfileSettingsCardComponent = ({ user, loading, error, languages }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const prevLoadingRef = useRef(loading); // Necessary because formik updates before the reducer switches to 'pending'
    const [successUpdated, setSuccessUpdated] = useState(false);

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            name: user.get('name'),
            last_name: user.get('lastName'),
            username: user.get('username'),
            language: user.get('language')
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            language: Yup.string().required('Required')
        }),
        onSubmit: (values, actions) => {
            dispatch(apiError(""));
            dispatch(updateUser(values));
        },
    });

    useEffect(() => {
        dispatch(fetchSystem('languages'));
    }, [dispatch])

    useEffect(() => {
        if (formik.isSubmitting && prevLoadingRef.current && !loading) {
            formik.setSubmitting(false);
            setSuccessUpdated(!error);
        };
        prevLoadingRef.current = loading;
    }, [loading, error, formik]);

    useEffect(() => {
        if (successUpdated) {
            setTimeout(() => {
                setSuccessUpdated(false);
            }, 3000)
        }
    }, [successUpdated])

    return (
        <div className="container-setting">
            <h3 className="mb-4 ff-special font-size-24 fw-bold">{t("Profile Settings")}</h3>
            <Card color="secondary" className="cursor-pointer">
                <CardBody>
                    <div className="align-items-center">
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                formik.handleSubmit();
                            }}
                        >
                            {successUpdated ? (
                                <Alert color="success">
                                    {t('Successfully Updated')}
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
                                        id="last_name"
                                        name="last_name"
                                        className="form-control form-control-lg bg-soft-light border-light"
                                        placeholder="Enter Your Last Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.last_name}
                                        invalid={formik.touched.last_name && formik.errors.last_name ? true : false}
                                    />
                                    {formik.touched.last_name && formik.errors.last_name ? (
                                        <FormFeedback type="invalid">{formik.errors.last_name}</FormFeedback>
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

                            <Button className="mb-2 waves-effect waves-light" size="sm" type="submit" disabled={formik.isSubmitting}> {t("Update")} </Button>
                        </Form>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { user, error, loading } = selectUser(state);
    const languages = selectLanguages(state);

    return { user, error, loading, languages };
};

export const ProfileSettingsCard = connect(mapStateToProps, { apiError, updateUser, fetchSystem })(ProfileSettingsCardComponent);