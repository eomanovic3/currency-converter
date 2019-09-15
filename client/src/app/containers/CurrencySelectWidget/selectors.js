import { createSelector } from "reselect";
import { initialState } from "./reducer";
/**
 * Direct selector to the currencySelectWidget state domain
 */

const selectCurrencySelectWidgetDomain = state =>
  state.currencySelectWidget || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CurrencySelectWidget
 */


const makeSelectCurrencySelectWidget = () =>
  createSelector(
    selectCurrencySelectWidgetDomain,
    substate => substate
  );
const makeSelectAllCurrenciesAvailable = () =>
    createSelector(
        selectCurrencySelectWidgetDomain,
        currencySelectWidget => currencySelectWidget.get('allCurrenciesAvailable'),
    );
const makeSelectLoading = () =>
    createSelector(
        selectCurrencySelectWidgetDomain,
        currencySelectWidget => currencySelectWidget.get('loading'),
    );

const makeSelectError = () =>
    createSelector(
        selectCurrencySelectWidgetDomain,
        currencySelectWidget => currencySelectWidget.get('error'),
    );
export default makeSelectCurrencySelectWidget;
export { selectCurrencySelectWidgetDomain,
    makeSelectAllCurrenciesAvailable,
    makeSelectLoading,
    makeSelectError
};
