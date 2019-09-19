import {call, put, takeLatest, select} from 'redux-saga/effects';
import request from '../../utils/request';
import {START_CONVERTING, START_LOADING} from './constants';
import {dataLoaded, errorDataLoading, getConvertedCurrencyValue, savePie} from './actions';
import {calculateFullAmountInUSD, countItemFrequency, drawPie, prepareDataForChart, sortData} from "./service";
import CookiesWrapper from '../../utils/cookiesWrapper';

import {
    makeSelectAmountPie,
    makeSelectCounter,
    makeSelectCurrencyIHave,
    makeSelectCurrencyInput,
    makeSelectCurrencyIWant,
    makeSelectData,
    makeSelectFrequencyCountData,
    makeSelectFrequencyPie, makeSelectFullAmount,
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
        const sortedData = sortData(data.data);
        const frequencyCountData = countItemFrequency(sortedData);
        const {fullAmount, counter} = calculateFullAmountInUSD(sortedData);
        yield put(dataLoaded(data.data, frequencyCountData, fullAmount, counter));
    } catch (err) {
        yield put(errorDataLoading(err));
    }
}

export function* convertCurrencyValue() {
    try {
        let data = yield select(makeSelectData());
        const currencyInput = yield select(makeSelectCurrencyInput());
        const currencyIHave = yield select(makeSelectCurrencyIHave());
        const currencyIWant = yield select(makeSelectCurrencyIWant());

        let currentIds = data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
        if (currencyIWant !== null && currencyIHave !== null && currencyInput !== null) {
            const res = yield call(
                request,
                'https://free.currconv.com/api/v7/convert?q=' + currencyIHave + '_' + currencyIWant +
                '&compact=ultra&apiKey=0c8f6859f6b038079fc1',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const resUSD = yield call(
                request,
                'https://free.currconv.com/api/v7/convert?q=' + currencyIHave + '_USD' +
                '&compact=ultra&apiKey=0c8f6859f6b038079fc1',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const convertedCurrencyValue = res[Object.keys(res)[0]] * currencyInput;
            const usdValueInfo = resUSD[Object.keys(resUSD)[0]] * currencyInput;
            const body = JSON.stringify({
                id: idToBeAdded,
                amount: parseFloat(currencyInput),
                currency: currencyIHave,
                destinationCurrency: currencyIWant,
                convertedValue: parseFloat(convertedCurrencyValue),
                usdValue: parseFloat(usdValueInfo),
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
            const frequencyCountData = yield select(makeSelectFrequencyCountData());
            const pie = yield select(makeSelectFrequencyPie());
            const counter = yield select(makeSelectCounter());

            const rows = prepareDataForChart(frequencyCountData);
            setTimeout(() => {
                pie.updateProp("data.content", rows);
            }, 3000);

            const amountData = yield select(makeSelectFullAmount());
            const pieAmount = yield select(makeSelectAmountPie());
            data = yield select(makeSelectData());
            const rowsAmount = prepareDataForChart(amountData, counter);
            const subtitle = counter ? `The total amount converted to USD is ${Math.round(counter * 100) / 100}$. Number of requests made : ${data.length}` : '';
            setTimeout(() => {
                pieAmount.updateProp("data.content", rowsAmount);
                pieAmount.updateProp("header.subtitle.text", subtitle);
            }, 3000);
        } else {
            yield put(errorDataLoading('Some data is missing!'));
        }
    } catch (err) {
        yield put(errorDataLoading(err));
    }
}


// Individual exports for testing
export default function* currencyPageSaga() {
    yield takeLatest(START_LOADING, getDataFromDb);
    yield takeLatest(START_CONVERTING, convertCurrencyValue);
}
