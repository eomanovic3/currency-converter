

import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the currencyPage state domain
 */

const selectCurrencyPageDomain = state => state.currencyPage || initialState;

const makeSelectLoading = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('loading'),
    );

const makeSelectError = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('error'),
    );

const makeSelectData = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('data'),
    );

const makeSelectId = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('id'),
    );
const makeSelectIntervalIsSet = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('intervalIsSet'),
    );
const makeSelectCurrencyInput = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('currencyInput'),
    );
const makeSelectConvertedValue = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('convertedValue'),
    );
const makeSelectCurrencyIHave = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('currencyIHave'),
    );
const makeSelectCurrencyIWant = () =>
    createSelector(
        selectCurrencyPageDomain,
        currencyPage => currencyPage.get('currencyIWant'),
    );
export {
  selectCurrencyPageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectId,
  makeSelectIntervalIsSet,
  makeSelectCurrencyInput,
  makeSelectConvertedValue,
  makeSelectCurrencyIHave,
  makeSelectCurrencyIWant,
};
