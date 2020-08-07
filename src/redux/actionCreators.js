import { createActions } from 'reduxsauce'

export const {
  Types,
  Creators
} = createActions({

  signinRequest: ['email', 'passwd'],
  signinSuccess: ['user'],
  signinFailure: ['error'],

  authRequest: null,
  authSuccess: ['user'] ,
  authFailure: null,

  destroyAuthRequest: null,
  destroyAuthSuccess: null,

  getUserRequest: ['id'],
  getUserSuccess: ['user'],
  getUserFailure: null,
  
  createDeliveryRequest: ['delivery'],
  createDeliverySuccess: ['delivery'],
  createDeliveryFailure: ['error'],
  createDeliveryReset: null,

  getDeliveriesRequest: ['deliveries'],
  getDeliveriesSuccess: ['deliveries'],
  getDeliveriesFailure: null,

  createProfileRequest: ['user'],
  createProfileSuccess: ['user'],
  createProfileFailure: ['error'],
  createProfileReset: null
})
export default Creators