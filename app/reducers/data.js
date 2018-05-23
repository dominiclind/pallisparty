import localStorage from 'localStorage';

import {
  GOT_DATA_SUCCESS,
  COMPLETE_GAME,
  COMPLETE_GAME_SUCCESS
} from '../actions/data';

// import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
  loading: false,
  users: [],
  game: false,
  selector: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
        game: action.game,
        selector: action.selector,
        games: action.games
      }
    case COMPLETE_GAME:
      return {
        ...state,
        loading: true
      }
    case COMPLETE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        game: false
      }
    // case REHYDRATE:
    //   var incoming = action.payload.auth;
    //   if (incoming) return {...state, ...incoming}
    default:
      return state;
  }
}
