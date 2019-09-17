/*
 *
 * CurrencyPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
    CHANGE_CURRENCY_I_HAVE, CHANGE_CURRENCY_I_WANT,
    CHANGE_CURRENCY_INPUT,
    CONVERT_VALUE,
    DATA_LOAD_ERROR,
    DATA_LOADED, SAVE_AMOUNT_PIE, SAVE_PIE,
    SET_INTERVAL_DATA, START_CONVERTING, START_LOADING
} from "./constants";

export const initialState = fromJS({
    data: null,
    frequencyCountData: null,
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    loading: false,
    error: false,
    currencyInput: 0,
    convertedValue: 0,
    currencyIHave: 'ALL',
    currencyIWant: 'ALL',
    frequencyPie: null,
    fullAmount: null,
    counter: null,
    amountPie: null,
});

function currencyReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_LOAD_ERROR:
            return state.set('error', action.error).set('loading', false);
        case DATA_LOADED:
            return state
                .set('data', action.data)
                .set('frequencyCountData', action.frequencyCountData)
                .set('fullAmount', action.fullAmount)
                .set('counter', action.counter)
                .set('loading', false)
                .set('error', false);
        case SET_INTERVAL_DATA:
            return state
                .set('intervalIsSet', action.interval);
        case CHANGE_CURRENCY_INPUT:
            return state
                .set('currencyInput', action.currencyInput);
        case CONVERT_VALUE:
            return state
                .set('convertedValue', action.convertedValue);
        case CHANGE_CURRENCY_I_HAVE:
            return state
                .set('currencyIHave', action.currencyIHave);
        case CHANGE_CURRENCY_I_WANT:
            return state
                .set('currencyIWant', action.currencyIWant);
        case START_LOADING:
            return state.set('loading', true).set('error', false);
        case START_CONVERTING:
            return state.set('loading', true).set('error', false);
        case SAVE_PIE:
            return state.set('frequencyPie', action.frequencyPie);
        case SAVE_AMOUNT_PIE:
            return state.set('amountPie', action.amountPie);
        default:
            return state;
    }
}

export default currencyReducer;
