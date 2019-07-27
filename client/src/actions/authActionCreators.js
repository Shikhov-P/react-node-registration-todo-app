import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', getTokenConfig((getState)))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(e => {
            dispatch(returnErrors(e.response.data, e.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
};


export const getTokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
};