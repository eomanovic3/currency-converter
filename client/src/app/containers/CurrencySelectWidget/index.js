/**
 *
 * CurrencySelectWidget
 *
 */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from "./reducer";
import saga from "./saga";
import {startLoadingCurrencies} from "./actions";
import {makeSelectError, makeSelectLoading, makeSelectAllCurrenciesAvailable} from "./selectors";
import Select from "react-select";

class CurrencySelectWidget extends React.PureComponent {

    componentDidMount() {
        this.props.getAllCurrencies();
    }

    getImageSource(value) {
        const getProperValue = value.substring(0, value.length - 1).toLowerCase();
        try {
            return require(`../../utils/currencyImages/${getProperValue}.png`);
        } catch (err) {
            return require(`../../utils/currencyImages/unknown.png`);
        }

    }

    render() {
        const {allCurrenciesAvailable, onChangeCurrencyIHave, onChangeCurrencyIWant} = this.props;
        const formatOptionLabel = ({value, label}) => (
            <div className="d-flex justify-content-between">
                <div><img className='img-responsive img-filter'
                          src={this.getImageSource(value)}
                          style={{width: '30px', height: '20px', marginRight: '5px'}}
                          alt=""/>{label}</div>
                <div style={{color: '#ccc', marginLeft: '5px'}}>{value}</div>
            </div>
        );
        if(allCurrenciesAvailable) {
            return (
                <Select
                    defaultValue={allCurrenciesAvailable[0]}
                    formatOptionLabel={formatOptionLabel}
                    options={allCurrenciesAvailable}
                    onChange={onChangeCurrencyIHave ? onChangeCurrencyIHave : onChangeCurrencyIWant}
                />
            );
        }
        return <div/>;
    }
}

CurrencySelectWidget.propTypes = {
    onChangeCurrencyIHave: PropTypes.func,
    onChangeCurrencyIWant: PropTypes.func,
    getAllCurrencies: PropTypes.func,
    allCurrenciesAvailable: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
    return {
        getAllCurrencies: () => {
            dispatch(startLoadingCurrencies());
        },
    };
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    allCurrenciesAvailable: makeSelectAllCurrenciesAvailable(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'currencySelectWidget', reducer});
const withSaga = injectSaga({key: 'currencySelectWidget', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(CurrencySelectWidget);

