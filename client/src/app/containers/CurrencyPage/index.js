// /client/App.js
import React, {Component} from 'react';
import reducer from './reducer';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import {
    makeSelectData,
    makeSelectId,
    makeSelectError,
    makeSelectLoading,
    makeSelectIntervalIsSet,
    makeSelectConvertedValue, makeSelectCurrencyInput, makeSelectCurrencyIHave, makeSelectCurrencyIWant
} from "./selectors";
import * as PropTypes from "prop-types";
import {
    changeCurrencyIHave,
    changeCurrencyInput, changeCurrencyIWant,
    setIntervalInfo,
    startConverting,
    startLoading
} from "./actions";
import {compose} from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import getAllCurrencies from "../../utils/allCurrencies";
import CurrencySelect from "../../components/CurrencySelect";

class CurrencyPage extends Component {
    componentDidMount() {
        this.props.getDataFromDb();
        if (!this.props.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.props.setIntervalData(interval);
        }
    }

    componentWillUnmount() {
        if (this.props.intervalIsSet) {
            clearInterval(this.props.intervalIsSet);
            this.props.setIntervalData(null);
        }
    }

    render() {
        const {data, onChangeCurrencyInfo, convertedValue, onChangeCurrencyIHave, onChangeCurrencyIWant} = this.props;
        if (data) {
            return (
                <div className="d-flex" style={{padding: '1em'}}>
                    <div className="d-flex flex-column" style={{paddingTop: '5rem'}}>
                        FROM: <div style={{minWidth: '320px'}} className="mb-5">
                        <CurrencySelect options={getAllCurrencies()}
                                        onChangeCurrencyIHave={e => onChangeCurrencyIHave(e)}
                        />
                    </div>
                        TO: <div style={{minWidth: '320px'}} >
                        <CurrencySelect options={getAllCurrencies()}
                                        onChangeCurrencyIWant={e => onChangeCurrencyIWant(e)}
                        />
                    </div>
                    </div>
                    <div className="d-flex flex-column" style={{paddingTop: '5rem'}}>

                        <div>
                            AMOUNT:
                            <input
                                type="number"
                                onChange={onChangeCurrencyInfo}
                                placeholder="Amount"
                                style={{width: '200px', height: '38px'}}
                                className="form-control"
                            />
                        </div>
                        <div>
                            <button className="btn btn-info btn-lg w-100"
                                    style={{backgroundColor: '#3f51b5', border: '1px solid #3f51b5'}}
                                    onClick={() => this.props.convertCurrencyValue()}>
                                Convert
                            </button>
                        </div>

                        <div>
                            RESULT:
                            <input
                                type="number"
                                value={convertedValue}
                                readOnly
                                placeholder="Result"
                                style={{width: '200px', height: '38px'}}
                                className="form-control"
                            />
                        </div>

                    </div>
                    <div>
                        <ul>
                            {data.length <= 0
                                ? 'NO DB ENTRIES YET'
                                : data.map((dat) => (
                                    <li style={{padding: '10px'}} key={Math.random()}>
                                        <span style={{color: 'gray'}}> id: </span> {dat.id} <br/>
                                        <span style={{color: 'gray'}}> data: </span>
                                        {dat.currency}
                                        {dat.destinationCurrency}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            );
        }
        return <div/>;
    }
}

CurrencyPage.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array,
    getDataFromDb: PropTypes.func,
    setIntervalData: PropTypes.func,
    onChangeCurrencyInfo: PropTypes.func,
    convertCurrencyValue: PropTypes.func,
    convertedValue: PropTypes.number,
    currencyInput: PropTypes.number,
    currencyIHave: PropTypes.string,
    currencyIWant: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
    return {
        getDataFromDb: () => dispatch(startLoading()),
        setIntervalData: (interval) => dispatch(setIntervalInfo(interval)),
        onChangeCurrencyInfo: (currencyInput) => {
            console.log(parseFloat(currencyInput.target.value));
            dispatch(changeCurrencyInput(parseFloat(currencyInput.target.value)));
            dispatch(startLoading());
        },
        convertCurrencyValue: () => {
            dispatch(startConverting());
            dispatch(startLoading());
        },
        onChangeCurrencyIHave: e => {
            dispatch(changeCurrencyIHave(e.value));
        },
        onChangeCurrencyIWant: e => {
            dispatch(changeCurrencyIWant(e.value));
        },
    };
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    data: makeSelectData(),
    id: makeSelectId(),
    intervalIsSet: makeSelectIntervalIsSet(),
    currencyInput: makeSelectCurrencyInput(),
    convertedValue: makeSelectConvertedValue(),
    currencyIHave: makeSelectCurrencyIHave(),
    currencyIWant: makeSelectCurrencyIWant(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: 'currencyPage', reducer});
const withSaga = injectSaga({key: 'currencyPage', saga});

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(CurrencyPage);

