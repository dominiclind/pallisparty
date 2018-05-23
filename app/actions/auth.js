import { browserHistory } from 'react-router';

import {
  login as firebaseLogin,
  logout as firebaseLogout,
  checkLogin as firebaseCheckLogin,
  getCurrentUser
} from '../utils/firebase';

export const CHECK_LOGIN = 'AUTH/CHECK_LOGIN';
export const CHECK_LOGIN_SUCCESS = 'AUTH/CHECK_LOGIN_SUCCESS';

export const LOGOUT = 'AUTH/LOGOUT';

export const LOGIN = 'AUTH/LOGIN';
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS';

export const GET_USER = 'AUTH/GET_USER';
export const GET_USER_SUCCESS = 'AUTH/GET_USER_SUCCESS';


export function checkLogin() {
  return (dispatch) => {

    dispatch({ type: CHECK_LOGIN });

    firebaseCheckLogin(user => {
      if(user){
        dispatch({type: LOGIN_SUCCESS, user})
        browserHistory.replace('/');
      } else { 
        dispatch({type: LOGIN_SUCCESS, user: false})
        browserHistory.replace('/login');
      }
    });
    
  }
}


export function login() {
  return (dispatch) => {

    dispatch({ type: LOGIN });

    firebaseLogin().then(user => {
    	console.log(user);
    })

	  // browserHistory.push('/');
     
    //dispatch({ type: LOGGING_IN, data });
    // dispatch({ type: LOGGED_IN, data });
    // dispatch({ type: LOGGING_IN_FAILED, data });
  }
}


export function logout() {
  return (dispatch, getState) => {

    const { auth } = getState();
    const { id } = auth.user;

    dispatch({ type: LOGOUT });

    firebaseLogout(id);
  }
}

export function getUser() {
  return (dispatch) => {
    dispatch({type: GET_USER });
    return getCurrentUser().then(user => {
      dispatch({type: GET_USER_SUCCESS, user});
    })
  } 
}
