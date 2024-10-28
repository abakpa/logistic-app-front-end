import {all} from 'redux-saga/effects'
import authSaga from './authSaga'
import userSaga from './userSaga'
import vehicleSaga from './vehicleSaga'
import driverSaga from './driverSaga'
import orderSaga from './orderSaga'
import dispatchSaga from './dispatchSaga'

export default function* rootSaga(){
    yield all([authSaga(), userSaga(),vehicleSaga(),driverSaga(),orderSaga(),dispatchSaga()])
}