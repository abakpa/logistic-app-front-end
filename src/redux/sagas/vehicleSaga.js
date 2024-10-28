import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchVehicleRequest,fetchVehicleSuccess,fetchVehicleFailure,createVehicleRequest,createVehicleSuccess,createVehicleFailure} from '../slices/vehicleSlice'

 function* fetchVehicleSaga(){
    try {
        const response = yield call(axios.get, 'http://localhost:4000/api/vehicles')
        yield put(fetchVehicleSuccess(response.data))
    } catch (error) {
        yield put(fetchVehicleFailure(error.response.data.message))
    }
}
function* createVehicleSaga(action){
    const {details,navigate} = action.payload
    try {
        const response = yield call(axios.post,'http://localhost:4000/api/vehicles', details);
        yield put(createVehicleSuccess(response.data))
        navigate('/Vehicles')
    } catch (error) {
        yield put(createVehicleFailure(error.message))
    }
}

function* vehicleSaga(){
    yield takeLatest(fetchVehicleRequest.type, fetchVehicleSaga)
    yield takeLatest(createVehicleRequest.type, createVehicleSaga)
}

export default vehicleSaga