/**
 *
 * Header
 *
 */

import React from "react";
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.css';
import './header.css';
import styled from "styled-components";

const CurrencyConverterTitle = styled.h1`
    margin-left: -13px;
    font-size: 2rem;
    font-family: sans-serif;
`;
const DollarIcon = styled.span`
    font-size: 2.0em;
    color: white;
`;

class Header extends React.PureComponent {
    render() {
        return (
            <div>
                <header className="fixed-top">
                    <div className="ui header">
                        <div className="logo">
                            <DollarIcon>
                                <i className="fa fa-usd"/>
                            </DollarIcon>
                        </div>
                        <CurrencyConverterTitle className="content font-weight-bold">
                            Currency Converter
                        </CurrencyConverterTitle>
                    </div>
                </header>
                <nav className="open" id="navbarId">
                    <div className="ui blue fluid vertical labeled icon menu mt13rem" id="navItems">
                        <Link className="nav-link item"
                              aria-selected="true" aria-controls="dashboard" to="/">
                            <i aria-hidden="true" className="fa fa-newspaper-o icon"/>
                            Dashboard
                        </Link>
                        <Link className="nav-link item"
                              aria-selected="true" aria-controls="dashboard" to="/logout">
                            <i aria-hidden="true" className="fa fa-user-o icon"/>
                            Logout
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {};

export default Header;


