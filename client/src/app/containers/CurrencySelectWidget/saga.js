import {call, put, takeLatest} from 'redux-saga/effects';
import {allCurrenciesLoaded, errorDataLoading} from "./actions";
import request from '../../utils/request';
import {START_LOADING_CURRENCIES} from "./constants";
import {filterCountryCurrencies} from "./service";

export function* getAllCurrencies() {
    debugger;
    try {
        const data = yield call(
            request,
            'https://free.currconv.com/api/v7/currencies?apiKey=0c8f6859f6b038079fc1',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        const filterData = filterCountryCurrencies(data.results);
        yield put(allCurrenciesLoaded(filterData));
    } catch (err) {
        yield put(errorDataLoading(err));
    }
}
// Individual exports for testing
export default function* currencySelectWidgetSaga() {
    yield takeLatest(START_LOADING_CURRENCIES, getAllCurrencies);
}
