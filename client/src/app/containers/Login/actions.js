/*
 *
 * Login actions
 *
 */


import {USER_LOGIN} from "./constants";

export function sendUserLoginData(email, password) {
    return {
        type: USER_LOGIN, email, password
    };
}
