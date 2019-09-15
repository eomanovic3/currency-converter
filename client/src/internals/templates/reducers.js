/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux/index';
import { connectRouter } from 'connected-react-router';

import history from 'client/src/internals/templates/utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
