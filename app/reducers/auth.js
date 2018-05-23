import localStorage from 'localStorage';

import {
  LOGIN,
  LOGIN_SUCCESS,
} from '../actions/auth';

// import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  loading: true,
  user: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      }
    // case REHYDRATE:
    //   var incoming = action.payload.auth;
    //   if (incoming) return {...state, ...incoming}
    default:
      return state;
  }
}
