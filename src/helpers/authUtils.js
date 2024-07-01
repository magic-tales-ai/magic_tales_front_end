import { jwtDecode } from 'jwt-decode';
import { setAuthorization } from './apiClient';

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    
    try {
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    } catch(e) {
        console.warn('access token expired');
        return false;
    }
}

/**
 * Sets the logged in user
 */
const setLoggedInUser = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const user = localStorage.getItem('authUser');
    return user ? (typeof (user) === 'object' ? user : JSON.parse(user)) : null;
}

/**
 * Update token in user
 */
const updateTokenLoggedInUser = (token) => {
    const user = getLoggedInUser();
    
    if (user) {
        user.token = token;
        localStorage.setItem('authUser', JSON.stringify(user));
        setAuthorization(token);
    }
}

export { isUserAuthenticated, setLoggedInUser, getLoggedInUser, updateTokenLoggedInUser };