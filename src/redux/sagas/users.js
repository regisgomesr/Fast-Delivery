import ActionCreators from '../actionCreators'
import { put, call } from 'redux-saga/effects'

export const getUser = ({ api }) => function* (action) {
    
    const user = yield call(api.getUser, action.id) 
    yield put(ActionCreators.getUserSuccess(user.data))
}