import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

// Redux para manipular entregas - Deliveries
export const INITIAL_STATE = {
    isLoading: false,
    isSaving: false,
    saved: false,
    data: [],
    error: ''
}

export const getDeliveriesRequest = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isLoading: true
  }
}
export const getDeliveriesSuccess = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isLoading: false,
      data: action.deliveries
  }
}
export const getDeliveriesFailure = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isLoading: false
  }
}

export const createDeliveryRequest = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isSaving: true,
      saved: false,
  }
}

export const createDeliverySuccess = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isSaving: false,
      saved: true,
      error: ''
  }
}

export const createDeliveryFailure = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isSaving: false,
      saved: false,
      error: true
  }
}

export const createDeliveryReset = (state = INITIAL_STATE, action) => {
  return {
      ...state,
      isSaving: false,
      saved: false
  }
}

export const HANDLERS = {
  [Types.CREATE_DELIVERY_REQUEST]: createDeliveryRequest,
  [Types.CREATE_DELIVERY_SUCCESS]: createDeliverySuccess,
  [Types.CREATE_DELIVERY_FAILURE]: createDeliveryFailure,
  [Types.CREATE_DELIVERY_RESET]: createDeliveryReset,

  [Types.GET_DELIVERIES_REQUEST]: getDeliveriesRequest,
  [Types.GET_DELIVERIES_SUCCESS]: getDeliveriesSuccess,
  [Types.GET_DELIVERIES_FAILURE]: getDeliveriesFailure
}
export default createReducer(INITIAL_STATE, HANDLERS)