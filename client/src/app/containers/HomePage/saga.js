import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from '../../utils/request';
import {CHANGE_CURRENCY_INPUT, CONVERT_VALUE, START_CONVERTING, START_LOADING} from './constants';
import {changeCurrencyInput, dataLoaded, errorDataLoading, getConvertedCurrencyValue} from './actions';
import {makeSelectCurrencyInput, makeSelectData, makeSelectLoading} from "./selectors";

export function* getDataFromDb() {
  try {
    const data = yield call(
        request,
        'http://localhost:3001/api/data/getData',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
    );

    yield put(dataLoaded(data.data));
  } catch (err) {
    yield put(errorDataLoading(err));
  }
}

export function* convertCurrencyValue() {
  try {
    const currencyInput = yield select(makeSelectCurrencyInput());
    const data = yield select(makeSelectData());

    let currentIds = data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    // axios.post('http://localhost:3001/api/putData', {
    //   id: idToBeAdded,
    //   message: message,
    // });
    console.log('currencyInput', currencyInput);
    yield put(getConvertedCurrencyValue(currencyInput));
  } catch (err) {
    yield put(errorDataLoading(err));
  }
}
// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(START_LOADING, getDataFromDb);
  yield takeLatest(START_CONVERTING ,convertCurrencyValue);
}
