import {combineReducers} from 'redux';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import vehicleReducer from './slices/vehicleSlice'
import driverReducer from './slices/driverSlice'
import orderReducer from './slices/orderSlice'
import dispatchReducer from './slices/dispatchSlice'
import notificationReducer from './slices/notification';

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    notification:notificationReducer,
    vehicle:vehicleReducer,
    driver:driverReducer,
    order:orderReducer,
    dispatch:dispatchReducer
});

export default rootReducer;