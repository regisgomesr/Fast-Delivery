import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'
import ActionCreators from '../actionCreators'

import { getDeliveries, createDelivery } from './deliveries'
import { auth, login, createProfile, destroyAuth } from './auth'
import { getUser } from './users'
import Api from '../../service/Api'


export default function* rootSaga() {

    const devURL = 'http://localhost:3001'
    const prodURL = 'http://api.fastdelivery.com'
    const baseURL = process.env.NODE_ENV === 'development' ? devURL : prodURL

    const api = new Api(baseURL)

    yield all([
        takeLatest(Types.SIGNIN_REQUEST, login({ api })),
        takeLatest(Types.AUTH_REQUEST, auth({ api })),
        takeLatest(Types.GET_DELIVERIES_REQUEST, getDeliveries({ api })),
        takeLatest(Types.CREATE_DELIVERY_REQUEST, createDelivery({ api })),
        takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile({ api })),
        takeLatest(Types.GET_USER_REQUEST, getUser({ api })),
        takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),

        put(ActionCreators.authRequest())
    ])
}