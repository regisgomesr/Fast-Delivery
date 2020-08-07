import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

// Redux para manipular usuarios - Users
export const INITIAL_STATE = {
    isLoading: false,
    user: {}
}

export const getUserRequest = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isLoading: true
  }
}
export const getUserSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        user: action.user
    }
}
export const getUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false
    }
}


export const HANDLERS = {

    [Types.GET_USER_REQUEST]: getUserRequest,
    [Types.GET_USER_SUCCESS]: getUserSuccess,
    [Types.GET_USER_FAILURE]: getUserFailure,

}
export default createReducer(INITIAL_STATE, HANDLERS)