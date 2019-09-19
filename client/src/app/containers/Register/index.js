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
import {sendUserRegistration} from "./actions";

const P = styled.p`
    color: #3f51b5; 
    font-size: 19px;
    text-align: center;
    font-family: sans-serif;
`;

class Register extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {name: '', password: '', email: ''};
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleNameChange(e) {
        console.log(this.state);
        this.setState({name: e.target.value});
    }

    render() {
        const {name, email, password} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="m-auto col-md-4 formMargins">
                <P className="font-weight-bold">
                    Welcome to Currency Converter</P>
                <br/>

                <input type="text" className="form-control p-4 mb-2" value={this.state.name}
                       onChange={this.handleNameChange} placeholder="Username"
                       required=""
                       autoFocus=""/>
                <input type="password" className="form-control p-4 mb-2" value={this.state.password}
                       onChange={this.handlePasswordChange} placeholder="Password"
                       required=""/>
                <input type="text" className="form-control p-4 mb-2" value={this.state.email}
                       onChange={this.handleEmailChange} placeholder="Email"
                       required=""/>

                <button className="btn btn-lg btn-primary btn-block loginButton"
                        onClick={() => this.props.getRegisterData(name, email, password)}
                        value="Register" type="button">Register
                </button>
                <p className="text-center pt-3" style={{fontFamily:'sans-serif'}} > Already have an account? <Link to="/login">LOGIN HERE</Link></p>

            </form>
        );
    }
}

Register.propTypes = {
    getRegisterData: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
    return {
        getRegisterData: (name, email, password) => dispatch(sendUserRegistration(name, email, password)),
    };
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

