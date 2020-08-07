import ActionCreators from '../actionCreators'
import { put, call } from 'redux-saga/effects'

export const getDeliveries = ({ api }) => function* (action) {
    
    const deliveries = yield call(api.getDeliveries)
    yield put(ActionCreators.getDeliveriesSuccess(deliveries.data.data))
}

export const createDelivery = ({ api }) => function* (action) {
    
    const delivery = yield call(api.createDelivery, action.delivery)
    yield put(ActionCreators.createDeliverySuccess(delivery.data))
}
