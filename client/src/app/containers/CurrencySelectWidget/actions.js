/*
 *
 * CurrencySelectWidget actions
 *
 */


import {GET_CURRENCIES, START_LOADING_CURRENCIES, DATA_LOAD_ERROR} from "./constants";

export function startLoadingCurrencies() {
  return {
    type: START_LOADING_CURRENCIES,
  };
}

export function allCurrenciesLoaded(allCurrenciesAvailable) {
  return {
    type: GET_CURRENCIES,
    allCurrenciesAvailable,
  };
}

export function errorDataLoading(error) {
  return {
    type: DATA_LOAD_ERROR,
    error,
  };
}
