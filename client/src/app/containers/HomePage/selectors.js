import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

const makeSelectLoading = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('loading'),
    );

const makeSelectError = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('error'),
    );

const makeSelectData = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('data'),
    );

const makeSelectId = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('id'),
    );
const makeSelectIntervalIsSet = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('intervalIsSet'),
    );
const makeSelectCurrencyInput = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('currencyInput'),
    );
const makeSelectConvertedValue = () =>
    createSelector(
        selectHomePageDomain,
        homePage => homePage.get('convertedValue'),
    );
export {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectData,
  makeSelectId,
  makeSelectIntervalIsSet,
  makeSelectCurrencyInput,
  makeSelectConvertedValue,
};
