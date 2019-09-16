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
    makeSelectConvertedValue,
    makeSelectCurrencyInput,
    makeSelectCurrencyIHave,
    makeSelectCurrencyIWant,
    makeSelectFrequencyCountData,
    makeSelectFrequencyPie,
    makeSelectFullAmount,
    makeSelectCounter,
} from "./selectors";
import * as PropTypes from "prop-types";
import {
    changeCurrencyIHave,
    changeCurrencyInput, changeCurrencyIWant,
    saveAmountPieInfo, savePie,
    setIntervalInfo,
    startConverting,
    startLoading,
} from "./actions";
import styled from 'styled-components';
import {compose} from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import CurrencySelectWidget from "../CurrencySelectWidget/Loadable";
import {drawPie} from "./service";

const InfoH = styled.div`
    font-size: 18px;
    font-family: "open sans";
    color: rgb(153, 153, 153);
`;

class CurrencyPage extends Component {
    componentDidMount() {
        this.props.getDataFromDb();
        if (!this.props.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.props.setIntervalData(interval);
        }
        setTimeout(() => {
            if (this.props.frequencyCountData.length > 0) {
                const pie = drawPie(this.props.frequencyCountData, 'pieChart1', 'Most used destination currency', 'percentage', null, null);
                this.props.saveFrequencyPie(pie);
            }
            if (this.props.fullAmount.length > 0) {
                const pie = drawPie(this.props.fullAmount, 'pieChart2', 'Full amount inserted', 'value', this.props.counter, this.props.data.length);
                this.props.saveAmountPie(pie);
            }
        }, 2000);
    }

    componentWillUnmount() {
        if (this.props.intervalIsSet) {
            clearInterval(this.props.intervalIsSet);
            this.props.setIntervalData(null);
        }
    }

    render() {
        const {dat, pie, onChangeCurrencyInfo, convertedValue, onChangeCurrencyIHave, onChangeCurrencyIWant, counter, frequencyCountData} = this.props;

        if (data) {
            return (
                <div className="row ml-auto col-md-12 float-left mt-5 pt-5">
                    <div className="shadow p-4 col-md-12 mainCurrencyConverterSquare d-flex">
                        <div className="d-flex" style={{padding: '1em', paddingLeft: '5rem'}}>
                            <div className="d-flex flex-column">
                                FROM: <div style={{minWidth: '320px'}} className="mb-5">
                                <CurrencySelectWidget onChangeCurrencyIHave={e => onChangeCurrencyIHave(e)}
                                />
                            </div>
                                TO: <div style={{minWidth: '320px'}}>
                                <CurrencySelectWidget onChangeCurrencyIWant={e => onChangeCurrencyIWant(e)}
                                />
                            </div>
                            </div>
                            <div className="d-flex flex-column" style={{paddingLeft: '1rem'}}>
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
                            <div id="pieChart1" className="col-md-4 float-left"/>
                        </div>
                    </div>
                    <div className="shadow p-4 col-md-12 mainCurrencyConverterSquare d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <div className="shadow w-100 h-100 text-center">
                                <div id="pieChart2" className="col-md-4"/>
                            </div>
                        </div>
                        <div className="d-flex flex-column float-right w-100 align-items-md-center">
                            <div className="shadow w-100 h-100 text-center" style={{padding: '10% 0% 10% 0%'}}>
                                <InfoH>Emina Omanovic</InfoH>
                                <InfoH>Year 2019</InfoH>
                                <img className="w-50 pt-3" style={{ height: '230px'}}
                                     src="https://cdn2.iconfinder.com/data/icons/payments/512/yen_coin_payment-512.png"
                                     alt="Converter"/>
                            </div>
                        </div>
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
    frequencyCountData: PropTypes.array,
    fullAmount: PropTypes.array,
    pie: PropTypes.object,
    getDataFromDb: PropTypes.func,
    setIntervalData: PropTypes.func,
    onChangeCurrencyInfo: PropTypes.func,
    convertCurrencyValue: PropTypes.func,
    convertedValue: PropTypes.number,
    currencyInput: PropTypes.number,
    counter: PropTypes.number,
    currencyIHave: PropTypes.string,
    currencyIWant: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
    return {
        getDataFromDb: () => dispatch(startLoading()),
        setIntervalData: (interval) => dispatch(setIntervalInfo(interval)),
        onChangeCurrencyInfo: (currencyInput) => {
            dispatch(changeCurrencyInput(parseFloat(currencyInput.target.value)));
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
        saveFrequencyPie: pie => {
            dispatch(savePie(pie));
        },
        saveAmountPie: pie => {
            dispatch(saveAmountPieInfo(pie));
        }
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
    frequencyCountData: makeSelectFrequencyCountData(),
    pie: makeSelectFrequencyPie(),
    fullAmount: makeSelectFullAmount(),
    counter: makeSelectCounter(),
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

