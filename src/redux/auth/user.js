import { Record } from 'immutable';

export const User = new Record({
    id: null,
    username: "",
    email: "",
    token: "",
    monthStoriesCount: 0,
});

export const createNewUser = (data) => {
    if(!data) {
        return null;
    }
    
    return new User({
        ...data,
        monthStoriesCount: data?.month_stories_count
    })
}
