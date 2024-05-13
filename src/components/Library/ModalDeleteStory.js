import React from "react";
import { useDispatch } from "react-redux";
import { Card, CardBody } from "reactstrap";

// i18n
import { useTranslation } from 'react-i18next';

// Image default
import avatar1 from "../../assets/images/users/avatar-tales-big.png";

import { ModalConfirmDelete } from "../Common/Modals/ModalConfirmDelete";

// Actions
import { deleteStory as deleteStoryAction } from "../../redux/actions";

export const ModalDeleteStory = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        isOpen,
        setOpen,
        story,
    } = props;

    const deleteStory = () => {
        dispatch(deleteStoryAction(story.get('id')));
    }

    return (
        <ModalConfirmDelete isOpen={isOpen} setOpen={setOpen} callback={deleteStory} title={'Are you sure you want to delete?'} >
            <div>
                <p className="text-center">{t('By deleteing the story, You do not delete the reader profile.')}</p>

                <Card color="secondary" className="card-library mx-auto my-4">
                    <CardBody>
                        <div className="d-flex">
                            <picture>
                                <source srcSet={avatar1} className="rounded avatar-md" />
                                <img src={avatar1} className="rounded avatar-md me-2 h-auto" alt={story.get('title')} />
                            </picture>
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="font-size-14 mb-0 opacity-75">{story.get('title')}</h2>
                                </div>
                                <p className="font-size-10 opacity-75">{story.get('synopsis')}</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </ModalConfirmDelete>
    )
}