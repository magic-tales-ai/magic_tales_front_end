import axios from 'axios';

import { getLoggedInUser } from './authUtils';

// default
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// content type
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// intercepting to capture errors
axios.interceptors.response.use(function (response) {
    return response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response?.status) {
        case 500: message = 'Internal Server Error';break;
        case 401:
            message = error.response.data || 'Invalid credentials';
            if(getLoggedInUser()?.token) {
                window.location.href = "/logout?requireSignIn";
            }
            break;
        case 404: message = "Sorry! the data you are looking for could not be found"; break;
        default: message = error.response.data || error.response.message || error; break;
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
    create = (url, data) => {
        const formData = new FormData();
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        return axios.post(url, formData);
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