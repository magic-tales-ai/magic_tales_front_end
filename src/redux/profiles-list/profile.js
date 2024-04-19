import { Record } from 'immutable';
import { DEFAULT_PICTURE_B64 } from './constants';

export const Profile = new Record({
    loading: false,
    error: null,
    createdAt: "",
    id: null,
    image: null,
    details: null,
    userId: null,
});

export const createProfile = (data) => {
    return new Profile({
        ...data,
        id: data?.id,
        createdAt: data?.created_at,
        image: data?.image || DEFAULT_PICTURE_B64,
        details: data?.details ? createDetails(JSON.parse(data?.details)) : null,
        userId: data?.user_id
    })
}


export const Details = new Record({
    name: "",
    lastName: "",
    age: null,
});

export const createDetails = (data) => {
    return new Details({
        ...data,
        name: data?.name,
        lastName: data?.last_name,
        age: data?.age
    })
}