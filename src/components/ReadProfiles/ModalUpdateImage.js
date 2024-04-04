import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { FormGroup, Form, InputGroup, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { setActiveChat, setActiveTab } from "../../redux/actions";

// Image default
import avatar1 from "../../assets/images/users/avatar-1.jpg";

// Constants
import { MAX_IMAGE_SIZE } from "../../constants";

export const ModalUpdateImage = (props) => {
    const { isOpen, setOpen, currentImage } = props;
    const [imageFile, setImageFile] = useState(null)
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const toggle = () => {
        setOpen(!isOpen);
    }

    useMemo(() => {
        if(isOpen) {
            setImageFile(null);
        }
    }, [isOpen])

    // validation
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
                            ? (value.size <= MAX_IMAGE_SIZE ? true : false)
                            : true
                        )
                })
                .test('fileFormat', "Not valid!", (value) => {
                    return (
                        value
                            ? (value.type.startsWith('image/') ? true : false)
                            : true
                    )
                }
            )
        }),
        onSubmit: values => {
            //TODO save...
        },
    });

    const fileHandleChange = (e) => {
        setImageFile(e.target.files[0])
        formik.setFieldValue('image', e.target.files[0])
    }

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'modal-title text-center w-100 opacity-75' }}>
                {t('Update Profile Image')}
            </ModalHeader>

            <ModalBody className="modal-profile pb-0">
                <div className="d-flex justify-content-center text-center">
                    <Form onSubmit={formik.handleSubmit}>
                        <picture>
                            <source srcSet={(imageFile && !formik.errors.image) ? URL.createObjectURL(imageFile) : currentImage} className={`rounded avatar-lg`} />
                            <img src={avatar1} className={`rounded avatar-lg`} alt="avatar" />
                        </picture>

                        <FormGroup className="mb-0">
                            <InputGroup className="mt-3 bg-soft-light rounded-3">
                                <Input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    className="form-control form-control-lg border-light bg-soft-light"
                                    onChange={fileHandleChange}
                                    onBlur={formik.handleBlur}
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
                <Button color="primary" className="btn btn-primary flex-fill w-100 w-lg-auto" onClick={formik.handleSubmit}>
                    {t('Accept')}
                </Button>
                <Button color="primary" className="btn btn-primary flex-fill w-100 w-lg-auto" onClick={toggle}>
                    {t('Cancel')}
                </Button>
            </ModalFooter>
        </Modal >
    )
}