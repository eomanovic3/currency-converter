/*
 *
 * Register actions
 *
 */

import {USER_REGISTRATION} from "./constants";

export function sendUserRegistration(name, email, password) {
  return {
    type: USER_REGISTRATION,
    name,
    email,
    password
  };
}
