// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
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
  makeSelectConvertedValue, makeSelectCurrencyInput
} from "./selectors";
import * as PropTypes from "prop-types";
import {
  changeCurrencyInput,
  getConvertedCurrencyValue,
  setIntervalInfo,
  startConverting,
  startLoading
} from "./actions";
import { compose } from 'redux';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";

class HomePage extends Component {

  componentDidMount() {
    this.props.getDataFromDb();
    if (!this.props.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.props.setIntervalData(interval);
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries


  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    let idDelete = parseInt(idTodelete);
    let objIdToDelete = null;
    debugger;
    this.state.data.forEach((dat) => {
      if (dat.id === idDelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/data/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let idUpdate = parseInt(idToUpdate);
    let objIdToUpdate = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/data/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const {data, onChangeCurrencyInfo, convertedValue} = this.props;
    console.log(convertedValue);
    if (data) {
      return (
          <div className="float-right" style={{paddingTop: '5rem'}}>
            <ul>
              {data.length <= 0
                  ? 'NO DB ENTRIES YET'
                  : data.map((dat) => (
                      <li style={{padding: '10px'}} key={Math.random()}>
                        <span style={{color: 'gray'}}> id: </span> {dat.id} <br/>
                        <span style={{color: 'gray'}}> data: </span>
                        {dat.message}
                      </li>
                  ))}
            </ul>
            <div style={{padding: '10px'}}>
              <input
                  type="text"
                  onChange={onChangeCurrencyInfo}
                  placeholder="add something in the database"
                  style={{width: '200px'}}
              />
              <button onClick={() => this.props.convertCurrencyValue()}>
                ADD
              </button>

              <div style={{width: '200px'}}>{convertedValue}</div>


            </div>
            <div style={{padding: '10px'}}>
              <input
                  type="text"
                  style={{width: '200px'}}
                  onChange={(e) => this.setState({idToDelete: e.target.value})}
                  placeholder="put id of item to delete here"
              />
              <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                DELETE
              </button>
            </div>
            <div style={{padding: '10px'}}>
              <input
                  type="text"
                  style={{width: '200px'}}
                  onChange={(e) => this.setState({idToUpdate: e.target.value})}
                  placeholder="id of item to update here"
              />
              <input
                  type="text"
                  style={{width: '200px'}}
                  onChange={(e) => this.setState({updateToApply: e.target.value})}
                  placeholder="put new value of the item here"
              />
              <button
                  onClick={() =>
                      this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                  }
              >
                UPDATE
              </button>
            </div>
          </div>
      );
    }
    return <div/>;
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  getDataFromDb: PropTypes.func,
  setIntervalData: PropTypes.func,
  onChangeCurrencyInfo : PropTypes.func,
  convertCurrencyValue: PropTypes.func,
  convertedValue: PropTypes.string,
};

function mapDispatchToProps(dispatch) {
  return {
    getDataFromDb: () => dispatch(startLoading()),
    setIntervalData: (interval) => dispatch(setIntervalInfo(interval)),
    onChangeCurrencyInfo: (currencyInput) => dispatch(changeCurrencyInput(currencyInput.target.value)),
    convertCurrencyValue: ()=>dispatch(startConverting()),
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  data: makeSelectData(),
  id: makeSelectId(),
  intervalIsSet: makeSelectIntervalIsSet(),
  currencyInput : makeSelectCurrencyInput(),
  convertedValue: makeSelectConvertedValue(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomePage);

