import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
    loginRequest, 
    loginSuccess, 
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} from '../slices/authSlice';
import {url} from './url'
function* loginSaga(action){
    const {credentials,navigate} = action.payload
    try {
        const response = yield call(axios.post,`${url}/api/login`, credentials);
        const { token,user } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userEmail', user.email);
        yield put(loginSuccess(response.data))
        navigate('/home')
    } catch (error) {
        yield put(loginFailure(error.message))
    }
}
function* logoutSaga(action){
    const { navigate } = action.payload;
    try {
        // Clear user data from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        navigate('/login');

        // Dispatch logout success action
        yield put(logoutSuccess());

        // Navigate to login page
    } catch (error) {
        yield put(logoutFailure(error.message));
    }
}

function* authSaga(){
    yield takeLatest(loginRequest.type, loginSaga)
    yield takeLatest(logoutRequest.type, logoutSaga)
}

export default authSaga;