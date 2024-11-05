import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, createUserRequest,createUserSuccess,createUserFailure} from '../slices/userSlice'
import { url } from './url'

function* fetchUsersSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/users`)
        yield put(fetchUsersSuccess(response.data))
    } catch (error) {
        yield put(fetchUsersFailure(error.response.data.message))
    }
}
function* createUserSaga(action){
    const {details,navigate} = action.payload
    console.log('user',details)
    try {
        const response = yield call(axios.post,`${url}/api/users`, details);
        yield put(createUserSuccess(response.data))
        navigate('/login')
    } catch (error) {
        yield put(createUserFailure(error.message))
    }
}
function* userSaga(){
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga)
    yield takeLatest(createUserRequest.type, createUserSaga)
}

export default userSaga