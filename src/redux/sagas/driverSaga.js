import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchDriverRequest,fetchDriverSuccess,fetchDriverFailure,createDriverRequest,createDriverSuccess,createDriverFailure} from '../slices/driverSlice'

 function* fetchDriverSaga(){
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.get, 'http://localhost:4000/api/drivers',config)
        yield put(fetchDriverSuccess(response.data))
    } catch (error) {
        yield put(fetchDriverFailure(error.response.data.message))
    }
}
function* createDriverSaga(action){
    const {details,navigate} = action.payload
    try {
      
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,'http://localhost:4000/api/drivers', details,config);
        yield put(createDriverSuccess(response.data))
        navigate('/Drivers')
    } catch (error) {
        yield put(createDriverFailure(error.response.data.message))
    }
}

function* driverSaga(){
    yield takeLatest(fetchDriverRequest.type, fetchDriverSaga)
    yield takeLatest(createDriverRequest.type, createDriverSaga)
}

export default driverSaga