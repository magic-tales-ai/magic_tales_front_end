import { Record } from 'immutable';
import { DEFAULT_PICTURE_B64 } from './constants';

import { createPlan } from '../plans-list/plan';

export const User = new Record({
    id: null,
    username: "",
    name: "",
    lastName: "",
    email: "",
    token: "",
    image: DEFAULT_PICTURE_B64,
    monthStoriesCount: 0,
    plan: null,
    loading: false,
    error: null
});

export const createNewUser = (data) => {
    if(!data) {
        return null;
    }
    
    return new User({
        ...data,
        image: data?.image || DEFAULT_PICTURE_B64,
        monthStoriesCount: data?.month_stories_count || data?.monthStoriesCount,
        lastName: data?.last_name,
        plan: createPlan(data?.plan)
    })
}
