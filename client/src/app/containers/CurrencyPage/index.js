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

const ConvertButton = styled.button`
    font-size: 16px;
    font-weight: bold;
    background-color: #3f51b5;
    border: 1px solid #3f51b5;
    width: 300px;
    height: 35px;
`;
const ResultInput = styled.input`
    width: 400px;
    height: 38px;
    font-weight: 500;
`;
const LoaderImage = styled.img`
   width: 150px !important;
`;
const PieDiv = styled.div`
  visibility: ${props => (props.frequencyCountDataExist === false ? 'hidden' : 'unset')};
`;
class CurrencyPage extends Component {
    componentDidMount() {
        const { intervalIsSet} = this.props;
        this.props.getDataFromDb();
        if (!intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.props.setIntervalData(interval);
        }
        setTimeout(() => {
            const {frequencyCountData, fullAmount, counter, data} = this.props;
            let validFrequencyCountData = [{destinationCurrency: 'Unknown', frequency: 100}];
            if (frequencyCountData && frequencyCountData.length > 0) {
                validFrequencyCountData = frequencyCountData;
            }
            const frequencyPie = drawPie(validFrequencyCountData, 'pieChart1', 'Most used destination currency', 'percentage', null, null);
            this.props.saveFrequencyPie(frequencyPie);

            let validFullAmountData = [{destinationCurrency: 'Unknown', frequency: 100}];
            if (fullAmount && fullAmount.length > 0) {
                validFullAmountData = fullAmount;
            }
            const amountPie = drawPie(validFullAmountData, 'pieChart2', 'Full amount inserted', 'value', counter, data ? data.length : 0);
            this.props.saveAmountPie(amountPie);

        }, 2000);
    }

    componentWillUnmount() {
        if (this.props.intervalIsSet) {
            clearInterval(this.props.intervalIsSet);
            this.props.setIntervalData(null);
        }
    }

    render() {
        const {data, onChangeCurrencyInfo, convertedValue, onChangeCurrencyIHave, onChangeCurrencyIWant, counter, frequencyCountData} = this.props;
        const frequencyCountDataExist = frequencyCountData && frequencyCountData.length > 0;
        if (data) {
            return (
                <div className="row ml-auto col-md-12 float-left mt-5 pt-5 fitContentHeight">
                    <div className="shadow p-4 col-md-12 mainCurrencyConverterSquare d-flex flex-column">
                        <div className="d-flex" style={{padding: '1em', paddingLeft: '5rem'}}>
                            <div className="d-flex flex-column">
                                <div className="pl-2">
                                    FROM: <div style={{minWidth: '400px'}} className="mb-2">
                                    <CurrencySelectWidget onChangeCurrencyIHave={e => onChangeCurrencyIHave(e)}
                                    /></div>
                                </div>
                                <div className="pl-2">
                                    AMOUNT:
                                    <ResultInput
                                        type="number"
                                        onChange={onChangeCurrencyInfo}
                                        placeholder="Amount"
                                        className="form-control pl-2"
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="pl-2">
                                    TO: <div style={{minWidth: '400px'}} className="mb-2">
                                    <CurrencySelectWidget onChangeCurrencyIWant={e => onChangeCurrencyIWant(e)}
                                    /></div>
                                </div>
                                <div className="pl-2">
                                    RESULT:
                                    <ResultInput
                                        type="number"
                                        value={convertedValue}
                                        readOnly
                                        placeholder="Result"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-column" style={{paddingLeft: '1rem'}}>

                                <div>
                                    <ConvertButton className="btn btn-primary mt-4"
                                                   onClick={() => this.props.convertCurrencyValue()}>
                                        Convert
                                    </ConvertButton>
                                </div>
                            </div>
                        </div>
                    </div>
                     <PieDiv frequencyCountDataExist={frequencyCountDataExist}
                        className="shadow p-4 col-md-12 secondCurrencyConverterSquare d-flex justify-content-between">
                        <div className="d-flex flex-column">
                            <div className="w-100 h-100 text-center">
                                <div id="pieChart2" className="col-md-4"/>
                            </div>
                        </div>
                        <div className="d-flex flex-column float-right w-100 align-items-md-center">
                            <div className="w-100 h-100 text-center">
                                <div id="pieChart1" className="col-md-4 float-left"/>
                            </div>
                        </div>
                    </PieDiv>
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

