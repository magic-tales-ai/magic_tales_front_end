import { Record } from 'immutable';
import { createProfile } from '../profiles-list/profile';
import { DEFAULT_PICTURE_B64 } from './constants';

export const Story = new Record({
    id: null,
    sessionId: null,
    profileId: null,
    profile: null,
    title: "",
    lastSuccessfulStep: 0,
    synopsis: "",
    image: null,
    createdAt: "",
});

export const createStory = (data) => {
    return new Story({
        ...data,
        profileId: data?.profile_id,
        profile: data?.profile_id ? createProfile(data.profile) : null,
        sessionId: data?.session_id,
        lastSuccessfulStep: data?.last_successful_step,
        image: data?.image || DEFAULT_PICTURE_B64,
        createdAt: data?.created_at
    })
}