// /client/App.js
import React, {Component} from 'react';
import reducer from './reducer';
import saga from './saga';
import {compose} from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import styled from "styled-components";
import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import {Link} from "react-router-dom";

const P = styled.p`
    color: #3f51b5; 
    font-size: 19px;
    text-align: center;
`;

class Register extends Component {

  render() {
    return (
        <div className="m-auto col-md-4" id="registerForm">
          <P className="font-weight-bold">
            Welcome to Currency Converter</P>
          <br/>

          <input type="text" className="form-control p-4 mb-2" name="username" placeholder="Username"
                 required=""
                 autoFocus=""/>
          <input type="password" className="form-control p-4 mb-2" name="Password" placeholder="Password"
                 required=""/>

          <button className="btn btn-lg btn-primary btn-block loginButton" value="Register" type="Submit">Register
          </button>
          <p className="text-center pt-3"> Already have an account? <Link to="/login">LOGIN HERE</Link></p>

        </div>
    );
  }
}

Register.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'register', reducer});
const withSaga = injectSaga({key: 'register', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Register);

