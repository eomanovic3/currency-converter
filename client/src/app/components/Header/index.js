/**
 *
 * Header
 *
 */

import React from "react";
import {Link} from "react-router-dom";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.css';
import './header.css';
function Header() {
  return(
      <div>
          <header className="fixed-top">
              <div className="ui header">
                  <div className="logo">
                      <span style={{ fontSize: '2.0em', color: 'white'}}>
                          <i className="fa fa-usd"></i>
                        </span>
                  </div>
                  <h1 className="content font-weight-bold" style={{ marginLeft: '-13px', fontSize: '2rem', fontFamily: 'sans-serif'}}>
                      Currency Converter</h1></div>
          </header>
          <nav className="open" id="navbarId">
            <div className="ui blue fluid vertical labeled icon menu" id="navItems">
              <Link id="dashboard" className="nav-link activeClass item"
                 aria-selected="true" aria-controls="dashboard" to="/">
                <i aria-hidden="true" className="fa fa-newspaper-o icon"/>
                Dashboard</Link>
              <Link id="dashboard" className="nav-link item"
                    aria-selected="true" aria-controls="dashboard" to="/features">
                <i aria-hidden="true" className="fa fa-user-o icon"/>
                Account</Link>
            </div>
          </nav>
      </div>
  );
}

Header.propTypes = {};

export default Header;
