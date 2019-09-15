
/*
 *
 * CurrencyPage actions
 *
 */

import {
  DATA_LOADED,
  DATA_LOAD_ERROR,
  START_LOADING,
  SET_INTERVAL_DATA,
  CHANGE_CURRENCY_INPUT,
  CONVERT_VALUE, START_CONVERTING, CHANGE_CURRENCY_I_HAVE, CHANGE_CURRENCY_I_WANT
} from './constants';

export function startLoading() {
  return {
    type: START_LOADING,
  };
}

export function dataLoaded(data) {
  return {
    type: DATA_LOADED,
    data,
  };
}

export function errorDataLoading(error) {
  return {
    type: DATA_LOAD_ERROR,
    error,
  };
}

export function setIntervalInfo(interval) {
  return {
    type: SET_INTERVAL_DATA,
    interval,
  };
}

export function changeCurrencyInput(currencyInput) {
  return {
    type: CHANGE_CURRENCY_INPUT,
    currencyInput,
  };
}

export function startConverting() {
  return {
    type: START_CONVERTING,
  };
}

export function getConvertedCurrencyValue(convertedValue) {
  return {
    type: CONVERT_VALUE,
    convertedValue,
  };
}

export function changeCurrencyIHave(currencyIHave) {
  return {
    type: CHANGE_CURRENCY_I_HAVE,
    currencyIHave,
  };
}

export function changeCurrencyIWant(currencyIWant) {
  return {
    type: CHANGE_CURRENCY_I_WANT,
    currencyIWant,
  };
}
