/**
 *
 * Logout
 *
 */

import React from "react";
import CookiesWrapper from "../../utils/cookiesWrapper";
import history from '../../utils/history';

function Logout() {
  CookiesWrapper.removeCookie('x-auth-token');
  history.push('/login');
  return null;
}

Logout.propTypes = {};

export default Logout;
