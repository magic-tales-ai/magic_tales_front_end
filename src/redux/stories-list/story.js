import { Record } from 'immutable';

export const Story = new Record({
    id: 50,
    sessionId: null,
    profileId: null,
    title: "",
    lastSuccessfulStep: 0,
    synopsis: "",
    createdAt: "",
});

export const createStory = (data) => {
    return new Story({
        ...data,
        profileId: data?.profile_id,
        sessionId: data?.session_id,
        lastSuccessfulStep: data?.last_successful_step,
        createdAt: data?.created_at
    })
}