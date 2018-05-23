import {REHYDRATE} from 'redux-persist/constants'

export default function rehydrate(state = {
  loading: true
}, action) {
  switch (action.type) {
    case REHYDRATE:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}
