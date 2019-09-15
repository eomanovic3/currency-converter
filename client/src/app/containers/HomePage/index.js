// /client/App.js
import React, {Component} from 'react';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import {compose} from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import Currency from "../CurrencyPage/Loadable";

class HomePage extends Component {

    render() {
        return <Currency  />;
    }
}

HomePage.propTypes = {
};

function mapDispatchToProps(dispatch) {
    return {};
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'homePage', reducer});
const withSaga = injectSaga({key: 'homePage', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomePage);

