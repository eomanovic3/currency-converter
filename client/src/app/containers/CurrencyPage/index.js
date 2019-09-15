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
    makeSelectCurrencyIWant, makeSelectFrequencyCountData, makeSelectFrequencyPie,
} from "./selectors";
import * as PropTypes from "prop-types";
import {
    changeCurrencyIHave,
    changeCurrencyInput, changeCurrencyIWant, savePie,
    setIntervalInfo,
    startConverting,
    startLoading,
} from "./actions";
import {compose} from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import CurrencySelectWidget from "../CurrencySelectWidget/Loadable";
import {drawBar, drawPie, prepareDataForChart} from "./service";
import './bar.css';
class CurrencyPage extends Component {
    componentDidMount() {
        this.props.getDataFromDb();
        if (!this.props.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 1000);
            this.props.setIntervalData(interval);
        }
        setTimeout(() => {
            if(this.props.frequencyCountData.length > 0) {
                const pie = drawPie(this.props.frequencyCountData, 'pieChart1', 'Most used destionation currency');
                this.props.saveFrequencyPie(pie);
                drawBar();
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
        const {data, pie, onChangeCurrencyInfo, convertedValue, onChangeCurrencyIHave, onChangeCurrencyIWant, frequencyCountData} = this.props;
        if (frequencyCountData && pie) {
            const rows = prepareDataForChart(frequencyCountData);
            pie.updateProp("data.content", rows);
        }
        if (data) {
            return (
                <div className="row ml-auto col-md-12 float-left mt-5 pt-5">
                    <div className="shadow p-4 col-md-12 mainCurrencyConverterSquare">
                        <div className="d-flex" style={{padding: '1em'}}>
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
                    <div id="content">
                        <div id="chart"></div>
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
    pie: PropTypes.object,
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

