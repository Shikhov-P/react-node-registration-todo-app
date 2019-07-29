import axios from 'axios';
import { returnErrors } from './errorActionCreators';

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
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
};


export const register = ({name, email, password, repeatPassword}) => dispatch => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({name, email, password, repeatPassword});

    axios.post("/api/users", body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: REGISTER_FAIL
            })

        })
}


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
