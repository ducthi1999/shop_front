import { combineReducers } from 'redux'
import globalReducer from './global'
import adminReducer from './admin'

const rootReducer = combineReducers({
  global: globalReducer,
  admin: adminReducer
})

export default rootReducer