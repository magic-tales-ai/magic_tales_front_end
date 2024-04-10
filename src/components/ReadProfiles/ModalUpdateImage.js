import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { FormGroup, Form, InputGroup, Input, FormFeedback, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// i18n
import { useTranslation } from 'react-i18next';

// Actions
import { uploadProfileImage } from "../../redux/actions";

// Image default
import { ReactComponent as ProfileImageDefault } from "../../assets/images/profiles/profile-svgrepo-com.svg";

// Constants
import { MAX_IMAGE_SIZE } from "../../constants";

export const ModalUpdateImage = (props) => {
    const { isOpen, setOpen, profile } = props;
    const [imageFile, setImageFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const currentImage = profile.get('image')
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

    useEffect(() => {
        if(uploading && !profile.get('loading')) {
            setUploading(false);
            toggle();
        }
    }, [uploading, profile.get('loading')])

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
                            ? (value.size <= MAX_IMAGE_SIZE * 1024 ? true : false)
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
            setUploading(true)
            dispatch(uploadProfileImage({ profileId: profile.get('id'), image: values.image }))
        },
    });

    const fileHandleChange = (e) => {
        setImageFile(e.target.files[0])
        formik.setFieldValue('image', e.target.files[0])
    }

    const currentImageUrl = (imageFile && !formik?.errors.image) 
        ? URL.createObjectURL(imageFile) 
        : 'data:image/*;base64,' + currentImage;

    return (
        <Modal isOpen={isOpen} centered toggle={toggle}>
            <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'modal-title text-center w-100 opacity-75' }}>
                {t('Update Profile Image')}
            </ModalHeader>

            <ModalBody className="modal-profile pb-0">
                <div className="d-flex justify-content-center text-center">
                    <Form onSubmit={formik.handleSubmit}>
                        <picture>
                            {currentImageUrl && <img src={currentImageUrl} className={`rounded avatar-lg`} />}
                            {!currentImageUrl && <ProfileImageDefault className={`rounded avatar-lg`} alt="avatar" />}
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