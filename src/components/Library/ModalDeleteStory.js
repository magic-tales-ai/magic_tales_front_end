import React from "react";
import { useDispatch } from "react-redux";

// i18n
import { useTranslation } from 'react-i18next';

// Components
import { ModalConfirmDelete } from "../Common/Modals/ModalConfirmDelete";
import CardStory from "./CardStory";

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
                <p className="text-center">{t('By deleteing the story, you do not delete the reader profile')}</p>
                <div className="d-flex justify-content-center">
                    <CardStory story={story} />
                </div>
            </div>
        </ModalConfirmDelete>
    )
}