import React, { useEffect, useMemo, useState } from "react";
import { FormGroup, Form, InputGroup, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// i18n
import { useTranslation } from 'react-i18next';

// Constants
import { MAX_IMAGE_SIZE, IMAGE_SUPPORTED_FORMATS } from "../../../constants";

export const ModalUpdateImage = (props) => {
    const { isOpen, setOpen, title, image, loading, update, error } = props;
    const [imageFile, setImageFile] = useState(null)
    const currentImage = image;
    const { t } = useTranslation();

    const toggle = () => {
        setOpen(!isOpen);
    }

    useMemo(() => {
        if(isOpen) {
            setImageFile(null);
        }
    }, [isOpen])

    useEffect(() => {
        if(formik.isSubmitting && !loading) {
            formik.setSubmitting(false);
            if(!error) {
                toggle();
            }
        }
    }, [loading])

    const formik = useFormik({
        initialValues: {
            image: null
        },
        validationSchema: Yup.object({
            image: Yup.mixed()
                .required('Required')
                .test('fileSize', `Uploaded file is too big (max: ${MAX_IMAGE_SIZE}kb).`, (value) => {
                    return(
                        value
                            ? (value.size <= MAX_IMAGE_SIZE * 1024 ? true : false)
                            : true
                        )
                })
                .test('fileFormat', "Not valid!", (value) => {
                    return (
                        value
                            ? (IMAGE_SUPPORTED_FORMATS.includes(value.type) ? true : false)
                            : true
                    )
                }
            )
        }),
        onSubmit: values => {
            update({ image: values.image })
        },
    });

    useEffect(() => {
        if(!isOpen) {
            formik.resetForm();
        }
    }, [isOpen])

    const fileHandleChange = (e) => {
        setImageFile(e.target.files[0])
        formik.setFieldValue('image', e.target.files[0])
    }

    const currentImageUrl = (imageFile && !formik?.errors.image) 
        ? URL.createObjectURL(imageFile) 
        : currentImage 
            ? 'data:image/*;base64,' + currentImage
            : null;

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'modal-title text-center w-100 opacity-75' }}>
                {title || t('Update Profile Image')}
            </ModalHeader>

            <ModalBody className="modal-profile pb-0">
                <div className="d-flex justify-content-center text-center">
                    <Form onSubmit={formik.handleSubmit}>
                        {formik.submitCount > 0 && error && !formik.isSubmitting && (
                            <Alert color="danger">
                                <div>{(error?.detail && Array.isArray(error.detail) ? error.detail[0].msg : error.detail) || error}</div>
                            </Alert>
                        )}

                        <picture>
                            {currentImageUrl && <img src={currentImageUrl} className={`rounded avatar-lg`} />}
                        </picture>

                        <FormGroup className="mb-0">
                            <InputGroup className="mt-3 bg-soft-light rounded-3">
                                <Input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept={IMAGE_SUPPORTED_FORMATS}
                                    className="form-control form-control-lg border-light bg-soft-light"
                                    onChange={fileHandleChange}
                                    invalid={formik.touched.image && formik.errors.image ? true : false}
                                />
                                {formik.touched.image && formik.errors.image ? (
                                    <FormFeedback type="invalid">{formik.errors.image}</FormFeedback>
                                ) : null}
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </div>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" className="btn btn-primary flex-fill w-100 w-lg-auto" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                    {t('Accept')}
                </Button>
                <Button color="primary" className="btn btn-primary flex-fill w-100 w-lg-auto" onClick={toggle}>
                    {t('Cancel')}
                </Button>
            </ModalFooter>

            {formik.isSubmitting && <div className="d-flex justify-content-center mb-3"><div className="loader"></div></div>}
        </Modal >
    )
}