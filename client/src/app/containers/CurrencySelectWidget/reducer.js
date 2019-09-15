/*
 *
 * CurrencySelectWidget reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DATA_LOAD_ERROR,GET_CURRENCIES, START_LOADING_CURRENCIES
} from "./constants";

export const initialState = fromJS({
    loading: false,
    error: false,
    allCurrenciesAvailable: null,
});

function currencySelectWidgetReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING_CURRENCIES:
            return state.set('loading', true).set('error', false);
        case DATA_LOAD_ERROR:
            return state.set('error', action.error).set('loading', false);
        case GET_CURRENCIES:
            return state
                .set('allCurrenciesAvailable', action.allCurrenciesAvailable)
                .set('loading', false)
                .set('error', false);
        default:
            return state;
    }
}

export default currencySelectWidgetReducer;
