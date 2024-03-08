import axios from 'axios';
import config from "./../config";

import { getLoggedInUser } from './authUtils';

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';

// intercepting to capture errors
axios.interceptors.response.use(function (response) {
    return response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
        case 500: message = 'Internal Server Error'; break;
        case 401: message = 'Invalid credentials'; break;
        case 404: message = "Sorry! the data you are looking for could not be found"; break;
        default: message = error.message || error;
    }
    return Promise.reject(message);
});

/**
 * Sets the default authorization
 * @param {*} token 
 */

if(getLoggedInUser()?.token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getLoggedInUser()?.token;
}

const setAuthorization = (token) => {
    if(!token.includes('Bearer')) {
        token = 'Bearer ' + token;
    }

    axios.defaults.headers.common['Authorization'] = token;
}


class APIClient {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        return axios.get(url, params);
    }

    /**
     * post given data to url
     */
    create = (url, data, useFormData = true) => {
        if (useFormData) {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            return axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        return axios.post(url, data);
    }

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.patch(url, data);
    }

    /**
     * Delete 
     */
    delete = (url) => {
        return axios.delete(url);
    }
}

export { APIClient, setAuthorization };