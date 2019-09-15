import {call, put, takeLatest, select} from 'redux-saga/effects';
import request from '../../utils/request';
import {START_CONVERTING, START_LOADING} from './constants';
import {dataLoaded, errorDataLoading, getConvertedCurrencyValue} from './actions';
import {countItemFrequency, drawPie, sortData} from "./service";

import {
    makeSelectCurrencyIHave,
    makeSelectCurrencyInput,
    makeSelectCurrencyIWant,
    makeSelectData, makeSelectFrequencyCountData,
} from "./selectors";

export function* getDataFromDb() {
    try {
        const data = yield call(
            request,
            'http://localhost:3001/api/currencyConversion/getAllCurrencyConversions',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log(data.data);
        const sortedData = sortData(data.data);
        const frequencyCountData = countItemFrequency(sortedData);
        yield put(dataLoaded(data.data, frequencyCountData));
    } catch (err) {
        yield put(errorDataLoading(err));
    }
}
export function* convertCurrencyValue() {
    try {
        const data = yield select(makeSelectData());
        const currencyInput = yield select(makeSelectCurrencyInput());
        const currencyIHave = yield select(makeSelectCurrencyIHave());
        const currencyIWant = yield select(makeSelectCurrencyIWant());

        let currentIds = data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        const res = yield call(
            request,
            'https://free.currconv.com/api/v7/convert?q=' + currencyIHave + '_' + currencyIWant +
            '&compact=ultra&apiKey=a95c822a52bf63e12982',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        const convertedCurrencyValue = res[Object.keys(res)[0]] * currencyInput;
        const body = JSON.stringify({
            id: idToBeAdded,
            amount: parseFloat(currencyInput),
            currency: currencyIHave,
            destinationCurrency: currencyIWant,
            convertedValue: parseFloat(convertedCurrencyValue),
        });
        yield call(
            request,
            'http://localhost:3001/api/currencyConversion/addCurrencyConversion',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            },
        );
        yield put(getConvertedCurrencyValue(convertedCurrencyValue));
        yield call(getDataFromDb);
    } catch (err) {
        yield put(errorDataLoading(err));
    }
}


// Individual exports for testing
export default function* currencyPageSaga() {
    yield takeLatest(START_LOADING, getDataFromDb);
    yield takeLatest(START_CONVERTING, convertCurrencyValue);
}
