/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DATA_LOAD_ERROR = 'boilerplate/Home/DATA_LOAD_ERROR';
export const DATA_LOADED = 'boilerplate/Home/DATA_LOADED';
export const START_LOADING = 'boilerplate/Home/START_LOADING';
export const SET_INTERVAL_DATA = 'boilerplate/Home/SET_INTERVAL_DATA';
export const CHANGE_CURRENCY_INPUT = 'boilerplate/Home/CHANGE_CURRENCY_INPUT';
export const CONVERT_VALUE = 'boilerplate/Home/CONVERT_VALUE';
export const START_CONVERTING = 'boilerplate/Home/START_CONVERTING';
