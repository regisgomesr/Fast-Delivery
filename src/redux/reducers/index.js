import { combineReducers } from 'redux'

import auth from './auth'
import deliveries from './deliveries'
import users from './users'

const rootReducer = combineReducers({
    auth,
    deliveries,
    users
})
export default rootReducer

