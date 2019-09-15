/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {CHANGE_CURRENCY_INPUT, CONVERT_VALUE, DATA_LOAD_ERROR, DATA_LOADED, SET_INTERVAL_DATA} from "./constants";

export const initialState = fromJS({
    data: null,
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    loading: false,
    error: false,
    currencyInput: '0',
    convertedValue: '0',
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_LOAD_ERROR:
            return state.set('error', action.error).set('loading', false);
        case DATA_LOADED:
            return state
                .set('data', action.data)
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
        default:
            return state;
    }
}

export default homeReducer;
