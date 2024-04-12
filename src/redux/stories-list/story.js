import { Record } from 'immutable';
import { createProfile } from '../profiles-list/profile';

export const Story = new Record({
    id: null,
    sessionId: null,
    profileId: null,
    profile: null,
    title: "",
    lastSuccessfulStep: 0,
    synopsis: "",
    createdAt: "",
});

export const createStory = (data) => {
    return new Story({
        ...data,
        profileId: data?.profile_id,
        profile: data?.profile_id ? createProfile(data.profile) : null,
        sessionId: data?.session_id,
        lastSuccessfulStep: data?.last_successful_step,
        createdAt: data?.created_at
    })
}