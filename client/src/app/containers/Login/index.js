// /client/App.js
import React from 'react';
import reducer from './reducer';
import saga from './saga';
import {compose} from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import styled from "styled-components";
import injectSaga from "../../utils/injectSaga";
import injectReducer from "../../utils/injectReducer";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {sendUserLoginData} from "./actions";

const P = styled.p`
    color: #3f51b5; 
    font-size: 19px;
    text-align: center;
`;
const CustomInput = styled.input`
    font-family: sans-serif;
`;

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {password: '', email: ''};
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        console.log(this.props);
        const {email, password} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="m-auto col-md-4 formMargins">
                <P className="font-weight-bold" style={{fontFamily:'sans-serif'}} >
                    Welcome to Currency Converter</P>
                <br/>
                <CustomInput type="text" className="form-control p-4 mb-2" value={this.state.email}
                             onChange={this.handleEmailChange} placeholder="Email"
                             required=""/>
                <CustomInput type="password" className="form-control p-4 mb-2" value={this.state.password}
                       onChange={this.handlePasswordChange} placeholder="Password"
                       required=""/>

                <button className="btn btn-lg btn-primary btn-block loginButton"
                        onClick={() => this.props.getLoginData(email, password)}
                        value="Login" type="button">Login
                </button>
                <p style={{fontFamily:'sans-serif'}} className="text-center pt-3"> Don't have an account? <Link to="/register">REGISTER HERE</Link></p>

            </form>
        );
    }
}

Login.propTypes = {
    getLoginData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        getLoginData: (email, password) => {
            dispatch(sendUserLoginData(email, password))
        },
    };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'login', reducer});
const withSaga = injectSaga({key: 'login', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Login);

