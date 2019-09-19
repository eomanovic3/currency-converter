import {call, put, takeLatest} from 'redux-saga/effects';
import request from "../../utils/request";
import {errorDataLoading} from "../CurrencyPage/actions";
import {USER_REGISTRATION} from "./constants";
import history from '../../utils/history';
import CookiesWrapper from '../../utils/cookiesWrapper';

export function* getRegisterData(res) {
    try {
        const body = JSON.stringify({
            name: res.name,
            email: res.email,
            password: res.password,
        });

        const response = yield call(
            request, 'http://localhost:3001/api/users/user',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            },
        );
        if(response && response.token) {
            CookiesWrapper.setCookie("x-auth-token", response.token);
            history.push('/');
        }
    }catch (err) {
        yield put(errorDataLoading(err));
    }
}
// Individual exports for testing
export default function* registerSaga() {
    yield takeLatest(USER_REGISTRATION, getRegisterData);
}
