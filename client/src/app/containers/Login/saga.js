import {call, put, takeLatest} from 'redux-saga/effects';
import request from "../../utils/request";
import {errorDataLoading} from "../CurrencyPage/actions";
import {USER_LOGIN} from "./constants";
import CookiesWrapper from '../../utils/cookiesWrapper';
import history from "../../utils/history";
export function* getLoginData(res) {
    try {
        if(CookiesWrapper.getCookie('x-auth-token')) {
            const response = yield call(
                request, 'http://localhost:3001/api/users/current',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': CookiesWrapper.getCookie('x-auth-token')
                    },
                },
            );
            if (response && response._id) {
                history.push('/');
            }
        }
        const body = JSON.stringify({
            email: res.email,
            password: res.password,
        });

        const token = yield call(
            request, 'http://localhost:3001/api/users/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            },
        );
        if (token && token.token) {
            CookiesWrapper.setCookie("x-auth-token", token.token);
            history.push('/');
        }

    }catch (err) {
        yield put(errorDataLoading(err));
    }
}
// Individual exports for testing
export default function* loginSaga() {
    yield takeLatest(USER_LOGIN, getLoginData);
}
